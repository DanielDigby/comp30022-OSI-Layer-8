import express from "express";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { errorHandler } from "./helpers/errors";

require("./config/mongoose");
require("./config/passport");

const app = express();
const port = process.env.PORT || 8080;

Sentry.init({
    dsn: "https://f076062d3e124a698c7171548e7a246e@o1044993.ingest.sentry.io/6020267",
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    tracesSampleRate: 1.0,
});
// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// middleware
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                objectSrc: ["'none'"],
                scriptSrc: ["'self'", "unpkg.com", "polyfill.io"],
                styleSrc: ["'self'", "https: 'unsafe-inline'"],
                fontSrc: ["'self'", "https://fonts.gstatic.com/", "data:"],
                imgSrc: ["'self'", "https://firebasestorage.googleapis.com/"],
                upgradeInsecureRequests: [],
            },
        },
    })
);

app.use(require("sanitize").middleware);
app.use(express.json({ limit: "300kb" }));
app.use(cookieParser());

// rate limit setup
const rateLimit = require("express-rate-limit");
app.set("trust proxy", 1);
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api/", apiLimiter);

// health route
app.get("/api/", (_, res) => {
    res.status(200).send("alive");
});

// note URLs
const noteRouter = require("./modules/note/noteRouter");
app.use("/api/notes", noteRouter);

// user URLs
const userRouter = require("./modules/user/userRouter");
app.use("/api/users/", userRouter);

// auth URLs
const authRouter = require("./modules/auth/authRouter");
app.use("/api/auth/", authRouter);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());
// local error handler
app.use(errorHandler);

// Frontend connection
if (process.env.NODE_ENV === "production") {
    // Serve static frontend files (only when deployed)

    // this joins to the build directory of our client (the minified files get placed here when running build script)
    app.use(express.static(path.join(__dirname, "../../client/build")));

    // this basically says, if they connect to any route that isnt /api/ send them files from the client side
    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
    });

    app.listen(port, () => console.log(`Running on port ${port}`));
} else if (process.env.NODE_ENV !== "test") {
    // cors for communicating with react frontend (only in development)

    // in production we dont need this because we can serve over the same port, but because we will run two separate
    // apps on two separate ports in development we need to allow cross origin resource sharing
    app.use(cors({ origin: "http://localhost:3000", credentials: true }));

    app.listen(port, () => console.log(`Running on http://localhost:${port}`));
}

module.exports = app;

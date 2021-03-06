import express from "express";
import cors from "cors";
import path from "path";
import helmet from "helmet";

import cookieParser from "cookie-parser";
import { errorHandler } from "./helpers/errors";

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("./config/mongoose");
require("./config/passport");

const app = express();
const port = process.env.PORT || 8080;

const sentry = require("./config/sentry");
sentry.configure(app);

// set up middleware
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [
                    "'self'",
                    "https://firebasestorage.googleapis.com/",
                    "*.sentry.io",
                ],
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
sentry.errorHandler(app);
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

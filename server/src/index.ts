import express from "express";
import cors from "cors";
import path from "path";
const app = express();
const port = process.env.PORT || 8080;
require("dotenv").config();

// health route
app.get("/api/", (_, res) => {
    res.status(200).send("alive");
});

// database models
require("./config/mongoose");

// note URLS
const noteRouter = require("./modules/note/noteRouter");
app.use("/api/notes/", noteRouter);

// user URLs
const userRouter = require("./modules/user/userRouter");
app.use("/api/users/", userRouter);

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
} else {
    // cors for communicating with react frontend (only in development)

    // in production we dont need this because we can serve over the same port, but because we will run two separate
    // apps on two separate ports in development we need to allow cross origin resource sharing
    app.use(cors({ origin: "http://localhost:3000", credentials: true }));

    app.listen(port, () => console.log(`Running on http://localhost:${port}`));
}

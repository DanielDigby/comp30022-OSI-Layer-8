import express = require("express");
import cors = require("cors");
import path = require("path");
const app = express();
const port = process.env.PORT || 8080;
require("dotenv").config();

app.get("/api/", (_, res) => {
    res.status(200).send("rebuild");
});

if (process.env.NODE_ENV === "production") {
    // Serve static frontend files (only when deployed)
    app.use(express.static(path.join(__dirname, "../../client/build")));

    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
    });

    app.listen(port, () => console.log(`Running on port ${port}`));
} else {
    // cors for communicating with react frontend (only in development)
    app.use(cors({ origin: "http://localhost:3000", credentials: true }));

    app.listen(port, () => console.log(`Running on http://localhost:${port}`));
}

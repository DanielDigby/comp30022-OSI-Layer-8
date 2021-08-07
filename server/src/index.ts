import express = require("express");
import path = require("path");
const app = express();
const port = process.env.PORT || 8080;

app.get("/", (_, res) => {
    res.status(200).send("rebuild");
});

// Serve static frontend files (only when deployed)
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../client/build")));

    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
    });
}

app.listen(port, () => console.log(`Running on port ${port}`));

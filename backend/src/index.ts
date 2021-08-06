import express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.get("/", (_, res) => {
	res.status(200).send("hello world");
});

app.listen(port, () => console.log(`Running on port ${port}`));

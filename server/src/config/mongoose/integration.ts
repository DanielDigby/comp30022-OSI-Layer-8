import mongoose from "mongoose";

// connect to atlas database
const DB = "comp30022-crm-app";
const mongoURI = `mongodb://localhost:27017/${DB}`;
const mongoOpts = {
    dbName: "comp30022-crm-app",
};

// initialize connection and report status
mongoose.connect(mongoURI, mongoOpts);
const db = mongoose.connection;
db.on("error", (err) => {
    console.error(err);
    process.exit(1);
});
db.once("open", async () => {
    console.log("Mongo connection started on " + db.host + ":" + db.port);
});

import mongoose from "mongoose";

// connect to atlas database
const mongoURI =
    "mongodb+srv://development:development@development.e630l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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

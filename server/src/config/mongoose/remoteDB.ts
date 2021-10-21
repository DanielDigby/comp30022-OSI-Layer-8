import mongoose from "mongoose";

// connect to remote database
let mongoURI;
if (process.env.NODE_ENV == "production") {
    mongoURI = process.env.PROD_MONGODB_URI;
} else if (process.env.CYPRESS == "true") {
    mongoURI = process.env.INT_MONGODB_URI;
} else {
    mongoURI = process.env.DEV_MONGODB_URI;
}

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

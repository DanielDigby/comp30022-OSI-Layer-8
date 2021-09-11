import mongoose = require("mongoose");

// connect to atlas database
mongoose.connect(
    "mongodb+srv://development:development@development.e630l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        dbName: "comp30022-crm-app",
    }
);

const db = mongoose.connection;
db.on("error", (err) => {
    console.error(err);
    process.exit(1);
});

db.once("open", async () => {
    console.log("Mongo connection started on " + db.host + ":" + db.port);
});

require("../modules/note/noteModel");
require("../modules/user/userModel");

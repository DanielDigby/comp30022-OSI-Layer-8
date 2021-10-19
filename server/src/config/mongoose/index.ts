require("dotenv").config();

// load database config
// TODO (Daniel) set up separate database for production
if (process.env.NODE_ENV !== "test") {
    require("./development");
}
if (process.env.CYPRESS == "true") {
    const db = require("./integration");
    db.initializeIntegrationDB();
}

// configure models
require("../../modules/note/noteModel");
require("../../modules/user/userModel");

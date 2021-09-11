require("dotenv").config();

// load
if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "production"
) {
    // TODO (Daniel) set up separate database for production
    require("./development");
}

// configure models
require("../../modules/note/noteModel");
require("../../modules/user/userModel");

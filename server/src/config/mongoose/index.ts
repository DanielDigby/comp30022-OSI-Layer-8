// load database config
if (process.env.NODE_ENV !== "test") {
    require("./remoteDB");
}
// configure models
require("../../modules/note/noteModel");
require("../../modules/user/userModel");

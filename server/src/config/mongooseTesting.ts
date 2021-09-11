import mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const mongoServer = new MongoMemoryServer();

// connect to in memory database while testing
const connect = async () => {
    const uri = await mongoServer.getUri();

    await mongoose.connect(uri);

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
};

// dump database then close connection
const disconnect = async () => {
    await mongoose.connection.dropDatabase;
    await mongoose.connection.close();
    await mongoServer.stop();
};

// delete all document from each collection
const clear = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
};

module.exports = {
    connect,
    disconnect,
    clear,
};

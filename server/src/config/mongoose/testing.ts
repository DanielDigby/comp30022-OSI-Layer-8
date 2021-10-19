import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

const createTestingDB = async () => {
    mongoServer = await MongoMemoryServer.create();
};

// connect to in memory database while testing
const connectTestingDB = async () => {
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
};

// Wipe data from memory then stop
const closeTestingDB = async () => {
    await mongoose.connection.dropDatabase;
    await mongoose.connection.close();
    await mongoServer.stop();
};

// Clear each collection
const clearTestingDB = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
};

module.exports = {
    createTestingDB,
    connectTestingDB,
    closeTestingDB,
    clearTestingDB,
};

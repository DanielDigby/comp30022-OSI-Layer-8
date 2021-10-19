const db = require("../../config/mongoose/testing");

const initializeIntegrationDB = async () => {
    await db.createTestingDB();
    await db.connectTestingDB();
};

module.exports = { initializeIntegrationDB };

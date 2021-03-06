import supertest from "supertest";
import mongoose from "mongoose";
import { generateJwt } from "../../helpers/security";
import { IUser } from "../../modules/user/userModel";

const db = require("../../config/mongoose/memoryDB");
const app = require("../../index");

const User = mongoose.model("User");

beforeAll(async () => {
    await db.createTestingDB();
    await db.connectTestingDB();
});

afterEach(async () => {
    await db.clearTestingDB();
});

afterAll(async () => {
    await db.closeTestingDB();
});

describe("User route tests", () => {
    describe("Update user details", () => {
        it(
            "When a user's details are updated correctly:\n" +
                "- success code\n" +
                "- created user object in response body\n" +
                "- the number of User documents in db doesn't change",
            async () => {
                const User = mongoose.model<IUser>("User");
                const user = {
                    email: "test@test.com",
                    firstName: "Jane",
                    lastName: "Doe",
                    password: "test123",
                    profilePic: "test url",
                    colourScheme: "orange",
                    tags: ["test tag"],
                };
                await new User(user).save();
                const id = (await User.findOne({ email: "test@test.com" }))._id;
                const jwt = generateJwt(
                    await User.findOne({ email: "test@test.com" })
                );

                const changedUser = {
                    email: "new@new.com",
                    firstName: "New",
                    lastName: "New",
                    password: "redacted",
                    profilePic: "new url",
                    colourScheme: "orange",
                    tags: ["new test tag"],
                };

                const res = await supertest(app)
                    .put(`/api/users/${id}`)
                    .set("Cookie", ["jwt=" + jwt])
                    .send(changedUser);

                expect(res.statusCode).toBe(200);
                expect(res.body).toMatchObject(changedUser);
            }
        );
    });
});

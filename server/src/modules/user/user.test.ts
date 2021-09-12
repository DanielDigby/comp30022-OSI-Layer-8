import supertest from "supertest";
import express from "express";
import mongoose from "mongoose";
import { createUser } from "../user/userMiddleware";
import { create } from "domain";

const db = require("../../config/mongoose/testing");
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
                supertest(app)
                    .post("/api/auth/register")
                    .send({
                        email: "test@test.com",
                        firstName: "Jane",
                        lastName: "Doe",
                        password: "test123",
                        profilePic: "test url",
                        colourScheme: "PLACEHOLDER",
                        tags: ["test tag"]
                    })
                // await db.save({
                //     email: "test@test.com",
                //     firstName: "Jane",
                //     lastName: "Doe",
                //     password: "test123",
                //     profilePic: "test url",
                //     colourScheme: "PLACEHOLDER",
                //     tags: ["test tag"]
                // })
                const count = await User.countDocuments()
                
                console.log(count);

                const id = (await User.findOne())._id;
                const newBody = {
                    email: "new@new.com",
                    firstName: "New",
                    lastName: "New",
                    password: "new123",
                    profilePic: "new url",
                    colourScheme: "PLACEHOLDER",
                    tags: ["new test tag"]
                }


                const res = await supertest(app)
                                        .put(`/api/user/${id}`)
                                        .send(newBody);
                                    
                const newCount = await User.countDocuments();    

                expect(res.statusCode).toBe(200);  
                expect(res.body).toEqual(newBody);           
                expect(newCount).toBe(count + 1);
            }
        );

        // it(
        //     "When incorrect new user object is provided expect return to be:" +
        //         "user error code",
        //     () => {}
        // );
    });

    // describe("Log in user", () => {
    //     it(
    //         "When correct username and password are provided expect return to be:" +
    //             "success code" +
    //             "jwt cookie" +
    //             "user object in response body",
    //         () => {}
    //     );

    //     it(
    //         "When incorrect username or password are provided expect return to be:" +
    //             "user error code",
    //         () => {}
    //     );
    // });

    // describe("Log out user", () => {
    //     it(
    //         "When valid jwt is provided expect return to be:" +
    //             "success code" +
    //             "empty jwt cookie",
    //         () => {}
    //     );

    //     it(
    //         "When invalid jwt is provided expect return to be:" +
    //             "user error code",
    //         () => {}
    //     );
    // });
});

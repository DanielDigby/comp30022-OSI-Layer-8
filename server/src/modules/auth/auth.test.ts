import supertest from "supertest";
import * as request from "superagent";
import express from "express";
import { assert } from "console";
import { notify } from "superagent";

const db = require("../../config/mongoose/testing");
const app = require("../../index");

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

describe("Authentication service", () => {
    describe("Register user", () => {
        it(
            "When correct new user object is provided expect return to be:\n" +
                "- success code\n" +
                "- jwt cookie\n" +
                "- created user object in response body\n",
            (done) => {
                const agent = request.agent();
                const user = {
                    email: "testuser@email.com",
                    firstName: "test",
                    lastName: "user",
                    password1: "password",
                    password2: "password",
                    profilePic: "someImgUrl",
                };
                supertest(app)
                    .post("/api/auth/register")
                    .send(user)
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .then((res) => {
                        expect(res.header["set-cookie"]).not.toBeNull();
                        expect(res.header["set-cookie"]).not.toBeUndefined();
                        expect(res.body.email).toEqual(user.email);
                        expect(res.body.firstName).toEqual(user.firstName);
                        expect(res.body.lastName).toEqual(user.lastName);
                        expect(res.body.profilePic).toEqual(user.profilePic);
                        expect(res.body.colourScheme).toEqual("PLACEHOLDER");
                        expect(res.body.tags.length).toEqual(0);

                        expect(res.body.password).toBe("redacted");
                        done();
                    })
                    .catch((err) => done(err));
            }
        );

        it(
            "When incorrect new user object is provided expect return to be:\n" +
                "client error code",
            (done) => {
                // note. no firstName
                const user = {
                    email: "testuser@email.com",
                    lastName: "user",
                    password1: "password",
                    password2: "password",
                    profilePic: "someImgUrl",
                };
                supertest(app)
                    .post("/api/auth/register")
                    .send(user)
                    .expect(400, done);
            }
        );
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
    //         () => {} request.auth('my_token', { type: 'bearer' })
    //     );

    //     it(
    //         "When invalid jwt is provided expect return to be:" +
    //             "user error code",
    //         () => {}
    //     );
    // });
});

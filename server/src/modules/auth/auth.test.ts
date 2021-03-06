import supertest from "supertest";
import * as request from "superagent";
import express from "express";
import { IUser } from "../user/userModel";
import mongoose from "mongoose";
import { hashPassword, generateJwt } from "../../helpers/security";
const db = require("../../config/mongoose/memoryDB");
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
                "\t- success code\n" +
                "\t- jwt cookie\n" +
                "\t- created user object in response body",
            (done) => {
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
                        expect(res.header["set-cookie"][0]).toMatch(/jwt/);
                        expect(res.body.email).toEqual(user.email);
                        expect(res.body.firstName).toEqual(user.firstName);
                        expect(res.body.lastName).toEqual(user.lastName);
                        expect(res.body.profilePic).toEqual(user.profilePic);
                        expect(res.body.colourScheme).toEqual("orange");
                        expect(res.body.tags.length).toEqual(0);

                        expect(res.body.password).toBe("redacted");
                        done();
                    })
                    .catch((err) => done(err));
            }
        );

        it(
            "When incorrect new user object is provided expect return to be:\n" +
                "\t- client error code",
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
                    .expect(400)
                    .then((res) => {
                        expect(res.text).toEqual("Validation Error");
                        done();
                    })
                    .catch((err) => done(err));
            }
        );

        it(
            "When mismatched passwords are provided expect return to be:\n" +
                "\t- client error code",
            (done) => {
                const user = {
                    email: "testuser@email.com",
                    firstName: "test",
                    lastName: "user",
                    password1: "password",
                    password2: "wordpass",
                    profilePic: "someImgUrl",
                };
                supertest(app)
                    .post("/api/auth/register")
                    .send(user)
                    .expect(400)
                    .then((res) => {
                        expect(res.text).toEqual("Password Error");
                        done();
                    })
                    .catch((err) => done(err));
            }
        );
    });

    describe("Log in user", () => {
        beforeEach(async () => {
            // register the user to be logged in
            const User = mongoose.model<IUser>("User");
            const user = new User({
                email: "testuser@email.com",
                firstName: "test",
                lastName: "user",
                password: hashPassword("password"),
                profilePic: "someImgUrl",
            });
            await user.save();
        });

        it(
            "When correct email and password are provided expect return to be:\n" +
                "\t- success code\n" +
                "\t- jwt cookie\n" +
                "\t- created user object in response body",
            (done) => {
                supertest(app)
                    .post("/api/auth/login")
                    .send({
                        email: "testuser@email.com",
                        password: "password",
                    })
                    .expect(200)
                    .then((res) => {
                        expect(res.header["set-cookie"][0]).toMatch(/jwt/);
                        expect(res.body.email).toEqual("testuser@email.com");
                        expect(res.body.firstName).toEqual("test");
                        expect(res.body.lastName).toEqual("user");
                        expect(res.body.profilePic).toEqual("someImgUrl");
                        expect(res.body.colourScheme).toEqual("orange");
                        expect(res.body.tags.length).toEqual(0);

                        expect(res.body.password).toBe("redacted");
                        done();
                    })
                    .catch((err) => done(err));
            }
        );

        it(
            "When incorrect email or password are provided expect return to be:\n" +
                "\t- unauthorized code",
            (done) => {
                supertest(app)
                    .post("/api/auth/login")
                    .send({
                        email: "testuser@email.com",
                        password: "wordpass",
                    })
                    .expect(401)
                    .then((res) => {
                        expect(res.text).toEqual("Unauthorized");
                        done();
                    })
                    .catch((err) => done(err));
            }
        );
    });

    describe("Log out user", () => {
        let jwt: string;
        beforeEach(async () => {
            // register the user to be logged in
            const User = mongoose.model<IUser>("User");
            const user = new User({
                email: "testuser@email.com",
                firstName: "test",
                lastName: "user",
                password: hashPassword("password"),
                profilePic: "someImgUrl",
            });
            await user.save();
            jwt = generateJwt(
                await User.findOne({ email: "testuser@email.com" })
            );
        });

        it(
            "When valid jwt is provided expect return to be:\n" +
                "\t- success code\n" +
                "\t- empty jwt cookie",
            (done) => {
                supertest(app)
                    .get("/api/auth/logout")
                    .set("Cookie", ["jwt=" + jwt])
                    .expect(200)
                    .then((res) => {
                        expect(res.header["set-cookie"][0]).toMatch(/jwt=null/);
                        done();
                    })
                    .catch((err) => done(err));
            }
        );

        it(
            "When invalid jwt is provided expect return to be:\n" +
                "\t- user error code",
            (done) => {
                supertest(app)
                    .get("/api/auth/logout")
                    .set("Cookie", ["jwt=" + "notarealjwt"])
                    .expect(401)
                    .then((res) => {
                        expect(res.text).toEqual("Unauthorized");
                        done();
                    })
                    .catch((err) => done(err));
            }
        );
    });
});

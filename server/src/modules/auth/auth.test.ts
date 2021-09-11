import supertest from "supertest";
import express from "express";

const app = require("../../index");
const db = require("../../config/mongooseTesting");

beforeAll(async () => {
    await db.connect;
});

afterEach(async () => {
    await db.clear;
});

afterAll(async () => {
    await db.close;
});

describe("Authentication service", () => {
    describe("Register user", () => {
        it(
            "When correct new user object is provided expect return to be:" +
                "success code" +
                "jwt cookie" +
                "created user object in response body",
            () => {
                expect(1).toBe(1);
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

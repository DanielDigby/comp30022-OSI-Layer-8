import mongoose from "mongoose";
import express, { request } from "express";
// import model
import { IUser } from "../../modules/user/userModel";
const User = require("../../modules/user/userModel");

import {
    validatePassword,
    hashPassword,
    generateJwt,
    extractJwt,
} from "./index";

describe("Password hashing", () => {
    describe("Hash passwords", () => {
        it("Hash a password and expect it to not equal the original"),
            () => {
                const password = "password";
                const hash = hashPassword(password);
                expect(password).not.toEqual(hash);
            };

        it("Hash two identical passwords and expect them to hash to the different values", () => {
            const password1 = "password";
            const password2 = "password";

            const hash1 = hashPassword(password1);
            const hash2 = hashPassword(password2);

            expect(hash1).not.toEqual(hash2);
        });
    });

    describe("Dehash passwords", () => {
        it("Compare correct string with password hash and expect validation to return true", () => {
            const password1 = "@password123";
            const password2 = "@password123";
            const hash = hashPassword(password2);

            expect(validatePassword(password1, hash)).toBe(true);
        });

        it("Compare incorrect string with password hash and expect and expect validation to return false", () => {
            const password1 = "@password123";
            const password2 = "123wordpass@";
            const hash = hashPassword(password2);

            expect(validatePassword(password1, hash)).toBe(false);
        });
    });
});

describe("JWT token manipulation", () => {
    // set up a user
    let user: IUser;
    beforeAll(() => {
        user = new User({
            firstName: "Sarah",
            lastName: "Smith",
            password: hashPassword("password"),
            profilePic: "fhajskfhaksdExampleUrl",
            colourScheme: "PLACEHOLDER",
            tags: [],
        });
    });

    describe("JWT token generation", () => {
        it("Generate a JWT given input user and expect an encrypted string", () => {
            const jwt = generateJwt(user);

            expect(typeof jwt).toBe("string");
        });
    });

    describe("JWT token retrieval", () => {
        it("Successfully retrieve a jwt from request header when there is one present", () => {
            const req = request;
            req.cookies = {
                jwt: generateJwt(user),
                other: "othercookiedetails",
            };

            expect(typeof extractJwt(req)).toBe("string");
        });

        it("Successfully return undefined when there is no jwt present", () => {
            const req = request;
            req.cookies = {
                other: "othercookiedetails",
            };

            expect(typeof extractJwt(req)).toBe("undefined");
        });
    });
});

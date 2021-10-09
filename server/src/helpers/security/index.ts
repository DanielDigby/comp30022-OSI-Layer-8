import express from "express";
import jsonwebtoken from "jsonwebtoken";
import { IUser } from "../../modules/user/userModel";
import { IRequestWithCookie } from "../../interfaces/expressInterfaces";
import { ObjectId } from "mongoose";
import { AppError } from "../../helpers/errors";
const bcrypt = require("bcryptjs");

export function validatePassword(password1: string, password2: string) {
    return bcrypt.compareSync(password1, password2);
}

export function hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

// Generate jwt object and encrypt to string
// TODO (Daniel) replace secret with an environment variable
export function generateJwt(user: IUser) {
    return jsonwebtoken.sign(
        {
            _id: user._id,
        },
        "secret"
    );
}

// Pull the encrypted Jwt string from request cookie
export function extractJwt(req: IRequestWithCookie) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies["jwt"];
    }
    return token;
}

// Throw an AppError if the user making the request is not the same as the request resource's
export function validateUser(id1: ObjectId, id2: ObjectId, msg: string) {
    if (id1.toString() !== id2.toString()) {
        throw new AppError("Forbidden", 403, msg, true);
    }
}

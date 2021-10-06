import express from "express";
import { redisClient } from "../../config/redis";
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

const BLACKLISTKEY = "tokenBlacklist";

export const checkJwtBlacklist = async (req: express.Request) => {
    const tokenId = extractJwt(req);
    // check for blacklisted token
    await redisClient.lrange(BLACKLISTKEY, 0, -1, (err, reply) => {
        if (err) throw new AppError("Unknown", 500, err.message, false);
        if (reply.includes(tokenId)) {
            throw new AppError(
                "Invalid token",
                401,
                "log in again to aquire a new token",
                true
            );
        }
    });
};

export const addJwtBlacklist = async (req: express.Request) => {
    const token = await extractJwt(req);
    // add token to blacklist
    await redisClient.rpush(BLACKLISTKEY, token);
};

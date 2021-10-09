import express from "express";
import { IUser } from "../../modules/user/userModel";
import { AppError } from "../errors";
import { redisClient } from "../../config/redis";
import { extractJwt } from ".";
import { RateLimiterRedis } from "rate-limiter-flexible";

const maxWrongAttemptsByIPperDay = 100;
const maxConsecutiveFailsByUsernameAndIP = 10;

const limiterSlowBruteByIP = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "login_fail_ip_per_day",
    points: maxWrongAttemptsByIPperDay,
    duration: 60 * 60 * 24,
    blockDuration: 60 * 60 * 24, // Block for 1 day, if 100 wrong attempts per day
});

const limiterConsecutiveFailsByUsernameAndIP = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "login_fail_consecutive_username_and_ip",
    points: maxConsecutiveFailsByUsernameAndIP,
    duration: 60 * 60 * 24 * 90, // Store number for 90 days since first fail
    blockDuration: 60 * 60, // Block for 1 hour
});

const getUsernameIPkey = (username: string, ip: string) => `${username}_${ip}`;

const watchBruteforce = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const ip = req.ip;

    const usernameIPkey = getUsernameIPkey(req.body.email, ip);

    const [resUsernameAndIP, resSlowByIP] = await Promise.all([
        limiterConsecutiveFailsByUsernameAndIP.get(usernameIPkey),
        limiterSlowBruteByIP.get(ip),
    ]);

    let retrySecs = 0;

    // Check if IP or Username + IP is already blocked
    if (
        resSlowByIP !== null &&
        resSlowByIP.consumedPoints > maxWrongAttemptsByIPperDay
    ) {
        retrySecs = Math.round(resSlowByIP.msBeforeNext / 1000) || 1;
    } else if (
        resUsernameAndIP !== null &&
        resUsernameAndIP.consumedPoints > maxConsecutiveFailsByUsernameAndIP
    ) {
        retrySecs = Math.round(resUsernameAndIP.msBeforeNext / 1000) || 1;
    }

    if (retrySecs > 0) {
        throw new AppError(
            "Too Many Requests",
            429,
            "Retry-After" + String(retrySecs),
            true
        );
    } else {
        next();
    }
};

const resetBruteForce = async (ip: string, email: string) => {
    const usernameIPkey = getUsernameIPkey(email, ip);

    const resUsernameAndIP = await limiterConsecutiveFailsByUsernameAndIP.get(
        usernameIPkey
    );

    if (resUsernameAndIP !== null && resUsernameAndIP.consumedPoints > 0) {
        // Reset login limit successful authorisation
        await limiterConsecutiveFailsByUsernameAndIP.delete(usernameIPkey);
    }
};

const countBruteForce = async (user: IUser, email: string, ip: string) => {
    const usernameIPkey = getUsernameIPkey(email, ip);

    try {
        const promises = [limiterSlowBruteByIP.consume(ip)];
        if (user) {
            // Count failed attempts by Username + IP only for registered users
            promises.push(
                limiterConsecutiveFailsByUsernameAndIP.consume(usernameIPkey)
            );
        }

        await Promise.all(promises);

        throw new AppError(
            "Unauthorized",
            401,
            "incorrect email or password",
            true
        );
    } catch (err) {
        if (err instanceof AppError && err.name !== "Unauthorized") {
            return new AppError(
                "Too many requests",
                429,
                "Retry-After" +
                    String(Math.round((err as any).msBeforeNext / 1000) || 1),
                true
            );
        }
        if (err instanceof AppError) return err;
        else return new AppError("Unknown", 500, err.message, false);
    }
};

const BLACKLISTKEY = "tokenBlacklist";

const checkJwtBlacklist = async (req: express.Request) => {
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

const addJwtBlacklist = async (req: express.Request) => {
    const token = await extractJwt(req);
    // add token to blacklist
    await redisClient.rpush(BLACKLISTKEY, token);
};

module.exports = {
    checkJwtBlacklist,
    addJwtBlacklist,
    watchBruteforce,
    countBruteForce,
    resetBruteForce,
};

import redis from "redis";

let internalClient;
if (process.env.NODE_ENV === "test")
    internalClient = redis.createClient({
        enable_offline_queue: false,
    });
else {
    internalClient = redis.createClient(process.env.REDIS_URL, {
        enable_offline_queue: false,
    });
}

export const redisClient = internalClient;

import redis from "redis";

export const redisClient = redis.createClient({
    enable_offline_queue: false,
});

/*
This rate limiter middleware is linked with proxy.js and uses ipBlacklist.js.
By default, it blocks IPs for 30 minutes if they exceed 50 requests per second.
Feel free to remove or adjust this limiter if you prefer no rate limiting or different rules.
*/

import rateLimit from "express-rate-limit";
import { blockIP, isBlocked } from "./ipBlacklist.js";

const apodRateLimiter = rateLimit({
  windowMs: 1000, // 1 second window
  max: 50, // max 50 requests per second
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    // Block IP for 30 mins if rate limit exceeded
    blockIP(req.ip);
    res
      .status(429)
      .send("Too many requests. You have been blocked for 30 minutes.");
  },
  skip: (req) => {
    return isBlocked(req.ip);
  },
});

export default apodRateLimiter;

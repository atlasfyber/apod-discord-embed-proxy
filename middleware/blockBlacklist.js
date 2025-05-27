/*
This blacklist middleware is linked with proxy.js and rateLimiter.js.
It blocks requests from IPs that are temporarily blacklisted due to rate limiting.
Feel free to remove or adjust if you prefer no blocking or different rules.
*/

import { isBlocked } from './ipBlacklist.js';

export default function blockBlacklist(req, res, next) {
  if (isBlocked(req.ip)) {
    return res.status(429).send('Your IP is temporarily blocked due to repeated rate limiting.');
  }
  next();
}

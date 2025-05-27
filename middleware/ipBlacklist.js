/*
This in-memory IP blacklist is linked with rateLimiter.js and proxy.js.
By default, it blocks IPs for 30 minutes if they exceed the rate limit.
Feel free to remove or adjust this blacklist if you prefer no blocking or different rules.
*/

const blacklist = new Map();
const BLOCK_TIME = 30 * 60 * 1000;

export function isBlocked(ip) {
  const expiresAt = blacklist.get(ip);
  if (!expiresAt) return false;

  if (Date.now() > expiresAt) {
    blacklist.delete(ip);
    return false;
  }
  return true;
}

export function blockIP(ip) {
  blacklist.set(ip, Date.now() + BLOCK_TIME);
}

import express from "express";
import proxyRoute from "./routes/proxy.js";
import blockBlacklist from "./middleware/blockBlacklist.js";
import apodRateLimiter from "./middleware/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 3000;

// For environments where the proxy is behind a reserve proxy like Nginx or Cloudflare, or free services like Replit or Heroku.
app.set("trust proxy", 1);

// IP Blacklist and Rate Limiter Middleware
app.use(blockBlacklist);
app.use(apodRateLimiter);

app.use("/apod-proxy", proxyRoute);



app.listen(PORT, () => {
  console.log("\n╔" + "═".repeat(53) + "╗");
  console.log("║" + " ".repeat(53) + "║");
  console.log(
    "║    🚀  APOD Discord Embed Proxy [github/atlasfyber]".padEnd(54) + "║",
  );
  console.log(`║    🌐  Running at: http://localhost:${PORT}`.padEnd(54) + "║");
  console.log(
    "║    ✅  Ready to serve APOD embeds to Discord!".padEnd(53) + "║",
  );
  console.log("║" + " ".repeat(53) + "║");
  console.log("╚" + "═".repeat(53) + "╝\n");
});

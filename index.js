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

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>APOD Discord Embed Proxy</title></head>
      <body style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 2rem;">
        <h1>Welcome to APOD Discord Embed Proxy 🚀</h1>
        <p>Discord often fails to embed NASA's APOD images correctly due to missing headers or caching restrictions.</p>
        <p>This proxy fetches APOD images and serves them with proper headers so Discord (and other clients) embed them perfectly.</p>
        <p>To use the proxy, append the APOD image URL as a <code>?url=</code> query param to <a href="/apod-proxy">/apod-proxy</a>.</p>
        <p>Example:</p>
        <pre>/apod-proxy?url=https://apod.nasa.gov/apod/image/2505/Pluto-Mountains-Plains9-17-15.jpg</pre>
        <p><a href="/apod-proxy">Go to APOD Proxy</a></p>
        <hr />
        <small style="color: gray; font-size: 0.8rem;">
          Disclaimer: All rights to the images and content belong to NASA. This project simply provides a workaround for Discord embedding issues faced by astronomy developers using NASA APOD data. No ownership or copyright claims are made.
        </small>
      </body>
    </html>
  `);
});

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

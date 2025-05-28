import express from "express";
import apodRateLimiter from "../middleware/rateLimiter.js";
import { Readable } from "stream";

const router = express.Router();

router.get("/", apodRateLimiter, async (req, res) => {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    return res.send(`
      <html>
        <head><title>APOD Discord Embed Proxy</title></head>
        <body style="text-align:center; font-family: sans-serif;">
          <h1>APOD Discord Embed Proxy</h1>
          <p>To use this proxy, provide a valid APOD image URL as a <code>?url=</code> query parameter.</p>
          <p>Example:</p>
          <pre>/?url=https://apod.nasa.gov/apod/image/2505/Pluto-Mountains-Plains9-17-15.jpg</pre>
          <hr/>
          <p>Sample image embedded:</p>
          <img src="https://apod.nasa.gov/apod/image/2505/Pluto-Mountains-Plains9-17-15.jpg" alt="APOD Sample" style="max-width:80%; height:auto;" />
        </body>
      </html>
    `);
  }

  try {
    const response = await fetch(imageUrl, {
      headers: {
        Accept: "image/jpeg,image/png;q=0.9,*/*;q=0.8",
      },
    });

    if (!response.ok || !response.body) {
      return res.status(500).send("Failed to fetch image from APOD.");
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";

    res.set({
      "Content-Type": contentType,
      "Content-Disposition": "inline",
      "Cache-Control": "public, max-age=86400",
      "Access-Control-Allow-Origin": "*",
    });

    Readable.from(response.body).pipe(res);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Error fetching or proxying the image.");
  }
});

export default router;

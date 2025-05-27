import express from "express";
import apodRateLimiter from "../middleware/rateLimiter.js";
import { Readable } from "stream";

const router = express.Router();

router.get("/", apodRateLimiter, async (req, res) => {
  const imageUrl = req.query.url;

  if (!imageUrl || !imageUrl.startsWith("https://apod.nasa.gov/apod/image/")) {
    return res.status(400).send("Invalid or missing APOD image URL.");
  }

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      return res.status(500).send("Failed to fetch image from APOD.");
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";

    res.set({
      "Content-Type": contentType,
      "Content-Disposition": "inline",
      "Cache-Control": "public, max-age=86400",
      "Access-Control-Allow-Origin": "*",
    });

    const nodeStream = Readable.from(response.body);
    nodeStream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching or proxying the image.");
  }
});

export default router;

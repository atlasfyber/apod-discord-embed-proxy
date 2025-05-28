```js 
                         
   __    ____  _____  ____     ____  ____  _____  _  _  _  _ 
  /__\  (  _ \(  _  )(  _ \   (  _ \(  _ \(  _  )( \/ )( \/ )
 /(__)\  )___/ )(_)(  )(_) )   )___/ )   / )(_)(  )  (  \  / 
(__)(__)(__)  (_____)(____/   (__)  (_)\_)(_____)(_/\_) (__) 
                            
``` 

# 🚀 NASA APOD Discord Embed Proxy
![issues](https://img.shields.io/github/issues/atlasfyber/apod-discord-embed-proxy)


Discord has recently stopped reliably embedding direct image links from **[NASA’s Astronomy Picture of the Day (APOD)](https://apod.nasa.gov/apod/astropix.html)** site. This is likely due to the way NASA serves these images, or Discord issues.

This simple code fixes that by fetching APOD images and serving them through your own URL, making Discord happy to embed the images every time.

**✏️ How it works:** instead of posting the original NASA APOD URL directly, you send the URL to this proxy server, which fetches the image and returns it with the proper headers and caching. This way, Discord treats it like a regular image and displays it inline without any issues.


## Getting Started

### 📋 Prerequisites

Before you blast off, make sure you have:

- Node.js (version 14 or higher recommended)  
- npm or yarn ready to go  
- Some NASA APOD image URLs to play with (for example: https://apod.nasa.gov/apod/image/YYMM/imagefile.jpg)

---

### ⚙️ Installation

Ready to launch? Here's how to get your proxy up and running:

1. Clone this repository to your local machine:  
   ```
   git clone https://github.com/atlasfyber/apod-discord-embed-proxy.git  
   cd apod-discord-embed-proxy
   ```

2. Install the dependencies:  
   ```
   npm install
   ```

3. Fire up the server:  
   ```
   npm start
   ```

---

## 🖥️ Usage

Simply send a GET request to the proxy with the APOD image URL as a query parameter. For example:

```js
GET /apod-proxy?url=https://apod.nasa.gov/apod/image/YYMM/imagefile.jpg
```

Want to test it with curl? Just run:

```js
curl "http://localhost:3000/apod-proxy?url=https://apod.nasa.gov/apod/image/2505/Pluto-Mountains-Plains9-17-15.jpg"
```

Your proxy will fetch the image and serve it with all the right headers so Discord happily embeds it.

### 🏗️ Project Structure

Here's a quick look under the hood:

- ```index.js``` — the server’s command center  
- ```routes/proxy.js``` — handles all the proxy magic  
- ```middleware/rateLimiter.js``` — keeps an eye on the traffic
- ```middleware/ipBlacklist.js``` — checks if incoming IP is blocked  
- ```middleware/blockBlacklist.js``` — middleware that blocks requests from blacklisted IPs
- ```package.json``` — project details and dependencies  
- ```README.md``` — this handy guide

---

## ⚠️ NASA Compliance Statement

This project uses NASA’s Astronomy Picture of the Day (APOD) images, which are publicly available for educational and non-commercial use under NASA’s [API Terms of Use](https://api.nasa.gov/).

We do **not** claim ownership or alter any NASA content. All images remain the property of NASA and are served as-is through this proxy to improve Discord embedding functionality.

Proper credit is given to NASA as the source of all images. This project strictly complies with NASA’s usage policies by:

- Serving images without modification  
- Providing attribution to NASA  
- Using content only for non-commercial and educational purposes  

For full details, please review NASA’s official terms at [https://api.nasa.gov/](https://api.nasa.gov/).


---
[![invite horizon](https://github.com/atlasfyber/atlas-images/blob/main/invitehrz_banner.jpg?raw=true)](https://support.teamatlas.dev)

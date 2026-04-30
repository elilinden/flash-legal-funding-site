#!/usr/bin/env node
// Ping IndexNow (Bing, Yandex, Seznam, Naver) with every URL in sitemap.xml.
// Run after deploy:  node lib/indexnow-ping.js
//
// IndexNow spec: https://www.indexnow.org/documentation
// The key file at /<KEY>.txt must contain exactly the key string.

const fs = require("fs");
const path = require("path");
const https = require("https");

const HOST = "flashlegalfunding.com";
const KEY = "8795ec2f7700d6408b91ea8b5f772711";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = path.join(__dirname, "..", "_site", "sitemap.xml");

function extractUrls(xml) {
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => m[1].trim());
}

function postJson(endpoint, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const url = new URL(endpoint);
    const req = https.request(
      {
        method: "POST",
        hostname: url.hostname,
        path: url.pathname,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Content-Length": Buffer.byteLength(data),
        },
      },
      (res) => {
        let chunks = "";
        res.on("data", (c) => (chunks += c));
        res.on("end", () => resolve({ status: res.statusCode, body: chunks }));
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.error(`No sitemap at ${SITEMAP_PATH}. Run \`npx @11ty/eleventy\` first.`);
    process.exit(1);
  }
  const urls = extractUrls(fs.readFileSync(SITEMAP_PATH, "utf8"));
  if (urls.length === 0) {
    console.error("Sitemap parsed but contained no <loc> entries.");
    process.exit(1);
  }

  const payload = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls };

  const endpoints = [
    "https://api.indexnow.org/IndexNow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
  ];

  for (const ep of endpoints) {
    try {
      const { status, body } = await postJson(ep, payload);
      console.log(`${ep} -> ${status}${body ? " " + body.slice(0, 120) : ""}`);
    } catch (e) {
      console.log(`${ep} -> ERROR ${e.message}`);
    }
  }
  console.log(`Submitted ${urls.length} URLs.`);
}

main();

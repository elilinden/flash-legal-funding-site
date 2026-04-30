const fs = require("fs");
const path = require("path");
const { htmlToMarkdown, getTitle, getMetaDescription } = require("./lib/html-to-md.js");

const SITE_URL = "https://flashlegalfunding.com";

module.exports = function (eleventyConfig) {
  // Copy assets folder
  eleventyConfig.addPassthroughCopy("assets");

  // Copy root static files
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("ai.txt");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("site.webmanifest");
  eleventyConfig.addPassthroughCopy(".well-known");

  // Emit a Markdown mirror alongside every rendered HTML page so AI crawlers
  // (and the llms.txt convention) can fetch a clean text version.
  eleventyConfig.addTransform("md-mirror", function (content) {
    const outputPath = this.outputPath || (this.page && this.page.outputPath);
    const url = this.url || (this.page && this.page.url);
    if (!outputPath || !outputPath.endsWith(".html")) return content;
    if (url === "/404/" || url === "/sitemap/") return content;

    try {
      const title = getTitle(content) || "";
      const description = getMetaDescription(content) || "";
      const body = htmlToMarkdown(content, { selector: "main" });

      const header = [];
      if (title) header.push(`# ${title}`);
      if (description) header.push(`> ${description}`);
      if (url) header.push(`Source: ${SITE_URL}${url}`);
      const md = (header.join("\n\n") + "\n\n" + body).replace(/\n{3,}/g, "\n\n");

      const mdPath = outputPath.replace(/\.html$/, ".md");
      fs.mkdirSync(path.dirname(mdPath), { recursive: true });
      fs.writeFileSync(mdPath, md);
    } catch (e) {
      console.warn(`[md-mirror] failed for ${outputPath}: ${e.message}`);
    }

    return content;
  });

  // After build, concatenate every emitted .md mirror into a single
  // llms-full.txt so an AI client can grab all of the content in one fetch.
  eleventyConfig.on("eleventy.after", ({ dir }) => {
    const outDir = (dir && dir.output) || "_site";
    const order = [
      "index.md",
      "apply/index.md",
      "contact/index.md",
      "faq/index.md",
      "for-attorneys/index.md",
      "car-accident-funding/index.md",
      "truck-accident-funding/index.md",
      "motorcycle-accident-funding/index.md",
      "slip-and-fall-funding/index.md",
      "workplace-injury-funding/index.md",
      "medical-malpractice-funding/index.md",
      "dog-bite-funding/index.md",
      "pedestrian-accident-funding/index.md",
      "rideshare-accident-funding/index.md",
      "wrongful-death-funding/index.md",
      "product-liability-funding/index.md",
      "blog/index.md",
    ];

    const seen = new Set();
    const parts = [];

    const push = (rel) => {
      if (seen.has(rel)) return;
      const full = path.join(outDir, rel);
      if (!fs.existsSync(full)) return;
      seen.add(rel);
      parts.push(fs.readFileSync(full, "utf8").trim());
    };

    for (const rel of order) push(rel);

    const postsDir = path.join(outDir, "posts");
    if (fs.existsSync(postsDir)) {
      for (const slug of fs.readdirSync(postsDir).sort()) {
        push(path.join("posts", slug, "index.md"));
      }
    }

    const remaining = [];
    const walk = (d) => {
      for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
        const p = path.join(d, entry.name);
        if (entry.isDirectory()) walk(p);
        else if (entry.isFile() && entry.name.endsWith(".md")) {
          remaining.push(path.relative(outDir, p));
        }
      }
    };
    walk(outDir);
    for (const rel of remaining.sort()) push(rel);

    const out = parts.join("\n\n---\n\n") + "\n";
    fs.writeFileSync(path.join(outDir, "llms-full.txt"), out);
  });

  return {
    dir: {
      input: ".",
      output: "_site",
    },
  };
};

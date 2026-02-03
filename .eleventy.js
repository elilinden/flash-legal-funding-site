module.exports = function (eleventyConfig) {
  // ✅ Copy your /assets folder as-is (so /assets/VideoFLF.mp4 ends up in /_site/assets/VideoFLF.mp4)
  eleventyConfig.addPassthroughCopy({ "assets": "assets" });

  // ✅ (Optional but recommended) Also pass through your root static files if you have them
  // This prevents "missing file" issues for common static root files.
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy("favicon.ico");

  return {
    dir: {
      input: ".",
      output: "_site",
    },
  };
};

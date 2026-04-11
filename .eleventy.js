module.exports = function (eleventyConfig) {
  // ✅ Copy assets folder
  eleventyConfig.addPassthroughCopy("assets");

  // ✅ Copy root static files
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("site.webmanifest");
  eleventyConfig.addPassthroughCopy(".well-known");

  return {
    dir: {
      input: ".",
      output: "_site", // Eleventy builds the site here
    },
  };
};

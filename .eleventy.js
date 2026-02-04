module.exports = function (eleventyConfig) {
  // ✅ Copy assets folder
  eleventyConfig.addPassthroughCopy("assets");

  // ✅ Copy root static files
  // Only include these lines if the files actually exist in your project root
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy("favicon.ico");

  return {
    dir: {
      input: ".",
      output: "_site", // Eleventy builds the site here
    },
  };
};

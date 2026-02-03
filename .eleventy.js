module.exports = function(eleventyConfig) {
  // Copy assets to the output folder (_site)
  eleventyConfig.addPassthroughCopy("assets");
  
  return {
    dir: {
      input: ".",
      output: "_site"
    }
  };
};
const { EleventyI18nPlugin } = require("@11ty/eleventy");
const isProduction = process.env.NODE_ENV === "prod";

console.log(process.env.NODE_ENV);

module.exports = function(eleventyConfig) {
	if (!isProduction) {
		const brokenLinksPlugin = require("eleventy-plugin-broken-links");
		eleventyConfig.addPlugin(brokenLinksPlugin,{
			broken: "error"
		});
	};
	eleventyConfig.addPassthroughCopy("src/css");
	eleventyConfig.addPassthroughCopy("src/js");
	eleventyConfig.addPassthroughCopy("src/img");
	eleventyConfig.addPassthroughCopy("src/files");
	eleventyConfig.addPassthroughCopy("assets");
	eleventyConfig.addPassthroughCopy("CNAME");
	eleventyConfig.addPassthroughCopy("favicon.ico");

	eleventyConfig.addPlugin(EleventyI18nPlugin, {
		defaultLanguage: "en",
		filters: {
			url: "locale_url",
			links: "locale_links"
		},
		errorMode: "strict"
	});

	return {
		pathPrefix: isProduction ? "" : "/mybus-v3/",
		dir: {
			input: "src",
			output: "docs",
			data: "data"
		}
	};
};
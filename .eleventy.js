const { EleventyI18nPlugin } = require("@11ty/eleventy");
const isProduction = process.env.NODE_ENV === "prod";
const baseUrl = isProduction ? `https://mybus.metro.net/` : `http://localhost:8080/mybus-v3/`;

console.log(process.env.NODE_ENV);

const toAbsoluteUrl = (url) => {
	try {
		let newUrl = new URL(url, baseUrl);
		return newUrl.href;
	} catch (e) {
		console.error(e);
		return url;
	}
}

module.exports = function(eleventyConfig) {
	if (!isProduction) {
		const brokenLinksPlugin = require("eleventy-plugin-broken-links");
		eleventyConfig.addPlugin(brokenLinksPlugin,{
			broken: "error"
		});
	};

	eleventyConfig.addFilter('toAbsoluteUrl', toAbsoluteUrl);

	eleventyConfig.addPassthroughCopy("src/css");
	eleventyConfig.addPassthroughCopy("src/js");
	eleventyConfig.addPassthroughCopy("src/img");
	eleventyConfig.addPassthroughCopy("src/files");
	eleventyConfig.addPassthroughCopy("assets");
	eleventyConfig.addPassthroughCopy("CNAME");
	eleventyConfig.addPassthroughCopy("src/favicon.ico");

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
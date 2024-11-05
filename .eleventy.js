const { EleventyI18nPlugin } = require("@11ty/eleventy");
let baseUrl = '';
let pathPrefix = '';

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

switch (process.env.NODE_ENV) {
	case "localhost":
		baseUrl = `http://localhost:8080/`;
		console.log("Using local environment settings");
		break;
	case "prod":
		baseUrl = `https://mybus.metro.net/`;
		pathPrefix = '';
		console.log("Using production environment settings");
		break;
	case "dev":
		baseUrl = `https://lacmta.github.io/`;
		pathPrefix = 'mybus-v3-dev';
		console.log("Using development environment settings");
		break;
	default:
		console.log("Using unknown settings");
}

const toAbsoluteUrl = (path) => {
	try {
		let newUrl = new URL(pathPrefix + path, baseUrl);
		console.log(`pathPrefix: ${pathPrefix}`);
		console.log(`baseUrl: ${baseUrl}`);
		console.log(`path: ${path}`);
		console.log(`newUrl: ${newUrl.href}`);
		return newUrl.href;
	} catch (e) {
		console.error(e);
		return path;
	}
}

module.exports = function(eleventyConfig) {
	if (process.env.NODE_ENV === "local") {
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
		pathPrefix: pathPrefix,
		dir: {
			input: "src",
			output: "docs",
			data: "data"
		}
	};
};
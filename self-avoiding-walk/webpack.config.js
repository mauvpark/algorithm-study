const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: ["./sketch.js", "./spot.js"],
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "self-avoiding-walk.bundle.js",
	},
	plugins: [new HtmlWebpackPlugin({ template: "./index.html" })],
	mode: "production",
};

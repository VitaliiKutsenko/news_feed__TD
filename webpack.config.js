const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {

	context: path.resolve(__dirname, "src"),
	entry: {
		main: "./app.js",
	},
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "dist"),
	},
	mode: "development",
	devServer: {
		static: "./dist",
		hot: true,
		port: 5000,
		open: true,
	},
	optimization: {
		splitChunks: {
			chunks: "all",
		},
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			title: "Caching",
			template: path.resolve(__dirname, "./index.html"),
		}),
		new CleanWebpackPlugin(),
		new copyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, "./src/icon/favicon.ico"),
					to: path.resolve(__dirname, "dist"),
				},
			],
		}),
		// new UnusedFilesWebpackPlugin(),
		new MiniCssExtractPlugin({
			// filename: "bundle.[hash].css",
			filename: "style.css",
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					// "css-hot-loader",
					MiniCssExtractPlugin.loader,
					"css-loader",
				],
			},
			{
				test: /\.(png|svg|ico|jpeg)$/i,
				use: [
					"file-loader",
					{
						loader: "image-webpack-loader",
						options: {
							webp: {
								quality: 75,
							},
						},
					},
				],
			},
		],
	},
};

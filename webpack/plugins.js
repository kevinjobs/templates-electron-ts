const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ESLintPlugin = require("eslint-webpack-plugin");

function htmlPlugin() {
  return new HtmlWebpackPlugin({
    template: `${path.join(__dirname, "../public")}/index.html`
  });
}

function reactRefreshPlugin() {
  return new ReactRefreshWebpackPlugin();
}

function cssExtractPlugin() {
  return new MiniCssExtractPlugin({
    filename: "css/style.[contenthash:8].css"
  })
}

function bundleAnalyzerPlugin() {
  return new BundleAnalyzerPlugin({
    analyzerMode: "static",
    reportFilename: path.join(__dirname, "../dist", "_bundle_report.html"),
    openAnalyzer: false,
  });
}

function eslintPlugin() {
  return new ESLintPlugin({
    context: path.join(__dirname, "../src"),
    extensions: ["tsx", "ts"],
  });
}

module.exports = {
  htmlPlugin,
  reactRefreshPlugin,
  cssExtractPlugin,
  bundleAnalyzerPlugin,
  eslintPlugin,
}
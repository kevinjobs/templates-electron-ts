const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const { jsLoader } = require('./loaders');
const { bundleAnalyzerPlugin } = require("./plugins");

const srcPath = path.join(__dirname, '../src');

module.exports = merge(baseConfig, {
  mode: 'production',
  module: {
    rules: [
      jsLoader(srcPath),
    ]
  },
  plugins: [
    bundleAnalyzerPlugin(),
  ]
})
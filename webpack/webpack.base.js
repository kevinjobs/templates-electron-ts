const path = require('path');
const { lessLoader } = require('./loaders');
const { htmlPlugin, cssExtractPlugin, eslintPlugin } = require('./plugins');

const srcPath = path.join(__dirname, '../src');

module.exports = {
  entry: {
    app: path.join(__dirname, '../src/index.tsx')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].bundle.js',
    chunkFilename: 'chunk/[name].[chunkhash:8].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      "@api": path.resolve(__dirname, "../src/api"),
      "@pages": path.resolve(__dirname, '../src/pages'),
      "@components": path.resolve(__dirname, '../src/components'),
      "@routes": path.resolve(__dirname, '../src/routes'),
      "@store": path.resolve(__dirname, '../src/store'),
    },
  },
  module: {
    rules: [
      lessLoader(srcPath),
    ],
  },
  plugins: [
    htmlPlugin(),
    cssExtractPlugin(),
    eslintPlugin(),
  ],
}
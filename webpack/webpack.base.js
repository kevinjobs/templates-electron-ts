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
      "@img": path.resolve(__dirname, '../src/assets/images'),
      "@svg": path.resolve(__dirname, '../src/assets/svg'),
      "@pages": path.resolve(__dirname, '../src/pages'),
      "@store": path.resolve(__dirname, '../src/store'),
      "@components": path.resolve(__dirname, '../src/components'),
      "@routes": path.resolve(__dirname, '../src/routes'),
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
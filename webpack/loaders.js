const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function jsLoaderDev(...includePath) {
  return {
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    include: [...includePath],
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader?cacheDirectory',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
        plugins: [
          '@babel/plugin-transform-runtime',
          'react-refresh/babel'
        ]
      }
    }
  }
}

function jsLoader(...includePath) {
  return {
    test: /\.(js|mjs|jsx|ts|tsx)$/,
    include: [...includePath],
    use: {
      loader: 'babel-loader?cacheDirectory',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
        plugins: [
          '@babel/plugin-transform-runtime'
        ]
      }
    }
  }
}

function lessLoader(...p) {
  return {
    test: /\.less$/i,
    include: [...p],
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader",
      "less-loader",
    ]
  }
}

module.exports = {
  jsLoaderDev,
  jsLoader,
  lessLoader,
}
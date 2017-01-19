const webpack = require('webpack');

module.exports = {
  entry: {
    "utils": ['./libs/utils.js'],
    "index.browser": ['./src/index.browser.js']
  },
  output: {
    path: require('path').join(__dirname, '/dist'),
    filename: "[name].js",
    libraryTarget: "umd"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ["babel"]
      }
    ]
  },
  devtool: '#cheap-module-inline-source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};

const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  mode: "development",
  devServer: {
    contentBase: "./dist",
    watchContentBase: true,
    host: "0.0.0.0",
    port: 1234,
    allowedHosts: ["sandbox.floriankempenich.com"]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // Order of loaders: BOTTOM -> TOP
          MiniCssExtractPlugin.loader, // Replaces: 'style-loader'. Provides separate CSS file instead of using '<style>'
          { loader: "css-loader", options: { modules: true } },
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  }
};

module.exports = config;

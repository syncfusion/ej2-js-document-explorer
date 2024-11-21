var glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    index: glob.sync("./src/**/*.js")
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                //If utilize the syncfusion sass files, then use the following line
                includePaths: ["node_modules/@syncfusion"],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      favicon: "favicon.ico"
    }),
    new HtmlWebpackPlugin({
      filename: "layout.html",
      template: "./src/layout/layout.html",
    }),
    new HtmlWebpackPlugin({
      filename: "about.html",
      template: "./src/about/about.html",
    }),
    new HtmlWebpackPlugin({
      filename: "pdfviewer.html",
      template: "./src/pdfviewer/pdfviewer.html",
    }),
    new HtmlWebpackPlugin({
      filename: "toptoolbar.html",
      template: "./src/toptoolbar/toptoolbar.html",
    }),
    new HtmlWebpackPlugin({
      filename: "docEditor.html",
      template: "./src/docEditor/docEditor.html",
    }),
    new HtmlWebpackPlugin({
      filename: "imageEditor.html",
      template: "./src/imageEditor/imageEditor.html",
    }),
    new HtmlWebpackPlugin({
      filename: "excel.html",
      template: "./src/excel/excel.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from:"./styles/images", to: "./styles/images/"},
      ],
    }),
    new Dotenv({
      path: process.env.NODE_ENV === 'production' ? './.env.production' : './.env'
    })
  ],
  resolve: {
    extensions: [".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
        extractComments: false,
    })],
  },
};

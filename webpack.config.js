var webpack = require("webpack");
var path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

var libraryName = "library";
var outputFile = libraryName + ".js";

var env = process.env.WEBPACK_ENV;

var libraryName = "library";
var plugins = [],
  outputFile;
var mode = "development";
plugins.push(new webpack.LoaderOptionsPlugin({ options: {} }));
if (env === "build") {
  plugins.push(new UglifyJsPlugin());
  outputFile = libraryName + ".min.js";
  mode = "production";
} else {
  outputFile = libraryName + ".js";
}

var config = {
  entry: __dirname + "/src/index.js",
  devtool: "source-map",
  output: {
    path: __dirname + "/lib",
    filename: outputFile,
    library: libraryName,
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
        options: { emitWarning: true }
      }
    ]
  },
  resolve: {
    modules: [path.resolve("./src")],
    extensions: [".js"]
  },
  plugins: plugins,
  mode: mode
};
module.exports = config;

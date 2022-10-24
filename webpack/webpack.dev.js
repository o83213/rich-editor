const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
// import webpack from "webpack";
// import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
module.exports = {
  // export default {
  mode: "development",
  devServer: {
    hot: true,
    open: true,
  },
  devtool: "cheap-module-source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.name": JSON.stringify("Brian"),
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};

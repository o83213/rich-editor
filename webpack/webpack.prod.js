const webpack = require("webpack");
// import webpack from "webpack";
module.exports = {
  // export default {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.name": JSON.stringify("Production!"),
    }),
  ],
};

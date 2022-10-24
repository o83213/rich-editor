const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
// import { merge } from "webpack-merge";
// import commonConfig from "./webpack.common";
module.exports = (envVars) => {
  const { env } = envVars;
  const envConfig = require(`./webpack.${env}.js`);
  const config = merge(commonConfig, envConfig);
  return config;
};

const path = require("path");
const os = require("os");
const IS_BROWSER = os.platform() === "browser";

module.exports = (env) => {
  // eslint-disable-next-line no-console
  // console.log(env.mod);

  return {
    // mode: env.mod,
    entry: {
      scriptWiz: "./src/index.ts",
    },
    output: {
      filename: "index.js",
      library: "[name]",
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "commonjs2",
    },
    devtool: "source-map", // devtool: 'cheap-module-source-map',
    module: {
      rules: [
        { test: /\.ts$/, loader: "ts-loader" },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js", ".d.ts"],
    },
  };
};

const path = require("path");
const os = require("os");
const IS_BROWSER = os.platform() === "browser";

let crypto;
if (IS_BROWSER) {
  crypto = window.crypto;
} else {
  crypto = require("crypto");
}

module.exports = (env) => {
  // eslint-disable-next-line no-console
  // console.log(env.mod);

  return {
    // mode: env.mod,
    entry: {
      sclib: "./src/index.js",
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
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".d.ts"],
    },
    externals: {
      crypto: "crypto",
    },
  };
};

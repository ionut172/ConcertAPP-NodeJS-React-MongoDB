const path = require("path");

module.exports = {
  entry: "./src/index.js", // Replace with the correct entry file path
  output: {
    path: path.resolve(__dirname, "dist"), // Replace with the desired output directory path
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
};

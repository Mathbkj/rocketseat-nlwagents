/**
 * @type {import('webpack').Configuration}
 */
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  mode: "production",
  entry: "./src/server.ts",
  target: "node22",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "babel-loader",
          options: {
            targets: "defaults",
            presets: ["@babel/preset-typescript"],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
};

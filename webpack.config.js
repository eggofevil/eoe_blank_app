import path from "path";
import { getGlobals } from "common-es";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

const { __dirname } = getGlobals(import.meta.url);
const BUILD = "build";
const SRC = "src";
const HTML_TEMPLATE = "index.html";

// const devMode = process.argv.indexOf("development") > -1;

const confHtmlWebpackPlugin = {
  template: path.resolve(__dirname, SRC, HTML_TEMPLATE),
};
const confMiniCssExtractPlugin = {
  filename: "./styles/[name].css",
};

const config = {
  /*
    entry: {
      index: path.resolve(__dirname, "source", "index.js")
    }
  */
  devtool: false,
  output: {
    path: path.resolve(__dirname, BUILD),
    clean: true,
    filename: "[name].bundle.js",
  },
  devServer: {
    open: { app: { name: "firefox" } },
    port: 4000,
    static: {
      directory: path.join(__dirname, "preview"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin(confHtmlWebpackPlugin),
    new MiniCssExtractPlugin(confMiniCssExtractPlugin),
  ],
  optimization: {
    splitChunks: { chunks: "all" },
    minimizer: ["...", new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
};

export default config;

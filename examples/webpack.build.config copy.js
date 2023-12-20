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

const pluginConfig = {
  confHtmlWebpackPlugin: {
    template: path.resolve(__dirname, SRC, HTML_TEMPLATE),
    filename: "index.[contenthash].html",
  },
  confMiniCssExtractPlugin: {
    filename: "./styles/[name].css",
  },
};

const config = {
  mode: "production",
  devtool: false,
  entry: {
    index: path.resolve(__dirname, "src", "index.js"),
  },
  output: {
    path: path.resolve(__dirname, BUILD),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin(pluginConfig.confHtmlWebpackPlugin),
    new MiniCssExtractPlugin(pluginConfig.confMiniCssExtractPlugin),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        generator: {
          outputPath: "styles/",
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        generator: {
          outputPath: "styles/",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(svg|ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
        generator: {
          outputPath: "img/",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          outputPath: "fonts/",
        },
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ["csv-loader"],
      },
      {
        test: /\.xml$/i,
        use: ["xml-loader"],
      },
    ],
  },
};

export default config;

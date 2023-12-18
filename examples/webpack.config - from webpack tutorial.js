import path from "path";
import { getGlobals } from "common-es";
import HtmlWebpackPlugin from "html-webpack-plugin";

const { __dirname } = getGlobals(import.meta.url);

const config = {
  mode: "development",
  devtool: "inline-source-map",

  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    runtimeChunk: "single", //Выделяет webpack runtime код в отдельный бандл
    moduleIds: "deterministic", //Фиксирует moduleIds в зависимости от хэша? при сборке чтобы избежать обновления хэша бандлов вендеров
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

  devServer: {
    static: "./dist",
    open: { app: { name: "firefox" } },
    port: 4000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Caching",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpeg|gif|jpg|ico|png|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    fallback: {
      os: false,
      fs: false,
      path: false,
      child_process: false,
    },
  },
};

export default config;

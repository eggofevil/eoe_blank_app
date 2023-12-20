import path from 'path';
import { getGlobals } from 'common-es';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const ROOT = path.resolve(getGlobals(import.meta.url).__dirname, '..');
const PREVIEW = '__preview';
const SRC = '__src';

const pluginConfig = {
  confHtmlWebpackPlugin: {
    template: path.resolve(ROOT, SRC, 'index.html'),
  },
  confMiniCssExtractPlugin: {
    filename: './styles/[name].[contenthash].css',
  },
};

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    index: path.resolve(ROOT, SRC, 'index.js'),
  },
  output: {
    path: path.resolve(ROOT, PREVIEW),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  devServer: {
    static: './PREVIEW',
    open: { app: { name: 'firefox' } },
    port: 4000,
  },
  plugins: [
    new HtmlWebpackPlugin(pluginConfig.confHtmlWebpackPlugin),
    new MiniCssExtractPlugin(pluginConfig.confMiniCssExtractPlugin),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        generator: {
          outputPath: 'styles/',
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        generator: {
          outputPath: 'styles/',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(svg|ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          outputPath: 'img/',
          publicPath: 'img/',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          outputPath: 'fonts/',
        },
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
    ],
  },
};

export default config;

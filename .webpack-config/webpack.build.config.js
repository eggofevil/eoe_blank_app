import path from 'path';
import { getGlobals } from 'common-es';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const ROOT = path.resolve(getGlobals(import.meta.url).__dirname, '..');
const SRC = '__src';
const BUILD = '__build';

const pluginConfig = {
  confHtmlWebpackPlugin: {
    template: path.resolve(ROOT, SRC, 'index.html'),
    filename: 'index.html',
  },
  confMiniCssExtractPlugin: {
    filename: './styles/[name].[contenthash].css',
  },
};

const config = {
  mode: 'production',
  devtool: false,
  entry: {
    index: path.resolve(ROOT, SRC, 'index.js'),
  },
  output: {
    path: path.resolve(ROOT, BUILD),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
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

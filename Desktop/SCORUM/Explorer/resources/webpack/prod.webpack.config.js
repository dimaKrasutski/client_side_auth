const DIST_FOLDER = 'dist';
const cwd = process.cwd();
const path = require('path');
const webpack = require('webpack');
const Entries = require('./entries');
const Loaders = require('./loaders');
const Resolve = require('./resolve');
const Plugins = require('./plugins');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  name: 'client',
  target: 'web',
  output: {
    path: path.join(cwd, DIST_FOLDER),
    publicPath: '/',
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[id].[chunkhash].bundle.js',
  },
  resolve: Resolve,
  entry: Entries,
  module: Loaders,
  plugins: Plugins.concat([
    new ExtractTextPlugin({
      filename: '[name].[contenthash].bundle.css',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.PROJECT_ENV': JSON.stringify(process.env.PROJECT_ENV || 'production'),
      // testnet
      // 'process.env.CHAIN_ID': JSON.stringify(process.env.CHAIN_ID || '29dc941804014d6930aeccf2ab4b041de634b5d83c9c2d6ce66565f3f0c0975b'),
      // prod
      'process.env.CHAIN_ID': JSON.stringify(process.env.CHAIN_ID || 'db4007d45f04c1403a7e66a5c66b5b1cdfc2dde8b5335d1d2f116d592ca3dbb1'),
      'process.env.RPC_URL': JSON.stringify(process.env.RPC_URL || 'https://rpc3.scorum.com'),
    }),
    new WebpackMd5Hash(),
    new ManifestPlugin({ fileName: 'assets-manifest.json' }),
    new ChunkManifestPlugin({
      filename: 'assets-manifest.json',
      manifestVariable: 'webpackManifest',
      minChunks: Infinity,
    }),
    new HtmlWebpackPlugin({
      template: 'index_template.html',
      filename: path.join('index.html'),
    }),
    new CopyWebpackPlugin([
      { from: path.resolve('robots.txt') },
      { from: path.resolve('public'), to: 'public/' },
    ]),
  ]),
};

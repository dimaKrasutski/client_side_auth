const DIST_FOLDER = 'dist';
const cwd = process.cwd();
const path = require('path');
const Entries = require('./entries');
const Loaders = require('./loaders');
const Resolve = require('./resolve');
const Plugins = require('./plugins');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  output: {
    path: path.join(cwd, DIST_FOLDER),
    publicPath: `/${DIST_FOLDER}/`,
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js',
  },
  watch: true,
  resolve: Resolve,
  entry: Entries,
  module: Loaders,
  devtool: 'source-map',
  devServer: { historyApiFallback: true, disableHostCheck: true },
  plugins: Plugins.concat([
    new ExtractTextPlugin({
      filename: '[name].bundle.css',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'dev'),
      'process.env.PROJECT_ENV': JSON.stringify(process.env.PROJECT_ENV || 'dev'),
      //'process.env.CHAIN_ID': JSON.stringify(process.env.CHAIN_ID || '29dc941804014d6930aeccf2ab4b041de634b5d83c9c2d6ce66565f3f0c0975b'),
      'process.env.CHAIN_ID': JSON.stringify(process.env.CHAIN_ID || 'd3c1f19a4947c296446583f988c43fd1a83818fabaf3454a0020198cb361ebd2'),
      //'process.env.CHAIN_ID': JSON.stringify(process.env.CHAIN_ID || 'db4007d45f04c1403a7e66a5c66b5b1cdfc2dde8b5335d1d2f116d592ca3dbb1'),
      //'process.env.RPC_URL': JSON.stringify(process.env.RPC_URL || 'https://wallet-testnet-dev.scorum.com'),
      'process.env.RPC_URL': JSON.stringify(process.env.RPC_URL || 'https://testnet.scorum.com'),
      //'process.env.RPC_URL': JSON.stringify(process.env.RPC_URL || 'https://rpc.scorum.com'),
      //'process.env.RPC_URL': JSON.stringify(process.env.RPC_URL || 'https://rpc3.scorum.com'),
    }),
    new BundleAnalyzerPlugin(),
  ]),
};

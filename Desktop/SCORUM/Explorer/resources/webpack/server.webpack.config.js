const DIST_FOLDER = 'dist';
const cwd = process.cwd();
const path = require('path');
const Resolve = require('./resolve');
const webpack = require('webpack');

module.exports = {
  name: 'server',
  entry: path.join(cwd, 'server/server'),
  output: {
    path: path.join(cwd, DIST_FOLDER),
    filename: 'server.js',
  },
  resolve: Resolve,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        include: [path.join(cwd, 'server')],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.PROJECT_ENV': JSON.stringify(process.env.PROJECT_ENV || 'production'),
      'process.env.GTAG': JSON.stringify(process.env.GTAG || 'UA-116289360-9'),
    }),
  ],
  target: 'node',
};

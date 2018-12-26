const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = [
  new webpack.LoaderOptionsPlugin({
    options: {
      context: process.cwd(),
      postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
    },
  }),
];

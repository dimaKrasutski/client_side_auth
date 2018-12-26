const cwd = process.cwd();
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SRC_PATH = path.join(cwd, 'src');
const YAML_PATHS = [
  SRC_PATH,
  path.join(cwd, 'resources'),
];

module.exports = {
  rules: [
    {
      test: /\.jsx?$/,
      use: 'babel-loader',
      include: [
        SRC_PATH,
        path.join(cwd, 'node_modules/@scorum/theme-bootstrap'),
        path.join(cwd, 'node_modules/@scorum/bip39'),
        path.join(cwd, 'resources/config'),
      ],
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          }, 'postcss-loader'],
      }),
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              // Provide path to the file with resources
              resources: path.resolve(cwd, 'resources/theme/resources.scss'),
            },
          },
        ],
      }),
    },
    {
      test: /\.yaml$/,
      include: YAML_PATHS,
      loader: 'yml-loader',
    },
    {
      test: /\.(jpg|svg)$/,
      loader: 'file-loader?name=public/[name].[ext]',
    },
  ],
};

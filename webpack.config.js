'use strict';

const join = require('path').join;
const webpack = require('webpack');

const config = {
  entry: {
    'one-connect': join(__dirname, './one-connect/index.js'),
    'repo-connect': join(__dirname, './repo-connect/index.js'),
    'repo-connect-memorize': join(__dirname, './repo-connect-memorize/index.js'),
    'reducer-side-effect': join(__dirname, './reducer-side-effect/index.js'),
    'react-virtualized': join(__dirname, './react-virtualized/index.js'),
  },

  output: {
    filename: join(__dirname, './dist/[name].js'),
  },

  module: {
    loaders: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loader: 'babel?presets[]=es2015&presets[]=react',
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false
      }
    }),
  ]
};

module.exports = config;

'use strict';

const join = require('path').join;
const webpack = require('webpack');

const config = {
  entry: {
    'one-connect': join(__dirname, './one-connect/index.js'),
    'repo-connect': join(__dirname, './repo-connect/index.js'),
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

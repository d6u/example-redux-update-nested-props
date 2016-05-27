'use strict';

const join = require('path').join;
const webpack = require('webpack');

const config = {
  entry: {
    'one-connect': join(__dirname, './src/one-connect/index.js'),
    'repo-connect': join(__dirname, './src/repo-connect/index.js'),
    'repo-connect-memorize': join(__dirname, './src/repo-connect-memorize/index.js'),
    'reducer-side-effect': join(__dirname, './src/reducer-side-effect/index.js'),
    'react-virtualized': join(__dirname, './src/react-virtualized/index.js'),
    'snabbdom': join(__dirname, './src/snabbdom/index.js'),
    'snabbdom-thunk': join(__dirname, './src/snabbdom-thunk/index.js'),
  },

  output: {
    filename: join(__dirname, './dist/[name]/index.js'),
  },

  devtool: 'source-map',

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

  plugins: (() => {
    const defaults = [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
    ];

    if (process.env.NODE_ENV === 'production') {
      const prod = [
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            screw_ie8: true,
            warnings: false
          }
        })
      ];

      return defaults.concat(prod);
    } else {
      return defaults;
    }
  })()
};

module.exports = config;

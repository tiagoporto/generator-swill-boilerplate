/*
* Swill Boilerplate v<%= boilerplate.version %>
* https://github.com/tiagoporto/swill-boilerplate
* Copyright (c) 2014-2017 Tiago Porto (http://tiagoporto.com)
* Released under the MIT license
*/

import path from 'path'
import paths from './config.json'
import webpack from 'webpack'

const config = {
  entry: path.join(__dirname, paths.basePaths.src, paths.basePaths.scripts.src, 'index.js'),
  output: {
    path: path.resolve(__dirname, paths.basePaths.dest, paths.basePaths.scripts.dest),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })<% if (use.jquery) { %>,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })<% } %>
  ]
}

export default config

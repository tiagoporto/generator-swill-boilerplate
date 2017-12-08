/*
* Swill Boilerplate v<%= boilerplate.version %>
* https://github.com/tiagoporto/swill-boilerplate
* Copyright (c) 2014-2017 Tiago Porto (http://tiagoporto.com)
* Released under the MIT license
*/

const path = require('path')
const paths = require('./.swillrc.json').basePaths
const webpack = require('webpack')

module.exports = {
  entry: path.join(__dirname, paths.src, 'index.js'),
  output: {
    path: path.resolve(__dirname, paths.dist),
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
    })
  ]
}

var debug = process.env.NODE_ENV !== 'production'
var path = require('path')

var babelOptions = {
  'presets': ['@babel/preset-react', ['@babel/preset-env', {'modules': false}]],
  'plugins': [
    '@babel/plugin-proposal-object-rest-spread',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-function-bind'
  ]
}

module.exports = {
  devtool: debug ? 'inline-sourcemap' : null,
  entry: './examples/blog/js/main.js',
  module: {
    loaders: [{
      test: /\.js$/,
      // NOTE: you need modify exclude regexp when used in separate project
      // to allow babel to transpile!!!
      // E.g. /node_modules(?!\/react-mobx-admin)/
      exclude: /node_modules(?!\/mobx-router)/,
      loader: 'babel-loader',
      options: babelOptions
    }]
  },
  output: {
    path: path.join(__dirname, 'examples/blog'),
    filename: 'main.min.js'
  },
  // NOTE: needed coz' import like from a separate project are used in example
  // e.g.: import DataRequester from 'react-mobx-admin/services/requester'
  resolve: {
    alias: {
      'react-mobx-admin': __dirname,
      'mobx-router': path.join(__dirname, 'node_modules', 'mobx-router')
    }
  },
  externals: {
    'axios': 'axios',
    'mobx': 'mobx',
    'mobx-react': 'mobxReact',
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
}

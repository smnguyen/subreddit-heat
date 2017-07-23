var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    alias: {
      handlers: path.resolve(__dirname, 'src/handlers'),
      helpers: path.resolve(__dirname, 'src/helpers')
    }
  },
  externals: [ nodeExternals() ]
}

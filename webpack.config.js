const webpack = require('webpack');

const baseDir = __dirname + '/frontend/';

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    baseDir + 'src/main.jsx',
  ],
  output: {
    filename: 'main.js',
    path: baseDir + 'dist/js',
    publicPath: '/js/'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [baseDir + 'src', 'node_modules'],
  },
  devServer: {
    contentBase: baseDir + 'dist',
    hot: true,
    publicPath: '/js/',
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};

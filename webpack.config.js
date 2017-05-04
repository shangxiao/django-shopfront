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
    extensions: ['.js', '.jsx']
  },
  devServer: {
    contentBase: baseDir + 'dist',
    hot: true,
    publicPath: '/js/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: '../css/style.css',
    disable: process.env.NODE_ENV === 'development',
});

const baseDir = __dirname + '/frontend/';

const config = {
  entry: [
    baseDir + 'src/main.jsx',
  ],
  output: {
    filename: 'main.js',
    path: baseDir + 'dist/js',
    publicPath: '/js/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.scss$/,
        use: extractSass.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader',
        }),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [baseDir + 'src', 'node_modules'],
  },
  plugins: [
    extractSass,
  ],
};

if (process.env.NODE_ENV === 'development') {
  config.entry = [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    baseDir + 'src/main.jsx',
  ];

  config.devServer = {
    contentBase: baseDir + 'dist',
    hot: true,
    publicPath: '/js/',
    proxy: {
      '/api': 'http://127.0.0.1:8000',
    },
  };

  config.devtool = 'inline-source-map';

  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    extractSass,
  ];
}

module.exports = config;

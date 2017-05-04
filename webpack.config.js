module.exports = {
  entry: './frontend/src/main.jsx',
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
};

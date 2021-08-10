const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/client/htmlpugconvert.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'tutorials'),
  },
  resolve: {
      modules: ['node_modules']
  },
  optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()]
  },
  node: {
      fs: 'empty'
  }
};
const path = require('path');

module.exports = {
  entry: './src/client/htmlpugconvert.js',
  output: {
    filename: 'htmltopug.js',
    path: path.resolve(__dirname, 'tutorials'),
  },
  resolve: {
      modules: ['node_modules']
  },
  node: {
      fs: 'empty'
  }
};
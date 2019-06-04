module.exports = {
  mode: 'development',
  entry: {
    app: `${__dirname}/app.js`
  },
  target: 'web',
  output: {
    path: `${__dirname}/bin`,
    filename: '[name].min.js'
  }
};
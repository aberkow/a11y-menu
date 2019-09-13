const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'js','Navigation', 'Navigation.js'),
  output: {
    filename: 'Navigation.js',
    path: path.resolve(__dirname, 'dist', 'Navigation.js')
  },
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
  }
}
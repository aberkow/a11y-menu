const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'js','Navigation', 'Navigation.js'),
  output: {
    filename: process.env.NODE_ENV === 'development' ? 
      'Navigation.js' :
      'Navigation.min.js',
    path: path.resolve(__dirname, 'dist', 'Navigation.js'),
    // allows the Navigation class to be used as its own script
    libraryTarget: 'var',
    library: 'Navigation',
    libraryExport: 'default'
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
const path = require('path');

module.exports = {
  entry: ["./src/js/index.js"],
  output: {
    path: path.resolve(__dirname, 'public/build'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.scss']
  }
}
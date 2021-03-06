var path = require('path')

var env = process.env.ENV || 'development'
var destination = 'build'
var source = 'src'

module.exports = {
  watch: env === 'development',
  context: path.resolve(source),
  output: {
    filename: './public/image-editor.js',
    path: path.resolve(destination)
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: './public/image-editor.js',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.jsx?$/,
        include: /src/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: [['es2015', { modules: false }], 'react']
        }
      }
    ]
  }
}

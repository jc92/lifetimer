const path = require('path');

module.exports = {
  mode: 'development',
  entry: './popup.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'popup.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
    host: 'localhost',
    allowedHosts: 'all'
  }
};
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Checked?',
        hash: true,
        filename: './index.html',
        favicon: './src/favicon.png',
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    inline: true,
    port: 8000,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
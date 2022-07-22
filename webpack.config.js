const Dotenv = require('dotenv-webpack'); // required for accessing .env from front-end. used in plugins.
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('mode is : ', process.env.NODE_ENV);

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['./client/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'eval-source-map',
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
  // devtool: 'inline-source-map',
  devServer: {
    static: {
      publicPath: '/',
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 8080,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    // compress: true,
    hot: true,
    proxy: {
      '**/api/**': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: false,
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(png|svg|jpeg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      favicon: './client/assets/world.png',
    }),
    new Dotenv(),
  ],
};

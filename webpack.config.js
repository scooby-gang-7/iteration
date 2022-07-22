const Dotenv = require('dotenv-webpack'); // required for accessing .env from front-end. used in plugins.
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('mode is : ', process.env.NODE_ENV);

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['./client/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/',
    publicPath: process.env.NODE_ENV === 'production' ? '/client/assets/' : '/',
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
        use: [
          {
            // loads files as base64 encoded data url if image file is less than set limit
            loader: 'url-loader',
            options: {
              // if file is greater than the limit (bytes), file-loader is used as fallback
              limit: 8192,
            },
          },
        ],
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

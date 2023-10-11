const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {
  const mode = env.mode || 'development';
  const isDev = env.mode === 'development';
  const port = env.port || 3000;

  return {
    entry: {
      tetrisEntry: path.resolve(__dirname, 'src', 'index.jsx'),
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].[contenthash].js',
      clean: true,
    },
    devServer: {
      port,
    },
    resolve: {
      extensions: ['.jsx', '.tsx', '.ts', '.js'],
      // alias: {},
      // preferAbsolute: true,
      // mainFiles: ['index']
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        }, {
          test: /\.m?(jsx|js|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          }
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html')
      })
    ],
    mode,
  };
}
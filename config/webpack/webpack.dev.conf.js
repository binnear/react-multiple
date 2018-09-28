const opn = require('opn');
const path = require("path");
const webpack = require('webpack');
const merge = require('webpack-merge');
const moveFile = require("./webpack.file.move");
const createHtml = require("./webpack.html.conf");
const webpackFile = require("./webpack.file.conf");
const baseWebpackConfig = require("./webpack.base.conf");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

let config = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    path: path.resolve(webpackFile.devDirectory),
    filename: 'js/[name].js',
    chunkFilename: "js/[name].js",
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: [
        'babel-loader'
      ],
      exclude: /node_modules/,
    },
    {
      test: /\.(js|jsx)$/,
      enforce: 'pre',
      use: [{
        options: {
          formatter: eslintFormatter,
          eslintPath: require.resolve('eslint'),
          // @remove-on-eject-begin
          baseConfig: {
            extends: [require.resolve('eslint-config-react-app')],
          },
          //ignore: false,
          useEslintrc: false,
          // @remove-on-eject-end
        },
        loader: require.resolve('eslint-loader'),
      },],
      include: /app/,
      exclude: /node_modules/,
    },
    {
      test: /\.pcss$/,
      use: [
        'style-loader?sourceMap',
        'css-loader?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]',
        'postcss-loader?sourceMap'
      ]
    },
    {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'postcss-loader' }
      ]
    },
    {
      test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg)$/,
      loader: 'url-loader?limit=8192&name=[name].[hash:8].[ext]&outputPath=' + webpackFile.resource + '/'
    }
    ]
  },
  plugins: [
    new ProgressBarPlugin({
      format: 'build [:bar] :percent (:elapsed seconds)',
      clear: false,
      width: 60
    }),
    new LodashModuleReplacementPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    host: '0.0.0.0',
    port: 4001,
    hot: true,
    inline: true,
    contentBase: path.resolve(webpackFile.devDirectory),
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/index.html' },
        { from: /^\/search/, to: '/search.html' },
      ]
    },
    disableHostCheck: true,
    stats: "errors-only",
    proxy: [
      {
        context: ['/**/**'],
        target: 'http://172.16.11.40:7070',
        changeOrigin: true,
        secure: false
      }
    ],
    after() {
      opn('http://localhost:' + this.port);
    }
  }
});
createHtml(config, HtmlWebpackPlugin);
moveFile(config, CopyWebpackPlugin);

module.exports = config;
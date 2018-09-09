const path = require('path');
const merge = require('webpack-merge');
const moveFile = require("./webpack.file.move");
const createHtml = require("./webpack.html.conf");
const webpackFile = require('./webpack.file.conf');
const baseWebpackConfig = require("./webpack.base.conf");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

let config = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    path: path.resolve(webpackFile.proDirectory),
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: "js/[name].[chunkhash:8].js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          { loader: 'babel-loader' }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.pcss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader?modules,localIdentName="css-[hash:base64:6]"', 'postcss-loader']
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: 'css-loader' },
            { loader: 'postcss-loader' }]
        })
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg)$/,
        loader: 'url-loader?limit=8192&name=[name].[hash:8].[ext]&outputPath=' + webpackFile.resource + '/'
      }
    ]
  },
  plugins: [
    // 编译进度条
    new ProgressBarPlugin({
      format: 'build [:bar] :percent (:elapsed seconds)',
      clear: false,
      width: 60
    }),
    // css分页生成
    new ExtractTextPlugin({
      filename: 'css/[name].[md5:contenthash:hex:8].css',
      allChunks: true
    }),
    // 配合babel-plugin-lodash按需加载lodash
    new LodashModuleReplacementPlugin(),
    // js压缩
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      include: /dist/
    }),
    // css压缩
    new OptimizeCSSPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: { removeAll: true },
        safe: true
      },
      canPrint: true
    }),
    // 删除生产目录
    new CleanWebpackPlugin(
      [webpackFile.proDirectory],
      {
        root: path.resolve(__dirname, '../../'),
        verbose: true,
        dry: false
      })
  ],
  performance: {
    hints: false
  },
  stats: {
    assets: true,
    builtAt: true,
    chunks: false,
    entrypoints: false,
    errorDetails: true,
    modules: false,
    moduleTrace: true,
    providedExports: false,
    usedExports: false,
  }

});
// 创建每个项目页的html
createHtml(config, HtmlWebpackPlugin)
// 手动移动项目中的文件到生产目录
moveFile(config, CopyWebpackPlugin);

module.exports = config;
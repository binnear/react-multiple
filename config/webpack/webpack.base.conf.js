const entry = require("./webpack.entry.conf");
const newEntry = {};
for (let name in entry) {
  newEntry[name] = ['babel-polyfill', entry[name].path]
}
let config = {
  entry: newEntry,
  resolve: {
    extensions: [".js", ".json", ".jsx"],
  },
  optimization: {
    // 包清单
    runtimeChunk: {
      name: "manifest"
    },
    // 拆分公共包
    splitChunks: {
      cacheGroups: {
        // 项目公共组件
        common: {
          chunks: "initial",
          name: "common",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        // 第三方组件
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        }
      }
    }
  },
};
module.exports = config;
const entry = require("./webpack.entry.conf");
const webpackCom = require("./webpack.com.conf");
module.exports = createHtml = (config, HtmlWebpackPlugin) => {
    let pages = entry;
    for (let chunkName in pages) {
        let conf, data = pages[chunkName];
        conf = {
            filename: chunkName + '.html',
            template: 'index.html',
            inject: true,
            meta: {
                keywords: webpackCom.keywordsFun(data.keywords),
                description: webpackCom.descriptionFun(data.description),
            },
            title: webpackCom.titleFun(data.title),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunks: ['manifest', 'vendor', 'common', chunkName],
            extra: data.extra ? data.extra : [],
            hash: false,
            chunksSortMode: 'dependency'
        };
        config.plugins.push(new HtmlWebpackPlugin(conf));
    }
}
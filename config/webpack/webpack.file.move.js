
module.exports = moveFile = (config, CopyWebpackPlugin) => {
    let copyObj = [
        /*    {from: './app/public/plugin', to: './plugin'},//一些不需要走webpack的插件
            {from: './app/public/versionTips', to: './versionTips'},//固定不变的浏览器版本提示文件
            {from: './app/public/file', to: './resource'},//一些固定的文件，如下载文件*/
        { from: './app/public/imgs/favicon.ico', to: './' },//网站favicon.ico
        { from: './app/public/imgs/shoucang.png', to: './resource/' }//添加到桌面
    ];

    let copyArr = [];
    copyObj.map((data) => {
        copyArr.push(
            new CopyWebpackPlugin([{ from: data.from, to: data.to, ignore: ['.*'] }])
        )
    });

    /* 拷贝静态资源  */
    copyArr.map(function (data) {
        return config.plugins.push(data)
    });
}
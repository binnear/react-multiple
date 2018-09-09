const fs = require("fs");
const path = require("path");
const pageConf = require('../app/page/page');
const rimraf = require('rimraf');

//定义entryBuild
let entryBuildPath;
if (process.env.BABEL_ENV === 'production') {
    entryBuildPath = path.resolve(__dirname, '../proEntry');
} else {
    entryBuildPath = path.resolve(__dirname, '../devEntry');
}
//删除entryBuild
rimraf.sync(entryBuildPath);
//创建entryBuild
fs.mkdirSync(entryBuildPath);
const entryContent = data => `import React from 'react';
import ReactDOM from 'react-dom';
import '../app/public/js/axios/interceptors';
import '../app/public/css/common.pcss';
import '../app/public/css/iconfont.pcss';
import Index from '../app/page/${data.path}';
ReactDOM.render(<Index key="Index"/>,document.getElementById('app'));`;
/*生成webpack entry 入口文件*/
pageConf.map((data) => {
    fs.writeFile(entryBuildPath + '/' + data.name + '.js', entryContent(data), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    });
});
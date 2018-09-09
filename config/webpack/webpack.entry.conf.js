const pageConf = require('../../app/page/page');
let entryPath = process.env.BABEL_ENV === 'production' ? './proEntry/' : './devEntry/';
let entry = {};
pageConf.map((data) => {
    entry[data.name] = {
        path: entryPath + data.name + '.js',
        title: data.title,
        keywords: data.keywords,
        description: data.description,
        extra: data.extra
    };
});
module.exports = entry;
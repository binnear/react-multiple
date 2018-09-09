let titleFun = function (title) {
    return title
};
let keywordsFun = function (keywords) {
    if(!keywords) {
        return "keywords配置"
    }
    return keywords
};
let descriptionFun = function (description) {
    if(!description) {
        return "这里是description配置"
    }
    return description
};
module.exports = {
    titleFun: titleFun,
    keywordsFun: keywordsFun,
    descriptionFun: descriptionFun,
};
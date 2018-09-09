// 配置每页的参数
// {
//     name: String(require), 入口js输出名 
//     path: String(require), 页面组件路径
//     title: String(require), 页面title
//     keywords: "", 默认不添加为初始值，若每页单独配置则添加
//     description:""默认不添加为初始值，若每页单独配置则添加
//     extra: Array 添加script外链 
// }

module.exports = [{
    name: 'index',
    path: 'index/index.jsx',
    title: '首页',
  },
  {
    name: 'search',
    path: 'search/search.jsx',
    title: '搜索'
  }
];
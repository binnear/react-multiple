# webpack4+react多页面环境搭建，开箱即用

#### 一. 目录结构

```text
mall-wap
├── app                                 开发页面
│   ├── actions                         放置对应页面的action
│   ├── components                      公用组件
│   ├── page                            对应页面的入口
│   │   ├── index                       主页入口文件夹
│   │   │   ├── components              主页相关组件
│   │   │   ├── index.js                主页入口文件
│   │   │   └── index.pcss              主页样式文件，使用postcss
│   │   └── page.js                     对应页面的数据配置（添加一个页面必须再次添加该页面的相关配置）
│   ├── public
│   │   ├── css
│   │   │   ├── common.pcss             公共css
│   │   │   └── iconfont.pcss           iconfont字体样式文件
│   │   ├── font                        字体文件
│   │   ├── imgs                        图片
│   │   └── js
│   │       ├── axios                   axios拦截器
│   │       └── mock                    mock数据
│   ├── reducers                        放置对应页面的reducer
│   └── stores                          放置对应页面的store
├── config
│   ├── webpack
│   │   ├── webpack.base.conf.js        基本配置信息
│   │   ├── webpack.com.conf.js         title, keyword, description生成配置
│   │   ├── webpack.dev.conf.js         开发配置
│   │   ├── webpack.entry.conf.js       入口js信息配置
│   │   ├── webpack.file.conf.js        输出目录配置
│   │   ├── webpack.file.move.js        手动移动文件配置
│   │   ├── webpack.html.conf.js        html生成配置
│   │   └── webpack.prod.conf.js        生产配置
│   ├── entry.conf.js                   入口js生成配置
├── devEntry                            开发环境入口js生成目录
│   └── *.js
├── dist                                生产环境打包目录
│   ├── css
│   ├── js
│   ├── resource
│   ├── favicon.ico
│   └── *.html
├── node_modules
├── proEntry                            生产环境入口js生成目录
│   └── *.js
├── .babelrc
├── .gitignore
├── index.html                          页面*.html的生成模板
├── package-lock.json
├── package.json
├── postcss.config.js
└── README.md
```

#### 二. 使用说明

开发环境
```bash
npm install
npm run dev
```

生产环境
```bash
npm run build
```

#### 三. 功能说明

1. 已引入UI库`antd-design-mobile `，工具库`lodash`，并作按需打包处理；
2. 网络请求引入`axios`，前端模拟数据引入`mock`，react手机端tap事件处理引入`react-tap-event-plugin`；
3. eslint代码检查；
4. 每个页面可配置的title，keyword，description，cnd资源引入
5. 已作手机端适配，以750设计稿为准，设计稿1px对应页面为0.01rem；
6. 引入store，对应页面分别配置，若不需要可删除。

若项目为pc端，则删除index.html中的如下代码

```js
<script type="text/javascript">
  const resize = (e) => {
    const screenWidth = window.screen.availWidth;
    const size = screenWidth / (750 / 100);
    document.documentElement.style.fontSize = size + 'px'
  }
  window.onresize = resize
  resize()
</script>
```

更换`antd-design-mobile`库为你喜欢的库即可。
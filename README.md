# RUARUA.live开源项目

# demo站点不可用

# 直播平台大多已经转h5播放器 直播流获取难度增加, 大多都不能直接播放 有兴趣的可以自己探索

#### ruarua.live: 全球视频直播资源聚合，同时观看多个内容
#### (更新)分类功能完善
![image](https://raw.githubusercontent.com/EthanOrange/tv/master/assets/logo-text.png)

#如果您的Chrome版本高于60 网站可能无法观看视频
[chrome iframe swf don't work](https://bugs.chromium.org/p/chromium/issues/detail?id=767342)
#### live demo 截图:
##### 首页:
![image](https://raw.githubusercontent.com/EthanOrange/tv/master/assets/doc_banner_1.jpg)
##### 播放页:
![image](https://raw.githubusercontent.com/EthanOrange/tv/master/assets/doc_banner_2.jpg)

快速开始(dev)
----
* 安装 Node.js & npm (nodejs 8.0+, npm 5.0 +) 
* `npm install`
* `npm run start`
* 打开http://localhost:8080
* 欢迎Fork贡献代码
* 提交一个pull request, 等待review和merge
* 对全栈技术向感兴趣的可以加qq群471451989.


发布(production)
----
* `npm run webpack`

技术栈
----
* View: React
* State Management: Redux
* CSS: css-modules/postcss

  
注意
----
* `cnpm`可能会导致项目`install`某些包不成功,不推荐使用
* 默认api地址为http://ruarua.live, 可以手动配置为本地服务器,也可以clone [tv-core](https://github.com/EthanOrange/tv-core)这个项目,然后在开发环境运行(port:3000)
* 可以配置webpack-dev-server(webpack.config.js)修改默认开发端口。
* websockt默认为3001端口

相关资源
----
* React Redux 和es6的文章
  * React: https://facebook.github.io/react/docs/thinking-in-react.html
  * Redux入门: https://egghead.io/courses/getting-started-with-redux
  * ES6指南: https://github.com/lukehoban/es6features
  * Postcss: http://postcss.org/

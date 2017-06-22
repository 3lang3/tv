# [RUARUA.live](http://ruarua.live/invite?code=testcode)开源项目

#### ruarua.live: 全球视频直播资源聚合，同时观看多个内容,[点击进入](http://ruarua.live/invite?code=testcode)
![image](https://raw.githubusercontent.com/EthanOrange/tv/master/assets/logo-text.png)

#### live demo 截图:
##### 首页:
![image](https://raw.githubusercontent.com/EthanOrange/tv/master/assets/doc_banner_1.jpg)
##### 播放页:
![image](https://raw.githubusercontent.com/EthanOrange/tv/master/assets/doc_banner_2.jpg)

快速开始(dev)
----
* 安装 Node.js (6.0.0 +) 
* `npm install`
* `npm run start`
* 打开http://localhost:8080
* 欢迎Fork贡献代码
* 提交一个pull request, 等待review和merge
* 恭喜！你已经成为一名贡献者。
* 想贡献代码的可以加qq群471451989, 一起讨论. 对全栈技术向感兴趣的也可以加.


发布(production)
----
* `npm run build`

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

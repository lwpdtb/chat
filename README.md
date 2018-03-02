React + creact-react-app
===============

## 目录结构

初始的目录结构如下：

~~~
www  WEB部署目录（或者子目录）
├─node_modules          安装依赖
├─build                 打包文件
│
├─public                   WEB目录
│  ├─index.html            入口页面
│  └─favicon.ico           网页logo
│
├─src                     前端主要代码
│  ├─components           组件库(详见前端components说明文档)
│  ├─pages                界面库
│  │  ├─homePage          应用平台主页
│  │─app.css              APP样式
│  │─app.js               Router路由
│  │─index.js             入口文件    
│  │─index.css            入口文件样式
├─README.md             README 文件
├─package.json          展示项目所依赖的npm包 
├─package-lock.json     记录了整个 node_modules 文件夹的树状结构
~~~

> 采用create-react-app脚手架搭建react环境
> router采用router@4
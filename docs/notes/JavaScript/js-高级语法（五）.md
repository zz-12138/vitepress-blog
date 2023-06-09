---
outline: deep
---

# js-高级语法（五）

## 代码共享方案

1. 将我们通过模块化编写的代码，封装成一个工具，让他人甚至是全世界可以通过导入导出的方式来共享

   * 方式一：上传GitHub，让别人手动下载引用代码
     * 管理依赖或版本升级不方便
   * 方式二：使用一个专业工具来管理代码
     * 通过工具将代码发布到特定位置
     * 别人可以通过工具来安装、删除、升级代码

2. npm包管理工具

   * npm配置文件

     * 每一个项目都会有一个对应的配置文件，该文件记录着你项目的名称、版本号、项目描述等；也记录着该项目所依赖的其他库的信息和依赖库的版本号

   * 创建配置文件

     * 手动创建：`npm init`或`npm init -y`

       ```js
       {
         "name": "jsdemo",
         "version": "1.0.0",
         "description": "",
         "main": "index.js",
         "scripts": {
           "test": "echo \"Error: no test specified\" && exit 1"
         },
         "author": "",
         "license": "ISC",
         "dependencies": {
           "co": "^4.6.0",
           "hy-event-store": "^1.2.1"
         }
       }
       ```

     * 脚手架创建（vue-cli）

       ```js
       {
         "name": "cms",
         "version": "0.1.0",
         "private": true,
         "scripts": {
           "serve": "vue-cli-service serve",
           "build": "vue-cli-service build",
           "lint": "vue-cli-service lint",
           "prettier": "prettier --write .",
           "prepare": "husky install",
           "commit": "cz"
         },
         "dependencies": {
           "@element-plus/icons-vue": "^2.0.10",
           "axios": "^1.2.1",
           "coderwhy": "^1.1.4",
           "core-js": "^3.8.3",
           "dayjs": "^1.11.7",
           "echarts": "^5.4.1",
           "element-plus": "^2.2.26",
           "husky": "^8.0.2",
           "normalize.css": "^8.0.1",
           "pinia": "^2.0.27",
           "vue": "^3.2.13",
           "vue-router": "^4.0.3"
         },
         "devDependencies": {
           "@commitlint/cli": "^17.3.0",
           "@commitlint/config-conventional": "^17.3.0",
           "@typescript-eslint/eslint-plugin": "^5.4.0",
           "@typescript-eslint/parser": "^5.4.0",
           "@vue/cli-plugin-babel": "~5.0.0",
           "@vue/cli-plugin-eslint": "~5.0.0",
           "@vue/cli-plugin-router": "~5.0.0",
           "@vue/cli-plugin-typescript": "~5.0.0",
           "@vue/cli-service": "~5.0.0",
           "@vue/eslint-config-typescript": "^9.1.0",
           "commitizen": "^4.2.6",
           "cz-conventional-changelog": "^3.3.0",
           "eslint": "^7.32.0",
           "eslint-config-prettier": "^8.3.0",
           "eslint-plugin-prettier": "^4.0.0",
           "eslint-plugin-vue": "^8.0.3",
           "less": "^4.0.0",
           "less-loader": "^8.0.0",
           "prettier": "^2.8.1",
           "typescript": "~4.5.5",
           "unplugin-auto-import": "^0.12.0",
           "unplugin-vue-components": "^0.22.11"
         },
         "config": {
           "commitizen": {
             "path": "./node_modules/cz-conventional-changelog"
           }
         }
       }
       ```

     * 脚手架创建（create-react-app）

       ```js
       {
         "name": "reactcli-demo",
         "version": "0.1.0",
         "private": true,
         "dependencies": {
           "@craco/craco": "^6.4.3",
           "@testing-library/jest-dom": "^5.16.2",
           "@testing-library/react": "^12.1.2",
           "@testing-library/user-event": "^13.5.0",
           "antd": "^4.18.7",
           "axios": "^0.26.0",
           "babel-plugin-import": "^1.13.3",
           "nanoid": "^3.3.1",
           "node-sass": "^7.0.1",
           "pubsub-js": "^1.9.4",
           "react": "^17.0.2",
           "react-dom": "^17.0.2",
           "react-redux": "^7.2.6",
           "react-router-dom": "^6.2.1",
           "react-scripts": "5.0.0",
           "redux": "^4.1.2",
           "redux-devtools-extension": "^2.13.9",
           "redux-thunk": "^2.4.1",
           "web-vitals": "^2.1.4"
         },
         "scripts": {
           "start": "craco start",
           "build": "craco build",
           "test": "craco test",
           "eject": "react-scripts eject"
         },
         "eslintConfig": {
           "extends": [
             "react-app",
             "react-app/jest"
           ]
         },
         "browserslist": {
           "production": [
             ">0.2%",
             "not dead",
             "not op_mini all"
           ],
           "development": [
             "last 1 chrome version",
             "last 1 firefox version",
             "last 1 safari version"
           ]
         }
       }
       ```

   * 配置文件含义

     * mian属性：设置程序的入口
       * 该入口和webpack打包的入口并不冲突，它是在你发布一个模块时，用来查找对应入口文件的，一般用于开源项目，如`const axios = require('axios')`
     * script属性：用于配置一些命令脚本，可以通过npm run来执行这些命令
       * 对于常用的start、test、stop、restart可以省略run，直接通过npm start运行
     * dependencies属性：开发环境和生产环境都需要的包
     * devDependencies属性：旨在开发环境需要的包，如webpack、babel等，通过`-d`安装
     * peerDependencies属性：一个包需要依赖另外一个包作为前提
     * ![](../../public/npm配置文件属性-1.png)
     * ![](../../public/npm配置文件属性-2.png)

   * 依赖的版本管理

     * npm的包需要遵循semver版本规范X.Y.Z
       * X主版本号：可能做了不兼容的api修改（改版本）
       * Y次版本号：可能做了向下兼容的功能性更新（加功能）
       * Z修订号：可能做了向下兼容的问题修正（修bug）
     * ^和~的区别
       * ^x.y.z：表示x保持不变，y和z永远安装最新版本
       * ~x.y.z：表示x和y保持不变，z永远安装最新版本
     * 如果有packge-lock.json文件，会锁定当前版本安装

   * npm包安装
   
     * 全局安装：一般将一些工具属性的包安装到全局，如yarn、webpack等，`npm install webpack -g`
     * 局部安装：一般将开发和生产时需要引入的包安装到项目，如vue、axios、koa等，`npm install axios`
     * ![](../../public/npm安装包原理图.png)
   
   * packge-lock.json文件解析
   
     * lockfileVersion：lock文件的版本
     * requires：使用requires来跟踪模块依赖的关系
     * dependencies：项目的依赖
       * version：表示当前包的版本
       * resolved：用来记录下载的地址，registry仓库中的位置
       * requires：记录当前模块的依赖
       * intergrity：用来从记录缓存中获取索引，在通过索引去压缩文件
   
3. yarn包管理工具

   * 一个新的包管理工具，react项目多见，解决了早期npm安装速度慢，代码依赖混乱等问题
   * ![](../../public/npm和yarn命令对比.png)

4. npx工具

   * 作用：主要是用来调用项目中某个模块的指令
   * 局部命令的执行：
     * 方式一：明确到node_modules文件夹下面的命令
     * 方式二：在packge.json中定义script脚本，执行相关命令
     * 方式三：使用npx，`npx webpack --version`

## JSON-数据储存

1. json是一种非常重要的数据格式，一种在客户端和服务端之间传输的数据结构
   * 目前很多编程语言都实现了将json转成对应模型的方式
2. 其他传输格式
   * XML：早期网络传输主要使用XML来进行数据交换的
   * Protobuf：越来越多编程语言支持，但js支持较晚，用的较少
3. json的应用场景也越来越多
   * 网络数据传输json
   * 项目的某些配置文件
   * 非关系型数据库将json作为储存格式
4. 
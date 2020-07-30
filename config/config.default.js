/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1590971868955_2385";

  // add your middleware config here
  // ["errorHandler", "eggLog"];
  config.middleware = ["errorHandler", "eggLog"];
  // config.security = {
  //   csrf: {
  //     enable: false,
  //     ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
  //   },
  //   domainWhiteList: [ 'http://127.0.0.1:4200' ],
  // };
  // config.cors = {
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  // };
  // add your user config here
  const userConfig = {
    myAppName: "egg",

    // 文件系统根目录 // file://zhn-pc/share
    // file://E://
    // file://192.168.245.250/share
    FileRootDir: "file://E://",
    // 项目临时上传文件目录
    FileTempDir: "/app/public/uploads/",

    view: {
      mapping: {
        ".ejs": "ejs",
      },
    },
    static: {
      prefix: "/",
      // maxAge: 31536000,
    },
    security: {
      csrf: {
        enable: false,
      },
      // domainWhiteList: [ 'http://localhost:4200' ],
    },
    // 跨域
    cors: {
      origin: "http://localhost:4200",
      allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
      credentials: true,
    },
    bodyParser: {
      jsonLimit: "1mb",
      formLimit: "1mb",
    },
    jwt: {
      secret: "SunWuKong",
      // enable: true, // default is false
      // match: '/jwt', // optional
    },
    // 数据库
    sequelize: {
      dialect: "mysql",
      database: "epms",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "1234",

      define: {
        underscored: true, // 注意需要加上这个， egg-sequelize只是简单的使用Object.assign对配置和默认配置做了merge, 如果不加这个 update_at会被转变成 updateAt故报错
        // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
        // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
        freezeTableName: true,
        // 软删除,而不是 硬删除
        paranoid: true,
      },
      dialectOptions: {
        // useUTC: false, // -->Add this line. for reading from database
      },
      timezone: "+08:00", // -->Add this line. for writing to database
    },
    bcrypt: {
      saltRounds: 10, // default 10
    },
    // 配置上传
    multipart: {
      // 增加文件扩展名的支持
      fileExtensions: [
        "txt",
        "rtf", // 匹配 txt
        "xls",
        "xlsx", // 匹配 excel
        "doc",
        "docx", // 匹配 word
        "pdf", // 匹配 pdf
        "ppt",
        "pptx", // 匹配 ppt
        "vsd", // 匹配 vsd
        "dws",
        "dwt",
        "dxf",
        "dwg",
        "cad", // 匹配 CAD
      ],
      // 上传文件大小
      fileSize: "200mb",
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};

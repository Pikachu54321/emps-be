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
  config.middleware = [];
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
    myAppName: 'egg',
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
    cors: {
      origin: 'http://localhost:4200',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
      credentials: true,
    },
    bodyParser: {
      jsonLimit: '1mb',
      formLimit: '1mb',
    }, 
    jwt: {
      secret: 'SunWuKong',
      // enable: true, // default is false
      // match: '/jwt', // optional
    },
    sequelize: {
      dialect: 'mysql',
      database: 'epms',     
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234', 
    },  
    bcrypt: {
      saltRounds: 10 // default 10
    }           
  };

  return {
    ...config,
    ...userConfig,
  };
};

'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  ejs: {
    enable: true,
    package: 'egg-view-ejs',    
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  jwt: {
    enable: true,
    package: "egg-jwt"
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  // 
  bcrypt: {
    enable: true,
    package: 'egg-bcrypt'
  }
};


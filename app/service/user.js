'use strict';

const Service = require('egg').Service;

class UserService extends Service {


  // Commons======================================================================================================>
  async findByUserName(userName) {
    return this.ctx.model.User.findByUserName(userName);
  }
  async findByMobile(mobile) {
    return this.ctx.model.User.findByUserName(mobile);
  }

//   async find(id) {
//     return this.ctx.model.User.findById(id)
//   }

//   async findByIdAndUpdate(id, values) {
//     return this.ctx.model.User.findByIdAndUpdate(id, values)
//   }
}

module.exports = UserService;

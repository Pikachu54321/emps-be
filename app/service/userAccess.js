"use strict";

const Service = require("egg").Service;

class UserAccessService extends Service {
  async login(payload) {
    const { ctx, service } = this;
    let user;
    if (ctx.request.body.type === 0) {
      user = await service.user.findByUserName(payload.userName);
    } else {
      user = await service.user.findByUserName(payload.userName);
    }
    if (!user) {
      // ctx.throw(404, "user not found");
      return {code: "404", msg: "用户没有找到"};
    }
    // 生成密码哈希
    // console.log(await ctx.genHash('Zy680030@'));
    // console.log(await ctx.genHash('ng-alain.com'));

    let verifyPsw = await ctx.compare(payload.password, user.password);
    if (!verifyPsw) {
      // ctx.throw(404, 'user password is error');
      return {code: "404", msg: "用户密码错误"};
    }
    // 生成Token令牌
    let data = {
      token: await service.actionToken.apply(user.id),
      id: user.id,
      userName: user.user_name,
      mobile: user.mobile,
      email: user.email,
      avatar: user.avatar,
      msg:"ok",
    };
    // return { token: await service.actionToken.apply(user._id) }
    return data;
  }
}

module.exports = UserAccessService;

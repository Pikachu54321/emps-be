'use strict';

const Controller = require('egg').Controller;

class UserAccessController extends Controller {

    constructor(ctx) {
        super(ctx);

        this.UserNameLoginTransfer = {
          type: 'number',
          userName: { type: 'string', required: true, allowEmpty: false },
          password: { type: 'string', required: true, allowEmpty: false }
        }

        this.MobileLoginTransfer = {
          type: 'number',
          mobile: { type: 'string', required: true, allowEmpty: false },
          captcha: { type: 'string', required: true, allowEmpty: false }
        }
    }    

  // 用户登入
  async login() {    
    
    const { ctx, service } = this;
    // type===0时，表示用户名、密码登陆
    // type===1时，表示手机号、验证码登陆
    if(ctx.request.body.type===0){
      // 校验参数
      ctx.validate(this.UserNameLoginTransfer);
    }else{
      // 校验参数
      ctx.validate(this.MobileLoginTransfer);
    }
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.userAccess.login(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res});
  }
}

module.exports = UserAccessController;

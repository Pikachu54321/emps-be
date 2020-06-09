'use strict';

const Controller = require('egg').Controller;

class FileController extends Controller {

  constructor(ctx) {
    super(ctx)

    this.ReadDirectoryTransfer = {
      path: { type: 'string', required: true, allowEmpty: false },
      sortName: { type: 'string', required: true, allowEmpty: false },
      sortOrder: { type: 'string', required: true, allowEmpty: false },
    }
  }

  // 读取指定目录下文件、文件夹(并且排序)
  async readDirectory() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.ReadDirectoryTransfer);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    await service.file.readDirectory(payload);
    // 设置响应内容和响应状态码
    const res={fileList:[{name:"a1",path:"aaa",isDir:true},{name:"b1",path:"aaa",isDir:true}]};
    ctx.helper.success({ctx, res});
  }
}

module.exports = FileController;

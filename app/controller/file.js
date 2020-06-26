"use strict";

const Controller = require("egg").Controller;

class FileController extends Controller {
  constructor(ctx) {
    super(ctx);

    this.ReadDirectoryTransfer = {
      path: { type: "string", required: true, allowEmpty: true },
      sortName: { type: "string", required: true, allowEmpty: true },
      sortOrder: { type: "string", required: true, allowEmpty: true },
    };

    this.NewFolderTransfer = {
      parentFolderPath: { type: "string", required: true, allowEmpty: true },
      newFoldername: { type: "string", required: true, allowEmpty: false },
    };
  }

  // 读取指定目录下文件、文件夹(并且排序)
  async readDirectory() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.ReadDirectoryTransfer);
    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const res = await service.file.readDirectory(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
  }

  // 新建文件夹
  async newFolder() {
    const { ctx, service } = this;
    // 校验参数
    ctx.validate(this.NewFolderTransfer);
    // 组装参数
    const payload = ctx.request.body || {};
    payload.baseDir=ctx.app.config.FileRootDir;
    // 调用 Service 进行业务处理
    const res = await service.file.newFolder(payload);
    // 设置响应内容和响应状态码
    ctx.helper.success({ ctx, res });
    if(res.msg==="ok"){
      ctx.helper.success({ctx, res});
    }else{
      ctx.helper.success({ctx, undefined, msg:res.msg, code:res.code});
    }
  }
}

module.exports = FileController;

'use strict';

const Controller = require('egg').Controller;

class UploadController extends Controller {
  constructor (ctx){
    super(ctx)
  }
  // 上传多个文件
  async multiple() { 
    // 要获取同时上传的多个文件，不能通过 ctx.getFileStream() 来获取
    const { ctx, service } = this;
    const parts = ctx.multipart();
    const res = {};
    const files = [];

    let part; // parts() return a promise
    while ((part = await parts()) != null) {
      if (part.length) {
        // 如果是数组的话是 filed
        console.log('field: ' + part[0]);
        console.log('value: ' + part[1]);
        console.log('valueTruncated: ' + part[2]);
        console.log('fieldnameTruncated: ' + part[3]);
      } else {
        if (!part.filename) {
          // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
          // 需要做出处理，例如给出错误提示消息
          return;
        }
        // part 是上传的文件流
        console.log('field: ' + part.fieldname);
        console.log('filename: ' + part.filename);
        console.log('extname: ' + part.extname);
        console.log('encoding: ' + part.encoding);
        console.log('mime: ' + part.mime);
        const filename = part.filename.toLowerCase(); // 文件名称
        const extname = path.extname(part.filename).toLowerCase(); // 文件扩展名称
        
        // 组装参数
        // const attachment = new ctx.model.Attachment
        // attachment.extname = extname
        // attachment.filename = filename
        // attachment.url = `/uploads/${attachment._id.toString()}${extname}`
        // // const target = path.join(this.config.baseDir, 'app/public/uploads', filename)
        // const target = path.join(this.config.baseDir, 'app/public/uploads', `${attachment._id.toString()}${extname}`)        
        // const writeStream = fs.createWriteStream(target)
        // 文件处理，上传到云存储等等
    //     let res
    //     try {
    //       // result = await ctx.oss.put('egg-multipart-test/' + part.filename, part)
    //       await awaitWriteStream(part.pipe(writeStream))
    //       // 调用Service
    //       res = await service.upload.create(attachment)
    //     } catch (err) {
    //       // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
    //       await sendToWormhole(part)
    //       throw err
    //     }
    //     files.push(`${attachment._id}`) // console.log(result)
      }
    }
    // ctx.helper.success({ctx, res: { _ids:files }})
  }
}

module.exports = UploadController;

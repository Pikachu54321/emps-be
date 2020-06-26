"use strict";

const fs = require("fs");
const path = require("path");
const Controller = require("egg").Controller;
const awaitWriteStream = require("await-stream-ready").write;
const sendToWormhole = require("stream-wormhole");

class UploadController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
  // 上传多个文件
  async multiple() {
    // 要获取同时上传的多个文件，不能通过 ctx.getFileStream() 来获取
    const { ctx, service } = this;
    const parts = ctx.multipart();

    const uploadData = {};
    let newFolderRes = null;

    // 上传临时文件时，新建文件夹参数
    const parentFolderPath = ctx.app.config.FileTempDir;
    const newFoldername = ctx.helper.formatDate(new Date());
    const baseDir = this.config.baseDir;
    const payload = {
      parentFolderPath: parentFolderPath,
      newFoldername: newFoldername,
      baseDir: "file://" + this.config.baseDir, // 因为是URL，必须加上file://
    };

    // 上传成功时，返回给客户端的文件对象和文件对象列表数组
    let file = {};
    const fileList = [];

    let part; // parts() return a promise
    while ((part = await parts()) != null) {
      if (part.length) {
        // 如果是数组的话是 filed
        console.log("field: " + part[0]);
        console.log("value: " + part[1]);
        console.log("valueTruncated: " + part[2]);
        console.log("fieldnameTruncated: " + part[3]);
        uploadData[part[0]] = part[1];
      } else {
        if (!part.filename) {
          // 这时是用户没有选择文件就点击了上传(part 是 file stream，但是 part.filename 为空)
          // 需要做出处理，例如给出错误提示消息
          return;
        }
        // 如果是临时上传文件，并且没有新建文件夹
        if (uploadData.isTemp === "true" && newFolderRes === null) {
          // 调用 Service 如果没有文件夹，创建文件夹。返回值没做检查啥的，以后可能会改
          newFolderRes = await service.file.newFolder(payload);
        }

        // part 是上传的文件流
        console.log("field: " + part.fieldname);
        console.log("filename: " + part.filename);
        console.log("extname: " + part.extname);
        console.log("encoding: " + part.encoding);
        console.log("mime: " + part.mime);
        // const filename = part.filename.toLowerCase(); // 文件名称
        // const extname = path.extname(part.filename).toLowerCase(); // 文件扩展名称
        const filename = part.filename; // 文件名称

        // 组装参数
        // const attachment = new ctx.model.Attachment
        // attachment.extname = extname
        // attachment.filename = filename
        // attachment.url = `/uploads/${attachment._id.toString()}${extname}`;
        // ctx.state.user 可以提取到JWT编码的data
        // const _id = ctx.state.user.data._id;

        const target = path.join(baseDir, parentFolderPath + newFoldername, filename);

        // const target = path.join(this.config.baseDir, 'app/public/uploads', `${attachment._id.toString()}${extname}`)
        const writeStream = fs.createWriteStream(target);
        // 文件处理，上传到云存储等等
        let res;
        try {
          // result = await ctx.oss.put('egg-multipart-test/' + part.filename, part)
          await awaitWriteStream(part.pipe(writeStream));
          // 信息写入file对象、fileList数组
          file = {
            uid: Math.random().toString(36).substring(2),
            name: filename,
            url: "/uploads/" + newFoldername + filename,
            // status:"done",
            // response: '{"status": "success"}', // 服务端响应内容
          };
          fileList.push(file);
          // 调用Service
          // res = await service.upload.create(attachment);
        } catch (err) {
          // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
          await sendToWormhole(part);
          throw err;
        }
        // files.push(`${attachment._id}`) // console.log(result)
      }
    }
    ctx.body = {
      status:"success",
      file: file,
      fileList: fileList,
      event: {
        percent: 100,
      },
    };
    ctx.status = 200;
    // ctx.helper.success({ ctx, res: { file: file, fileList: fileList } });
  }
}

module.exports = UploadController;

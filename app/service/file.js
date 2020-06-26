"use strict";

const Service = require("egg").Service;

const fs = require("fs");

class FileService extends Service {
  // 读取指定目录下文件、文件夹(并且排序)
  async readDirectory(payload) {
    const { ctx, service } = this;
    // file://zhn-pc/share/
    // const currentURL = new URL(ctx.app.config.FileRootDir + payload.path);
    let files = [];
    let fileList = [];
    // 文件Breadcrumb面包屑数组
    let FileBreadcrumb = [];
    let statError = false;

    // 读取文件夹
    try {
      files = fs.readdirSync(new URL(ctx.app.config.FileRootDir + payload.path));
    } catch (err) {
      throw err;
    }
    // 把可访问的文件、文件夹加入fileList数组
    files.forEach(function (file) {
      let stats;
      // 如果statSync失败，则抛出 Error。
      try {
        // 检查文件是否可以访问
        stats = fs.statSync(new URL(ctx.app.config.FileRootDir + payload.path + "/" + file));
      } catch (err) {
        console.log(err);
        statError = true;
      }
      if (statError) {
        statError = false;
        // 无权限时返回
        return;
      }
      fileList.push({
        isDir: stats.isDirectory() ? 1 : 0,
        name: file,
        path: payload.path + "/" + file,
        size: stats.size,
        mtime: ctx.helper.formatTime(stats.mtime),
        superPath: payload.path,
        // suffix: stats.isDirectory() ? "" : matchType.matchType(file),
        // time: stats.mtime.getTime(),
      });
    });
    // 排序
    ctx.helper.fileSort(fileList, payload.sortName, payload.sortOrder);

    // downloadList = downloadDirs.concat(downloadFiles);
    let data = {
      fileList: fileList,
      sortName: payload.sortName,
      sortOrder: payload.sortOrder,
      // FileBreadcrumb: FileBreadcrumbItem[];
    };
    // return { token: await service.actionToken.apply(user._id) }
    return data;
  }

  // 创建文件夹
  async newFolder(payload) {
    const { ctx, service } = this;
    let isExist=false;
    try {
      // 检查文件夹是否存在。
      if (fs.existsSync(new URL(payload.baseDir + payload.parentFolderPath + "/" + payload.newFoldername))) {
        isExist=true;
      } else {
        // 检查父文件夹是否可写。
        fs.accessSync(new URL(payload.baseDir + payload.parentFolderPath), fs.constants.W_OK);
        // 创建文件夹
        // 权限参数 mode 主要针对 Linux 和 Unix 操作系统，Window 的权限默认是可读、可写、不可执行，所以权限位数字表示为 0o666，转换十进制表示为 438。
        fs.mkdirSync(new URL(payload.baseDir + payload.parentFolderPath + "/" + payload.newFoldername), 438);
        isExist=false;
      }
    } catch (err) {
      throw err;
    }
    let data = {
      path: payload.parentFolderPath,
    };
    // 如果文件夹已存在
    if(isExist){
      data.msg="文件夹已存在";
    }else{
      data.msg="ok";
    }
    return data;
  }
}

module.exports = FileService;

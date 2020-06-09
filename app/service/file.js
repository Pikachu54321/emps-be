"use strict";

const Service = require("egg").Service;

const fs = require("fs");

class FileService extends Service {
  // 读取指定目录下文件、文件夹(并且排序)
  async readDirectory(payload) {
    const { ctx, service } = this;
    // \\192.168.200.120\share password /user:username
    const myURL = new URL("file://zhn-pc/share/");


    fs.readdir(myURL, function (err, files) {
      // 如果有错 抛出错误
      try {
        if (err) {
          throw err;
        }
      } catch (e) {
        console.log(e);
        
      }
      console.log(files);
      
    });
  }
}

module.exports = FileService;

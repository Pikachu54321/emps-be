const moment = require('moment');
var pinyin = require("pinyin");

// 格式化时间的扩展
exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss');
// 格式化时间的扩展
exports.formatDate = time => moment(time).format('YYYY-MM-DD');

// 格式化成功response的扩展
exports.success = ({ ctx, res = null, msg = 'ok',code })=> {
  ctx.body = {
    msg,
    data: res,
    code, 
  }
  ctx.status = 200;
}

// 文件排序
exports.fileSort = (fileList,sortName,sortOrder) => {
  if (sortName === "name") {
    fileList.sort(function (a, b) {
      let value1 = a.isDir ? a[sortName].padStart(a[sortName].length + 1, "0").toLowerCase() : a[sortName].padStart(a[sortName].length + 1, "1").toLowerCase();
      let value2 = b.isDir ? b[sortName].padStart(b[sortName].length + 1, "0").toLowerCase() : b[sortName].padStart(b[sortName].length + 1, "1").toLowerCase();
      // 字母排序没问题，汉字排序有问题
      // if (value1 < value2) {
      //   return -1;
      // } else if (value1 > value2) {
      //   return 1;
      // } else {
      //   return 0;
      // }
 
      return pinyin.compare(value1, value2);
    });
  } else if (sortName === "time") {
    fileList.sort(function (a, b) {
      return a[sortName] + (a.isDir ? 0 : 1234567890123456) - (b[sortName] + (b.isDir ? 0 : 1234567890123456));
    });
  }
  // else if (sortName === "size") {
  //   fileList.forEach(function (value) {
  //     if (value.isDir) {
  //       downloadDirs.push(value);
  //     } else {
  //       downloadFiles.push(value);
  //     }
  //   });
  //   downloadDirs.sort(function (a, b) {
  //     if (a.name < b.name) {
  //       return -1;
  //     } else if (a.name > b.name) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   });
  //   downloadFiles.sort(function (a, b) {
  //     return a.size - b.size;
  //   });
  //   downloadList = [];
  //   for (var i in downloadDirs) {
  //     downloadList.push(downloadDirs[i]);
  //   }
  //   for (var i in downloadFiles) {
  //     downloadList.push(downloadFiles[i]);
  //   }
  // }
  if (sortOrder === "DESC") {
    fileList.reverse();
  }
  // return fileList;
}
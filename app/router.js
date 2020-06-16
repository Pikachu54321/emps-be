"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  // 同步数据库
  app.beforeStart(async () => {
    await app.model.sync({ alter: true }); //force  false 为不覆盖 true会删除再创建; alter true可以 添加或删除字段;
  });

  const { router, controller } = app;
  // home
  // 获得首页参数
  router.get("/api/parameter", app.jwt, controller.home.parameter);

  // userAccess
  // 登陆
  router.post("/api/user/access/login", controller.userAccess.login);

  // project
  // 读取项目立项页路径配置参数
  router.get("/api/projects/project-new-path-parameters", app.jwt, controller.project.projectNewPathParameters);

  // file
  // 文件名不能包含下列任何字符 \ / : * ? " < > |
  // 读取指定目录下文件、文件夹(并且排序)
  router.post("/api/file/read-directory", app.jwt, controller.file.readDirectory);
  // 创建文件夹
  router.post("/api/file/new-folder", app.jwt, controller.file.newFolder);
  // 上传文件
  router.post("/api/uploads", app.jwt, controller.upload.multiple);

  // // 重命名文件夹、文件
  // router.post("file/rename", controller.userAccess.login);
  // // 删除文件夹、文件
  // router.post("file/delete", controller.userAccess.login);
  // // 下载文件夹、文件
  // router.post("file/download", controller.userAccess.login);
  // // 复制文件夹、文件
  // router.post("file/copy", controller.userAccess.login);

  // home重定向
  router.get("/*", controller.home.index);
};

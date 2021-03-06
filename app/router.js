"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  // 同步数据库
  app.beforeStart(async () => {
    await app.model.sync({ force: true }); //force: false 为不覆盖 true会删除再创建; alter: true可以 添加或删除字段;
  });

  const { router, controller } = app;
  // home
  // 获得首页参数
  router.get("/api/parameter", app.jwt, controller.home.parameter);

  // userAccess
  // 登陆
  router.post("/api/user/access/login", controller.userAccess.login);

  // user
  // 获得全部用户
  router.get("/api/users", app.jwt, controller.user.getusers);

  // project
  // 项目列表
  router.get("/api/projects", app.jwt, controller.project.index);
  // 项目立项
  router.post("/api/projects", app.jwt, controller.project.create);
  // 获得项目立项依据
  router.get("/api/projects/roots", app.jwt, controller.project.getRoots);
  // 读取项目立项主项目
  router.get("/api/projects/parent-projects", app.jwt, controller.project.getParentProjects);
  // 读取项目立项页路径配置参数
  router.get("/api/projects/project-new-path-parameters", app.jwt, controller.project.getProjectNewPathParameters);
  // 读取合同类型
  router.get("/api/projects/contract-types", app.jwt, controller.project.getContractTypes);
  // 读取联系人类型
  router.get("/api/projects/linkman-types", app.jwt, controller.project.getLinkmanTypes);
  // contract

  // file
  // 文件名不能包含下列任何字符 \ / : * ? " < > |
  // 读取指定目录下文件、文件夹(并且排序)
  router.post("/api/file/read-directory", app.jwt, controller.file.readDirectory);
  // 检查指定文件夹是否存在
  router.post("/api/file/check-directory", app.jwt, controller.file.checkDirectory);
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

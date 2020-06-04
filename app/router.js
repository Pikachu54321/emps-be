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
  router.get("/parameter", controller.home.parameter);

  // userAccess
  router.post("/api/user/access/login", controller.userAccess.login);

  router.get("/*", controller.home.index);

};

"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const LinkmanType = app.model.define("linkman_type", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    linkman_type: { type: STRING, comment: "联系人类型" },
    created_at: DATE,
    updated_at: DATE,
  });
  LinkmanType.associate = function () {
    app.model.LinkmanType.hasMany(app.model.Linkman);
  };
  return LinkmanType;
};  
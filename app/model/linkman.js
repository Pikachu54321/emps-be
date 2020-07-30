"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, DATE} = app.Sequelize;

  const Linkman = app.model.define("linkman", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    project_id: { type: INTEGER, comment: "项目id" },
    linkman_name: { type: STRING, comment: "联系人姓名" },
    linkman_type_id: { type: INTEGER, comment: "联系人类型" },
    linkman_company_name: { type: STRING, comment: "联系人单位" },
    linkman_duty: { type: STRING, comment: "联系人职务" },
    linkman_cellphone: { type: STRING, comment: "联系人手机" },
    linkman_phone: { type: STRING, comment: "联系人电话" },
    linkman_qq: { type: STRING, comment: "联系人QQ" },
    linkman_wechat: { type: STRING, comment: "联系人微信" },
    linkman_email: { type: STRING, comment: "联系人邮箱" },
    created_at: DATE,
    updated_at: DATE,
  });
  Linkman.associate = function () {
    // Linkman与Project(项目)存在多对一关系，所以使用belongsTo()
    app.model.Linkman.belongsTo(app.model.Project, { foreignKey: "project_id" });    
    // Linkman与LinkmanType(联系人类型)存在多对一关系，所以使用belongsTo()
    app.model.Linkman.belongsTo(app.model.LinkmanType, { foreignKey: "linkman_type_id" });      
  };

  return Linkman;
};
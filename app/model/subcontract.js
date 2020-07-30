"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, DATE,TEXT} = app.Sequelize;

  const Subcontract = app.model.define("subcontract", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    project_id: { type: INTEGER, comment: "项目id" },
    subcontract_name: { type: STRING(1024), comment: "分包商名称" },
    subcontract_sum: { type: STRING, comment: "合同金额" },
    subcontract_details: { type: TEXT, comment: "工作内容" },
    created_at: DATE,
    updated_at: DATE,
  });
  Subcontract.associate = function () {
    // 与LinkmanType(联系人类型)存在多对一关系，所以使用belongsTo()
    app.model.Subcontract.belongsTo(app.model.LinkmanType, { foreignKey: "linkman_type_id" });
    // 与LinkmanType(联系人类型)存在多对一关系，所以使用belongsTo()
    app.model.Subcontract.belongsTo(app.model.Project, { foreignKey: "project_id" });     
  };
  return Subcontract;
};
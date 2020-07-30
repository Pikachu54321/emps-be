"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, DATE, JSON ,TEXT} = app.Sequelize;

  const Contract = app.model.define("contract", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    project_id: { type: INTEGER, comment: "项目id" },
    contract_id_hd: { type: STRING, comment: "合同惠东id" },
    contract_id_jf: { type: STRING, comment: "合同甲方id" },
    contract_name: { type: STRING, comment: "合同名" },
    contract_type_id: { type: INTEGER, comment: "合同类型id" },
    partya_name: { type: STRING(1024), comment: "甲方名" },
    project_date_start: { type: DATE, comment: "工期开始" },
    project_date_end: { type: DATE, comment: "工期结束" },
    contract_date: { type: DATE, comment: "签订日期" },
    warranty: { type: INTEGER, comment: "质保期" },
    partya_linkman_name: { type: STRING, comment: "甲方联系人姓名" },
    partya_linkman_phone: { type: STRING, comment: "甲方联系人手机" },
    project_address: { type: STRING, comment: "项目地址" },
    partya_address: { type: STRING, comment: "甲方地址" },
    project_content:{ type: TEXT, comment: "项目内容" },
    created_at: DATE,
    updated_at: DATE,
  });
  Contract.associate = function () {
    // 与contractType(合同类型)存在多对一关系，所以使用belongsTo()
    app.model.Contract.belongsTo(app.model.ContractType, { foreignKey: "contract_type_id" });
    // 与project(项目)存在一对一关系，所以使用belongsTo()
    app.model.Contract.belongsTo(app.model.Project, { foreignKey: "project_id" });     
  };

  return Contract;
};
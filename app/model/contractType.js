"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const ContractType = app.model.define("contract_type", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    contract_type: { type: STRING, comment: "合同类型" },
    created_at: DATE,
    updated_at: DATE,
  });
  ContractType.associate = function () {
    app.model.ContractType.hasMany(app.model.Contract);
  };

  return ContractType;
};  
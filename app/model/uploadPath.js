"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, DATE, ENUM } = app.Sequelize;

  // 上传路径参数表
  const UploadPath = app.model.define("upload_path", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    upload_name: { type: STRING, unique: "upload_name_index", comment: "上传路径名" },
    upload_key: { type: STRING, unique: "upload_key_index", comment: "上传路径键" },
    upload_type: { type: ENUM, values: ["parent", "child"], allowNull: false, comment: "上传路径类型，父或子" },
    upload_relative_path: { type: STRING(1024), allowNull: false, comment: "上传相对路径" },
    // // 绝对路径可以和相同路径无关，当前有关联
    // upload_absolute_path: { type: STRING(1024), comment: "上传绝对路径" },
    created_at: DATE,
    updated_at: DATE,
  });
  return UploadPath;
};

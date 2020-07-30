"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, DATE, JSON, TEXT, ENUM } = app.Sequelize;

  const Project = app.model.define("project", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    project_name: { type: STRING, unique: "project_name_index", comment: "项目名称" },
    project_init_root_id: { type: INTEGER, comment: "立项依据" },
    project_init_root_date: { type: DATE, comment: "立项依据收到时间" },
    project_init_root_message: { type: TEXT, comment: "立项依据备注" },
    project_property: { type: ENUM("parent", "child"), comment: "项目属性" },
    project_relevance: INTEGER,
    // manager_id: { type: INTEGER, comment: "项目经理" },
    upload_path: { type: JSON, comment: "上传路径" },
    created_at: DATE,
    updated_at: DATE,
  });
  Project.associate = function () {
    // 与ProjectInitRoot(项目立项)存在多对一关系，所以使用belongsTo()
    app.model.Project.belongsTo(app.model.ProjectInitRoot, { foreignKey: "project_init_root_id" });
    // 与ProjectProperty(项目属性)存在多对一关系，所以使用belongsTo()
    // app.model.Project.belongsTo(app.model.ProjectProperty, { foreignKey: "project_property_id" });
    // 与User(用户即经理)存在多对一关系，所以使用belongsTo()
    app.model.Project.belongsTo(app.model.User, {
      as: "manager",
      foreignKey: "manager_id",
    });
    // 与User(用户即项目成员)存在多对多关系，所以使用belongsToMany()
    app.model.Project.belongsToMany(app.model.User, {
      as: "members",
      through: app.model.ProjectMember,
      foreignKey: "project_id",
      otherKey: "user_id",
    });
    // 与Contract(合同)存在一对一关系，所以使用hasOne()
    app.model.Project.hasOne(app.model.Contract);
    // 与Linkman(联系人)存在一对多关系，所以使用hasMany()
    app.model.Project.hasMany(app.model.Linkman);
    // 与Subcontract(分包)存在一对多关系，所以使用hasMany()
    app.model.Project.hasMany(app.model.Subcontract);
  };

  return Project;
};

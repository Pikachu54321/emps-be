"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const ProjectProperty = app.model.define("project_property", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    project_property: { type: STRING, comment: "项目属性" },
    created_at: DATE,
    updated_at: DATE,
  });
  // ProjectProperty.associate = function () {
  //   app.model.ProjectProperty.hasMany(app.model.Project);
  // };

  return ProjectProperty;
};
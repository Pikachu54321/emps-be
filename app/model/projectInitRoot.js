"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const ProjectInitRoot = app.model.define("project_init_root", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    init_root: { type: STRING, comment: "立项依据" },
    created_at: DATE,
    updated_at: DATE,
  });
  ProjectInitRoot.associate = function () {
    app.model.ProjectInitRoot.hasMany(app.model.Project);
  };
  ProjectInitRoot.findAllProjectRoots = async function () {
    return await this.findAll();
  };
  return ProjectInitRoot;
};

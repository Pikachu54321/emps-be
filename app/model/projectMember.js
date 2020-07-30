"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const ProjectMember = app.model.define("project_member", {    
    project_id: INTEGER,
    user_id: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  return ProjectMember;
};

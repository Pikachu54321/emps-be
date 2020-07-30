"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define("user", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user_name: { type: STRING(30), unique: "user_name_index" },
    password: STRING,
    mobile: { type: STRING(30), unique: "mobile_index" },
    email: { type: STRING, unique: "email_index" },
    real_name: STRING,
    avatar: { type: STRING, defaultValue: "https://1.gravatar.com/avatar/a3e54af3cb6e157e496ae430aed4f4a3?s=96&d=mm" },
    created_at: DATE,
    updated_at: DATE,
  });

  User.associate = function () {
    // 与User(用户即项目成员)存在多对多关系，所以使用belongsToMany()
    app.model.User.belongsToMany(app.model.Project, {
      as: "projects",
      through: app.model.ProjectMember,
      foreignKey: "user_id",
      otherKey: "project_id",
    });
    app.model.User.hasMany(app.model.Project, {
      foreignKey: "manager_id",
    });
  };
  User.findByUserName = async function (userName) {
    return await this.findOne({
      where: {
        user_name: userName,
      },
    });
  };
  return User;
};

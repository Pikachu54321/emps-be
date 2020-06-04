"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define("user", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    user_name: { type: STRING(30), unique: 'user_nameIndex' },
    password: STRING,
    mobile: { type: STRING(30), unique: 'mobileIndex' },
    email: { type: STRING, unique: 'emailIndex' },
    avatar: { type: STRING, defaultValue: "https://1.gravatar.com/avatar/a3e54af3cb6e157e496ae430aed4f4a3?s=96&d=mm" },
    created_at: DATE,
    updated_at: DATE,
  });

  User.findByUserName = async function (userName) {
    return await this.findOne({
      where: {
        user_name: userName,
      },
    });
  };

  return User;
};

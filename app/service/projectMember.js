"use strict";

const Service = require("egg").Service;

class ProjectMemberService extends Service {
  // 插入项目成员表
  async create(payload, t) {
    const projectMembers = await this.ctx.model.ProjectMember.create(payload, { transaction: t });
    return projectMembers;
  }
}
module.exports = ProjectMemberService;

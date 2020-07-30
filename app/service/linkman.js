"use strict";

const Service = require("egg").Service;

class LinkmenService extends Service {
  // 插入联系人表
  async create(payload, t) {
    const linkman = await this.ctx.model.Linkman.create(payload, { transaction: t });
    return linkman;
  }
}
module.exports = LinkmenService;
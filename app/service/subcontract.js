"use strict";

const Service = require("egg").Service;

class SubcontractService extends Service {
  // 插入联系人表
  async create(payload, t) {
    const subcontract = await this.ctx.model.Subcontract.create(payload, { transaction: t });
    return subcontract;
  }
}
module.exports = SubcontractService;
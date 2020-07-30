"use strict";

const Service = require("egg").Service;

class ContractService extends Service {
  // 插入合同表
  async create(payload, t) {
    const contract = await this.ctx.model.Contract.create(payload, { transaction: t });
    return contract;
  }
}
module.exports = ContractService;
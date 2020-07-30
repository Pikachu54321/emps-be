"use strict";

const Service = require("egg").Service;

class ContractTypeService extends Service {
  async findAllContractTypes() {
    return this.ctx.model.ContractType.findAll();
  }
}
module.exports = ContractTypeService;
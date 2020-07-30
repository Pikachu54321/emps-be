"use strict";

const Service = require("egg").Service;

class UploadPathService extends Service {
  async findAllUploadPaths() {
    return this.ctx.model.UploadPath.findAll();
  }
}
module.exports = UploadPathService;

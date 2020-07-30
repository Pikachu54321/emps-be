"use strict";

const Service = require("egg").Service;

class LinkmanTypeService extends Service {
  async findAll() {
    return this.ctx.model.LinkmanType.findAll();
  }
}
module.exports = LinkmanTypeService;
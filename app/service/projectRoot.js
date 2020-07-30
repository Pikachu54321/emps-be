"use strict";

const Service = require("egg").Service;

class ProjectRootService extends Service {
  async findAllProjectRoots() {
    return this.ctx.model.ProjectInitRoot.findAllProjectRoots();
  }
}
module.exports = ProjectRootService;

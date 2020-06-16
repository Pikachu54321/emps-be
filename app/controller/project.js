'use strict';

const Controller = require('egg').Controller;

class ProjectController extends Controller {
  async projectNewPathParameters() {
    const { ctx, service } = this;

    let res = {      
      projectNewFilePaths: [
        {
          text: "根目录",
          path: "",
          key:"rootDir",
          children: [
            {
              text: "技术协议",
              path: "/A03Business/A01TechProtocol",
              key:"technologyAgreementDir",
            },
            {
              text: "技术方案",
              path: "/A03Business/A01TechProtocol",
              key:"technologySchemeDir",
            },
            {
              text: "预算",
              path: "/A03Business/A01TechProtocol",
              key:"budgetDir",
            },
            {
              text: "决算",
              path: "/A03Business/A01TechProtocol",
              key:"settlementDir",
            },
            {
              text: "排产通知",
              path: "/A03Business/A01TechProtocol",
              key:"productionSchedulingNoticeDir",
            },
          ],
        },
      ],
    };
    
    ctx.helper.success({ ctx, res });
  }
}

module.exports = ProjectController;

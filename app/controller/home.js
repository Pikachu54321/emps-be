"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  // 首页
  async index() {
    const { ctx } = this;
    // ctx.body = 'hi, egg';
    
    await ctx.render("index.ejs");    
  }

  // 首页参数请求
  async parameter() {
    const { ctx } = this;    

    let res = {
      app: {
        name: "Alain",
        description: "Ng-zorro admin panel front-end framework",
      },
      user: {
        name: "Admin",
        avatar: "./assets/tmp/img/avatar.jpg",
        email: "cipchk@qq.com",
      },
      menu: [
        {
          text: "主导航",
          group: true,
          hideInBreadcrumb: true,
          children: [
            {
              text: "项目管理",
              icon: "anticon-project",
              children: [
                {
                  text: "项目立项",
                  icon: "anticon-file-add",
                  link: "/projects/new",
                },
                {
                  text: "项目列表",
                  icon: "anticon-radar-chart",
                  link: "/projects/list",
                },
              ],
            },
          ],
        },
      ],
    };
    
    ctx.helper.success({ ctx, res });
  }  
}

module.exports = HomeController;

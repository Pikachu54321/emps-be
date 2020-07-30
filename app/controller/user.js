"use strict";

const Controller = require("egg").Controller;

class UserController extends Controller {
  // 获得所有主项目
  async getusers() {
    const { ctx, service } = this;

    let res = {
      users: [
        {
          id: "1",
          name: "付晓晓",
        },
        {
          id: "2",
          name: "周毛毛",
        },
        {
          id: "3",
          name: "曲丽丽",
        },
        {
          id: "4",
          name: "王昭君",
        },
        {
          id: "5",
          name: "董娜娜",
        },
        {
          id: "6",
          name: "朱壮壮",
        },
        {
          id: "7",
          name: "刘诗诗",
        },
        {
          id: "8",
          name: "范冰冰",
        },
        {
          id: "9",
          name: "李冰冰",
        },
        {
          id: "10",
          name: "袁姗姗",
        },
        {
          id: "11",
          name: "蒋勤勤",
        },
        {
          id: "12",
          name: "金巧巧",
        },
        {
          id: "13",
          name: "宋丹丹",
        },
        {
          id: "14",
          name: "高圆圆",
        },
        {
          id: "15",
          name: "谭维维",
        },
        {
          id: "16",
          name: "郭晶晶",
        },
        {
          id: "17",
          name: "郑佩佩",
        },
        {
          id: "18",
          name: "张大大",
        },
      ],
    };

    ctx.helper.success({ ctx, res });
  }

}

module.exports = UserController;

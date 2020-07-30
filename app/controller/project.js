"use strict";

const Controller = require("egg").Controller;

class ProjectController extends Controller {
  // 创建项目
  async create() {
    const { ctx, service } = this;

    // 组装参数
    const payload = ctx.request.body || {};
    // 调用 Service 进行业务处理
    const date = await service.project.create(payload);

    ctx.helper.success({ ctx, res: date.res, msg: date.msg });
  }
  // 获得项目列表
  async index() {
    const { ctx, service } = this;

    // 调用 Service 进行业务处理
    const res = await service.project.index();
    ctx.helper.success({ ctx, res });
    // ctx.helper.success({ ctx, res: date.res, msg: date.msg });
  }  
  // 获得所有项目立项依据
  async getRoots() {
    const { ctx, service } = this;
    let projectRoots = await service.project.getRoots();
    let res = {
      projectRoots: projectRoots,
    };

    ctx.helper.success({ ctx, res });
  }
  // 获得所有主项目
  async getParentProjects() {
    const { ctx, service } = this;

    let res = {
      parentProjects: [
        {
          id: "1",
          name: "中俄东线天然气管道工程明水-哈尔滨支线站控系统买卖合同",
        },
        {
          id: "2",
          name: "辽宁大唐国际阜新煤制天然气项目管道输送工程SCADA系统设备",
        },
        {
          id: "3",
          name: "管道输送工程尹家输气站、20#阀室SCADA系统采购项目设备销售合同",
        },
        {
          id: "4",
          name: "站场区域化管理改造工程（加格达奇）技术服务合同",
        },
        {
          id: "5",
          name: "站场区域化管理改造工程（济南）技术服务合同",
        },
        {
          id: "6",
          name: "港枣线UPS供电系统改造项目站控系统调试部分技术服务合同",
        },
        {
          id: "7",
          name: "枣庄站混油处理装置升级改造工程（自动化部分）建设工程施工合同",
        },
        {
          id: "8",
          name: "长长吉线站场第三方数据通信冗余升级改造技术服务",
        },
        {
          id: "9",
          name: "管道线路视频监控项目（山东中油）",
        },
        {
          id: "10",
          name: "管道线路视频监控项目（济南公司）",
        },
        {
          id: "11",
          name: "管道秦皇岛输油气分公司管道线路视频监控系统建设项目合同",
        },
        {
          id: "12",
          name: "长长吉线站场第三方数据通信冗余升级改造技术服务",
        },
        {
          id: "13",
          name: "长江泄漏监测系统改造建设工程施工合同",
        },
        {
          id: "14",
          name: "钦南柳成品油管道电信仪设施改造施工合同",
        },
        {
          id: "15",
          name: "九台母站流量数据上传技术服务合同(中油洁能）",
        },
        {
          id: "16",
          name: "长长吉管道长岭首站与中俄东线联通工程（仪表专业）建设工程施工合同",
        },
        {
          id: "17",
          name: "庆铁三线、四线流量计故障排查检修及调试",
        },
        {
          id: "18",
          name: "可燃气体探测器与火焰检测器校验（垂杨站）",
        },
        {
          id: "18",
          name: "2020年长长吉输气管线仪表自动化系统代维合同",
        },
        {
          id: "19",
          name: "2020年平山输气管线仪表自动化系统代维技术服务合同",
        },
        {
          id: "20",
          name: "长吉线站控系统功能检测与维护技术服务合同",
        },
        {
          id: "21",
          name: "2020年仪表自动化专业春秋季检测与维护技术服务合同（内蒙）",
        },
        {
          id: "22",
          name: "港枣线管道线路视频监控建设合同",
        },
        {
          id: "23",
          name: "2020年津华线管道线路视频监控建设",
        },
        {
          id: "24",
          name: "HDYW2020-07 庆铁三线、四线站场改造工程项目管理技术服务合同（沈阳惠东）变更协议一",
        },
        {
          id: "25",
          name: "2020年抚顺市东洲区天然气综合利用工程技术服务合同",
        },
        {
          id: "26",
          name: "油气储库自控系统维保服务合同",
        },
        {
          id: "27",
          name: "中俄东线中段实施技术服务合",
        },
        {
          id: "28",
          name: "曹妃甸新天液化天然气有限公司全生命周期管理平台实施技术服务合同",
        },
        {
          id: "29",
          name: "锦州分公司区域化管理改造工程（暂定名称）",
        },
        {
          id: "30",
          name: "土默特右旗输油站加热炉控制信号调试技术服务合同",
        },
      ],
    };

    ctx.helper.success({ ctx, res });
  }

  // 获得合同类型参数
  async getContractTypes() {
    const { ctx, service } = this;
    let contractTypes = await service.project.getContractTypes();
    let res = {
      contractTypes: contractTypes,
    };

    ctx.helper.success({ ctx, res });
  }
  // 获得联系人类型参数
  async getLinkmanTypes() {
    const { ctx, service } = this;
    let linkmanTypes = await service.project.getLinkmanTypes();
    let res = {
      linkmanTypes: linkmanTypes,
    };

    ctx.helper.success({ ctx, res });
  }

  // 获得上传路径参数
  async getProjectNewPathParameters() {
    const { ctx, service } = this;

    // 调用 Service 进行业务处理
    const projectNewFilePaths = await service.project.getProjectNewPathParameters();

    let res = {
      projectNewFilePaths: projectNewFilePaths,
    };

    ctx.helper.success({ ctx, res });
  }
}

module.exports = ProjectController;

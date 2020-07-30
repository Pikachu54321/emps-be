"use strict";

const fs = require("fs");
const path = require("path");
const Service = require("egg").Service;

class ProjectService extends Service {
  // 获得项目列表
  async index() {
    const { ctx, service } = this;
    let data = await this.getProjectLists();
    
    return res;
  }
  // 得到项目列表
  async getProjectLists() {
    const { ctx, service } = this;
    // 插入项目表
    const project = await ctx.model.Project.findAll({
      include: [
        {
          model: ctx.model.ProjectInitRoot,
        },
        {
          model: ctx.model.User,
          as: "manager",
        },
        {
          model: ctx.model.User,
          as: "members",
        },
        {
          model: ctx.model.Contract,
          include: {
            model: ctx.model.ContractType,
          },
        },
        {
          model: ctx.model.Linkman,
          include: {
            model: ctx.model.LinkmanType,
          },
        },
        {
          model: ctx.model.Subcontract,
        },
      ],
    });
    // 整理对象
    return project;
  }
  // 创建新项目
  async create(payload) {
    const { ctx, service } = this;
    // 创建新项目的参数
    let newProject = {
      project_name: payload.basicInfo.projectName,
      project_init_root_id: payload.basicInfo.initRoot && payload.basicInfo.initRoot.id,
      project_init_root_date: payload.basicInfo.initRootDate && new Date(payload.basicInfo.initRootDate),
      project_init_root_message: payload.basicInfo.initRootMessage,
      project_property: payload.basicInfo.projectProperty,
      project_relevance: payload.basicInfo.projectRelevance && +payload.basicInfo.projectRelevance.id,
      manager_id: payload.basicInfo.projectManager && +payload.basicInfo.projectManager.id,
      upload_path: payload.dataInfo.uploadPath,
    };
    // 创建新合同的参数
    let newContract = {
      project_id: null,
      contract_id_hd: payload.contractInfo.contractIDHD,
      contract_id_jf: payload.contractInfo.contractIDJF,
      contract_name: payload.contractInfo.contractName,
      contract_type_id: payload.contractInfo.contractType && payload.contractInfo.contractType.id,
      partya_name: payload.contractInfo.partyAName,
      project_date_start: payload.contractInfo.projectDateRange && payload.contractInfo.projectDateRange[0],
      project_date_end: payload.contractInfo.projectDateRange && payload.contractInfo.projectDateRange[1],
      contract_date: payload.contractInfo.contractDate,
      warranty: payload.contractInfo.warranty,
      partya_linkman_name: payload.contractInfo.partyALinkmanName,
      partya_linkman_phone: payload.contractInfo.partyALinkmanPhone,
      project_address: payload.contractInfo.projectAddress,
      partya_address: payload.contractInfo.partyAAddress,
      project_content: payload.contractInfo.projectContent,
    };

    // 事务
    const t = await ctx.model.transaction();

    try {
      // 插入项目表
      const project = await ctx.model.Project.create(newProject, { transaction: t });
      // 插入项目成员表
      const projectMembers = [];
      if (payload.basicInfo.projectMembers) {
        for (let i = 0; i < payload.basicInfo.projectMembers.length; i++) {
          projectMembers[i] = await service.projectMember.create(
            {
              project_id: project.id,
              user_id: +payload.basicInfo.projectMembers[i].id,
            },
            t
          );
        }
      }

      // 插入合同表
      let newContractIsNull = Object.keys(newContract).every(function (key, index, array) {
        return newContract[key] === null;
      });
      newContract.project_id = project.id;
      let contract = null;
      // 如果newContractIsNull===true表示，没有合同参数
      // 如果newContractIsNull!==true表示，有合同参数
      if (!newContractIsNull) {
        contract = await service.contract.create(newContract, t);
      }

      // 插入联系人表
      let linkmenInfo = [];
      for (let i = 0; i < payload.manageInfo.linkmenInfo.length; i++) {
        linkmenInfo[i] = await service.linkman.create(
          {
            project_id: project.id,
            linkman_name: payload.manageInfo.linkmenInfo[i].linkmanName,
            linkman_type_id: payload.manageInfo.linkmenInfo[i].linkmanType && payload.manageInfo.linkmenInfo[i].linkmanType.id,
            linkman_company_name: payload.manageInfo.linkmenInfo[i].linkmanDuty,
            linkman_duty: payload.manageInfo.linkmenInfo[i].linkmanDuty,
            linkman_cellphone: payload.manageInfo.linkmenInfo[i].linkmanCellphone,
            linkman_phone: payload.manageInfo.linkmenInfo[i].linkmanPhone,
            linkman_qq: payload.manageInfo.linkmenInfo[i].linkmanQQ,
            linkman_wechat: payload.manageInfo.linkmenInfo[i].linkmanWeChat,
            linkman_email: payload.manageInfo.linkmenInfo[i].linkmanEmail,
          },
          t
        );
      }
      // 插入分包表
      let subcontractInfo = [];
      for (let i = 0; i < payload.subcontractInfo.length; i++) {
        subcontractInfo[i] = await service.subcontract.create(
          {
            project_id: project.id,
            subcontract_name: payload.subcontractInfo[i].subcontractName,
            subcontract_sum: payload.subcontractInfo[i].subcontractSum,
            subcontract_details: payload.subcontractInfo[i].subcontractDetails,
          },
          t
        );
      }
      // 复制文件到指定目录
      for (let i = 0; i < payload.dataInfo.uploadFileLists.length; i++) {
        payload.dataInfo.uploadPath.children[i].file = [];
        for (let j = 0; j < payload.dataInfo.uploadFileLists[i].length; j++) {
          // 如果文件上传到临时文件夹，即不是导入的是上传的
          if (payload.dataInfo.uploadFileLists[i][j].tempUrl) {
            let src = path.join(__dirname, "../../" + ctx.app.config.FileTempDir + "/" + payload.dataInfo.uploadFileLists[i][j].tempUrl);
            let dest = new URL(ctx.app.config.FileRootDir + "/" + payload.dataInfo.uploadPath.children[i].absolutePath + "/" + payload.dataInfo.uploadFileLists[i][j].name);
            try {
              // 文件已存在，复制文件加后缀
              fs.accessSync(dest, fs.constants.F_OK);
              // 加日期后缀
              let fileName = payload.dataInfo.uploadFileLists[i][j].name;
              fileName = fileName.slice(0, fileName.lastIndexOf(".")) + "_" + ctx.helper.formatUploadFileDate(new Date()) + fileName.slice(fileName.lastIndexOf("."));
              dest = new URL(ctx.app.config.FileRootDir + "/" + payload.dataInfo.uploadPath.children[i].absolutePath + "/" + fileName);
              fs.copyFileSync(src, dest);
              // 更新uploadPath对象，加入文件
              payload.dataInfo.uploadPath.children[i].file.push({
                fileName: fileName,
              });
            } catch (err) {
              // 文件不存在，复制文件
              fs.copyFileSync(src, dest);
              // 更新uploadPath对象，加入文件
              payload.dataInfo.uploadPath.children[i].file.push({
                fileName: payload.dataInfo.uploadFileLists[i][j].name,
              });
            }
          } else {
            // 不是上传的文件，是导入的文件
            // 更新uploadPath对象，加入文件
            payload.dataInfo.uploadPath.children[i].file.push({
              fileName: payload.dataInfo.uploadFileLists[i][j].name,
            });
          }
        }
      }
      // 更新Project的uploadPath对象
      await ctx.model.Project.update(
        { upload_path: payload.dataInfo.uploadPath },
        {
          where: {
            id: project.id,
          },
          transaction: t,
        }
      );

      await t.commit();
      let date = {
        res: null,
        msg: "ok",
      };
      return date;
    } catch (e) {
      await t.rollback();
      // ctx.helper.success({ ctx, res: null, msg: e.message });
      let date = {
        res: null,
        msg: e.toString(),
      };
      return date;
    }
  }
  // 获得所有项目立项依据
  async getRoots() {
    const { ctx, service } = this;
    const projectRoots = await service.projectRoot.findAllProjectRoots();
    let res = [];
    // 生成前端需要的对象结构
    for (let i = 0; i < projectRoots.length; i++) {
      res.push({
        id: projectRoots[i].id,
        name: projectRoots[i].init_root,
      });
    }
    return res;
  }
  // 获得所有合同类型
  async getContractTypes() {
    const { ctx, service } = this;
    const contractTypes = await service.contractType.findAllContractTypes();
    let res = [];
    // 生成前端需要的对象结构
    for (let i = 0; i < contractTypes.length; i++) {
      res.push({
        id: contractTypes[i].id,
        name: contractTypes[i].contract_type,
      });
    }
    return res;
  }
  // 获得所有联系人类型
  async getLinkmanTypes() {
    const { ctx, service } = this;
    const linkmanTypes = await service.linkmanType.findAll();
    let res = [];
    // 生成前端需要的对象结构
    for (let i = 0; i < linkmanTypes.length; i++) {
      res.push({
        id: linkmanTypes[i].id,
        name: linkmanTypes[i].linkman_type,
      });
    }
    return res;
  }
  // 获得上传路径参数
  async getProjectNewPathParameters() {
    const { ctx, service } = this;
    const uploadPath = await service.uploadPath.findAllUploadPaths();
    let projectNewFilePaths = [];
    // 寻找根目录
    for (let i = 0; i < uploadPath.length; i++) {
      // 如果是根目录
      if (uploadPath[i].upload_type === "parent") {
        projectNewFilePaths[0] = {
          text: uploadPath[i].upload_name,
          path: uploadPath[i].upload_relative_path,
          key: uploadPath[i].upload_key,
          children: [],
        };
        break;
      }
    }
    // 寻找子目录
    for (let i = 0; i < uploadPath.length; i++) {
      // 如果是子目录
      if (uploadPath[i].upload_type === "child") {
        projectNewFilePaths[0].children.push({
          text: uploadPath[i].upload_name,
          path: uploadPath[i].upload_relative_path,
          key: uploadPath[i].upload_key,
        });
      }
    }

    return projectNewFilePaths;
  }
}
module.exports = ProjectService;

-- 一般我会这样建表
-- companies 公司表

-- company_id 主键，自增
-- conpany_name 公司名字

-- departments 部门表

-- department_id 部门id 主键，自增
-- department_name 部门名字
-- company_id 外键，关联到公司表

-- jobs 岗位表

-- job_id 岗位id，主键，自增
-- job_name 岗位名称
-- department_id 部门 id

-- = 。 =这样一层一层关系就下来。。
-- 这几张写状态不多，读状态多，如果要计数一下岗位数量啊，部门数量啊，可以开比如 company_status 这种表

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) DEFAULT NULL COMMENT '工作单位',
  `department_id` int(11) DEFAULT NULL COMMENT '工作部门',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `cellphone` varchar(20) DEFAULT NULL COMMENT '手机',
  `telephone` varchar(20) DEFAULT NULL COMMENT '电话',
  `identity` varchar(50) DEFAULT NULL COMMENT '身份证',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- ----------------------------
-- Table structure for companies
-- ----------------------------
DROP TABLE IF EXISTS `companies`;
CREATE TABLE `companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company` varchar(100) DEFAULT NULL COMMENT '工作单位',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `companies` VALUES ('1', '沈阳惠东管道控制有限公司');
-- ----------------------------
-- Table structure for departments
-- ----------------------------
DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department` varchar(50) DEFAULT NULL COMMENT '工作部门',
  `company_id` int(11) DEFAULT NULL COMMENT '工作单位id',
  PRIMARY KEY (`id`),
  KEY `company_id_fkey` (`company_id`),
  CONSTRAINT `company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- companies
INSERT INTO `companies` VALUES ('1', '沈阳惠东管道控制有限公司');
INSERT INTO `companies` VALUES ('1', '沈阳惠东管道控制有限公司',NOW(),NOW());
INSERT INTO `companies` VALUES ('2', '沈阳东油（集团）股份有限公司',NOW(),NOW());
INSERT INTO `companies` VALUES ('3', '宝鸡有一群怀揣着梦想的少年相信在牛大叔的带领下会创造生命的奇迹网络科技有限公司',NOW(),NOW());
-- departments
INSERT INTO `departments` VALUES ('1', '公司领导', '1', NOW(), NOW());
INSERT INTO `departments` VALUES ('2', '办公室', '1', NOW(), NOW());
INSERT INTO `departments` VALUES ('3', '财务部', '1', NOW(), NOW());
INSERT INTO `departments` VALUES ('4', '市场部', '1', NOW(), NOW());
INSERT INTO `departments` VALUES ('5', '项目管理', '1', NOW(), NOW());
INSERT INTO `departments` VALUES ('6', '科技部', '1', NOW(), NOW());
INSERT INTO `departments` VALUES ('7', '工程部', '1', NOW(), NOW());
INSERT INTO `departments` VALUES ('8', '支持部', '1', NOW(), NOW());
INSERT INTO `departments` VALUES ('9', '工人', '1', NOW(), NOW());
-- user
-- $2a$10$UyZu4KTGdo36xXv/8cmztu4vEBwR2pfwVgtoOskrRmmIuSnLhQt4u  密码：Zy680030@
INSERT INTO `user` VALUES (1, 'fuxiaoxiao', '$2a$10$UyZu4KTGdo36xXv/8cmztu4vEBwR2pfwVgtoOskrRmmIuSnLhQt4u', '13080872600', 'zy66680033@sina.com', '付晓晓', './assets/tmp/img/avatar.jpg'
, NOW(), NOW(), NULL);
-- $2a$10$uqW4OL1ZlItMzhFwnTXqFuBo.6mkBhcLe9IJAVN3yTRjuseIHBEey  密码：ng-alain.com
INSERT INTO `user` VALUES (2, 'admin', '$2a$10$uqW4OL1ZlItMzhFwnTXqFuBo.6mkBhcLe9IJAVN3yTRjuseIHBEey', '13080872601', 'zyp66680033@sina.com', '周毛毛','./assets/tmp/img/avatar.jpg'
, NOW(), NOW(), NULL);
INSERT INTO `user` VALUES (3, 'qulili', '$2a$10$uqW4OL1ZlItMzhFwnTXqFuBo.6mkBhcLe9IJAVN3yTRjuseIHBEey', '13080872602', 'zy166680033@sina.com', '曲丽丽','./assets/tmp/img/avatar.jpg'
, NOW(), NOW(), NULL);
-- upload_path 上传路径参数表
INSERT INTO `upload_path` VALUES (1, '根目录', 'rootDir', 'parent', ''
, NOW(), NOW(), NULL);
INSERT INTO `upload_path` VALUES (2, '合同', 'contractDir', 'child', '/A03Business/A02Contract'
, NOW(), NOW(), NULL);
INSERT INTO `upload_path` VALUES (3, '技术协议', 'technologyAgreementDir', 'child', '/A03Business/A01TechProtocol'
, NOW(), NOW(), NULL);
INSERT INTO `upload_path` VALUES (4, '技术方案', 'technologySchemeDir', 'child', '/A03Business/A01TechProtocol'
, NOW(), NOW(), NULL);
INSERT INTO `upload_path` VALUES (5, '预算', 'budgetDir', 'child', '/A03Business/A01TechProtocol'
, NOW(), NOW(), NULL);
INSERT INTO `upload_path` VALUES (6, '决算', 'settlementDir', 'child', '/A03Business/A01TechProtocol'
, NOW(), NOW(), NULL);
INSERT INTO `upload_path` VALUES (7, '排产通知', 'productionSchedulingNoticeDir', 'child', '/A03Business/A01TechProtocol'
, NOW(), NOW(), NULL);
-- project_init_root 项目立项表
INSERT INTO `project_init_root` VALUES (1, '合同', NOW(), NOW(), NULL);
INSERT INTO `project_init_root` VALUES (2, '内部通知', NOW(), NOW(), NULL);
INSERT INTO `project_init_root` VALUES (3, '排产通知', NOW(), NOW(), NULL);
-- contract_type 合同类型
INSERT INTO `contract_type` VALUES (1, '工程合同', NOW(), NOW(), NULL);
INSERT INTO `contract_type` VALUES (2, '技术服务', NOW(), NOW(), NULL);
INSERT INTO `contract_type` VALUES (3, '设备销售', NOW(), NOW(), NULL);
INSERT INTO `contract_type` VALUES (4, '其他', NOW(), NOW(), NULL);
-- linkman_type 联系人类型
INSERT INTO `linkman_type` VALUES (1, '甲方', NOW(), NOW(), NULL);
INSERT INTO `linkman_type` VALUES (2, '业主', NOW(), NOW(), NULL);
INSERT INTO `linkman_type` VALUES (3, '建设', NOW(), NOW(), NULL);
INSERT INTO `linkman_type` VALUES (4, '运维', NOW(), NOW(), NULL);
INSERT INTO `linkman_type` VALUES (5, '监理', NOW(), NOW(), NULL);
INSERT INTO `linkman_type` VALUES (6, '厂家', NOW(), NOW(), NULL);
INSERT INTO `linkman_type` VALUES (7, '站长', NOW(), NOW(), NULL);

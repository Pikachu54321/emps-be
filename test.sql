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
-- users
-- $2a$10$UyZu4KTGdo36xXv/8cmztu4vEBwR2pfwVgtoOskrRmmIuSnLhQt4u
INSERT INTO `users` VALUES (1, 'zhangyang', 'Zy680030@', '13080872600', 'zy66680033@sina.com', './assets/tmp/img/avatar.jpg'
, NOW(), NOW());
-- $2a$10$uqW4OL1ZlItMzhFwnTXqFuBo.6mkBhcLe9IJAVN3yTRjuseIHBEey
INSERT INTO `users` VALUES (2, 'admin', 'ng-alain.com', '13080872601', 'zyp66680033@sina.com', './assets/tmp/img/avatar.jpg'
, NOW(), NOW());
-- categories
INSERT INTO `categories` VALUES ('1', '新闻中心', '0' , '1', 
'','newsCenter', NOW(), NOW());
INSERT INTO `categories` VALUES ('2', '通知公告', '0' , '2', 
'','notification', NOW(), NOW());
INSERT INTO `categories` VALUES ('3', '技术支持库', '0' , '3', 
'','technicalSupportLibrary', NOW(), NOW());
INSERT INTO `categories` VALUES ('4', '时事新闻', '1' , '1', 
'','currentNews', NOW(), NOW());
INSERT INTO `categories` VALUES ('5', '党建文化', '1' , '2', 
'','partyCulture', NOW(), NOW());
INSERT INTO `categories` VALUES ('6', '专业技术', '1' , '3', 
'','professionalSkill', NOW(), NOW());
INSERT INTO `categories` VALUES ('7', '质量安全', '1' , '4', 
'','qualitySafety', NOW(), NOW());
INSERT INTO `categories` VALUES ('8', '节能环保', '1' , '5', 
'','environmentalCare', NOW(), NOW());
INSERT INTO `categories` VALUES ('9', '创新工作室', '1' , '6', 
'','newStudio', NOW(), NOW());
INSERT INTO `categories` VALUES ('10', '中石油集团', '2' , '1', 
'','CNPC', NOW(), NOW());
INSERT INTO `categories` VALUES ('11', '中石油管道局', '2' , '2', 
'','CPP', NOW(), NOW());
INSERT INTO `categories` VALUES ('12', '东北管道局', '2' , '3', 
'','northeastPlumbing' NOW(), NOW());
INSERT INTO `categories` VALUES ('13', '沈阳惠东管道公司', '2' , '4', 
'','ShenyangHuidongPipelineControl' NOW(), NOW());
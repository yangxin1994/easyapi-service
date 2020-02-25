export const baseUrl = "https://api2.easyapi.com";

//获取用户服务列表
export const getUserService = `${baseUrl}/console/user/services`;

//接口统计
export const interfaceStatistics = `${baseUrl}/console/serviceEveryday`;

//团队服务详情 GET 获取秘钥信息GET
export const Surplus = `${baseUrl}/console/teamService`;

//获取我的余额提醒GET
export const Reminding = `${baseUrl}/console/balanceRemind/team`;

//修改余额提醒设置PUT
export const modifyBalance = `${baseUrl}/console/balanceRemind`;

//获取服务的成员列表GET 未加入服务的成员列表GET
export const memberList = `${baseUrl}/console/service/`;

//添加成员POST
export const addMembers = `${baseUrl}/console/userService`;

export const domainUrl = "https://api2.easyapi.com";

//获取用户信息
export const getAccountInfo = `https://account-api.easyapi.com/api/account`;
//获取团队列表
export const getMyTeam = `https://account-api.easyapi.com/api/userTeam/mine`;
export const getUserTeamList = `https://account-api.easyapi.com/api/user/teams`;
//获取用户服务列表
export const getUserService = `${domainUrl}/console/user/services`;
//切换团队
export const changeTeam = `https://account-api.easyapi.com/api/changeTeam`;
//获取我的白名单
export const getWhiteList = `${domainUrl}/console/whiteList/check`;
//修改白名单设置
export const updateWhiteList = `${domainUrl}/console/whiteList`;
//接口统计
export const interfaceStatistics = `${domainUrl}/console/serviceEveryday`;
//团队服务详情 GET 获取秘钥信息GET
export const Surplus = `${domainUrl}/console/teamService`;
//获取我的余额提醒GET
export const Reminding = `${domainUrl}/console/balanceRemind/team`;
//修改余额提醒设置PUT
export const modifyBalance = `${domainUrl}/console/balanceRemind`;
//获取服务的成员列表GET 未加入服务的成员列表GET
export const memberList = `${domainUrl}/console/service/`;
//添加成员POST
export const addMembers = `${domainUrl}/console/userService`;

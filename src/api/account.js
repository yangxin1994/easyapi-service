export const domainUrl = "https://account-api.easyapi.com";

//获取用户信息
export const getAccountInfo = `${domainUrl}/api/account`;

//获取用户团队列表
export const getUserTeamList = `${domainUrl}/api/user/teams`;

/**
 * 切换团队
 *
 * @see https://www.easyai.com
 */
export const changeTeam = (domain) => axios.post(`${baseUrl}/api/changeTeam/${domain}`);

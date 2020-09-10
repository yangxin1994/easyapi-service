export const domainUrl = "https://account-api.easyapi.com";
import axios from "axios";

//获取用户信息
export const getAccountInfo = `${domainUrl}/api/account`;

//获取用户团队列表
export const getUserTeamList = `${domainUrl}/api/user/teams`;

/**
 * 切换团队
 *
 * @see https://www.easyai.com
 */
export const changeTeam = (teamId) => axios.put(`${domainUrl}/api/team/${teamId}/change`);

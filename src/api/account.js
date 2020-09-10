export const domainUrl = "https://account-api.easyapi.com";
import axios from "axios";

/**
 * 获取用户信息
 **
 * @see https://www.easyai.com
 */
export const getAccount = () => axios.get(`${domainUrl}/api/account`);

/**
 * 获取用户团队列表
 **
 * @see https://www.easyai.com
 */
export const getUserTeamList = () => axios.get(`${domainUrl}/api/user/teams`);

/**
 * 切换团队
 *
 * @see https://www.easyai.com
 */
export const changeTeam = (teamId) => axios.put(`${domainUrl}/api/team/${teamId}/change`);

import { accountUrl } from "./api";

import axios from "axios";


/**
 * 获取用户信息
 **
 * @see https://www.easyai.com
 */
export const getAccount = () => axios.get(`${accountUrl}/api/account`);

/**
 * 获取用户团队列表
 **
 * @see https://www.easyai.com
 */
export const getUserTeamList = () => axios.get(`${accountUrl}/api/user/teams`);

/**
 * 切换团队
 *
 * @see https://www.easyai.com
 */
export const changeTeam = (teamId) => axios.put(`${accountUrl}/api/team/${teamId}/change`);

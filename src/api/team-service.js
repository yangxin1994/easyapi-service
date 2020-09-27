import { serviceUrl } from "./api";

import axios from "axios";


/**
 * 获取团队与服务关系信息
 **
 * @see https://www.easyai.com
 */
export const getTeamService = (id) => axios.get(`${serviceUrl}/console/team-service/${id}`, id);
/**
 * 充值应用KEY和密钥
 **
 * @see https://www.easyai.com
 */
export const resetKey = (teamServiceId) => axios.put(`${serviceUrl}/console/team-service/${teamServiceId}/reset-key`);

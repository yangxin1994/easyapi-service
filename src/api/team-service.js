import { baseUrl } from "./api";
import axios from "axios";

/**
 * 获取团队与服务关系信息
 **
 * @see https://www.easyai.com
 */
export const getTeamService = () => axios.get(`${baseUrl}/console/team-service/${id}`);

/**
 * 充值应用KEY和密钥
 **
 * @see https://www.easyai.com
 */
export const resetKey = (teamServiceId) => axios.put(`${baseUrl}/console/team-service/${teamServiceId}/reset-key`);

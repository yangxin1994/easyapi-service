import { baseUrl } from "./api";
import axios from "axios";

/**
 * 获取我的服务
 **
 * @see https://www.easyai.com
 */
export const getUserServiceList = (params) => axios.get(`${baseUrl}/console/user/services`, { params: params });


/**
 * 获取未加入服务的团队成员列表
 **
 * @see https://www.easyai.com
 */
export const getUnJoinUserList = (serviceId) => axios.get(`${baseUrl}/console/service/${serviceId}/unJoinUsers`, { params: params });


/**
 * 获取当前团队服务所有的用户列表
 **
 * @see https://www.easyai.com
 */
export const getServiceUserList = (serviceId, params) => axios.get(`${baseUrl}/console/service/${serviceId}/users`, { params: params });


/**
 * 添加服务成员
 **
 * @see https://www.easyai.com
 */
export const createUserService = (data) => axios.post(`${baseUrl}/console/user-service`, data);


/**
 * 删除服务成员
 **
 * @see https://www.easyai.com
 */
export const userService = (data) => axios.delete(`${baseUrl}/console/whiteList`, data);

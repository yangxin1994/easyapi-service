export const baseUrl = "https://api2.easyapi.com";
import axios from "axios";

/**
 * 获取我的余额提醒
 **
 * @see https://www.easyai.com
 */
export const getBalanceRemind = (serviceId) => axios.get(`${baseUrl}/console/balanceRemind/team/${serviceId}`);

/**
 * 获取余额提醒列表
 **
 * @see https://www.easyai.com
 */
export const getBalanceRemindList = (params) => axios.get(`${baseUrl}/console/balanceRemind`, { params: params });


/**
 * 修改余额提醒设置
 **
 * @see https://www.easyai.com
 */
export const updateBalanceRemind = (data) => axios.put(`${baseUrl}/console/serviceEveryday`, data);


/**
 * 获取每日统计
 **
 * @see https://www.easyai.com
 */
export const getServiceEveryday = (params) => axios.get(`${baseUrl}/console/serviceEveryday`, { params: params });

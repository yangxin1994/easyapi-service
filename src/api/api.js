export const serviceUrl = "https://api2.easyapi.com";

export const accountUrl = "https://account-api.easyapi.com";

import axios from "axios";

/**
 * 获取我的余额提醒
 **
 * @see https://www.easyai.com
 */
export const getBalanceRemind = (serviceId) => axios.get(`${serviceUrl}/console/balanceRemind/team/${serviceId}`);

/**
 * 获取余额提醒列表
 **
 * @see https://www.easyai.com
 */
export const getBalanceRemindList = (params) => axios.get(`${serviceUrl}/console/balanceRemind`, { params: params });


/**
 * 修改余额提醒设置
 **
 * @see https://www.easyai.com
 */
export const updateBalanceRemind = (data) => axios.put(`${serviceUrl}/console/serviceEveryday`, data);


/**
 * 获取每日统计
 **
 * @see https://www.easyai.com
 */
export const getServiceEveryday = (params) => axios.get(`${serviceUrl}/console/serviceEveryday`, { params: params });

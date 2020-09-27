import { serviceUrl } from "./api";

import axios from "./request";

/**
 * 获取我的白名单
 **
 * @see https://www.easyai.com
 */
export const getWhiteList = () => axios.get(`${serviceUrl}/console/whiteList/check`);

/**
 * 修改白名单设置
 **
 * @see https://www.easyai.com
 */
export const updateWhiteList = (data) => axios.put(`${serviceUrl}/console/whiteList`, data);

import { baseUrl } from "./api";
import axios from "axios";

/**
 * 获取我的白名单
 **
 * @see https://www.easyai.com
 */
export const getWhiteList = () => axios.post(`${baseUrl}/console/whiteList/check`);

/**
 * 修改白名单设置
 **
 * @see https://www.easyai.com
 */
export const updateWhiteList = (data) => axios.put(`${baseUrl}/console/whiteList`, {
  data: {
    data
  }
});

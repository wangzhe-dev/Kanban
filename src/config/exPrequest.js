/*
 * @Author: zwn7 943987243@qq.com
 * @Date: 2022-07-14 15:47:01
 * @LastEditors: zhaijinsong
 * @LastEditTime: 2024-06-17 08:22:17
 * @FilePath: /wutongse-screen/src/config/request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "axios";
import { baseUrl } from "./env.js";
import { getQueryByName, getQueryString } from "../utils/index.js";
import { MessageBox, Message } from "element-ui";
import router from "@/router";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const request = axios.create({
  timeout: 12000,
  baseURL: process.env.VUE_APP_BASE_URL,
  withCredentials: false,
});

// 添加请求拦截器
request.interceptors.request.use((config) => {
  // config.headers["Authorization"] = `Bearer ${getQueryByName('token')}`
  config.headers["Content-Type"] = config.setHeader
    ? config.setHeader
    : "application/json;charset=UTF-8";
  if (config.method === "post") {
    config.data = {
      // companyId,
      ...config.data,
    };
  } else if (config.method === "get") {
    config.params = {
      // companyId,
      ...config.params,
    };
  }
  return config;
});
// 添加响应拦截器
request.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    console.log(error);
    // if (error.response.status === 405) {
    //   let errCode = error.response.data.code;
    //   source.cancel();
    // } else if (error.response.data.message.includes("Token失效")) {
    //   source.cancel();
    //   MessageBox.alert("Token失效，请重新登录", "系统提示", {
    //     confirmButtonText: "确定",
    //     type: "warning",
    //   }).then(() => {
    //     try {
    //       MessageBox.close(false);
    //       let reg = new RegExp("/mcm");
    //       let url = baseUrl.replace(reg, "") + "/user/login";
    //       window.location.href = url;
    //     } catch (e) {
    //       MessageBox.close(false);
    //       let reg = new RegExp("/jeecg-boot");
    //       let url = baseUrl.replace(reg, "") + "/user/login";
    //       window.location.href = url;
    //     }
    //   });
    // }
    return Promise.reject(error);
  }
);

export default request;

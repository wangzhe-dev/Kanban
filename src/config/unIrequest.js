/*
 * @Author: zwn7 943987243@qq.com
 * @Date: 2022-07-14 15:47:01
 * @LastEditors: zwn7 943987243@qq.com
 * @LastEditTime: 2022-08-18 18:30:18
 * @FilePath: /wutongse-screen/src/config/request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "axios";
import {baseUrl} from "./env.js";
import {HEADERS} from "./constant";
import {getQueryByName, getQueryString} from "../utils";
import {MessageBox, Message} from "element-ui";
import router from "@/router";
// let shareFlag = !getQueryByName('token') && localStorage.getItem("shareId") ? 'share/' : 'token'
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const request = axios.create({
  timeout: 12000,
  baseURL: baseUrl,
  withCredentials: false,
});

// 添加请求拦截器
request.interceptors.request.use((config) => {
  config.cancelToken = source.token;
  config.headers["extractionCode"] =
    localStorage.getItem("extractionCode") ||
    getQueryByName("extractionCode") ||
    getQueryString("extractionCode") ||
    "1";
  config.headers["shareId"] = HEADERS["shareId"];
  config.headers["tenant_id"] = HEADERS["tenant_id"];
  config.headers["X-Access-Token"] = HEADERS["X-Access-Token"];
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

    if (error.Cancel && error.response.status === 405) {
      let errCode = error.response.data.code;
      let message = "";
      switch (errCode) {
        case "ERR1001":
          message = "没有找到分享配置信息";
          Message.error(message);
          break;
        case "ERR1002":
          message = "分享信息错误";
          Message.error(message);
          break;
        case "ERR1003":
          message = "分享已失效";
          MessageBox.alert(message, "系统提示", {
            confirmButtonText: "确定",
            type: "warning",
          }).then(() => {
            try {
              MessageBox.close(false);
              localStorage.setItem("isCheck", false);
              window.location.href = localStorage.getItem("wt-url");
            } catch (e) {
              MessageBox.close(false);
              router.push("/");
            }
          });
          break;
        case "ERR1004":
          message = "分享已关闭";
          MessageBox.alert(message, "系统提示", {
            confirmButtonText: "确定",
            type: "warning",
          }).then(() => {
            try {
              MessageBox.close(false);
              localStorage.setItem("isCheck", false);
              window.location.href = localStorage.getItem("wt-url");
            } catch (e) {
              MessageBox.close(false);
              router.push("/");
            }
          });
          break;
        case "ERR1005":
          message = "分享地址错误";
          Message.error(message);
          break;
        case "ERR1006":
          message = "租户信息丢失";
          Message.error(message);
          break;
        case "ERR1007":
          message = "提取码丢失";
          Message.error(message);
          break;
        case "ERR1008":
          message = "提取码错误";
          Message.error(message);
          break;
        case "ERR1009":
          message = "分享标识丢失";
          Message.error(message);
          break;
      }
      source.cancel()
    } else if (error.Cancel && error.response.data.message.includes("Token失效")) {
      source.cancel()
      MessageBox.alert("Token失效，请重新登录", "系统提示", {
        confirmButtonText: "确定",
        type: "warning",
      }).then(() => {
        try {
          MessageBox.close(false);
          router.push("/");
        } catch (e) {
          MessageBox.close(false);
          router.push("/");
        }
      });
    }
    return Promise.reject(error);
  },
);

export default request;

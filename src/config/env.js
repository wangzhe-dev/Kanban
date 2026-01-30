/*
 * @Author: zhaijs
 * @Date: 2021-11-29 14:17:24
 * @LastEditTime: 2023-03-15 17:57:57
 * @Description: 请填写简介
 */
let baseUrl = "";
let routerUrl = "";
const companyId = "79b8e382b2f34625b46df4acff2b71f3";

if (process.env.NODE_ENV == "development") {
  // 本地环境
  // baseUrl = "https://wt-developer.bj-fanuc.com.cn/jeecg-boot";
  // routerUrl = "https://wt-developer.bj-fanuc.com.cn";
  baseUrl = "http://172.19.13.233:8801/jeecg-boot";
  routerUrl = "http://172.19.13.233:8801/jeecg-boot";
  // baseUrl = "https://wtpro.bj-fanuc.com.cn/jeecg-boot";
  // routerUrl = "https://wtpro.bj-fanuc.com.cn";
  // baseUrl = "http://192.168.85.183:8082";
  // baseUrl = 'api' // 武汉船舶 鹏宇本地
} else if (process.env.NODE_ENV == "production") {
  // 生产环境
  baseUrl = "/jeecg-boot";
  routerUrl = "/jeecg-boot";
} else if (process.env.NODE_ENV == "uat") {
  //uat
  baseUrl = "https://uatwtpro.bj-fanuc.com.cn/jeecg-boot";
  routerUrl = "https://uatwtpro.bj-fanuc.com.cn";
} else if (process.env.NODE_ENV == "test") {
  //测试环境
  baseUrl = "https://wt-developer.bj-fanuc.com.cn/jeecg-boot";
  routerUrl = "https://wt-developer.bj-fanuc.com.cn";
}
export { baseUrl, companyId, routerUrl };

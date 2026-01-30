/*
 *@Description : rabitmq 配置地址
 *@MethodAuthor: zhaijs
 *@Date        : 2021-12-08 15: 23: 41
 */
import { getQueryString } from "../utils";
let TENANT_ID = getQueryString("id") || localStorage.getItem("TENANTID");
let MQTT_SERVICE = null; // mqtt服务地址
let MQTT_USERNAME = null; // mqtt连接用户名
let MQTT_PASSWORD = null; // mqtt连接密码
let MQTT_VIRTUAL_HOSR = "/";
let MQTT_EXCHANGE =
  "/exchange/equipment_real_time_data_fanout_exchange/equipment_real_time_data_queue_" +
  TENANT_ID; // 交换机
if (process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test") {
  MQTT_SERVICE = "wss://uatwtpro.bj-fanuc.com.cn:443/rmq/ws";
  MQTT_USERNAME = "realtimeuser";
  MQTT_PASSWORD = "2f158c3e517049d48e89c2fbdba6e841";
  // MQTT_SERVICE = 'wss://wt-developer.bj-fanuc.com.cn:443/rmq/ws'
  // MQTT_USERNAME = 'fanuc'
  // MQTT_PASSWORD = 'Fanuc@2021'
  //   MQTT_SERVICE = "wss://wtpro.bj-fanuc.com.cn:443/rmq/ws";
  //   MQTT_USERNAME = "realtimeuser";
  //   MQTT_PASSWORD = "2f158c3e517049d48e89c2fbdba6e841";
} else if (process.env.NODE_ENV == "production") {
  MQTT_SERVICE = "wss://wtpro.bj-fanuc.com.cn:443/rmq/ws";
  MQTT_USERNAME = "realtimeuser";
  MQTT_PASSWORD = "2f158c3e517049d48e89c2fbdba6e841";
} else if (process.env.NODE_ENV == "uat") {
  MQTT_SERVICE = "wss://uatwtpro.bj-fanuc.com.cn:443/rmq/ws";
  MQTT_USERNAME = "realtimeuser";
  MQTT_PASSWORD = "2f158c3e517049d48e89c2fbdba6e841";
}
export {
  MQTT_SERVICE,
  MQTT_USERNAME,
  MQTT_PASSWORD,
  MQTT_VIRTUAL_HOSR,
  MQTT_EXCHANGE,
};

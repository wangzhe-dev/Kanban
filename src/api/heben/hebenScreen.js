/*
 * @Author: zwn7 943987243@qq.com
 * @Date: 2022-07-22 09:48:26
 * @LastEditors: zwn7 943987243@qq.com
 * @LastEditTime: 2022-07-25 10:08:10
 * @FilePath: /wutongse-screen/src/api/heben/heben.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/config/request.js";
//总换刀次数
export const selectToolTotalNumber = (params = {}) => {
  return request({
    url: "/hb/screen/selectToolTotalNumber",
    method: "get",
    params,
  });
};
//总修改补刀次数
export const selectToolModifiedKnifeRepair = (params = {}) => {
  return request({
    url: "/hb/screen/selectToolModifiedKnifeRepair",
    method: "get",
    params,
  });
};
//今日设备运行情况
export const selectEquipmentStartRate = (params = {}) => {
  return request({
    url: "/hb/screen/selectEquipmentStartRate",
    method: "get",
    params,
  });
};
//总加工时间占比
export const queryProportionTime = (params = {}) => {
  return request({
    url: "/screen/queryProportionTime",
    method: "get",
    params,
  });
};
//获取历史查看
export const selectHistoricalAlarm = (params = {}) => {
  return request({
    url: "/hb/screen/selectHistoricalAlarm",
    method: "get",
    params,
  });
};
//看板id+倍率+换刀次数
export const selectRealTimeDevice = (params = {}) => {
  return request({
    url: "/hb/screen/selectRealTimeDevice",
    method: "get",
    params,
  });
};

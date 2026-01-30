/*
 * @Author: zwn7 943987243@qq.com
 * @Date: 2022-12-07 10:02:49
 * @LastEditors: zwn7 943987243@qq.com
 * @Description: 三一接口
 */
import request from "@/config/request.js";
//设备监控状态
export const selectEquipmentRtStatus = (params = {}) => {
  return request({
    url: "/sanyi/screen/selectEquipmentRtStatus",
    method: "get",
    params,
  });
};
//三一设备综合效率-设备开动率
export const selectOeeRateForLargeScreen = (params = {}) => {
  return request({
    url: "/sanyi/screen/selectOeeRateForLargeScreen",
    method: "get",
    params,
  });
};
//三一刀具信息
export const getToolInfo = (params = {}) => {
  return request({
    url: "/sanyi/screen/getToolInfo",
    method: "get",
    params,
  });
};
//三一行架报警信息
export const getTenantIdRealtimeAlarmList = (params = {}) => {
  return request({
    url: "/sanyi/screen/getTenantIdRealtimeAlarmList",
    method: "get",
    params,
  });
};
//三一工件计数器
export const getProduction = (params = {}) => {
  return request({
    url: "/sanyi/screen/getProduction",
    method: "get",
    params,
  });
};
//三一当前联机工件主程序号
export const getEquipmentProg = (params = {}) => {
  return request({
    url: "/sanyi/screen/getEquipmentProg",
    method: "get",
    params,
  });
};
//三一根据departName获取id
export const getIdByDepartName = (params = {}) => {
  return request({
    url: "/sanyi/screen/getIdByDepartName",
    method: "get",
    params,
  });
};

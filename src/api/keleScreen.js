/*
 * @Author: zwn7 943987243@qq.com
 * @Date: 2022-07-05 14:57:19
 * @LastEditors: zwn7 943987243@qq.com
 * @LastEditTime: 2022-08-18 18:25:54
 * @FilePath: /wutongse-screen/src/api/keleScreen.js
 */
import request from "@/config/request.js";
import uniRequest from "@/config/unIrequest.js";
//设备风扇预测性维护
export const equipmentFanPredictiveMaintenance = (params = {}) => {
  return request({
    url: "/screen/resistancePredictiveMaintenance",
    method: "get",
    params,
  });
};
// 预测性维护电压
export const equipmentVoltageWarning = (params = {}) => {
  return request({
    url: "/screen/equipmentVoltageWarning",
    method: "get",
    params,
  });
};
//设备温度预警
export const equipmentTemperatureWarning = (params = {}) => {
  return request({
    url: "/screen/equipmentTemperatureWarning",
    method: "get",
    params,
  });
};
//设备报警
export const getRealtimeAlarmList = (params = {}) => {
  return request({
    url: "/screen/alarmInformationDay",
    method: "get",
    params,
  });
};
//报警详情
export const getEquipmentAlarmAnalysis = (params = {}) => {
  return request({
    url: "/screen/getEquipmentAlarmAnalysis",
    method: "get",
    params,
  });
};
//设备加工参数
export const realTimeEquipmentParameters = (params = {}) => {
  return request({
    url: "/screen/realTimeEquipmentParameters",
    method: "get",
    params,
  });
};
//设备加工参数趋势
export const equipmentParametersTrend = (params = {}) => {
  return request({
    url: "/screen/equipmentParametersTrend",
    method: "get",
    params,
  });
};
//设备名称
export const selectEquipmentDetails = (params = {}) => {
  return request({
    url: "/screen/selectEquipmentDetails",
    method: "get",
    params,
  });
};
//设备状态演变趋势
export const getEquipmentStatusListAndProductionInfo = (params = {}) => {
  return request({
    url: "/screen/getEquipmentStatusListAndProductionInfo",
    method: "get",
    params,
  });
};
//切削时长
export const equipmentDayCuttime = (params = {}) => {
  return request({
    url: "/screen/equipmentDayCuttime",
    method: "get",
    params,
  });
};
//获取字典
export const ajaxGetDictItems = (code, params = {}) => {
  return request({
    url: `/sys/dict/getDictItems/${code}`,
    method: "get",
    params,
  });
};
//状态自定义
export const customList = (params = {}) => {
  return request({
    url: "/jeecg-wutongse/user/custom/list",
    method: "get",
    params,
  });
};
//获取状态
export const getClientList = (data) => {
  return uniRequest({
    url: "/nps/getClientList",
    method: "post",
    data,
  });
};

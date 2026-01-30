import request from "@/config/request.js";
//修改刀补值记录 租户级
export const selectToolCompensationValue = (params = {}) => {
  return request({
    url: "/hb/screen/selectToolCompensationValue",
    method: "get",
    params,
  });
};
//更换刀具记录  租户级
export const selectToolChangeRecord = (params = {}) => {
  return request({
    url: "/hb/screen/selectToolChangeRecord",
    method: "get",
    params,
  });
};
//整体报警信息 租户级
export const queryProportionTime = (params = {}) => {
  return request({
    url: "/screen/queryProportionTime",
    method: "get",
    params,
  });
};
//整体运行效率 租户
export const selectEquipOverallOperating = (params = {}) => {
  return request({
    url: "/hb/screen/selectEquipOverallOperating",
    method: "get",
    params,
  });
};
//实时报警 租户
export const getTenantIdRealtimeAlarmList = (params = {}) => {
  return request({
    url: "/screen/getTenantIdRealtimeAlarmList",
    method: "get",
    params,
  });
};
//车间实时信息 
export const selectToolRealAlarm = (params = {}) => {
  return request({
    url: "/hb/screen/selectToolRealAlarm",
    method: "get",
    params,
  });
};
//更换刀具记录 单台设备
export const selectToolReplacementRecord = (params = {}) => {
  return request({
    url: "/hb/screen/selectToolReplacementRecord",
    method: "get",
    params,
  });
};
//修改刀补值记录 单台设备
export const selectToolKnifeRepairing = (params = {}) => {
  return request({
    url: "/hb/screen/selectToolKnifeRepairing",
    method: "get",
    params,
  });
};

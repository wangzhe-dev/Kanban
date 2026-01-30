/*
 * @Author: xuhaonan 837561260@qq.com
 * @Date: 2022-07-05 14:57:19
 * @LastEditors: xuhaonan 837561260@qq.com
 * @LastEditTime: 2022-08-01 14:34:18
 * @FilePath: /wutongse-screen/src/api/keleScreen.js
 */
import request from "@/config/request.js";
import uniRequest from "@/config/unIrequest.js";
//设备保养维护
export const selectWorkOrder = (params = {}) => {
  return request({
    url: "/otis/screen/selectWorkOrder",
    method: "get",
    params,
  });
};
//设备故障top5
export const selectEquipmentRepairorder = (params = {}) => {
  return request({
    url: "/otis/screen/selectEquipmentRepairorder",
    method: "get",
    params,
  });
};

// 作业人数 
export const selectNumberPeopleWorking = (params = {}) => {
  return request({
    url: '/otis/screen/selectNumberPeopleWorking',
    method: 'get',
    params
  })
}
//设备名称，编码，状态，
export const selectEquipmentDetails = (params = {}) => {
  return request({
    url: '/screen/selectEquipmentDetails',
    method: 'get',
    params
  })
}

//获取是否在线
export const getClientList = (data) => {
  return uniRequest({
    url: "/nps/getClientList",
    method: "post",
    data,
  });
};

// 今日维修详情 
export const selectMaintenanceDetailsToday = (params = {}) => {
  return request({
    url: '/otis/screen/selectMaintenanceDetailsToday',
    method: 'get',
    params
  })
}
// 本月维修
export const selectMaintenanceResumeMonth = (params = {}) => {
  return request({
    url: '/otis/screen/selectMaintenanceResumeMonth',
    method: 'get',
    params
  })
}
// 本周保养计划 
export const selectMaintenancePlanWeek = (params = {}) => {
  return request({
    url: '/otis/screen/selectMaintenancePlanWeek',
    method: 'get',
    params
  })
}
// 本月保养履历 
export const selectMaintenancePlanMonth = (params = {}) => {
  return request({
    url: '/otis/screen/selectMaintenancePlanMonth',
    method: 'get',
    params
  })
}

// 本月工单处理时常 
export const selectWorkDurationMonth = (params = {}) => {
  return request({
    url: '/otis/screen/selectWorkDurationMonth',
    method: 'get',
    params
  })
}

//字典标签专用（通过code获取字典数组） /wutongse-dashboard/{share}/otis/screen/getDictItemsList
export const getDictItemsList = (params) => {
  return request({
    url: '/otis/screen/getDictItemsList',
    method: 'get',
    params
  })
}

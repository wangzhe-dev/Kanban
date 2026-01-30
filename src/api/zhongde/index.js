/*
 * @Author: fanzeyu 1127415899@qq.com
 * @Date: 2022-11-22 09:25:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-05 15:55:07
 * @FilePath: \wutongse-screen\src\api\zhongde\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/config/request.js";
//查询部分组织
export const queryDepartList = (params = {}) => {
  return request({
    url: "/xxzd/screen/queryDepartList",
    method: "get",
    params,
  });
};
//查询部分组织 集团版
export const selectWorkshop = (params = {}) => {
  return request({
    url: "/xxzd/screen/selectWorkshop",
    method: "get",
    params,
  });
};
//智能提效设备数
export const getEfficiencyEquipmentSize = (params = {}) => {
  return request({
    url: "/xxzd/screen/getEfficiencyEquipmentSize",
    method: "get",
    params,
  });
};
//平均效率
export const getEquipmentAvgEfficiency = (params = {}) => {
  return request({
    url: "/xxzd/screen/getEquipmentAvgEfficiency",
    method: "get",
    params,
  });
};
//效率top10
export const getEquipmentAvgEfficiencyTop = (params = {}) => {
  return request({
    url: "/xxzd/screen/getEquipmentAvgEfficiencyTop",
    method: "get",
    params,
  });
};
//车间设备报警
export const getTenantIdRealtimeAlarmList = (params = {}) => {
  return request({
    url: "/xxzd/screen/getTenantIdRealtimeAlarmList",
    method: "get",
    params,
  });
};
//运行状态
export const queryProportionTime = (params = {}) => {
  return request({
    url: "/xxzd/screen/queryProportionTime",
    method: "get",
    params,
  });
};
//租户所有设备状态持续时长和设备有效利用率
export const selectLastTimeUtilization = (params = {}) => {
  return request({
    url: "/xxzd/screen/selectLastTimeUtilization",
    method: "get",
    params,
  });
};
// 请求设备四种状态的数量
export const selectEquipmentRtStatus = (params = {}) => {
  return request({
    url: '/xxzd/screen/selectEquipmentRtStatus',
    method: 'get',
    params
  })
}
// 统计单个控制器报警时长和报警次数 {并集版}
export const selectAlarmDurationAndCountDetailUnion = (params = {}) => {
  return request({
    url: '/xxzd/screen/selectAlarmDurationAndCountDetailUnion',
    method: 'get',
    params
  })
}

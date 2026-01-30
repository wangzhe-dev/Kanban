import request from '@/config/request.js'


// 库存导入模板下载
export const exportXlsModuleInventory = (params) => {
  return request({
    url: `/whcb/screen/exportXlsModuleInventory`,
    method: 'get',
    responseType: 'blob',
    xhrFields: {
      withCredentials: true
    },
    params
  })
}
// 接待人次导入模板下载
export const exportXlsModuleNumber = (params) => {
  return request({
    url: `/whcb/screen/exportXlsModuleNumber`,
    method: 'get',
    responseType: 'blob',
    params
  })
}
// 小时产量导入模板下载
export const exportXlsModulePlan = (params) => {
  return request({
    url: `/whcb/screen/exportXlsModulePlan`,
    method: 'get',
    responseType: 'blob',
    params
  })
}

// 库存导入模板
export const importExcelInventory = (data) => {
  return request({
    url: `/whcb/screen/importExcelInventory`,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}
// 接待人次导入模板
export const importExcelNumber = (data) => {
  return request({
    url: `/whcb/screen/importExcelNumber`,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}
// 小时产量导入模板
export const importExcelPlan = (data) => {
  return request({
    url: `/whcb/screen/importExcelPlan`,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}


// left1：设备监控状态：请求设备四种状态的数量
export const selectEquipmentRtStatus = (params = {}) => {
  return request({
    url: `/screen/selectEquipmentRtStatus`,
    method: 'get',
    params
  })
}
// left2&left4
// 设备有效利用率&设备运行详情
// 租户所有设备状态持续时长和设备有效利用率
export const deviceValidUseRate = (params = {}) => {
  return request({
    url: `/whcb/screen/selectLastTimeUtilization`,
    method: 'get',
    params
  })
}
// left3: 实时设备报警监控
export const selectRealtimeAlarmList = (params = {}) => {
  return request({
    url: `/screen/getTenantIdRealtimeAlarmList`,
    method: 'get',
    params
  })
}
// left5&right2
// 今日加工零件数&当日生产进度
// 今日加工零件数-当日计划和生产产量
export const todayWorkPartNumber = (params = {}) => {
  return request({
    url: `/whcb/screen/NumberPartsProcessedToday`,
    method: 'get',
    params
  })
}


// right1: 当日销售订单情况、当日生产计划
export const todaySaleOrder = (params = {}) => {
  return request({
    url: `/whcb/screen/whcbSalesOrders`,
    method: 'get',
    params
  })
}

// right3&right4:
// 当前达成率 && 产量Table
export const currentReachRate = (params = {}) => {
  return request({
    url: `/whcb/screen/whcbCurrentAchievementRate`,
    method: 'get',
    params
  })
}
// right5&right6:
// 物料库存&产成品库存
export const materialtock = (params = {}) => {
  return request({
    url: `/whcb/screen/whcbStockOfTheDay`,
    method: 'get',
    params
  })
}
// center1:
export const fetchCenter1Data = (params = {}) => {
  return request({
    url: `/whcb/equipmentMonitor/alarmAnalyse/selectRealtimeAlarmList`,
    method: 'get',
    params
  })
}
// center2: 租户设备当前状态时长-生产数量
export const fetchCenter2Data = (params = {}) => {
  return request({
    url: `/whcb/screen/statusDurationQty`,
    method: 'get',
    params
  })
}
// center3: 累计接待人次-登陆人次-运行时长
export const fetchCenter3Data = (params = {}) => {
  return request({
    url: `/whcb/screen/whcbReceptionVisitors`,
    method: 'get',
    params
  })
}



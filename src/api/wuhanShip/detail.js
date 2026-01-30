import request from '@/config/request.js'


// left1: 设备信息
export const equipmentInfo = (params = {}) => {
  return request({
    url: `/screen/selectEquipmentDetails`,
    method: 'get',
    params
  })
}
// left2: 设备综合效率：状态趋势
export const equipmentStatusTrendChart = (params = {}) => {
  return request({
    url: `/screen/getEquipmentStatusListAndProductionInfo`,
    method: 'get',
    params
  })
}
// left3: 今日设备产量
export const todayDeviceield = (params = {}) => {
  return request({
    url: `/whcb/screen/queryTodayProduction`,
    method: 'get',
    params
  })
}
// left4: 加工参数趋势
export const equipmentProcessParameterTrendChart = (params = {}) => {
  return request({
    url: `/screen/equipmentParametersTrend`,
    method: 'get',
    params
  })
}

// right1: 报警内容分布  分月度和当日
export const alarmContentSpread = (params = {}) => {
  return request({
    url: `/screen/getEquipmentAlarmAnalysis`,
    method: 'get',
    params
  })
}
// right2: 切削时长
export const cuttingDuration = (params = {}) => {
  return request({
    url: `/screen/equipmentDayCuttime`,
    method: 'get',
    params
  })
}
// right3: 设备加工参数
export const deviceWorkParams = (params = {}) => {
  return request({
    url: `/screen/realTimeEquipmentParameters`,
    method: 'get',
    params
  })
}

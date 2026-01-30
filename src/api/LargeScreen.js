import request from '@/config/request.js'

//设备list
const selectEquipmentList = (params = {}) => {
  return request({
    url: '/monitoring/equipment/selectEquipmentRtStatus',
    method: 'post',
    data: params
  })
}
//校验提取码
export const checkExtractionCode = (data) => {
  let url = "/largeScreen/manage/checkShareInfo"
  return request({
    url: url,
    method: "post",
    data,
  });
};
//shareId查设备
export const shareQueryEquipmentList = (params = {}) => {
  return request({
    url: "/largeScreen/manage/queryEquipmentList",
    method: "get",
    params,
  });
};

/*
 *@Description: 设备状态统计
 *@ClassAuthor: zhaijs
 *@Date       : 2021-09-03 15: 05: 52
 */
const equipmentStatus = (params = {}) => {
  return request({
    url: '/equipmentStatus',
    method: 'get',
    params
  })
}

const equipmentUptimeRate = (params = {}) => {
  return request({
    url: '/equipmentUptimeRate',
    method: 'get',
    params
  })
}

// 设备综合效率
const equipmentEfficiency = (params = {}) => {
  return request({
    url: '/equipmentEfficiency',
    method: 'get',
    params
  })
}

// 设备告警信息
const alarmInformation = (params = {}) => {
  return request({
    url: '/alarmInformation',
    method: 'get',
    params
  })
}

// 实际生产情况
const equipmentActualProductInfo = (params = {}) => {
  return request({
    url: '/equipmentActualProductInfo',
    method: 'get',
    params
  })
}

// 设备利用率排行榜
const equipmentUseRatioRanking = (params = {}) => {
  return request({
    url: '/equipmentUseRatioRanking',
    method: 'get',
    params
  })
}

// 刀具使用时间排行榜
const cutterTimeRanking = (params = {}) => {
  return request({
    url: '/cutterTimeRanking',
    method: 'get',
    params
  })
}

// 设备产能
const equipmentCapacity = (params = {}) => {
  return request({
    url: '/equipmentCapacity',
    method: 'get',
    params
  })
}

// 设备卡片信息接口
const equipmentCard = (params = {}) => {
  return request({
    url: '/equipmentCard',
    method: 'get',
    params
  })
}

// 设备信息
const equipmentInfo = (params = {}) => {
  return request({
    url: '/equipmentInfo',
    method: 'get',
    params
  })
}

// 状态趋势
const equipmentStatusTrendChart = (params = {}) => {
  return request({
    url: '/equipmentStatusTrendChart',
    method: 'get',
    params
  })
}

// 日产零件明细
const getEquipmentPartsTrendChart = (params = {}) => {
  return request({
    url: '/getEquipmentPartsTrendChart',
    method: 'get',
    params
  })
}

// 加工参数趋势
const equipmentProcessParameterTrendChart = (params = {}) => {
  return request({
    url: '/equipmentProcessParameterTrendChart',
    method: 'get',
    params
  })
}

// 请求设备名称列表
const equipmentInfoList = (params = {}) => {
  return request({
    url: '/equipmentInfoList',
    method: 'get',
    params
  })
}

// ---------------------------new---------------------------

// 请求设备四种状态的数量
const selectEquipmentRtStatus = (params = {}) => {
  return request({
    url: '/screen/selectEquipmentRtStatus',
    method: 'get',
    params
  })
}
// 维修数量
const getOrderStatus = (params = {}) => {
  return request({
    url: '/screen/repair/WutongseRepairCount/getOrderStatus',
    method: 'get',
    params
  })
}

// 保养数量
const selectOrderSum = (params = {}) => {
  return request({
    url: '/screen/maintain/wuTongEquipmentBillboard/selectOrderSum',
    method: 'get',
    params
  })
}
//车间生产情况
const getProductionStatisticsStatusTodayVo = (data = {}) => {
  return request({
    url: '/monitoring/equipment/queryProductionStatisticsStatusTodayVo',
    method: 'post',
    data
  })
}
//当日整体产量进度
const getProductionLargeScreenCommitQtyVoList = (data = {}) => {
  return request({
    url: '/monitoring/equipment/queryProductionLargeScreenCommitQtyVoList',
    method: 'post',
    data
  })
}
//当日整体产量进度
const getOutputRankingVoList = (data = {}) => {
  return request({
    url: '/monitoring/equipment/queryOutputRankingVoList',
    method: 'post',
    data
  })
}

//设备综合效率
const selectOeeRateForLargeScreen = (data = {}) => {
  return request({
    url: '/monitoring/equipment/queryOeeRateForLargeScreen',
    method: 'post',
    data
  })
}

//设备报警分析
const selectRealtimeAlarmList = (params = {}) => {
  return request({
    url: '/monitoring/equipment/selectEquipmentRtStatus',
    method: 'post',
    data: params
  })
}
// 获取自定义列表
const fetchCustomList = (params = {}) => {
  return request({
    url: '/user/custom/list',
    method: 'get',
    params
  })
}

// 设备开机率
// 设备开机率
const getOperatingRate = (data = {}) => {
  return request({
    url: '/monitoring/equipment/getOperatingRate',
    method: 'post',
    data
  })
}
// ---------------------------end---------------------------
export {
  equipmentStatus,
  equipmentUptimeRate,
  equipmentEfficiency,
  alarmInformation,
  equipmentActualProductInfo,
  equipmentUseRatioRanking,
  cutterTimeRanking,
  equipmentCapacity,
  equipmentCard,
  equipmentInfo,
  equipmentStatusTrendChart,
  getEquipmentPartsTrendChart,
  equipmentProcessParameterTrendChart,
  equipmentInfoList,
  // ---------------------------new---------------------------
  selectEquipmentRtStatus,
  getOrderStatus,
  selectOrderSum,
  getProductionStatisticsStatusTodayVo,
  getProductionLargeScreenCommitQtyVoList,
  getOutputRankingVoList,
  selectOeeRateForLargeScreen,
  selectRealtimeAlarmList,
  fetchCustomList,
  selectEquipmentList,
  getOperatingRate
  // ---------------------------end---------------------------
}

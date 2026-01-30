/**
 * 小组立智能产线·生产计划 - API接口
 */
import request from '@/config/request.js'

/**
 * 获取设备汇总数据（稼动率，运行时长）
 * 返回日、周、月三个时间段的数据
 */
export const getDeviceSummarySection = () => {
  return request({
    url: '/produce/kpi/report/deviceSummarySection',
    method: 'get'
  })
}

/**
 * 获取各工作站连续完成数据
 * 返回日、周、月三个时间段的数据
 */
export const getLineContinuousSection = () => {
  return request({
    url: '/produce/kpi/report/lineContinuousSection',
    method: 'get'
  })
}

/**
 * 获取各产线产量统计（日/周/月）
 */
export const getLineSummarySection = () => {
  return request({
    url: '/produce/kpi/report/lineSummarySection',
    method: 'get'
  })
}

/**
 * 获取各产线产量统计
 * @param {string} type - 时间范围类型: day(日), week(周), month(月)
 * @param {string} dataType - 数据类型: material(物料), workOrder(工单)
 */
export const getLineProductionStats = (dataType = 'material', type = 'day') => {
  return request({
    url: '/produce/kpi/report/lineProductionStats',
    method: 'get',
    params: {
      type,
      dataType
    }
  })
}

/**
 * 获取各工作站连续完成统计
 * @param {string} type - 时间范围类型: day(日), week(周), month(月)
 */
export const getWorkStationCompletion = (type = 'day') => {
  return request({
    url: '/produce/kpi/report/workStationCompletion',
    method: 'get',
    params: {
      type
    }
  })
}

/**
 * 获取设备产量统计
 * @param {string} type - 时间范围类型: day(日), week(周), month(月)
 */
export const getEquipmentProduction = (type = 'day') => {
  return request({
    url: '/produce/kpi/report/equipmentProduction',
    method: 'get',
    params: {
      type
    }
  })
}

/**
 * 获取设备产量统计（日/周/月）
 */
export const getEquipmentProductionSection = () => {
  return request({
    url: '/produce/kpi/report/equipmentProduction',
    method: 'get'
  })
}

/**
 * 获取各产线焊接长度统计（日/周/月）
 */
export const getLineWeldLengthSection = () => {
  return request({
    url: '/produce/kpi/report/lineWeldLengthSection',
    method: 'get'
  })
}

/**
 * 获取各产线焊接长度统计
 */
export const getWeldingLengthStats = () => {
  return request({
    url: '/produce/kpi/report/weldingLengthStats',
    method: 'get'
  })
}

/**
 * 获取生产工单列表
 * @param {string} type - 时间范围类型: day(日), week(周), month(月)
 */
export const getProductionOrders = (type = 'day') => {
  return request({
    url: '/produce/kpi/report/productionOrders',
    method: 'get',
    params: {
      type
    }
  })
}

/**
 * 获取产线计划达成率明细（日/周/月）
 */
export const getLinePlanDetailSection = () => {
  return request({
    url: '/produce/kpi/report/linePlanDetailSection',
    method: 'get'
  })
}

/**
 * T型材智能产线生产计划 - API接口
 */
import request from '@/config/request.js'

/**
 * 获取各工位产量统计
 * @param {string} type - 时间范围类型: day(日), week(周), month(月)
 */
export const getScreenWorkstationOutput = (type = 'day') => {
  return request({
    url: '/produce/wb/getScreenWorkstationOutput',
    method: 'get',
    params: {
      type
    }
  })
}

/**
 * 获取设备消耗统计
 * @param {string} type - 时间范围类型: day(日), week(周), month(月)
 */
export const getScreenWorkstationConsumption = (type = 'day') => {
  return request({
    url: '/produce/wb/getScreenWorkstationConsumption',
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
export const getScreenDeviceStationOutput = (type = 'day') => {
  return request({
    url: '/produce/wb/getScreenDeviceStationOutput',
    method: 'get',
    params: {
      type
    }
  })
}

/**
 * 获取工单产量统计
 * @param {string} type - 时间范围类型: day(日), week(周), month(月)
 */
export const getScreenWorkOrderOutputStatistics = (type = 'day') => {
  return request({
    url: '/produce/wb/getScreenWorkOrderOutputStatistics',
    method: 'get',
    params: {
      type
    }
  })
}

/**
 * 获取设备运行状态统计
 * @param {string} factoryCode - 工厂代码
 */
export const getEquipmentRunStatus = (factoryCode = 'HJ-TP') => {
  return request({
    url: '/monitoring/equipment/getEquipmentRunStatus',
    method: 'post',
    data: {
      factoryCode
    }
  })
}

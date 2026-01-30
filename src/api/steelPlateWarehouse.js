/**
 * 钢板库智能产线 - API接口
 */
import request from '@/config/request.js'

/**
 * 获取实时库存信息
 */
export const getRealTimeInventory = () => {
  return request({
    url: '/stock/steelStock/getRealTime',
    method: 'post'
  })
}

/**
 * 获取仓库指标数据(看板数据)
 */
export const getSignboard = () => {
  return request({
    url: '/stock/steelStock/getSignboard',
    method: 'post'
  })
}

/**
 * 获取库位列表数据
 * 返回库位信息包括: stockId, stockCode, stockName, stockCount, stockAttr(颜色), locationX, locationY等
 */
export const getStockList = () => {
  return request({
    url: '/stock/steelStock/getStockList',
    method: 'post'
  })
}

/**
 * 获取订单流程数据（钢板信息）
 * 返回字段:
 * - task_group_status: 任务状态 (FINISH/PROCESSING等)
 * - project_code: 项目号
 * - task_type: 任务类型
 * - lot_num: 批次号
 * - plan_count: 计划数量
 * - finish_count: 完成数量
 */
export const getOrderProcess = () => {
  return request({
    url: '/stock/steelStock/getOrderProcess',
    method: 'post'
  })
}

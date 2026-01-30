import request from '@/config/request.js'
/*
 *@Description : 查询OEE、设备在线率、设备效率、产出量
 *@MethodAuthor: zhaijs
 *@Date        : 2021-03-18 14: 56: 12
*/
const selectBasicInfo = (data) =>{
    return request({
        url   : '/fDp/selectBasicInfo',
        method: 'post',
        data
    })
}
/*
 *@Description : 查询生产单元
 *@MethodAuthor: zhaijs
 *@Date        : 2021-03-18 15: 05: 31
*/
const selectWorkUnitList = (data) =>{
    return request({
        url   : '/fDp/selectWorkUnitList',
        method: 'post',
        data
    })
}
/*
 *@Description : 查询车间能耗信息
 *@MethodAuthor: zhaijs
 *@Date        : 2021-03-18 15: 05: 31
*/
const selectEnergyConsumeTrend = (data) =>{
    return request({
        url   : '/fDp/selectEnergyConsumeTrend',
        method: 'post',
        data
    })
}
/*
 *@Description : 查询生产任务基本信息
 *@MethodAuthor: zhaijs
 *@Date        : 2021-03-18 15: 05: 31
*/
const selectWorkTaskBasicInfo = (data) =>{
    return request({
        url   : '/fDp/selectWorkTaskBasicInfo',
        method: 'post',
        data
    })
}
/*
 *@Description : 查询设备最新参数
 *@MethodAuthor: zhaijs
 *@Date        : 2021-03-18 15: 05: 31
*/
const selectEquipmentLatestParam = (data) =>{
    return request({
        url   : '/fDp/selectEquipmentLatestParam',
        method: 'post',
        data
    })
}
/*
 *@Description : 查询设备状态演变图
 *@MethodAuthor: zhaijs
 *@Date        : 2021-03-18 15: 05: 31
*/
const selectEquipmentStatusTrend = (data) =>{
    return request({
        url   : '/fDp/selectEquipmentStatusTrend',
        method: 'post',
        data
    })
}
export {
    selectEquipmentStatusTrend
}
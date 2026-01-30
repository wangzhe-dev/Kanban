/*
 * @Descripttion:
 * @version:
 * @Author: lj
 * @Date: 2025-09-01 19:16:55
 * @LastEditors: liangjia
 * @LastEditTime: 2026-01-21 18:07:43
 */
import request from "@/config/exPrequest.js";
//设备list
export const getList = (params = {}) => {
  return request({
    url: "/produce/control/getAll",
    method: "get",
    data: params,
  });
};
export const getDetail = (params = {}) => {
  return request({
    url: "/produce/bi/getDetail",
    method: "post",
    data: params,
  });
};
// 生产数量展示
export const getCompleteCount = (params = {}) => {
  return request({
    url: "/produce/bi/getCompleteCount",
    method: "post",
    data: params,
  });
};
//生产下料灯p
export const hgScreenData = (params = {}) => {
  return request({
    url: "/produce/api/hg/queryProcessWorkOrders",
    method: "post",
    data: params,
  });
};

//生产下料灯d
export const screenData = (params = {}) => {
  return request({
    url: "/produce/lineTaktTime/screenData",
    method: "post",
    data: params,
  });
  //   const promise = new Promise((resolve, reject) => {
  //   // 异步操作
  //   setTimeout(() => {
  //     resolve(mockData1);
  //   }, 1000);
  // });
  // return promise;
};
//生产下料灯yc
export const screenDataHj = (params = {}) => {
  return request({
    url: "/produce/lineTaktTime/screenDataHj",
    method: "post",
    data: params,
  });
  //   const promise = new Promise((resolve, reject) => {
  //   // 异步操作
  //   setTimeout(() => {
  //     resolve(mockData1);
  //   }, 1000);
  // });
  // return promise;
};
//部件小立库及集配区
export const listByLocationData = (params = {}) => {
  return request({
    url: "/produce/bi/stock/listByLocationData",
    method: "post",
    data: params,
  });
};
//agv
export const queryAgv = (params = {}) => {
  return request({
    url: "/produce/api/avg/queryAgv",
    method: "post",
    data: params,
  });
};
//小立库及集配区组立下拉
export const listQt = (params = {}) => {
  //
  // return request({
  //   url: "/produce/bi/stock/listQt",
  //   method: "post",
  //   data: params,
  // });
  return request({
    url: "/produce/kittingPlan/getKittingPlanPage",
    method: "post",
    data: params,
  });
}
  //小立库及集配区零件下拉
export const listQtInfo = (params = {}) => {
  //       const promise = new Promise((resolve, reject) => {
  //   // 异步操作
  //   setTimeout(() => {
  //     resolve(mockData1);
  //   }, 1000);
  // });
  // return promise;
  return request({
    url: "/produce/bi/stock/listQtInfo",
    method: "post",
    data: params,
  });
}

//缓存水位三色灯看板
export const stockQuery = (params = {}) => {
  return request({
    url: "/produce/bi/stock/stockQuery",
    method: "post",
    data: params,
  });
}
//缓存水位三色灯看板table
export const stockInOutQuery = (params = {}) => {
  return request({
    url: "/produce/bi/stock/stockInOutQuery",
    method: "post",
    data: params,
  });
}

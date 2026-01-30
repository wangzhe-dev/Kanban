/**
 * 职能看板 - 首页 Mock 数据
 */

export default {
  // 生产总览数据
  productionOverview: {
    todayOutput: 1250,
    targetOutput: 1500,
    completionRate: 83.3,
    efficiency: 92.5,
  },

  // 产线进度表
  productionLineProgress: [
    { name: "钢板预处理(张) / 型材预处理(根)", plan: 320, actual: 286 },
    { name: "钢板下料(张)", plan: 420, actual: 382 },
    { name: "型材下料(根)", plan: 260, actual: 213 },
    { name: "T型材(米) / 小组立(米)", plan: 1500, actual: 1268 },
    { name: "片体拼版(米) / 平直分段(米)", plan: 980, actual: 924 },
  ],

  // 关键指标数据
  keyIndicators: [
    { name: "设备利用率", value: 88.5, unit: "%" },
    { name: "产品合格率", value: 97.8, unit: "%" },
    { name: "能耗水平", value: 75.2, unit: "kWh" },
    { name: "库存周转率", value: 12.3, unit: "次/月" },
  ],

  // 实时数据
  realTimeData: {
    onlineEquipment: 45,
    totalEquipment: 50,
    runningTasks: 23,
    waitingTasks: 8,
  },

  // 趋势分析数据
  trendAnalysis: {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    production: [120, 150, 180, 220, 200, 180],
    quality: [98, 97, 98.5, 97.5, 98, 97.8],
  },

  // 任务进度数据
  taskProgress: [
    { name: "生产任务A", progress: 85, status: "进行中" },
    { name: "生产任务B", progress: 100, status: "已完成" },
    { name: "生产任务C", progress: 45, status: "进行中" },
    { name: "生产任务D", progress: 20, status: "进行中" },
  ],

  // 设备状态数据
  equipmentStatus: {
    running: 45,
    standby: 5,
    maintenance: 2,
    fault: 1,
  },

  // 质量监控数据
  qualityMonitoring: {
    totalInspected: 2340,
    qualified: 2289,
    unqualified: 51,
    qualityRate: 97.8,
  },

  // 告警信息数据
  alarmInfo: [
    { level: "warning", device: "设备A1", message: "温度偏高", time: "10:25" },
    { level: "error", device: "设备B3", message: "压力异常", time: "09:15" },
    { level: "warning", device: "设备C2", message: "运行时间过长", time: "08:50" },
  ],
};

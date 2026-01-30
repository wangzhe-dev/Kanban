/**
 * 职能看板 - 设备管理 Mock 数据
 */

export default {
  // 设备总览数据
  equipmentOverview: {
    totalEquipment: 125,
    running: 98,
    standby: 18,
    maintenance: 6,
    fault: 3,
    utilizationRate: 78.4,
  },

  // 设备运行状态数据
  equipmentStatus: [
    { name: "数控机床A1", status: "运行中", load: 85, temperature: 45, runTime: 12.5 },
    { name: "数控机床A2", status: "运行中", load: 92, temperature: 48, runTime: 11.8 },
    { name: "焊接机器人B1", status: "运行中", load: 78, temperature: 42, runTime: 10.2 },
    { name: "装配线C1", status: "待机", load: 0, temperature: 35, runTime: 0 },
    { name: "检测设备D1", status: "维护中", load: 0, temperature: 30, runTime: 0 },
    { name: "切割机E1", status: "故障", load: 0, temperature: 28, runTime: 0 },
  ],

  // 维保计划数据
  maintenancePlan: [
    { equipment: "数控机床A3", type: "定期保养", planDate: "2025-12-18", status: "待执行" },
    { equipment: "焊接机器人B2", type: "定期检查", planDate: "2025-12-19", status: "待执行" },
    { equipment: "装配线C2", type: "大修", planDate: "2025-12-20", status: "计划中" },
    { equipment: "检测设备D2", type: "校准", planDate: "2025-12-15", status: "已完成" },
  ],

  // 设备利用率数据
  equipmentUtilization: {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
    data: [65, 72, 88, 92, 85, 78],
    average: 80,
  },

  // 故障统计数据
  faultStatistics: {
    thisMonth: 18,
    lastMonth: 22,
    trend: -18.2,
    types: [
      { type: "机械故障", count: 8, percentage: 44.4 },
      { type: "电气故障", count: 5, percentage: 27.8 },
      { type: "控制系统", count: 3, percentage: 16.7 },
      { type: "其他", count: 2, percentage: 11.1 },
    ],
  },

  // 备件库存数据
  sparePartsInventory: [
    { name: "轴承", stock: 45, safetyStock: 30, status: "充足" },
    { name: "电机", stock: 12, safetyStock: 10, status: "正常" },
    { name: "传感器", stock: 8, safetyStock: 15, status: "不足" },
    { name: "密封件", stock: 120, safetyStock: 80, status: "充足" },
    { name: "控制器", stock: 5, safetyStock: 8, status: "不足" },
  ],

  // 维修记录数据
  maintenanceRecords: [
    { equipment: "数控机床A1", faultType: "主轴异响", startTime: "12-15 09:00", endTime: "12-15 11:30", duration: 2.5, status: "已完成" },
    { equipment: "焊接机器人B1", faultType: "焊枪堵塞", startTime: "12-16 14:20", endTime: "12-16 15:00", duration: 0.67, status: "已完成" },
    { equipment: "切割机E1", faultType: "刀具损坏", startTime: "12-17 08:30", endTime: "-", duration: 0, status: "维修中" },
  ],

  // 设备效能分析数据
  equipmentEfficiency: {
    oee: 78.5, // 综合设备效率
    availability: 92.3, // 可用率
    performance: 88.6, // 性能效率
    quality: 96.1, // 质量指数
    comparison: {
      labels: ["本周", "上周", "上月", "目标"],
      values: [78.5, 76.2, 74.8, 85],
    },
  },
};

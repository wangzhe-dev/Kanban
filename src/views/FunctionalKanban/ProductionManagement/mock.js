/**
 * 职能看板 - 生产管理 Mock 数据
 */

export default {
  // 生产计划数据
  productionPlan: {
    monthlyPlan: 35000,
    completedThisMonth: 28500,
    remainingDays: 8,
    dailyTarget: 1200,
  },

  // 产能分析数据
  capacityAnalysis: {
    maxCapacity: 2000,
    currentCapacity: 1650,
    utilizationRate: 82.5,
    bottleneck: "工序三",
  },

  // 生产订单数据
  productionOrders: [
    { orderNo: "PO20250101", productName: "产品A", quantity: 500, progress: 85, status: "生产中" },
    { orderNo: "PO20250102", productName: "产品B", quantity: 800, progress: 100, status: "已完成" },
    { orderNo: "PO20250103", productName: "产品C", quantity: 600, progress: 45, status: "生产中" },
    { orderNo: "PO20250104", productName: "产品D", quantity: 400, progress: 10, status: "待开始" },
  ],

  // 工序进度数据
  processProgress: [
    { process: "下料", completed: 850, total: 1000, rate: 85 },
    { process: "焊接", completed: 720, total: 1000, rate: 72 },
    { process: "组装", completed: 680, total: 1000, rate: 68 },
    { process: "检验", completed: 650, total: 1000, rate: 65 },
  ],

  // 生产统计数据
  productionStatistics: {
    labels: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    planned: [1200, 1200, 1200, 1200, 1200, 1000, 800],
    actual: [1150, 1280, 1190, 1220, 1180, 950, 820],
  },

  // 人员配置数据
  staffAllocation: {
    totalStaff: 156,
    onDuty: 142,
    onLeave: 8,
    training: 6,
    departments: [
      { name: "生产一部", count: 45 },
      { name: "生产二部", count: 52 },
      { name: "质检部", count: 25 },
      { name: "物流部", count: 20 },
    ],
  },

  // 异常跟踪数据
  abnormalTracking: [
    { type: "设备故障", count: 3, resolved: 2, pending: 1 },
    { type: "物料短缺", count: 5, resolved: 4, pending: 1 },
    { type: "质量问题", count: 2, resolved: 2, pending: 0 },
    { type: "人员缺岗", count: 1, resolved: 1, pending: 0 },
  ],

  // 效率对比数据
  efficiencyComparison: {
    current: { production: 92, quality: 97.8, delivery: 95 },
    lastMonth: { production: 88, quality: 96.5, delivery: 93 },
    target: { production: 95, quality: 98, delivery: 97 },
  },

  // 产线达成率（2x4）
  lineAchievementRates: [
    { name: "钢板预处理线", value: 92 },
    { name: "型材预处理线", value: 88 },
    { name: "钢板下料分拣智能产线", value: 86 },
    { name: "型材下料智能产线", value: 84 },
    { name: "小组立智能产线", value: 90 },
    { name: "T型材智能产线", value: 82 },
    { name: "片体拼板智能产线", value: 79 },
    { name: "平直分段智能产线", value: 85 },
  ],

  // 本月进度（本月实际/计划工单）
  monthlyWorkOrderProgress: [
    { name: "钢板预处理线", actualOrders: 86, planOrders: 95 },
    { name: "型材预处理线", actualOrders: 78, planOrders: 92 },
    { name: "钢板下料分拣智能产线", actualOrders: 64, planOrders: 80 },
    { name: "型材下料智能产线", actualOrders: 58, planOrders: 75 },
    { name: "小组立智能产线", actualOrders: 88, planOrders: 96 },
    { name: "T型材智能产线", actualOrders: 60, planOrders: 74 },
    { name: "片体拼板智能产线", actualOrders: 55, planOrders: 70 },
    { name: "平直分段智能产线", actualOrders: 68, planOrders: 82 },
  ],

  // 生产信息情况（表格）
  productionInfoRows: [
    { lineName: "预处理产线", workOrderNo: "WO2025121701", status: "进行中", completedAt: "2025-12-17 10:20", assemblyNo: "ZL-0012" },
    { lineName: "钢板下料", workOrderNo: "WO2025121702", status: "已完成", completedAt: "2025-12-17 09:35", assemblyNo: "ZL-0013" },
    { lineName: "型材下料", workOrderNo: "WO2025121703", status: "待处理", completedAt: "-", assemblyNo: "ZL-0014" },
    { lineName: "T型材", workOrderNo: "WO2025121704", status: "进行中", completedAt: "2025-12-17 11:05", assemblyNo: "ZL-0015" },
    { lineName: "小组立", workOrderNo: "WO2025121705", status: "已完成", completedAt: "2025-12-17 08:50", assemblyNo: "ZL-0016" },
    { lineName: "片体拼板", workOrderNo: "WO2025121706", status: "暂停", completedAt: "-", assemblyNo: "ZL-0017" },
    { lineName: "平直分段", workOrderNo: "WO2025121707", status: "进行中", completedAt: "2025-12-17 12:10", assemblyNo: "ZL-0018" },
    { lineName: "智能钢板库", workOrderNo: "WO2025121708", status: "已完成", completedAt: "2025-12-17 07:45", assemblyNo: "ZL-0019" },
  ],

  // 当日生产&物量 - 生产进度（表格）
  productionProgress: {
    day: [
      { title: "当日计划", date: "2025-12-17", lineName: "预处理产线", planQty: 120, actualQty: 110, completionRate: 92 },
      { title: "当日计划", date: "2025-12-17", lineName: "钢板下料", planQty: 160, actualQty: 168, completionRate: 105 },
      { title: "当日计划", date: "2025-12-17", lineName: "型材下料", planQty: 140, actualQty: 132, completionRate: 94 },
      { title: "当日计划", date: "2025-12-17", lineName: "T型材", planQty: 90, actualQty: 84, completionRate: 93 },
      { title: "当日计划", date: "2025-12-17", lineName: "小组立", planQty: 100, actualQty: 98, completionRate: 98 },
      { title: "当日计划", date: "2025-12-17", lineName: "片体拼板", planQty: 80, actualQty: 72, completionRate: 90 },
      { title: "当日计划", date: "2025-12-17", lineName: "平直分段", planQty: 110, actualQty: 106, completionRate: 96 },
      { title: "当日计划", date: "2025-12-17", lineName: "智能钢板库", planQty: 70, actualQty: 70, completionRate: 100 },
    ],
    week: [
      { title: "本周累计", date: "2025-W51", lineName: "预处理产线", planQty: 820, actualQty: 790, completionRate: 96 },
      { title: "本周累计", date: "2025-W51", lineName: "钢板下料", planQty: 1050, actualQty: 1120, completionRate: 107 },
      { title: "本周累计", date: "2025-W51", lineName: "型材下料", planQty: 960, actualQty: 910, completionRate: 95 },
      { title: "本周累计", date: "2025-W51", lineName: "T型材", planQty: 620, actualQty: 580, completionRate: 94 },
      { title: "本周累计", date: "2025-W51", lineName: "小组立", planQty: 700, actualQty: 680, completionRate: 97 },
      { title: "本周累计", date: "2025-W51", lineName: "片体拼板", planQty: 560, actualQty: 520, completionRate: 93 },
      { title: "本周累计", date: "2025-W51", lineName: "平直分段", planQty: 760, actualQty: 735, completionRate: 97 },
      { title: "本周累计", date: "2025-W51", lineName: "智能钢板库", planQty: 480, actualQty: 470, completionRate: 98 },
    ],
    month: [
      { title: "本月累计", date: "2025-12", lineName: "预处理产线", planQty: 3200, actualQty: 3010, completionRate: 94 },
      { title: "本月累计", date: "2025-12", lineName: "钢板下料", planQty: 4100, actualQty: 4250, completionRate: 104 },
      { title: "本月累计", date: "2025-12", lineName: "型材下料", planQty: 3850, actualQty: 3720, completionRate: 97 },
      { title: "本月累计", date: "2025-12", lineName: "T型材", planQty: 2550, actualQty: 2410, completionRate: 95 },
      { title: "本月累计", date: "2025-12", lineName: "小组立", planQty: 2900, actualQty: 2810, completionRate: 97 },
      { title: "本月累计", date: "2025-12", lineName: "片体拼板", planQty: 2400, actualQty: 2260, completionRate: 94 },
      { title: "本月累计", date: "2025-12", lineName: "平直分段", planQty: 3100, actualQty: 3020, completionRate: 97 },
      { title: "本月累计", date: "2025-12", lineName: "智能钢板库", planQty: 1900, actualQty: 1870, completionRate: 98 },
    ],
  },

  // 当日生产&物量 - 物量统计（图表）
  materialStatistics: {
    day: [
      { name: "钢板预处理线(吨)", plan: 140, actual: 128 },
      { name: "型材预处理线(吨)", plan: 95, actual: 86 },
    ],
    week: [
      { name: "钢板预处理线(吨)", plan: 880, actual: 820 },
      { name: "型材预处理线(吨)", plan: 600, actual: 560 },
    ],
    month: [
      { name: "钢板预处理线(吨)", plan: 3300, actual: 3120 },
      { name: "型材预处理线(吨)", plan: 2400, actual: 2280 },
    ],
  },

  // 人员工时（左侧总工时 + 右侧2x2）
  workHours: {
    totalAttendanceHours: 1260,
    maintenanceHours: 240,
    maintenanceConsumablesAmount: 86000,
    grindingAttendanceHours: 520,
    grindingConsumablesAmount: 42000,
  },

  // 分段建造产能（left-top）
  segmentCapacityOverview: {
    people: {
      total: 156,
      construction: 132,
      management: 24,
    },
    metrics: [
      { label: "下料预制全员人均吨位", value: 3.6, unit: "t/人" },
      { label: "分段建造全员人均吨位", value: 2.8, unit: "t/人" },
      { label: "分段建造平均吨位工时", value: 1.9, unit: "h/t" },
      { label: "分段胎架面积产能", value: 6.2, unit: "t/㎡" },
      { label: "分段在胎周期", value: 4.5, unit: "天" },
      { label: "平均胎架周转率", value: 86, unit: "%" },
    ],
  },
};

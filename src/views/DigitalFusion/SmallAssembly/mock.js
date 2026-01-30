/**
 * 报工情况数据 Mock
 */

// 工序维度数据（旧版本保留兼容）
export const processData = [
  { name: "倒棱工序", started: 0.8, notStarted: 1.8, completed: 0 },
  { name: "组立工序", started: 0, notStarted: 0, completed: 2 },
  { name: "缝补加工", started: 0, notStarted: 0, completed: 0 },
  { name: "矫正工序", started: 0, notStarted: 0, completed: 0 },
  { name: "检验工序", started: 0, notStarted: 0, completed: 0 },
  { name: "喷砂除锈工序", started: 0, notStarted: 0, completed: 0 },
  { name: "T型材产品", started: 0, notStarted: 0, completed: 0 },
];

// 工位维度数据（旧版本保留兼容）
export const stationData = [
  { name: "倒棱工位", started: 0.8, notStarted: 1.8, completed: 0 },
  { name: "组立工位", started: 0, notStarted: 0, completed: 2 },
  { name: "缝补加工工位", started: 0, notStarted: 0, completed: 0 },
  { name: "矫正工位", started: 0, notStarted: 0, completed: 0 },
  { name: "检验工位", started: 0, notStarted: 0, completed: 0 },
  { name: "喷砂除锈工位", started: 0, notStarted: 0, completed: 0 },
  { name: "T型材产品工位", started: 0, notStarted: 0, completed: 0 },
];

// 设备维度数据（旧版本保留兼容）
export const equipmentData = [
  { name: "倒棱设备1", started: 0.5, notStarted: 1.0, completed: 0 },
  { name: "倒棱设备2", started: 0.3, notStarted: 0.8, completed: 0 },
  { name: "组立设备", started: 0, notStarted: 0, completed: 2 },
  { name: "缝补设备", started: 0, notStarted: 0, completed: 0 },
  { name: "矫正设备", started: 0, notStarted: 0, completed: 0 },
  { name: "检验设备", started: 0, notStarted: 0, completed: 0 },
  { name: "喷砂设备", started: 0, notStarted: 0, completed: 0 },
];

export function getReportData(type = "process") {
  const dataMap = {
    process: processData,
    station: stationData,
    equipment: equipmentData,
  };

  return dataMap[type] || processData;
}

// ==================== 报工情况详情数据（左右双图表）====================

// 工序统计数据（左侧图表）
export const processQualityData = [
  { name: "倒棱工位", started: 12, completed: 9 },
  { name: "腹板拼接工位", started: 10, completed: 7 },
  { name: "组立工位", started: 14, completed: 11 },
  { name: "焊接工位", started: 9, completed: 6 },
  { name: "矫正工位", started: 8, completed: 6 },
  { name: "线下施工工位", started: 6, completed: 4 },
  { name: "T型材齐套合盘", started: 7, completed: 5 },
];

// 工位统计数据（右侧图表）
export const stationQualityData = [
  { name: "倒棱工位", started: 1.2, completed: 1.0 },
  { name: "腹板拼接工位", started: 1.0, completed: 0.6 },
  { name: "组立工位", started: 1.5, completed: 1.1 },
  { name: "焊接工位", started: 1.1, completed: 0.8 },
  { name: "矫正工位", started: 1.3, completed: 0.9 },
];

export function getReportDetailsData() {
  return {
    process: processQualityData,
    station: stationQualityData,
  };
}

/**
 * 当日生产数据 Mock
 */
export const dailyProductionData = [
  {
    id: 1,
    title: "已完成组立数量",
    value: 10,
    unit: "个",
  },
  {
    id: 2,
    title: "已完成组立重量",
    value: "1.92",
    unit: "吨",
  },
  {
    id: 3,
    title: "计划组立数量",
    value: 485,
    unit: "个",
  },
  {
    id: 4,
    title: "计划组立重量",
    value: "35.60",
    unit: "吨",
  },
];

export function getDailyProductionData() {
  return dailyProductionData;
}

/**
 * 产量统计数据 Mock
 */

// 工位维度 - 列配置
export const stationColumns = [
  { label: "工位信息", key: "station", width: "40%" },
  { label: "数量", key: "quantity", width: "30%" },
  { label: "重量(吨)", key: "weight", width: "30%" },
];

// 工位维度 - 数据
export const stationProductionData = [
  { station: "倒棱工位", quantity: 12, weight: 15.6 },
  { station: "组立工位", quantity: 8, weight: 22.3 },
  { station: "缝补加工工位", quantity: 5, weight: 8.9 },
  { station: "矫正工位", quantity: 15, weight: 18.7 },
  { station: "检验工位", quantity: 20, weight: 25.4 },
  { station: "喷砂除锈工位", quantity: 10, weight: 12.1 },
];

// 设备维度 - 列配置
export const equipmentColumns = [
  { label: "设备名称", key: "equipmentName", width: "40%" },
  { label: "已开工数量", key: "startedQuantity", width: "30%" },
  { label: "完工数量", key: "completedQuantity", width: "30%" },
];

// 设备维度 - 数据
export const equipmentProductionData = [
  { equipmentName: "倒棱机", startedQuantity: 11, completedQuantity: 1 },
  { equipmentName: "焊接机", startedQuantity: 0, completedQuantity: 0 },
  { equipmentName: "拼板机", startedQuantity: 1, completedQuantity: 0 },
  { equipmentName: "矫正机", startedQuantity: 1, completedQuantity: 0 },
  { equipmentName: "组立机", startedQuantity: 0, completedQuantity: 0 },
];

/**
 * 获取产量统计数据
 * @param {string} type - 统计类型: 'station' | 'equipment'
 * @returns {Object} { columns: Array, data: Array }
 */
export function getProductionStatsData(type = "station") {
  const dataMap = {
    station: {
      columns: stationColumns,
      data: stationProductionData,
    },
    equipment: {
      columns: equipmentColumns,
      data: equipmentProductionData,
    },
  };

  return dataMap[type] || dataMap.station;
}

/**
 * 缓存情况区域表格数据 Mock
 */
export const cacheStatusData = [
  {
    frameNumber: "LK-001",
    materialName: "钢板A",
    location: "A-01-05",
    shipNumber: "H9527",
    direction: "T型材生产线",
    batchNumber: "PC20240301-01",
  },
  {
    frameNumber: "LK-002",
    materialName: "型材B",
    location: "A-01-06",
    shipNumber: "H9527",
    direction: "倒棱工位",
    batchNumber: "PC20240301-02",
  },
  {
    frameNumber: "LK-003",
    materialName: "钢板C",
    location: "A-02-03",
    shipNumber: "H9528",
    direction: "组立工位",
    batchNumber: "PC20240302-01",
  },
  {
    frameNumber: "LK-004",
    materialName: "型材D",
    location: "A-02-04",
    shipNumber: "H9528",
    direction: "矫正工位",
    batchNumber: "PC20240302-02",
  },
  {
    frameNumber: "LK-005",
    materialName: "钢板E",
    location: "B-01-02",
    shipNumber: "H9529",
    direction: "检验工位",
    batchNumber: "PC20240303-01",
  },
  {
    frameNumber: "LK-006",
    materialName: "型材F",
    location: "B-01-03",
    shipNumber: "H9529",
    direction: "喷砂除锈工位",
    batchNumber: "PC20240303-02",
  },
];

export function getCacheStatusData() {
  return cacheStatusData;
}

/**
 * 班组区域表格数据 Mock
 */
export const teamStatusData = [
  {
    team: "甲班",
    stationInfo: "倒棱工位",
    quantity: 6,
    weight: 7.8,
  },
  {
    team: "甲班",
    stationInfo: "组立工位",
    quantity: 4,
    weight: 11.2,
  },
  {
    team: "乙班",
    stationInfo: "矫正工位",
    quantity: 8,
    weight: 9.5,
  },
  {
    team: "乙班",
    stationInfo: "缝补加工工位",
    quantity: 5,
    weight: 8.9,
  },
  {
    team: "丙班",
    stationInfo: "检验工位",
    quantity: 10,
    weight: 12.7,
  },
  {
    team: "丙班",
    stationInfo: "喷砂除锈工位",
    quantity: 10,
    weight: 12.1,
  },
];

export function getTeamStatusData() {
  return teamStatusData;
}

/**
 * 当日齐套情况数据 Mock
 * 表头：物流总工单 / 来料齐套数 / 集配进度
 */
export const dailyKittingData = [
  {
    totalOrders: 36,
    readyCount: 30,
    progress: 0.83,
  },
  {
    totalOrders: 24,
    readyCount: 18,
    progress: 0.75,
  },
  {
    totalOrders: 18,
    readyCount: 12,
    progress: 0.67,
  },
];

export function getDailyKittingData() {
  return dailyKittingData;
}

/**
 * 任务情况（周）数据 Mock
 */
export const weeklyTasksData = [
  {
    orderNumber: "WO-2024030101",
    shipNumber: "H9527",
    sectionNumber: "T-001",
    pushTime: "03-01 08:00",
    actualStartTime: "03-01 08:15",
    actualEndTime: "03-01 12:30",
    length: "120.5米",
    weight: "15.6吨",
    status: "completed",
    statusText: "已完成",
  },
  {
    orderNumber: "WO-2024030102",
    shipNumber: "H9527",
    sectionNumber: "T-002",
    pushTime: "03-01 09:00",
    actualStartTime: "03-01 09:20",
    actualEndTime: "-",
    length: "98.2米",
    weight: "13.4吨",
    status: "inProgress",
    statusText: "进行中",
  },
  {
    orderNumber: "WO-2024030103",
    shipNumber: "H9528",
    sectionNumber: "T-003",
    pushTime: "03-02 08:00",
    actualStartTime: "03-02 08:10",
    actualEndTime: "03-02 15:45",
    length: "105.6米",
    weight: "16.8吨",
    status: "completed",
    statusText: "已完成",
  },
  {
    orderNumber: "WO-2024030104",
    shipNumber: "H9528",
    sectionNumber: "T-004",
    pushTime: "03-02 10:00",
    actualStartTime: "-",
    actualEndTime: "-",
    length: "86.4米",
    weight: "12.5吨",
    status: "pending",
    statusText: "未开始",
  },
  {
    orderNumber: "WO-2024030105",
    shipNumber: "H9529",
    sectionNumber: "T-005",
    pushTime: "03-03 08:00",
    actualStartTime: "03-03 08:30",
    actualEndTime: "-",
    length: "132.7米",
    weight: "19.3吨",
    status: "paused",
    statusText: "暂停",
  },
  {
    orderNumber: "WO-2024030106",
    shipNumber: "H9529",
    sectionNumber: "T-006",
    pushTime: "03-03 14:00",
    actualStartTime: "03-03 14:15",
    actualEndTime: "03-03 18:20",
    length: "118.4米",
    weight: "17.9吨",
    status: "completed",
    statusText: "已完成",
  },
  {
    orderNumber: "WO-2024030107",
    shipNumber: "H9530",
    sectionNumber: "T-007",
    pushTime: "03-04 08:00",
    actualStartTime: "03-04 08:05",
    actualEndTime: "-",
    length: "110.2米",
    weight: "15.1吨",
    status: "inProgress",
    statusText: "进行中",
  },
];

export function getWeeklyTasksData() {
  return weeklyTasksData;
}

/**
 * 生产任务情况数据 Mock
 * 表头：工单号/船号/分段号/推送时间/实际开始时间/实际结束时间/长度/重量/工单状态
 */

// 日维度数据
export const dailyProductionTaskData = [
  {
    orderNumber: "WO-20240301-001",
    shipNumber: "H9527",
    sectionNumber: "T-001",
    pushTime: "03-01 08:00",
    actualStartTime: "03-01 08:15",
    actualEndTime: "03-01 12:30",
    length: "120.5米",
    weight: "15.6吨",
    status: "completed",
    statusText: "已完成",
  },
  {
    orderNumber: "WO-20240301-002",
    shipNumber: "H9527",
    sectionNumber: "T-002",
    pushTime: "03-01 09:00",
    actualStartTime: "03-01 09:20",
    actualEndTime: "-",
    length: "98.2米",
    weight: "13.4吨",
    status: "inProgress",
    statusText: "进行中",
  },
  {
    orderNumber: "WO-20240301-003",
    shipNumber: "H9528",
    sectionNumber: "T-003",
    pushTime: "03-02 08:00",
    actualStartTime: "03-02 08:10",
    actualEndTime: "03-02 15:45",
    length: "105.6米",
    weight: "16.8吨",
    status: "completed",
    statusText: "已完成",
  },
  {
    orderNumber: "WO-20240301-004",
    shipNumber: "H9528",
    sectionNumber: "T-004",
    pushTime: "03-02 10:00",
    actualStartTime: "-",
    actualEndTime: "-",
    length: "86.4米",
    weight: "12.5吨",
    status: "pending",
    statusText: "未开始",
  },
  {
    orderNumber: "WO-20240301-005",
    shipNumber: "H9529",
    sectionNumber: "T-005",
    pushTime: "03-03 08:00",
    actualStartTime: "03-03 08:30",
    actualEndTime: "-",
    length: "132.7米",
    weight: "19.3吨",
    status: "paused",
    statusText: "暂停",
  },
];

// 周维度数据
export const weeklyProductionTaskData = [
  {
    orderNumber: "WO-2024W09-001",
    shipNumber: "H9530",
    sectionNumber: "T-010",
    pushTime: "03-04 09:00",
    actualStartTime: "03-04 09:15",
    actualEndTime: "03-04 17:20",
    length: "140.2米",
    weight: "20.1吨",
    status: "completed",
    statusText: "已完成",
  },
  {
    orderNumber: "WO-2024W09-002",
    shipNumber: "H9531",
    sectionNumber: "T-011",
    pushTime: "03-05 08:30",
    actualStartTime: "03-05 08:45",
    actualEndTime: "-",
    length: "115.6米",
    weight: "16.4吨",
    status: "inProgress",
    statusText: "进行中",
  },
  {
    orderNumber: "WO-2024W09-003",
    shipNumber: "H9532",
    sectionNumber: "T-012",
    pushTime: "03-06 10:10",
    actualStartTime: "-",
    actualEndTime: "-",
    length: "92.3米",
    weight: "12.7吨",
    status: "pending",
    statusText: "未开始",
  },
  {
    orderNumber: "WO-2024W09-004",
    shipNumber: "H9533",
    sectionNumber: "T-013",
    pushTime: "03-06 14:00",
    actualStartTime: "03-06 14:20",
    actualEndTime: "03-06 19:30",
    length: "128.9米",
    weight: "18.6吨",
    status: "completed",
    statusText: "已完成",
  },
  {
    orderNumber: "WO-2024W09-005",
    shipNumber: "H9534",
    sectionNumber: "T-014",
    pushTime: "03-07 09:00",
    actualStartTime: "03-07 09:05",
    actualEndTime: "-",
    length: "101.5米",
    weight: "14.2吨",
    status: "paused",
    statusText: "暂停",
  },
];

// 月维度数据
export const monthlyProductionTaskData = [
  {
    orderNumber: "WO-202403-001",
    shipNumber: "H9601",
    sectionNumber: "批次A",
    pushTime: "03-01 07:30",
    actualStartTime: "03-01 07:45",
    actualEndTime: "03-05 18:00",
    length: "620.5米",
    weight: "88.3吨",
    status: "completed",
    statusText: "已完成",
  },
  {
    orderNumber: "WO-202403-002",
    shipNumber: "H9602",
    sectionNumber: "批次B",
    pushTime: "03-06 08:00",
    actualStartTime: "03-06 08:20",
    actualEndTime: "-",
    length: "512.7米",
    weight: "76.5吨",
    status: "inProgress",
    statusText: "进行中",
  },
  {
    orderNumber: "WO-202403-003",
    shipNumber: "H9603",
    sectionNumber: "批次C",
    pushTime: "03-10 09:10",
    actualStartTime: "03-10 09:25",
    actualEndTime: "03-12 21:30",
    length: "455.3米",
    weight: "63.8吨",
    status: "completed",
    statusText: "已完成",
  },
  {
    orderNumber: "WO-202403-004",
    shipNumber: "H9604",
    sectionNumber: "批次D",
    pushTime: "03-15 10:00",
    actualStartTime: "-",
    actualEndTime: "-",
    length: "398.6米",
    weight: "55.1吨",
    status: "pending",
    statusText: "未开始",
  },
  {
    orderNumber: "WO-202403-005",
    shipNumber: "H9605",
    sectionNumber: "批次E",
    pushTime: "03-18 11:00",
    actualStartTime: "03-18 11:20",
    actualEndTime: "-",
    length: "542.1米",
    weight: "79.4吨",
    status: "paused",
    statusText: "暂停",
  },
];

/**
 * 获取生产任务情况数据
 * @param {string} type - 时间维度: 'day' | 'week' | 'month'
 * @returns {Array} 生产任务数据
 */
export function getProductionTaskData(type = "day") {
  const dataMap = {
    day: dailyProductionTaskData,
    week: weeklyProductionTaskData,
    month: monthlyProductionTaskData,
  };

  return dataMap[type] || dailyProductionTaskData;
}

/**
 * 计划完成度数据 Mock
 */
export const planCompletionData = [
  {
    type: "件数",
    planned: 0,
    completed: 0,
    progress: "0.00",
    unit: "件",
  },
  {
    type: "长度",
    planned: "0.00",
    completed: "0.00",
    progress: "0.00",
    unit: "米",
  },
  {
    type: "重量",
    planned: "0.00",
    completed: "0.00",
    progress: "0.00",
    unit: "吨",
  },
];

export function getPlanCompletionData() {
  return planCompletionData;
}

/**
 * 工单统计数据 Mock
 */
export const orderStatisticsDataDay = [
  { type: "计划工单数", planned: 12, unit: "单" },
  { type: "延迟未完成工单数", planned: 8, unit: "单" },
  { type: "进行中工单数", planned: 3, unit: "单" },
  { type: "待开工工单数", planned: 1, unit: "单" },
  { type: "完成工单数", planned: 0, unit: "单" },
  { type: "计划完成率", planned: 66, unit: "%" },
];

export const orderStatisticsDataWeek = [
  { type: "计划工单数", planned: 84, unit: "单" },
  { type: "延迟未完成工单数", planned: 0, unit: "单" },
  { type: "进行中工单数", planned: 15, unit: "单" },
  { type: "待开工工单数", planned: 4, unit: "单" },
  { type: "完成工单数", planned: 65, unit: "单" },
  { type: "计划完成率", planned: 77, unit: "%" },
];

export const orderStatisticsDataMonth = [
  { type: "计划工单数", planned: 360, unit: "单" },
  { type: "延迟未完成工单数", planned: 0, unit: "单" },
  { type: "进行中工单数", planned: 40, unit: "单" },
  { type: "待开工工单数", planned: 10, unit: "单" },
  { type: "完成工单数", planned: 310, unit: "单" },
  { type: "计划完成率", planned: 86, unit: "%" },
];

export function getOrderStatisticsData(type = "day") {
  const map = {
    day: orderStatisticsDataDay,
    week: orderStatisticsDataWeek,
    month: orderStatisticsDataMonth,
  };
  return map[type] || orderStatisticsDataDay;
}

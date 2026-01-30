/**
 * 报工情况数据 Mock
 */

// 工序维度数据
export const processData = [
  { name: "倒棱工序", started: 0.8, notStarted: 1.8, completed: 0 },
  { name: "组立工序", started: 0, notStarted: 0, completed: 2 },
  { name: "缝补加工", started: 0, notStarted: 0, completed: 0 },
  { name: "矫正工序", started: 0, notStarted: 0, completed: 0 },
  { name: "检验工序", started: 0, notStarted: 0, completed: 0 },
  { name: "喷砂除锈工序", started: 0, notStarted: 0, completed: 0 },
  { name: "T型材产品", started: 0, notStarted: 0, completed: 0 },
];

// 工位维度数据
export const stationData = [
  { name: "倒棱工位", started: 0.8, notStarted: 1.8, completed: 0 },
  { name: "组立工位", started: 0, notStarted: 0, completed: 2 },
  { name: "缝补加工工位", started: 0, notStarted: 0, completed: 0 },
  { name: "矫正工位", started: 0, notStarted: 0, completed: 0 },
  { name: "检验工位", started: 0, notStarted: 0, completed: 0 },
  { name: "喷砂除锈工位", started: 0, notStarted: 0, completed: 0 },
  { name: "T型材产品工位", started: 0, notStarted: 0, completed: 0 },
];

// 设备维度数据
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
  { name: "横缝对接及上料工位", started: 12, completed: 9 },
  { name: "铣边拼板复合焊工位", started: 10, completed: 7 },
  { name: "划线工位", started: 14, completed: 11 },
  { name: "纵骨装配工位", started: 9, completed: 6 },
  { name: "纵骨专机焊接工位", started: 8, completed: 6 },
  { name: "片体运出工位", started: 6, completed: 4 },
];

// 工位统计数据（右侧图表）
export const stationQualityData = [
  { name: "横缝对接及上料工位", started: 1.2, completed: 1.0 },
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
    title: "计划数量",
    value: 320,
    unit: "件",
  },
  {
    id: 2,
    title: "已完成",
    value: 278,
    unit: "件",
  },
  {
    id: 3,
    title: "主板完成率",
    value: 86.9,
    unit: "%",
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
 * 缓存情况数据 Mock
 */
export const cacheStatusData = [
  {
    frameNumber: "LK-001",
    materialName: "T型材-A",
    location: "A-01-05",
    shipNumber: "H9527",
    direction: "T型材生产线",
    quantity: 120,
  },
  {
    frameNumber: "LK-002",
    materialName: "T型材-B",
    location: "A-01-06",
    shipNumber: "H9527",
    direction: "倒棱工位",
    quantity: 85,
  },
  {
    frameNumber: "LK-003",
    materialName: "T型材-C",
    location: "A-02-03",
    shipNumber: "H9528",
    direction: "组立工位",
    quantity: 150,
  },
  {
    frameNumber: "LK-004",
    materialName: "T型材-D",
    location: "A-02-04",
    shipNumber: "H9528",
    direction: "矫正工位",
    quantity: 95,
  },
  {
    frameNumber: "LK-005",
    materialName: "T型材-E",
    location: "B-01-02",
    shipNumber: "H9529",
    direction: "检验工位",
    quantity: 110,
  },
  {
    frameNumber: "LK-006",
    materialName: "T型材-F",
    location: "B-01-03",
    shipNumber: "H9529",
    direction: "喷砂除锈工位",
    quantity: 78,
  },
];

export function getCacheStatusData() {
  return cacheStatusData;
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
    status: "inProgress",
    statusText: "进行中",
  },
];

export function getWeeklyTasksData() {
  return weeklyTasksData;
}

/**
 * 生产任务情况数据 Mock
 */

// 日维度数据
export const dailyProductionTaskData = [
  {
    orderNumber: "WO-20240301-001",
    shipNumber: "H9527",
    sectionNumber: "T-001",
    assemblyQuantity: 10,
    plannedQuantity: 10,
    completedQuantity: 8,
    setQuantity: 8,
    weight: 1560,
  },
  {
    orderNumber: "WO-20240301-002",
    shipNumber: "H9527",
    sectionNumber: "T-002",
    assemblyQuantity: 6,
    plannedQuantity: 6,
    completedQuantity: 6,
    setQuantity: 6,
    weight: 2230,
  },
  {
    orderNumber: "WO-20240301-003",
    shipNumber: "H9528",
    sectionNumber: "T-003",
    assemblyQuantity: 8,
    plannedQuantity: 8,
    completedQuantity: 5,
    setQuantity: 5,
    weight: 1870,
  },
  {
    orderNumber: "WO-20240301-004",
    shipNumber: "H9528",
    sectionNumber: "T-004",
    assemblyQuantity: 12,
    plannedQuantity: 12,
    completedQuantity: 12,
    setQuantity: 12,
    weight: 2540,
  },
];

// 周维度数据
export const weeklyProductionTaskData = [
  {
    orderNumber: "WO-2024W09-001",
    shipNumber: "H9527",
    sectionNumber: "T-001~T-005",
    assemblyQuantity: 45,
    plannedQuantity: 45,
    completedQuantity: 42,
    setQuantity: 40,
    weight: 7280,
  },
  {
    orderNumber: "WO-2024W09-002",
    shipNumber: "H9527",
    sectionNumber: "T-006~T-010",
    assemblyQuantity: 32,
    plannedQuantity: 32,
    completedQuantity: 30,
    setQuantity: 28,
    weight: 9850,
  },
  {
    orderNumber: "WO-2024W09-003",
    shipNumber: "H9528",
    sectionNumber: "T-011~T-015",
    assemblyQuantity: 38,
    plannedQuantity: 38,
    completedQuantity: 35,
    setQuantity: 35,
    weight: 8570,
  },
  {
    orderNumber: "WO-2024W09-004",
    shipNumber: "H9528",
    sectionNumber: "T-016~T-020",
    assemblyQuantity: 25,
    plannedQuantity: 25,
    completedQuantity: 20,
    setQuantity: 18,
    weight: 4530,
  },
  {
    orderNumber: "WO-2024W09-005",
    shipNumber: "H9529",
    sectionNumber: "T-021~T-025",
    assemblyQuantity: 50,
    plannedQuantity: 50,
    completedQuantity: 48,
    setQuantity: 48,
    weight: 10860,
  },
];

// 月维度数据
export const monthlyProductionTaskData = [
  {
    orderNumber: "WO-202403-001",
    shipNumber: "H9527",
    sectionNumber: "批次A",
    assemblyQuantity: 180,
    plannedQuantity: 180,
    completedQuantity: 172,
    setQuantity: 170,
    weight: 28530,
  },
  {
    orderNumber: "WO-202403-002",
    shipNumber: "H9527",
    sectionNumber: "批次B",
    assemblyQuantity: 145,
    plannedQuantity: 145,
    completedQuantity: 138,
    setQuantity: 135,
    weight: 41280,
  },
  {
    orderNumber: "WO-202403-003",
    shipNumber: "H9528",
    sectionNumber: "批次C",
    assemblyQuantity: 168,
    plannedQuantity: 168,
    completedQuantity: 155,
    setQuantity: 150,
    weight: 35890,
  },
  {
    orderNumber: "WO-202403-004",
    shipNumber: "H9528",
    sectionNumber: "批次D",
    assemblyQuantity: 95,
    plannedQuantity: 95,
    completedQuantity: 82,
    setQuantity: 80,
    weight: 16870,
  },
  {
    orderNumber: "WO-202403-005",
    shipNumber: "H9529",
    sectionNumber: "批次E",
    assemblyQuantity: 220,
    plannedQuantity: 220,
    completedQuantity: 215,
    setQuantity: 210,
    weight: 46850,
  },
  {
    orderNumber: "WO-202403-006",
    shipNumber: "H9530",
    sectionNumber: "批次F",
    assemblyQuantity: 128,
    plannedQuantity: 128,
    completedQuantity: 118,
    setQuantity: 115,
    weight: 21560,
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


// 计划完成度 - 日
export const planCompletionDataDay = [
  { type: "件数", planned: "35", completed: "32", progress: "91.4", unit: "件" },
  { type: "长度", planned: "125.5", completed: "110.2", progress: "87.8", unit: "米" },
  { type: "重量", planned: "45.5", completed: "41.2", progress: "90.5", unit: "吨" },
];

// 计划完成度 - 周
export const planCompletionDataWeek = [
  { type: "件数", planned: "245", completed: "220", progress: "89.8", unit: "件" },
  { type: "长度", planned: "850.5", completed: "780.2", progress: "91.7", unit: "米" },
  { type: "重量", planned: "318.5", completed: "285.6", progress: "89.7", unit: "吨" },
];

// 计划完成度 - 月
export const planCompletionDataMonth = [
  { type: "件数", planned: "1050", completed: "980", progress: "93.3", unit: "件" },
  { type: "长度", planned: "3500.0", completed: "3250.5", progress: "92.8", unit: "米" },
  { type: "重量", planned: "1365.0", completed: "1258.4", progress: "92.2", unit: "吨" },
];

export function getPlanCompletionData(type = 'day') {
  const map = {
    day: planCompletionDataDay,
    week: planCompletionDataWeek,
    month: planCompletionDataMonth
  };
  return map[type] || planCompletionDataDay;
}

/**
 * 工单统计数据 Mock
 */


// 工单统计 - 日
export const orderStatisticsDataDay = [
  { type: "计划工单数", planned: 12, unit: "单" },
  { type: "完成工单数", planned: 8, unit: "单" },
  { type: "进行中工单数", planned: 3, unit: "单" },
  { type: "待开工工单数", planned: 1, unit: "单" },
  { type: "暂停工单数", planned: 0, unit: "单" },
  { type: "计划完成率", planned: 66, unit: "%" },
];

// 工单统计 - 周
export const orderStatisticsDataWeek = [
  { type: "计划工单数", planned: 84, unit: "单" },
  { type: "完成工单数", planned: 65, unit: "单" },
  { type: "进行中工单数", planned: 15, unit: "单" },
  { type: "待开工工单数", planned: 4, unit: "单" },
  { type: "暂停工单数", planned: 0, unit: "单" },
  { type: "计划完成率", planned: 77, unit: "%" },
];

// 工单统计 - 月
export const orderStatisticsDataMonth = [
  { type: "计划工单数", planned: 360, unit: "单" },
  { type: "完成工单数", planned: 310, unit: "单" },
  { type: "进行中工单数", planned: 40, unit: "单" },
  { type: "待开工工单数", planned: 10, unit: "单" },
  { type: "暂停工单数", planned: 0, unit: "单" },
  { type: "计划完成率", planned: 86, unit: "%" },
];

export function getOrderStatisticsData(type = 'day') {
  const map = {
    day: orderStatisticsDataDay,
    week: orderStatisticsDataWeek,
    month: orderStatisticsDataMonth
  };
  return map[type] || orderStatisticsDataDay;
}

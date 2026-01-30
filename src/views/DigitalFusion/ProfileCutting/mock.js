/**
 * 型材下料页面 Mock 数据
 */

// ==================== 报工情况数据 ====================

// 工序维度数据
export const processQualityData = [
  { name: "喷码划线工位", started: 50, completed: 35 },
  { name: "型材下料齐套合盘", started: 45, completed: 10 },
  { name: "型材分拣工位", started: 10, completed: 85 },
  { name: "型材切割工位", started: 20, completed: 72 },
  { name: "型材对接工位", started: 30, completed: 48 },
  { name: "型材立体库", started: 35, completed: 30 },
  { name: "矫直工位", started: 55, completed: 0 },
];

// 工位维度数据
export const stationQualityData = [
  { name: "喷码划线工位", started: 0.8, completed: 1.2 },
  { name: "型材切割工位", started: 1.5, completed: 0.7 },
  { name: "型材立体库", started: 0.5, completed: 2.1 },
  { name: "矫直工位", started: 1.2, completed: 1.3 },
];

// 设备维度数据
export const equipmentQualityData = [
  { name: "喷码划线工位", started: 0.6, completed: 1.4 },
  { name: "型材切割工位", started: 1.2, completed: 0.9 },
  { name: "型材立体库", started: 0.4, completed: 2.0 },
  { name: "矫直工位", started: 1.0, completed: 1.5 },
];

export function getReportData(type = "process") {
  const dataMap = {
    process: processQualityData,
    station: stationQualityData,
    equipment: equipmentQualityData,
  };

  return dataMap[type] || processQualityData;
}

/**
 * 当日生产数据 Mock
 */
export const dailyProductionData = [
  {
    id: 1,
    title: "型材立体库",
    value: 256.8,
    unit: "个",
  },
  {
    id: 2,
    title: "矫直",
    value: 198.5,
    unit: "个",
  },
  {
    id: 3,
    title: "喷码划线",
    value: 175.2,
    unit: "个",
  },
  {
    id: 4,
    title: "型材切割1",
    value: 45,
    unit: "个",
  },
  {
    id: 5,
    title: "型材切割2",
    value: 38,
    unit: "个",
  },
  {
    id: 6,
    title: "型材分拣",
    value: 32,
    unit: "个",
  },
];

export function getDailyProductionData() {
  return dailyProductionData;
}

/**
 * 产量统计数据 Mock
 */

// 船号维度 - 列配置
export const shipColumns = [
  { label: "船号", key: "shipNumber", width: "40%" },
  { label: "数量", key: "quantity", width: "30%" },
  { label: "重量(吨)", key: "weight", width: "30%" },
];

// 船号维度 - 数据
export const shipProductionData = [
  { shipNumber: "H9527", quantity: 120, weight: 86.4 },
  { shipNumber: "H9528", quantity: 98, weight: 71.2 },
  { shipNumber: "H9529", quantity: 76, weight: 55.8 },
  { shipNumber: "H9530", quantity: 64, weight: 47.5 },
  { shipNumber: "H9531", quantity: 52, weight: 38.1 },
  { shipNumber: "H9532", quantity: 46, weight: 33.7 },
];

// 批次维度 - 列配置
export const batchColumns = [
  { label: "批次", key: "batch", width: "35%" },
  { label: "数量", key: "quantity", width: "30%" },
  { label: "重量(吨)", key: "weight", width: "35%" },
];

// 批次维度 - 数据
export const batchProductionData = [
  { batch: "A-202403-01", quantity: 52, weight: 28.6 },
  { batch: "A-202403-02", quantity: 48, weight: 25.3 },
  { batch: "B-202403-01", quantity: 44, weight: 22.9 },
  { batch: "B-202403-02", quantity: 40, weight: 21.4 },
  { batch: "C-202403-01", quantity: 36, weight: 19.8 },
  { batch: "D-202403-01", quantity: 32, weight: 17.5 },
];

// 分段维度 - 列配置
export const segmentColumns = [
  { label: "分段号", key: "segment", width: "40%" },
  { label: "数量", key: "quantity", width: "30%" },
  { label: "重量(吨)", key: "weight", width: "30%" },
];

// 分段维度 - 数据
export const segmentProductionData = [
  { segment: "01S-01", quantity: 32, weight: 18.4 },
  { segment: "01S-02", quantity: 28, weight: 16.7 },
  { segment: "02S-01", quantity: 24, weight: 14.2 },
  { segment: "03S-01", quantity: 22, weight: 13.1 },
  { segment: "04S-01", quantity: 18, weight: 10.8 },
  { segment: "05S-01", quantity: 16, weight: 9.6 },
];

/**
 * 获取产量统计数据
 * @param {string} type - 统计类型: 'ship' | 'batch' | 'segment'
 * @returns {Object} { columns: Array, data: Array }
 */
export function getProductionStatsData(type = "ship") {
  const dataMap = {
    ship: {
      columns: shipColumns,
      data: shipProductionData,
    },
    batch: {
      columns: batchColumns,
      data: batchProductionData,
    },
    segment: {
      columns: segmentColumns,
      data: segmentProductionData,
    },
  };

  return dataMap[type] || dataMap.ship;
}

/**
 * 缓存情况数据 Mock
 */
export const cacheStatusData = [
  {
    frameNumber: "XL-001",
    materialName: "高强钢板 A",
    location: "C-01-01",
    shipNumber: "H9527",
    direction: "下料产线",
    quantity: 85,
  },
  {
    frameNumber: "XL-002",
    materialName: "普通钢板 B",
    location: "C-01-02",
    shipNumber: "H9527",
    direction: "切割工位",
    quantity: 62,
  },
  {
    frameNumber: "XL-003",
    materialName: "角钢 C",
    location: "C-02-01",
    shipNumber: "H9528",
    direction: "标识工位",
    quantity: 98,
  },
  {
    frameNumber: "XL-004",
    materialName: "工字钢 D",
    location: "C-02-02",
    shipNumber: "H9528",
    direction: "检验工位",
    quantity: 75,
  },
  {
    frameNumber: "XL-005",
    materialName: "槽钢 E",
    location: "D-01-01",
    shipNumber: "H9529",
    direction: "转运区",
    quantity: 88,
  },
  {
    frameNumber: "XL-006",
    materialName: "圆钢 F",
    location: "D-01-02",
    shipNumber: "H9529",
    direction: "成品库",
    quantity: 56,
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
    orderNumber: "XL-2024030101",
    shipNumber: "H9527",
    sectionNumber: "XC-001",
    pushTime: "03-01 08:00",
    actualStartTime: "03-01 08:10",
    actualEndTime: "03-01 11:30",
    status: "completed",
    statusText: "已完成",
  },
  {
    orderNumber: "XL-2024030102",
    shipNumber: "H9527",
    sectionNumber: "XC-002",
    pushTime: "03-01 09:00",
    actualStartTime: "03-01 09:15",
    actualEndTime: "-",
    status: "inProgress",
    statusText: "进行中",
  },
  {
    orderNumber: "XL-2024030103",
    shipNumber: "H9528",
    sectionNumber: "XC-003",
    pushTime: "03-02 08:00",
    actualStartTime: "03-02 08:05",
    actualEndTime: "03-02 14:20",
    status: "completed",
    statusText: "已完成",
  },
  {
    orderNumber: "XL-2024030104",
    shipNumber: "H9528",
    sectionNumber: "XC-004",
    pushTime: "03-02 10:00",
    actualStartTime: "-",
    actualEndTime: "-",
    status: "pending",
    statusText: "未开始",
  },
  {
    orderNumber: "XL-2024030105",
    shipNumber: "H9529",
    sectionNumber: "XC-005",
    pushTime: "03-03 08:00",
    actualStartTime: "03-03 08:20",
    actualEndTime: "-",
    status: "paused",
    statusText: "暂停",
  },
  {
    orderNumber: "XL-2024030106",
    shipNumber: "H9529",
    sectionNumber: "XC-006",
    pushTime: "03-03 14:00",
    actualStartTime: "03-03 14:10",
    actualEndTime: "03-03 17:45",
    status: "completed",
    statusText: "已完成",
  },
  {
    orderNumber: "XL-2024030107",
    shipNumber: "H9530",
    sectionNumber: "XC-007",
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

// ==================== 缓存详情数据 ====================

export const cacheDetailsData = {
  // 线边库数据
  lineSide: [
    { frameNo: "200039", materialName: "角钢L63×6", location: "C-01-01", shipNo: "H9527", direction: "切割线", batchNo: "1" },
    { frameNo: "200043", materialName: "槽钢U100", location: "C-01-02", shipNo: "H9527", direction: "切割线", batchNo: "1" },
    { frameNo: "200046", materialName: "工字钢I20", location: "C-01-03", shipNo: "H9528", direction: "分拣区", batchNo: "1" },
    { frameNo: "200052", materialName: "扁钢FB50×5", location: "C-02-01", shipNo: "H9528", direction: "切割线", batchNo: "2" },
    { frameNo: "200058", materialName: "角钢L75×8", location: "C-02-02", shipNo: "H9529", direction: "分拣区", batchNo: "2" },
    { frameNo: "200061", materialName: "槽钢U120", location: "C-02-03", shipNo: "H9529", direction: "切割线", batchNo: "2" },
    { frameNo: "200067", materialName: "工字钢I25", location: "C-03-01", shipNo: "H9530", direction: "分拣区", batchNo: "3" },
    { frameNo: "200073", materialName: "扁钢FB60×6", location: "C-03-02", shipNo: "H9530", direction: "切割线", batchNo: "3" },
    { frameNo: "200079", materialName: "角钢L90×10", location: "C-03-03", shipNo: "H9531", direction: "分拣区", batchNo: "3" },
    { frameNo: "200085", materialName: "槽钢U140", location: "C-04-01", shipNo: "H9531", direction: "切割线", batchNo: "4" },
    { frameNo: "200091", materialName: "工字钢I30", location: "C-04-02", shipNo: "H9532", direction: "分拣区", batchNo: "4" },
    { frameNo: "200097", materialName: "扁钢FB70×8", location: "C-04-03", shipNo: "H9532", direction: "切割线", batchNo: "4" },
    { frameNo: "200103", materialName: "角钢L100×12", location: "C-05-01", shipNo: "H9533", direction: "分拣区", batchNo: "5" },
    { frameNo: "200109", materialName: "槽钢U160", location: "C-05-02", shipNo: "H9533", direction: "切割线", batchNo: "5" },
    { frameNo: "200115", materialName: "工字钢I36", location: "C-05-03", shipNo: "H9534", direction: "分拣区", batchNo: "5" },
  ],
  // 部件立库数据
  componentWarehouse: [
    { frameNo: "200018", materialName: "型材零件A", location: "D-01-01", shipNo: "H9527", direction: "组装区", batchNo: "1" },
    { frameNo: "200024", materialName: "型材零件B", location: "D-01-02", shipNo: "H9527", direction: "焊接区", batchNo: "1" },
    { frameNo: "200030", materialName: "型材零件C", location: "D-01-03", shipNo: "H9528", direction: "组装区", batchNo: "1" },
    { frameNo: "200036", materialName: "型材零件A", location: "D-02-01", shipNo: "H9528", direction: "焊接区", batchNo: "2" },
    { frameNo: "200042", materialName: "型材零件D", location: "D-02-02", shipNo: "H9529", direction: "组装区", batchNo: "2" },
    { frameNo: "200048", materialName: "型材零件B", location: "D-02-03", shipNo: "H9529", direction: "焊接区", batchNo: "2" },
    { frameNo: "200054", materialName: "型材零件C", location: "D-03-01", shipNo: "H9530", direction: "组装区", batchNo: "3" },
    { frameNo: "200060", materialName: "型材零件A", location: "D-03-02", shipNo: "H9530", direction: "焊接区", batchNo: "3" },
    { frameNo: "200066", materialName: "型材零件D", location: "D-03-03", shipNo: "H9531", direction: "组装区", batchNo: "3" },
    { frameNo: "200072", materialName: "型材零件B", location: "D-04-01", shipNo: "H9531", direction: "焊接区", batchNo: "4" },
    { frameNo: "200078", materialName: "型材零件C", location: "D-04-02", shipNo: "H9532", direction: "组装区", batchNo: "4" },
    { frameNo: "200084", materialName: "型材零件A", location: "D-04-03", shipNo: "H9532", direction: "焊接区", batchNo: "4" },
    { frameNo: "200090", materialName: "型材零件D", location: "D-05-01", shipNo: "H9533", direction: "组装区", batchNo: "5" },
    { frameNo: "200096", materialName: "型材零件B", location: "D-05-02", shipNo: "H9533", direction: "焊接区", batchNo: "5" },
    { frameNo: "200102", materialName: "型材零件C", location: "D-05-03", shipNo: "H9534", direction: "组装区", batchNo: "5" },
  ],
};

export function getCacheDetailsData() {
  return cacheDetailsData;
}

// ==================== 切割设备数据 ====================

export const cuttingEquipmentData = [
  { name: "型材立体库", quantity: 0 },
  { name: "矫直工位", quantity: 0 },
  { name: "喷码划线工位", quantity: 0 },
  { name: "型材切割工位", quantity: 0 },
];

export function getCuttingEquipmentData() {
  return cuttingEquipmentData;
}

// ==================== 零部件统计数据 ====================

export const componentStatsData = [
  { id: 1, title: "计划分拣数量", value: 960, unit: "件" },
  { id: 2, title: "实际分拣完成数量", value: 856, unit: "件" },
  { id: 3, title: "手动分拣数量", value: 68, unit: "件" },
  { id: 4, title: "分拣率", value: 89.2, unit: "%" },
];

export function getComponentStatsData() {
  return componentStatsData;
}

/**
 * 生产任务情况数据 Mock
 */

// 日维度数据
export const dailyProductionTaskData = [
  {
    orderNo: "XL-2024-001",
    shipNo: "H9527",
    batchNo: "1",
    segmentNo: "A01",
    actualStart: "08:30",
    actualEnd: "10:45",
    pushTime: "10:50",
    quantity: 45,
    weight: "6.8t",
    status: "completed",
    statusText: "已完成",
  },
  {
    orderNo: "XL-2024-002",
    shipNo: "H9527",
    batchNo: "1",
    segmentNo: "A02",
    actualStart: "09:00",
    actualEnd: "--",
    pushTime: "--",
    quantity: 38,
    weight: "5.2t",
    status: "inProgress",
    statusText: "进行中",
  },
  {
    orderNo: "XL-2024-003",
    shipNo: "H9528",
    batchNo: "2",
    segmentNo: "B01",
    actualStart: "10:15",
    actualEnd: "12:30",
    pushTime: "12:35",
    quantity: 52,
    weight: "7.5t",
    status: "completed",
    statusText: "已完成",
  },
  {
    orderNo: "XL-2024-004",
    shipNo: "H9528",
    batchNo: "2",
    segmentNo: "B02",
    actualStart: "--",
    actualEnd: "--",
    pushTime: "--",
    quantity: 42,
    weight: "6.1t",
    status: "pending",
    statusText: "未开始",
  },
  {
    orderNo: "XL-2024-005",
    shipNo: "H9529",
    batchNo: "3",
    segmentNo: "C01",
    actualStart: "13:00",
    actualEnd: "--",
    pushTime: "--",
    quantity: 36,
    weight: "4.8t",
    status: "inProgress",
    statusText: "进行中",
  },
];

// 周维度数据
export const weeklyProductionTaskData = [
  {
    orderNo: "XL-2024W09-001",
    shipNo: "H9527",
    batchNo: "1-5",
    segmentNo: "A-E",
    actualStart: "周一 08:00",
    actualEnd: "周五 17:30",
    pushTime: "周五 17:45",
    quantity: 285,
    weight: "38.6t",
    status: "completed",
    statusText: "已完成",
  },
  {
    orderNo: "XL-2024W09-002",
    shipNo: "H9528",
    batchNo: "6-10",
    segmentNo: "F-J",
    actualStart: "周一 09:00",
    actualEnd: "周四 16:30",
    pushTime: "周四 16:45",
    quantity: 265,
    weight: "35.2t",
    status: "completed",
    statusText: "已完成",
  },
  {
    orderNo: "XL-2024W09-003",
    shipNo: "H9529",
    batchNo: "11-15",
    segmentNo: "K-O",
    actualStart: "周二 08:30",
    actualEnd: "--",
    pushTime: "--",
    quantity: 195,
    weight: "26.8t",
    status: "inProgress",
    statusText: "进行中",
  },
  {
    orderNo: "XL-2024W09-004",
    shipNo: "H9530",
    batchNo: "16-20",
    segmentNo: "P-T",
    actualStart: "--",
    actualEnd: "--",
    pushTime: "--",
    quantity: 220,
    weight: "29.5t",
    status: "pending",
    statusText: "未开始",
  },
];

// 月维度数据
export const monthlyProductionTaskData = [
  {
    orderNo: "XL-202403-001",
    shipNo: "H9527",
    batchNo: "全部",
    segmentNo: "批次A",
    actualStart: "03-01",
    actualEnd: "03-08",
    pushTime: "03-08",
    quantity: 1280,
    weight: "165.3t",
    status: "completed",
    statusText: "已完成",
  },
  {
    orderNo: "XL-202403-002",
    shipNo: "H9528",
    batchNo: "全部",
    segmentNo: "批次B",
    actualStart: "03-05",
    actualEnd: "03-15",
    pushTime: "03-15",
    quantity: 1156,
    weight: "152.8t",
    status: "completed",
    statusText: "已完成",
  },
  {
    orderNo: "XL-202403-003",
    shipNo: "H9529",
    batchNo: "全部",
    segmentNo: "批次C",
    actualStart: "03-10",
    actualEnd: "--",
    pushTime: "--",
    quantity: 985,
    weight: "128.9t",
    status: "inProgress",
    statusText: "进行中",
  },
  {
    orderNo: "XL-202403-004",
    shipNo: "H9530",
    batchNo: "全部",
    segmentNo: "批次D",
    actualStart: "--",
    actualEnd: "--",
    pushTime: "--",
    quantity: 1050,
    weight: "138.7t",
    status: "pending",
    statusText: "未开始",
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
    planned: 150,
    completed: 128,
    progress: "85.33",
    unit: "件",
  },
  {
    type: "长度",
    planned: "1856.50",
    completed: "1589.20",
    progress: "85.60",
    unit: "米",
  },
  {
    type: "重量",
    planned: "225.80",
    completed: "193.50",
    progress: "85.70",
    unit: "吨",
  },
];

export function getPlanCompletionData() {
  return planCompletionData;
}

/**
 * 工单统计数据 Mock
 */
export const orderStatisticsData = [
  {
    type: "当前工单总数",
    value: 1,
    trend: "up",
  },
  {
    type: "进行中工单数",
    value: 1,
    trend: "up",
  },
  {
    type: "已完工工单数",
    value: 0,
    trend: "up",
  },
];

export function getOrderStatisticsData() {
  return orderStatisticsData;
}

/**
 * 下料统计数据 Mock (左侧中间区域)
 */
export const cuttingStatisticsData = [
  {
    type: "实际完成件数",
    value: 1,
    unit: "件",
  },
  {
    type: "计划完成件数",
    value: 103,
    unit: "件",
  },
  {
    type: "零件数量",
    value: "--",
    unit: "件",
  },
  {
    type: "分拣合格零件数量",
    value: "--",
    unit: "件",
  },
];

export function getCuttingStatisticsData() {
  return cuttingStatisticsData;
}

/**
 * 设备状态数据 Mock (左侧下方区域)
 */
export const equipmentStatusData = [
  { name: "库存总量", value: 225 },
  { name: "日出库量", value: 0 },
  { name: "日入库量", value: 0 },
  { name: "已出库量", value: 150 },
  { name: "已入库量", value: 210 },
];

export function getEquipmentStatusData() {
  return equipmentStatusData;
}

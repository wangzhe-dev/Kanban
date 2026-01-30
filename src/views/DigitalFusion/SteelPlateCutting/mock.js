/**
 * 钢板下料大屏 Mock 数据
 */

// ==================== 质量统计数据 ====================

// 工序维度数据
export const processQualityData = [
  { name: "切割线上料工位", started: 50, completed: 35 },
  { name: "激光切割工位", started: 20, completed: 72 },
  { name: "切割线坡口工位", started: 55, completed: 0 },
  { name: "切割线倒棱工位", started: 30, completed: 48 },
  { name: "切割线分拣工位", started: 10, completed: 85 },
  { name: "钢板下料分拣码", started: 35, completed: 30 },
  { name: "框钢板下料齐套合盘", started: 45, completed: 10 },
];

// 设备维度数据
export const equipmentQualityData = [
  { name: "切割线上料工位设备", started: 0.6, completed: 1.4 },
  { name: "激光切割工位设备", started: 1.2, completed: 0.9 },
  { name: "切割线坡口工位设备", started: 0.4, completed: 2.0 },
  { name: "切割线倒棱工位设备", started: 1.0, completed: 1.5 },
  { name: "切割线分拣工位设备", started: 0.5, completed: 2.2 },
  { name: "部件1号切割机", started: 1.3, completed: 0.8 },
  { name: "部件2号切割机", started: 0.7, completed: 1.8 },
  { name: "部件3号切割机", started: 1.1, completed: 1.2 },
];

// 工位维度数据
export const stationQualityData = [
  { name: "切割线上料工位", started: 0.8, completed: 1.2 },
  { name: "激光切割工位", started: 1.5, completed: 0.7 },
  { name: "切割线坡口工位", started: 0.5, completed: 2.1 },
  { name: "切割线倒棱工位", started: 1.2, completed: 1.3 },
  { name: "切割线分拣工位", started: 0.3, completed: 2.5 },
];

export function getQualityData(type = "process") {
  const dataMap = {
    process: processQualityData,
    station: stationQualityData,
    equipment: equipmentQualityData,
  };
  return dataMap[type] || processQualityData;
}

// ==================== 当日产量数据 ====================

export const dailyOutputData = [
  { id: 1, title: "切割钢板数量", value: 128, unit: "块" },
  { id: 2, title: "切割总面积", value: 1856.5, unit: "㎡" },
  { id: 3, title: "切割总长度", value: 4280, unit: "米" },
  { id: 4, title: "下料零件数", value: 456, unit: "件" },
  { id: 5, title: "完成工单数", value: 32, unit: "个" },
  { id: 6, title: "设备利用率", value: 87.5, unit: "%" },
];

export function getDailyOutputData() {
  return dailyOutputData;
}

// ==================== 产量统计数据 ====================

// 工位维度 - 列配置
export const stationColumns = [
  { label: "工位名称", key: "station", width: "34%" },
  { label: "工位计划(个)", key: "plan", width: "33%" },
  { label: "工位实际(个)", key: "actual", width: "33%" },
];

// 工位维度 - 数据
export const stationProductionData = [
  { station: "切割工位1#", plan: 55, actual: 52 },
  { station: "切割工位2#", plan: 50, actual: 48 },
  { station: "切割工位3#", plan: 40, actual: 35 },
  { station: "分拣工位1#", plan: 30, actual: 28 },
  { station: "分拣工位2#", plan: 25, actual: 22 },
];

// 设备维度 - 列配置
export const equipmentColumns = [
  { label: "设备名称", key: "equipment", width: "40%" },
  { label: "切割数量", key: "quantity", width: "30%" },
  { label: "切割面积(㎡)", key: "area", width: "30%" },
];

// 设备维度 - 数据
export const equipmentProductionData = [
  { equipment: "等离子切割机1#", quantity: 45, area: 652.3 },
  { equipment: "等离子切割机2#", quantity: 38, area: 548.7 },
  { equipment: "火焰切割机1#", quantity: 22, area: 318.5 },
  { equipment: "激光切割机", quantity: 15, area: 215.8 },
  { equipment: "数控冲床", quantity: 8, area: 121.2 },
];

// 班组维度 - 列配置
export const teamColumns = [
  { label: "班组", key: "team", width: "25%" },
  { label: "物料名称", key: "material", width: "25%" },
  { label: "工位计划(个)", key: "plan", width: "25%" },
  { label: "工位实际(个)", key: "actual", width: "25%" },
];

// 班组维度 - 数据
export const teamProductionData = [
  { team: "甲班", material: "Q235B钢板", plan: 30, actual: 28 },
  { team: "甲班", material: "Q345B钢板", plan: 25, actual: 22 },
  { team: "乙班", material: "Q235B钢板", plan: 28, actual: 26 },
  { team: "乙班", material: "Q345C钢板", plan: 20, actual: 18 },
  { team: "丙班", material: "Q235B钢板", plan: 32, actual: 30 },
  { team: "丙班", material: "Q345B钢板", plan: 22, actual: 20 },
];

// 产成品维度 - 列配置
export const productColumns = [
  { label: "产成品", key: "product", width: "25%" },
  { label: "物料名称", key: "material", width: "25%" },
  { label: "工位计划(个)", key: "plan", width: "25%" },
  { label: "工位实际(个)", key: "actual", width: "25%" },
];

// 产成品维度 - 数据
export const productProductionData = [
  { product: "船板零件A", material: "Q235B钢板", plan: 160, actual: 156 },
  { product: "船板零件B", material: "Q345B钢板", plan: 150, actual: 142 },
  { product: "船板零件C", material: "Q235B钢板", plan: 135, actual: 128 },
  { product: "船板零件D", material: "Q345C钢板", plan: 100, actual: 95 },
  { product: "船板零件E", material: "Q235C钢板", plan: 120, actual: 115 },
];

// 板材维度 - 列配置
export const plateColumns = [
  { label: "板材规格", key: "specification", width: "30%" },
  { label: "材质", key: "material", width: "25%" },
  { label: "切割数量", key: "quantity", width: "22.5%" },
  { label: "面积(㎡)", key: "area", width: "22.5%" },
];

// 板材维度 - 数据
export const plateProductionData = [
  { specification: "12×2000×6000", material: "Q235B", quantity: 35, area: 420.0 },
  { specification: "16×2000×6000", material: "Q345B", quantity: 28, area: 336.0 },
  { specification: "20×2500×8000", material: "Q235B", quantity: 22, area: 440.0 },
  { specification: "25×2000×6000", material: "Q345B", quantity: 18, area: 216.0 },
  { specification: "8×1500×6000", material: "Q235B", quantity: 25, area: 225.0 },
];

export function getProductionStatsData(type = "station") {
  const dataMap = {
    station: { columns: stationColumns, data: stationProductionData },
    team: { columns: teamColumns, data: teamProductionData },
    product: { columns: productColumns, data: productProductionData },
  };
  return dataMap[type] || dataMap.station;
}

// ==================== 切割任务数据 ====================

// 日任务数据
export const dayCuttingTaskData = [
  { orderNumber: "GD-20241211-001", shipNumber: "H2501", sectionNumber: "A-101", category: "平板", actualStartTime: "08:30", actualEndTime: "10:15", issueTime: "08:00", length: 3200, width: 1500, thickness: 12, weight: 452 },
  { orderNumber: "GD-20241211-002", shipNumber: "H2501", sectionNumber: "A-102", category: "曲板", actualStartTime: "10:30", actualEndTime: "12:00", issueTime: "10:00", length: 2800, width: 1200, thickness: 10, weight: 264 },
  { orderNumber: "GD-20241211-003", shipNumber: "H2502", sectionNumber: "B-201", category: "平板", actualStartTime: "13:00", actualEndTime: "-", issueTime: "12:30", length: 4000, width: 1800, thickness: 16, weight: 905 },
  { orderNumber: "GD-20241211-004", shipNumber: "H2502", sectionNumber: "B-202", category: "型材", actualStartTime: "-", actualEndTime: "-", issueTime: "14:00", length: 2500, width: 800, thickness: 8, weight: 126 },
  { orderNumber: "GD-20241211-005", shipNumber: "H2503", sectionNumber: "C-301", category: "平板", actualStartTime: "-", actualEndTime: "-", issueTime: "15:00", length: 3600, width: 1600, thickness: 14, weight: 634 },
];

// 周任务数据
export const weekCuttingTaskData = [
  { orderNumber: "GD-20241209-001", shipNumber: "H2501", sectionNumber: "A-101", category: "平板", actualStartTime: "08:00", actualEndTime: "16:30", issueTime: "07:30", length: 3200, width: 1500, thickness: 12, weight: 452 },
  { orderNumber: "GD-20241209-002", shipNumber: "H2501", sectionNumber: "A-102", category: "曲板", actualStartTime: "09:00", actualEndTime: "17:00", issueTime: "08:30", length: 2800, width: 1200, thickness: 10, weight: 264 },
  { orderNumber: "GD-20241210-001", shipNumber: "H2502", sectionNumber: "B-201", category: "平板", actualStartTime: "08:30", actualEndTime: "15:45", issueTime: "08:00", length: 4000, width: 1800, thickness: 16, weight: 905 },
  { orderNumber: "GD-20241210-002", shipNumber: "H2502", sectionNumber: "B-202", category: "型材", actualStartTime: "10:00", actualEndTime: "14:30", issueTime: "09:30", length: 2500, width: 800, thickness: 8, weight: 126 },
  { orderNumber: "GD-20241211-001", shipNumber: "H2503", sectionNumber: "C-301", category: "平板", actualStartTime: "13:00", actualEndTime: "-", issueTime: "12:30", length: 3600, width: 1600, thickness: 14, weight: 634 },
];

// 月任务数据
export const monthCuttingTaskData = [
  { orderNumber: "GD-202412-W1", shipNumber: "H2501", sectionNumber: "批次1", category: "混合", actualStartTime: "08:00", actualEndTime: "18:00", issueTime: "07:00", length: 12000, width: 6000, thickness: 12, weight: 6782 },
  { orderNumber: "GD-202412-W2", shipNumber: "H2502", sectionNumber: "批次2", category: "混合", actualStartTime: "08:00", actualEndTime: "17:30", issueTime: "07:30", length: 10500, width: 5200, thickness: 14, weight: 5988 },
  { orderNumber: "GD-202412-W3", shipNumber: "H2503", sectionNumber: "批次3", category: "混合", actualStartTime: "-", actualEndTime: "-", issueTime: "08:00", length: 8800, width: 4500, thickness: 10, weight: 3110 },
  { orderNumber: "GD-202412-W4", shipNumber: "H2504", sectionNumber: "批次4", category: "混合", actualStartTime: "-", actualEndTime: "-", issueTime: "09:00", length: 9200, width: 4800, thickness: 16, weight: 5554 },
];

export function getCuttingTaskData(type = "day") {
  const dataMap = {
    day: dayCuttingTaskData,
    week: weekCuttingTaskData,
    month: monthCuttingTaskData,
  };
  return dataMap[type] || dayCuttingTaskData;
}

// ==================== 设备状态数据 ====================

// 切割设备数据
export const cuttingEquipmentData = [
  { name: "等离子切割机1#", quantity: 45, weight: 6523 },
  { name: "等离子切割机2#", quantity: 38, weight: 5487 },
  { name: "火焰切割机1#", quantity: 22, weight: 3185 },
  { name: "激光切割机", quantity: 15, weight: 2158 },
  { name: "数控冲床", quantity: 8, weight: 1212 },
  { name: "坡口机", quantity: 12, weight: 1845 },
];

// 分拣设备数据
export const sortingEquipmentData = [
  { name: "分拣机械手1#", status: "运行中", runtime: 7.0, efficiency: 94 },
  { name: "分拣机械手2#", status: "运行中", runtime: 6.2, efficiency: 90 },
  { name: "输送带1#", status: "运行中", runtime: 8.0, efficiency: 98 },
  { name: "输送带2#", status: "待机", runtime: 2.5, efficiency: 70 },
  { name: "码垛机", status: "运行中", runtime: 5.5, efficiency: 86 },
  { name: "AGV小车", status: "运行中", runtime: 6.8, efficiency: 91 },
];

export function getEquipmentStatusData(type = "cutting") {
  const dataMap = {
    cutting: cuttingEquipmentData,
    sorting: sortingEquipmentData,
  };
  return dataMap[type] || cuttingEquipmentData;
}

// ==================== 分拣统计数据 ====================

export const sortingStatsData = [
  { id: 1, title: "计划分拣数量", value: 1280, unit: "件" },
  { id: 2, title: "实际分拣完成数量", value: 1156, unit: "件" },
  { id: 3, title: "手动分拣数量", value: 86, unit: "件" },
  { id: 4, title: "分拣率", value: 90.3, unit: "%" },
];

export function getSortingStatsData() {
  return sortingStatsData;
}

// ==================== 生产进度数据 ====================

export const productionProgressData = [
  { day: "周一", planned: 150, actual: 142 },
  { day: "周二", planned: 160, actual: 158 },
  { day: "周三", planned: 155, actual: 162 },
  { day: "周四", planned: 165, actual: 155 },
  { day: "周五", planned: 170, actual: 168 },
  { day: "周六", planned: 80, actual: 75 },
  { day: "周日", planned: 0, actual: 0 },
];

export function getProductionProgressData() {
  return productionProgressData;
}

// ==================== 缓存详情数据 ====================

export const cacheDetailsData = {
  // 线边库数据
  lineSide: [
    { frameNo: "100039", materialName: "Q235B钢板", location: "A-01-01", shipNo: "H9527", direction: "切割线", batchNo: "1" },
    { frameNo: "100043", materialName: "Q345B钢板", location: "A-01-02", shipNo: "H9527", direction: "切割线", batchNo: "1" },
    { frameNo: "100046", materialName: "Q235B钢板", location: "A-01-03", shipNo: "H9528", direction: "分拣区", batchNo: "1" },
    { frameNo: "100052", materialName: "Q345C钢板", location: "A-02-01", shipNo: "H9528", direction: "切割线", batchNo: "2" },
    { frameNo: "100058", materialName: "Q235B钢板", location: "A-02-02", shipNo: "H9529", direction: "分拣区", batchNo: "2" },
    { frameNo: "100061", materialName: "Q345B钢板", location: "A-02-03", shipNo: "H9529", direction: "切割线", batchNo: "2" },
    { frameNo: "100067", materialName: "Q235C钢板", location: "A-03-01", shipNo: "H9530", direction: "分拣区", batchNo: "3" },
    { frameNo: "100073", materialName: "Q345B钢板", location: "A-03-02", shipNo: "H9530", direction: "切割线", batchNo: "3" },
    { frameNo: "100079", materialName: "Q235B钢板", location: "A-03-03", shipNo: "H9531", direction: "分拣区", batchNo: "3" },
    { frameNo: "100085", materialName: "Q345C钢板", location: "A-04-01", shipNo: "H9531", direction: "切割线", batchNo: "4" },
    { frameNo: "100091", materialName: "Q235B钢板", location: "A-04-02", shipNo: "H9532", direction: "分拣区", batchNo: "4" },
    { frameNo: "100097", materialName: "Q345B钢板", location: "A-04-03", shipNo: "H9532", direction: "切割线", batchNo: "4" },
    { frameNo: "100103", materialName: "Q235C钢板", location: "A-05-01", shipNo: "H9533", direction: "分拣区", batchNo: "5" },
    { frameNo: "100109", materialName: "Q345B钢板", location: "A-05-02", shipNo: "H9533", direction: "切割线", batchNo: "5" },
    { frameNo: "100115", materialName: "Q235B钢板", location: "A-05-03", shipNo: "H9534", direction: "分拣区", batchNo: "5" },
  ],
  // 部件立库数据
  componentWarehouse: [
    { frameNo: "100018", materialName: "船板零件A", location: "B-01-01", shipNo: "H9527", direction: "组装区", batchNo: "1" },
    { frameNo: "100024", materialName: "船板零件B", location: "B-01-02", shipNo: "H9527", direction: "焊接区", batchNo: "1" },
    { frameNo: "100030", materialName: "船板零件C", location: "B-01-03", shipNo: "H9528", direction: "组装区", batchNo: "1" },
    { frameNo: "100036", materialName: "船板零件A", location: "B-02-01", shipNo: "H9528", direction: "焊接区", batchNo: "2" },
    { frameNo: "100042", materialName: "船板零件D", location: "B-02-02", shipNo: "H9529", direction: "组装区", batchNo: "2" },
    { frameNo: "100048", materialName: "船板零件B", location: "B-02-03", shipNo: "H9529", direction: "焊接区", batchNo: "2" },
    { frameNo: "100054", materialName: "船板零件C", location: "B-03-01", shipNo: "H9530", direction: "组装区", batchNo: "3" },
    { frameNo: "100060", materialName: "船板零件A", location: "B-03-02", shipNo: "H9530", direction: "焊接区", batchNo: "3" },
    { frameNo: "100066", materialName: "船板零件D", location: "B-03-03", shipNo: "H9531", direction: "组装区", batchNo: "3" },
    { frameNo: "100072", materialName: "船板零件B", location: "B-04-01", shipNo: "H9531", direction: "焊接区", batchNo: "4" },
    { frameNo: "100078", materialName: "船板零件C", location: "B-04-02", shipNo: "H9532", direction: "组装区", batchNo: "4" },
    { frameNo: "100084", materialName: "船板零件A", location: "B-04-03", shipNo: "H9532", direction: "焊接区", batchNo: "4" },
    { frameNo: "100090", materialName: "船板零件D", location: "B-05-01", shipNo: "H9533", direction: "组装区", batchNo: "5" },
    { frameNo: "100096", materialName: "船板零件B", location: "B-05-02", shipNo: "H9533", direction: "焊接区", batchNo: "5" },
    { frameNo: "100102", materialName: "船板零件C", location: "B-05-03", shipNo: "H9534", direction: "组装区", batchNo: "5" },
  ],
};

export function getCacheDetailsData() {
  return cacheDetailsData;
}

// ==================== 计划完成度数据 ====================

export const planCompletionData = [
  {
    type: "件数",
    planned: 500,
    completed: 386,
    progress: "77.20",
    unit: "件",
  },
  {
    type: "面积",
    planned: "2500.00",
    completed: "1856.50",
    progress: "74.26",
    unit: "㎡",
  },
  {
    type: "重量",
    planned: "180.00",
    completed: "138.60",
    progress: "77.00",
    unit: "吨",
  },
];

export function getPlanCompletionData() {
  return planCompletionData;
}

// ==================== 工单统计数据 ====================

// 工单统计 - 日
export const orderStatisticsDataDay = [
  { type: "计划工单数", planned: 12, unit: "单" },
  { type: "延迟未完成工单数", planned: 8, unit: "单" },
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

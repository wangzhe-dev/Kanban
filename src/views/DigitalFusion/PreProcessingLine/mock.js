/**
 * 预处理产线大屏 Mock 数据
 */

// ==================== 板材/型材工单统计（日/周/月）====================

const plateOrderStatisticsDay = [
  { type: "今日计划工单数", planned: 12, unit: "单" },
  { type: "进行中工单数", planned: 6, unit: "单" },
  { type: "待开工工单数", planned: 3, unit: "单" },
  { type: "今日完成工单数", planned: 7, unit: "单" },
  { type: "延迟未完成工单数", planned: 2, unit: "单" },
  { type: "计划完成率", planned: 78, unit: "%" },
];

const plateOrderStatisticsWeek = [
  { type: "本周计划工单数", planned: 84, unit: "单" },
  { type: "进行中工单数", planned: 18, unit: "单" },
  { type: "待开工工单数", planned: 7, unit: "单" },
  { type: "本周完成工单数", planned: 66, unit: "单" },
  { type: "延迟未完成工单数", planned: 5, unit: "单" },
  { type: "计划完成率", planned: 79, unit: "%" },
];

const plateOrderStatisticsMonth = [
  { type: "本月计划工单数", planned: 360, unit: "单" },
  { type: "进行中工单数", planned: 42, unit: "单" },
  { type: "待开工工单数", planned: 15, unit: "单" },
  { type: "本月完成工单数", planned: 308, unit: "单" },
  { type: "延迟未完成工单数", planned: 12, unit: "单" },
  { type: "计划完成率", planned: 86, unit: "%" },
];

const profileOrderStatisticsDay = [
  { type: "今日计划工单数", planned: 9, unit: "单" },
  { type: "进行中工单数", planned: 4, unit: "单" },
  { type: "待开工工单数", planned: 2, unit: "单" },
  { type: "今日完成工单数", planned: 5, unit: "单" },
  { type: "延迟未完成工单数", planned: 1, unit: "单" },
  { type: "计划完成率", planned: 82, unit: "%" },
];

const profileOrderStatisticsWeek = [
  { type: "本周计划工单数", planned: 60, unit: "单" },
  { type: "进行中工单数", planned: 12, unit: "单" },
  { type: "待开工工单数", planned: 5, unit: "单" },
  { type: "本周完成工单数", planned: 49, unit: "单" },
  { type: "延迟未完成工单数", planned: 3, unit: "单" },
  { type: "计划完成率", planned: 82, unit: "%" },
];

const profileOrderStatisticsMonth = [
  { type: "本月计划工单数", planned: 260, unit: "单" },
  { type: "进行中工单数", planned: 28, unit: "单" },
  { type: "待开工工单数", planned: 10, unit: "单" },
  { type: "本月完成工单数", planned: 228, unit: "单" },
  { type: "延迟未完成工单数", planned: 8, unit: "单" },
  { type: "计划完成率", planned: 88, unit: "%" },
];

export function getPlateOrderStatisticsData(type = "day") {
  const map = {
    day: plateOrderStatisticsDay,
    week: plateOrderStatisticsWeek,
    month: plateOrderStatisticsMonth,
  };
  return map[type] || plateOrderStatisticsDay;
}

export function getProfileOrderStatisticsData(type = "day") {
  const map = {
    day: profileOrderStatisticsDay,
    week: profileOrderStatisticsWeek,
    month: profileOrderStatisticsMonth,
  };
  return map[type] || profileOrderStatisticsDay;
}

// ==================== 预处理信息（日/周/月）====================

const preProcessingInfoDay = {
  leftTaskCount: 36,
  leftTaskLabel: "板材预处理任务数",
  rightTaskCount: 28,
  rightTaskLabel: "型材预处理任务数",
  productionData: [
    { id: 1, title: "板材预处理面积", value: 1856.5, unit: "㎡" },
    { id: 2, title: "型材预处理重量", value: 138.6, unit: "吨" },
    { id: 3, title: "板材预处理时长", value: 462, unit: "min" },
    { id: 4, title: "型材预处理时长", value: 388, unit: "min" },
  ],
};

const preProcessingInfoWeek = {
  leftTaskCount: 214,
  leftTaskLabel: "板材预处理任务数",
  rightTaskCount: 168,
  rightTaskLabel: "型材预处理任务数",
  productionData: [
    { id: 1, title: "板材预处理面积", value: 14280.0, unit: "㎡" },
    { id: 2, title: "型材预处理重量", value: 1046.4, unit: "吨" },
    { id: 3, title: "板材预处理时长", value: 3120, unit: "min" },
    { id: 4, title: "型材预处理时长", value: 2680, unit: "min" },
  ],
};

const preProcessingInfoMonth = {
  leftTaskCount: 892,
  leftTaskLabel: "板材预处理任务数",
  rightTaskCount: 704,
  rightTaskLabel: "型材预处理任务数",
  productionData: [
    { id: 1, title: "板材预处理面积", value: 70060.0, unit: "㎡" },
    { id: 2, title: "型材预处理重量", value: 5104.0, unit: "吨" },
    { id: 3, title: "板材预处理时长", value: 16800, unit: "min" },
    { id: 4, title: "型材预处理时长", value: 14220, unit: "min" },
  ],
};

export function getPreProcessingInfoData(type = "day") {
  const map = {
    day: preProcessingInfoDay,
    week: preProcessingInfoWeek,
    month: preProcessingInfoMonth,
  };
  return map[type] || preProcessingInfoDay;
}

// ==================== 任务详情表（钢板/型材，日/周/月）====================

const steelPlateTaskColumns = [
  { label: "工单号", key: "orderNo", width: "9%" },
  { label: "钢板唯一码", key: "steelCode", width: "10%" },
  { label: "项目", key: "project", width: "7%" },
  { label: "批次", key: "batch", width: "6%" },
  { label: "分段号", key: "sectionNo", width: "7%" },
  { label: "材质", key: "material", width: "7%" },
  { label: "规格(长宽厚)", key: "spec", width: "14%" },
  { label: "重量(吨)", key: "weight", width: "7%" },
  { label: "类别", key: "category", width: "6%" },
  { label: "实际开始", key: "actualStart", width: "8%" },
  { label: "实际结束", key: "actualEnd", width: "8%" },
  { label: "时长(min)", key: "durationMin", width: "5%" },
  { label: "状态", key: "status", width: "6%" },
];

const profileTaskColumns = [
  { label: "工单号", key: "orderNo", width: "12%" },
  { label: "项目号", key: "projectNo", width: "10%" },
  { label: "批次号", key: "batchNo", width: "8%" },
  { label: "分段号", key: "sectionNo", width: "10%" },
  { label: "材质", key: "material", width: "8%" },
  { label: "规格型", key: "specType", width: "14%" },
  { label: "重量(吨)", key: "weight", width: "8%" },
  { label: "实际开始", key: "actualStart", width: "10%" },
  { label: "实际结束", key: "actualEnd", width: "10%" },
  { label: "时长(min)", key: "durationMin", width: "5%" },
  { label: "状态", key: "status", width: "5%" },
];

const steelPlateTaskDataDay = [
  { orderNo: "WO-2025-1201", steelCode: "SP-25-1201-0001", project: "JL", batch: "A1", sectionNo: "F102", material: "Q235B", spec: "8000×2500×12", weight: 3.86, category: "钢板", actualStart: "08:10", actualEnd: "09:05", durationMin: 55, status: "进行中" },
  { orderNo: "WO-2025-1201", steelCode: "SP-25-1201-0002", project: "JL", batch: "A1", sectionNo: "F102", material: "Q345B", spec: "12000×2200×10", weight: 4.12, category: "钢板", actualStart: "09:15", actualEnd: "10:20", durationMin: 65, status: "进行中" },
  { orderNo: "WO-2025-1202", steelCode: "SP-25-1202-0011", project: "JL", batch: "A2", sectionNo: "F105", material: "Q235B", spec: "10000×2500×14", weight: 4.95, category: "钢板", actualStart: "10:30", actualEnd: "11:08", durationMin: 38, status: "已完成" },
  { orderNo: "WO-2025-1203", steelCode: "SP-25-1203-0032", project: "JL", batch: "B1", sectionNo: "A008", material: "Q345C", spec: "8000×2500×16", weight: 5.20, category: "钢板", actualStart: "11:20", actualEnd: "12:05", durationMin: 45, status: "待处理" },
  { orderNo: "WO-2025-1204", steelCode: "SP-25-1204-0108", project: "JL", batch: "B2", sectionNo: "A012", material: "Q235B", spec: "6000×2000×8", weight: 1.88, category: "钢板", actualStart: "13:40", actualEnd: "14:26", durationMin: 46, status: "进行中" },
  { orderNo: "WO-2025-1205", steelCode: "SP-25-1205-0204", project: "JL", batch: "C1", sectionNo: "B021", material: "Q345B", spec: "12000×2500×20", weight: 7.10, category: "钢板", actualStart: "14:40", actualEnd: "15:25", durationMin: 45, status: "待处理" },
];

const steelPlateTaskDataWeek = Array.from({ length: 10 }).map((_, idx) => {
  const n = idx + 1;
  const orderNo = `WO-2025-W48-${String(n).padStart(2, "0")}`;
  const sectionNo = ["F102", "F105", "A008", "A012", "B021", "C018"][idx % 6];
  const material = ["Q235B", "Q345B", "Q345C"][idx % 3];
  const spec = ["8000×2500×12", "12000×2200×10", "10000×2500×14", "8000×2500×16"][idx % 4];
  const durationMin = 35 + (idx % 6) * 8;
  return {
    orderNo,
    steelCode: `SP-25-W48-${String(n).padStart(4, "0")}`,
    project: "JL",
    batch: ["A1", "A2", "B1", "B2"][idx % 4],
    sectionNo,
    material,
    spec,
    weight: Number((2.8 + (idx % 7) * 0.45).toFixed(2)),
    category: "钢板",
    actualStart: `${String(8 + (idx % 5)).padStart(2, "0")}:${String((idx * 7) % 60).padStart(2, "0")}`,
    actualEnd: `${String(9 + (idx % 5)).padStart(2, "0")}:${String((idx * 7 + durationMin) % 60).padStart(2, "0")}`,
    durationMin,
    status: ["进行中", "待处理", "已完成"][idx % 3],
  };
});

const steelPlateTaskDataMonth = Array.from({ length: 12 }).map((_, idx) => {
  const n = idx + 1;
  const orderNo = `WO-2025-12-${String(n).padStart(3, "0")}`;
  const sectionNo = ["F1xx", "A0xx", "B0xx", "C0xx", "D0xx"][idx % 5];
  const material = ["Q235B", "Q345B", "Q345C"][idx % 3];
  const spec = ["6000×2000×8", "8000×2500×12", "12000×2200×10", "10000×2500×14"][idx % 4];
  const durationMin = 40 + (idx % 6) * 9;
  return {
    orderNo,
    steelCode: `SP-25-12-${String(n).padStart(4, "0")}`,
    project: "JL",
    batch: ["A1", "A2", "B1", "B2", "C1"][idx % 5],
    sectionNo,
    material,
    spec,
    weight: Number((3.2 + (idx % 8) * 0.5).toFixed(2)),
    category: "钢板",
    actualStart: `${String(8 + (idx % 6)).padStart(2, "0")}:${String((idx * 9) % 60).padStart(2, "0")}`,
    actualEnd: `${String(9 + (idx % 6)).padStart(2, "0")}:${String((idx * 9 + durationMin) % 60).padStart(2, "0")}`,
    durationMin,
    status: ["进行中", "待处理", "已完成"][idx % 3],
  };
});

const profileTaskDataDay = [
  { orderNo: "WO-2025-1201", projectNo: "P-JL-07", batchNo: "A1", sectionNo: "F102", material: "Q235B", specType: "HP200×8 / 6m", weight: 1.26, actualStart: "08:30", actualEnd: "09:18", durationMin: 48, status: "进行中" },
  { orderNo: "WO-2025-1202", projectNo: "P-JL-07", batchNo: "A1", sectionNo: "F105", material: "Q345B", specType: "T250×10 / 8m", weight: 1.58, actualStart: "09:25", actualEnd: "10:05", durationMin: 40, status: "进行中" },
  { orderNo: "WO-2025-1203", projectNo: "P-JL-08", batchNo: "B2", sectionNo: "A008", material: "Q235B", specType: "角钢 L75×6 / 6m", weight: 0.92, actualStart: "10:20", actualEnd: "10:52", durationMin: 32, status: "已完成" },
  { orderNo: "WO-2025-1204", projectNo: "P-JL-08", batchNo: "B2", sectionNo: "A012", material: "Q345C", specType: "槽钢 [200 / 8m", weight: 1.74, actualStart: "11:10", actualEnd: "12:05", durationMin: 55, status: "待处理" },
  { orderNo: "WO-2025-1205", projectNo: "P-JL-09", batchNo: "C3", sectionNo: "B021", material: "Q235B", specType: "扁钢 80×10 / 6m", weight: 1.05, actualStart: "13:30", actualEnd: "14:10", durationMin: 40, status: "进行中" },
  { orderNo: "WO-2025-1206", projectNo: "P-JL-09", batchNo: "C3", sectionNo: "B021", material: "Q345B", specType: "圆钢 Φ22 / 6m", weight: 0.66, actualStart: "14:25", actualEnd: "15:05", durationMin: 40, status: "待处理" },
];

const profileTaskDataWeek = Array.from({ length: 10 }).map((_, idx) => {
  const n = idx + 1;
  const orderNo = `WO-2025-W48-P${String(n).padStart(2, "0")}`;
  const durationMin = 30 + (idx % 6) * 9;
  const startH = 8 + (idx % 6);
  return {
    orderNo,
    projectNo: ["P-JL-07", "P-JL-08", "P-JL-09"][idx % 3],
    batchNo: ["A1", "A2", "B1", "B2"][idx % 4],
    sectionNo: ["F102", "F105", "A008", "A012", "B021"][idx % 5],
    material: ["Q235B", "Q345B", "Q345C"][idx % 3],
    specType: ["HP200×8 / 6m", "T250×10 / 8m", "角钢 L75×6 / 6m", "槽钢 [200 / 8m", "扁钢 80×10 / 6m"][idx % 5],
    weight: Number((0.8 + (idx % 7) * 0.18).toFixed(2)),
    actualStart: `${String(startH).padStart(2, "0")}:${String((idx * 11) % 60).padStart(2, "0")}`,
    actualEnd: `${String(startH + 1).padStart(2, "0")}:${String((idx * 11 + durationMin) % 60).padStart(2, "0")}`,
    durationMin,
    status: ["进行中", "待处理", "已完成"][idx % 3],
  };
});

const profileTaskDataMonth = Array.from({ length: 12 }).map((_, idx) => {
  const n = idx + 1;
  const durationMin = 34 + (idx % 6) * 10;
  const startH = 8 + (idx % 6);
  return {
    orderNo: `WO-2025-12-P${String(n).padStart(3, "0")}`,
    projectNo: ["P-JL-07", "P-JL-08", "P-JL-09", "P-JL-10"][idx % 4],
    batchNo: ["A1", "A2", "B1", "B2", "C1"][idx % 5],
    sectionNo: ["F1xx", "A0xx", "B0xx", "C0xx", "D0xx"][idx % 5],
    material: ["Q235B", "Q345B", "Q345C"][idx % 3],
    specType: ["HP200×8 / 6m", "T250×10 / 8m", "角钢 L75×6 / 6m", "槽钢 [200 / 8m", "扁钢 80×10 / 6m", "圆钢 Φ22 / 6m"][idx % 6],
    weight: Number((0.9 + (idx % 8) * 0.2).toFixed(2)),
    actualStart: `${String(startH).padStart(2, "0")}:${String((idx * 13) % 60).padStart(2, "0")}`,
    actualEnd: `${String(startH + 1).padStart(2, "0")}:${String((idx * 13 + durationMin) % 60).padStart(2, "0")}`,
    durationMin,
    status: ["进行中", "待处理", "已完成"][idx % 3],
  };
});

export function getSteelPlateTaskTableData(type = "day") {
  const map = {
    day: steelPlateTaskDataDay,
    week: steelPlateTaskDataWeek,
    month: steelPlateTaskDataMonth,
  };
  return { columns: steelPlateTaskColumns, data: map[type] || steelPlateTaskDataDay };
}

export function getProfileTaskTableData(type = "day") {
  const map = {
    day: profileTaskDataDay,
    week: profileTaskDataWeek,
    month: profileTaskDataMonth,
  };
  return { columns: profileTaskColumns, data: map[type] || profileTaskDataDay };
}

// ==================== 完成数量（柱）+ 重量（线）（日/周/月）====================

const completionChartData = {
  steelPlate: {
    day: {
      categories: ["00-03", "04-07", "08-11", "12-15", "16-19", "20-23"],
      counts: [36, 52, 94, 118, 86, 64],
      weights: [12.8, 18.6, 31.2, 38.5, 29.4, 22.1],
    },
    week: {
      categories: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      counts: [680, 720, 790, 760, 810, 540, 460],
      weights: [186.5, 201.2, 215.8, 209.6, 228.4, 154.2, 132.8],
    },
    month: {
      categories: ["10月", "11月", "12月"],
      counts: [6, 58, 72],
      weights: [8.4, 132.6, 168.2],
    },
  },
  profile: {
    day: {
      categories: ["00-03", "04-07", "08-11", "12-15", "16-19", "20-23"],
      counts: [22, 35, 60, 78, 55, 41],
      weights: [6.2, 9.8, 16.6, 22.4, 15.8, 12.1],
    },
    week: {
      categories: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      counts: [420, 460, 510, 488, 530, 360, 310],
      weights: [86.2, 92.4, 101.8, 97.6, 109.3, 76.5, 68.4],
    },
    month: {
      categories: ["10月", "11月", "12月"],
      counts: [18, 132, 156],
      weights: [22.6, 188.4, 236.8],
    },
  },
};

export function getCompletionChartData(materialType = "steelPlate", timeRange = "day") {
  const material = completionChartData[materialType] || completionChartData.steelPlate;
  return material[timeRange] || material.day;
}

const completionCountData = {
  steelPlate: {
    day: [
      { name: "00-03", value: 36 },
      { name: "04-07", value: 52 },
      { name: "08-11", value: 94 },
      { name: "12-15", value: 118 },
      { name: "16-19", value: 86 },
      { name: "20-23", value: 64 },
    ],
    week: [
      { name: "周一", value: 680 },
      { name: "周二", value: 720 },
      { name: "周三", value: 790 },
      { name: "周四", value: 760 },
      { name: "周五", value: 810 },
      { name: "周六", value: 540 },
      { name: "周日", value: 460 },
    ],
    month: [
      { name: "第1周", value: 2860 },
      { name: "第2周", value: 3120 },
      { name: "第3周", value: 2980 },
      { name: "第4周", value: 3260 },
    ],
  },
  profile: {
    day: [
      { name: "00-03", value: 22 },
      { name: "04-07", value: 35 },
      { name: "08-11", value: 60 },
      { name: "12-15", value: 78 },
      { name: "16-19", value: 55 },
      { name: "20-23", value: 41 },
    ],
    week: [
      { name: "周一", value: 420 },
      { name: "周二", value: 460 },
      { name: "周三", value: 510 },
      { name: "周四", value: 488 },
      { name: "周五", value: 530 },
      { name: "周六", value: 360 },
      { name: "周日", value: 310 },
    ],
    month: [
      { name: "第1周", value: 1760 },
      { name: "第2周", value: 1920 },
      { name: "第3周", value: 1840 },
      { name: "第4周", value: 2050 },
    ],
  },
};

export function getCompletionCountData(materialType = "steelPlate", timeRange = "day") {
  const material = completionCountData[materialType] || completionCountData.steelPlate;
  return material[timeRange] || material.day;
}

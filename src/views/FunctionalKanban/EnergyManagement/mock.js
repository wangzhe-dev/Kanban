/**
 * 职能看板 - 能耗管理 Mock 数据
 */

export default {
  // 能耗总览数据
  energyOverview: {
    todayConsumption: 12580,
    monthlyConsumption: 356800,
    yearlyConsumption: 4250000,
    savingRate: 8.5,
    peakDemand: 1850,
    averageDemand: 1245,
  },

  // 能耗趋势数据
  energyTrend: {
    hourly: {
      labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
      data: [850, 920, 1450, 1680, 1520, 1180],
    },
    daily: {
      labels: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      data: [28500, 29200, 28800, 29500, 28600, 24500, 22000],
    },
    monthly: {
      labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      data: [385000, 360000, 375000, 368000, 358000, 345000, 352000, 348000, 355000, 362000, 356800, 0],
    },
  },

  // 分项能耗数据
  energyByCategory: {
    electricity: { value: 8520, percentage: 67.7, unit: "kWh" },
    gas: { value: 2850, percentage: 22.6, unit: "m³" },
    water: { value: 850, percentage: 6.8, unit: "t" },
    steam: { value: 360, percentage: 2.9, unit: "t" },
  },

  // 重点设备能耗数据
  keyEquipmentEnergy: [
    { equipment: "空压机1#", power: 185, consumption: 4440, utilizationRate: 85, energyEfficiency: 92 },
    { equipment: "空压机2#", power: 185, consumption: 3996, utilizationRate: 76, energyEfficiency: 90 },
    { equipment: "数控机床群", power: 420, consumption: 8820, utilizationRate: 88, energyEfficiency: 88 },
    { equipment: "焊接车间", power: 320, consumption: 6720, utilizationRate: 92, energyEfficiency: 85 },
    { equipment: "照明系统", power: 150, consumption: 3600, utilizationRate: 100, energyEfficiency: 95 },
    { equipment: "空调系统", power: 280, consumption: 5880, utilizationRate: 88, energyEfficiency: 82 },
  ],

  // 能效分析数据
  energyEfficiency: {
    unitProductEnergy: {
      current: 12.5,
      lastMonth: 13.2,
      lastYear: 14.8,
      target: 11.5,
      unit: "kWh/件",
    },
    comprehensiveEfficiency: {
      current: 78.5,
      industry: 72.3,
      advanced: 85.0,
    },
    peakValleyRatio: {
      peak: 35,
      flat: 45,
      valley: 20,
      optimization: "建议增加谷电使用比例",
    },
  },

  // 能耗成本数据
  energyCost: {
    today: 8850,
    thisMonth: 256800,
    lastMonth: 278500,
    savings: 21700,
    breakdown: [
      { category: "电费", amount: 185600, percentage: 72.3 },
      { category: "燃气费", amount: 48500, percentage: 18.9 },
      { category: "水费", amount: 12800, percentage: 5.0 },
      { category: "蒸汽费", amount: 9900, percentage: 3.8 },
    ],
  },

  // 产线能耗统计
  lineEnergyStats: {
    power: {
      unit: "kWh",
      categories: ["智能钢板库", "预处理", "钢板下料", "型材下料", "小组立", "T型材", "小件拼板", "平直分段"],
      values: [200, 0, 1116864, 0, 0, 1862, 1673, 70084],
    },
    gas: {
      unit: "m³",
      categories: ["智能钢板库", "预处理", "钢板下料", "型材下料", "小组立", "T型材", "小件拼板", "平直分段"],
      values: [0, 0.243, 0, 0, 0, 14.684, 0, 0],
    },
  },

  // 清洁能源发电趋势
  cleanEnergyTrend: {
    unit: "kWh",
    labels: ["12-31", "12-30", "01-05", "01-04", "01-03", "01-02", "01-01"],
    values: [18362, 21930, 20129, 13596, 20563, 16669, 8840],
  },

  // 车间综合能耗
  workshopEnergyStats: {
    day: {
      unit: "kWh",
      categories: ["01-01", "01-02", "01-03", "01-04", "01-05", "01-06", "01-07"],
      values: [36, 42, 51, 48, 39, 44, 41],
      yMax: 80,
    },
    week: {
      unit: "kWh",
      categories: ["第1周", "第2周", "第3周", "第4周"],
      values: [120, 165, 142, 98],
      yMax: 200,
    },
    month: {
      unit: "kWh",
      categories: ["2025-11", "2025-12"],
      values: [195, 41],
      yMax: 200,
    },
  },

  // 单位能耗
  unitEnergyCards: [
    {
      title: "单位预处理面积能耗",
      rows: [
        { label: "预处理面积", value: 0, unit: "㎡" },
        { label: "预处理总能耗", value: 0, unit: "kWh" },
      ],
    },
    {
      title: "单位焊接长度能耗",
      rows: [
        { label: "单位焊接长度", value: 15.0, unit: "kWh/m" },
        { label: "焊接总能耗", value: 0, unit: "kWh" },
      ],
    },
    {
      title: "单位板材切割长度能耗",
      rows: [
        { label: "板材切割长度", value: 0, unit: "㎡" },
        { label: "板材切割总能耗", value: 0, unit: "kWh" },
      ],
    },
    {
      title: "单位型材切割长度能耗",
      rows: [
        { label: "型材切割根数", value: 0, unit: "根" },
        { label: "型材切割总能耗", value: 0, unit: "kWh" },
      ],
    },
  ],

  // 能源消耗
  energyConsumption: {
    percent: 84,
    icon: require("@/assets/images/ZN/nh/dn1.png"),
    metrics: [
      { label: "单位产能能耗", value: 0, unit: "" },
      { label: "电能消耗", value: 0, unit: "" },
      { label: "气体消耗", value: 0, unit: "" },
    ],
  },

  // 万元产值综合能耗
  outputEnergyCost: {
    icon: require("@/assets/images/ZN/nh/dn1.png"),
    label: "单位产值综合能耗",
    value: 0,
    unit: "kWh/万元",
    tips: "",
  },

  // 产线水电气能耗
  waterPowerGasStats: {
    items: [
      { label: "用电量", value: 1191764, unit: "kwh", icon: require("@/assets/images/ZN/nh/n3.png") },
      { label: "天然气用量", value: 15.03, unit: "L", icon: require("@/assets/images/ZN/nh/n2.png") },
      { label: "氧气消耗", value: 29.74, unit: "L", icon: require("@/assets/images/ZN/nh/n1.png") },
      { label: "CO2用量", value: 187, unit: "L", icon: require("@/assets/images/ZN/nh/n4.png") },
    ],
  },

  // 节能措施数据
  energySavingMeasures: [
    { measure: "更换LED照明", status: "已完成", savings: 15.2, investment: 85000, payback: 6 },
    { measure: "变频器改造", status: "进行中", savings: 22.5, investment: 125000, payback: 5 },
    { measure: "余热回收系统", status: "计划中", savings: 18.8, investment: 280000, payback: 12 },
    { measure: "能源管理系统升级", status: "论证中", savings: 12.3, investment: 150000, payback: 10 },
  ],

  // 碳排放监测数据
  carbonEmissions: {
    todayEmissions: 8.52,
    monthlyEmissions: 241.8,
    yearlyEmissions: 2880,
    reductionTarget: 10,
    currentReduction: 7.5,
    breakdown: {
      direct: { value: 85.6, percentage: 35.4 },
      indirect: { value: 156.2, percentage: 64.6 },
    },
    trend: {
      labels: ["1月", "2月", "3月", "4月", "5月", "6月"],
      data: [265, 258, 252, 248, 245, 241.8],
      target: [260, 256, 252, 248, 244, 240],
    },
  },
};

/**
 * 职能看板 - 质量管理 Mock 数据
 */

export default {
  // 质量总览数据
  qualityOverview: {
    qualificationRate: 97.8,
    totalInspected: 12580,
    qualified: 12303,
    unqualified: 277,
    reworked: 245,
    scrapped: 32,
  },

  // 质量趋势数据
  qualityTrend: {
    labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    qualificationRate: [96.2, 96.5, 97.1, 96.8, 97.3, 97.5, 97.2, 97.6, 97.8, 97.4, 97.9, 97.8],
    target: 98.0,
  },

  // 检验记录数据
  inspectionRecords: [
    { batchNo: "B20251217001", product: "产品A", quantity: 500, qualified: 495, unqualified: 5, rate: 99.0, inspector: "张三", time: "10:30" },
    { batchNo: "B20251217002", product: "产品B", quantity: 800, qualified: 780, unqualified: 20, rate: 97.5, inspector: "李四", time: "11:15" },
    { batchNo: "B20251217003", product: "产品C", quantity: 600, qualified: 588, unqualified: 12, rate: 98.0, inspector: "王五", time: "14:20" },
    { batchNo: "B20251217004", product: "产品D", quantity: 400, qualified: 392, unqualified: 8, rate: 98.0, inspector: "赵六", time: "15:45" },
  ],

  // 不合格分析数据
  defectAnalysis: {
    byType: [
      { type: "尺寸偏差", count: 125, percentage: 45.1 },
      { type: "表面缺陷", count: 68, percentage: 24.5 },
      { type: "性能不达标", count: 45, percentage: 16.2 },
      { type: "装配错误", count: 25, percentage: 9.0 },
      { type: "其他", count: 14, percentage: 5.2 },
    ],
    byProcess: [
      { process: "下料", count: 85 },
      { process: "焊接", count: 102 },
      { process: "组装", count: 56 },
      { process: "表面处理", count: 34 },
    ],
  },

  // 质量改进数据
  qualityImprovement: [
    { issue: "焊接气孔问题", status: "已完成", improvementRate: 85, date: "2025-11-15" },
    { issue: "尺寸精度提升", status: "进行中", improvementRate: 60, date: "2025-12-01" },
    { issue: "表面粗糙度控制", status: "计划中", improvementRate: 0, date: "2025-12-20" },
  ],

  // 客户投诉数据
  customerComplaints: {
    thisMonth: 8,
    lastMonth: 12,
    trend: -33.3,
    complaints: [
      { complaintNo: "C20251215001", customer: "客户A", product: "产品A", issue: "尺寸偏差", status: "处理中", date: "12-15" },
      { complaintNo: "C20251216001", customer: "客户B", product: "产品C", issue: "表面划痕", status: "已解决", date: "12-16" },
      { complaintNo: "C20251217001", customer: "客户C", product: "产品B", issue: "包装破损", status: "待处理", date: "12-17" },
    ],
  },

  // 过程监控数据
  processMonitoring: {
    controlPoints: [
      { point: "下料精度", value: 0.05, upperLimit: 0.1, lowerLimit: -0.1, status: "正常" },
      { point: "焊缝强度", value: 450, upperLimit: 500, lowerLimit: 400, status: "正常" },
      { point: "涂层厚度", value: 85, upperLimit: 100, lowerLimit: 80, status: "正常" },
      { point: "硬度指标", value: 58, upperLimit: 60, lowerLimit: 55, status: "正常" },
    ],
  },

  // 质量成本数据
  qualityCost: {
    total: 125000,
    prevention: 18000, // 预防成本
    appraisal: 35000, // 鉴定成本
    internal: 52000, // 内部损失
    external: 20000, // 外部损失
    trend: {
      labels: ["1月", "2月", "3月", "4月", "5月", "6月"],
      data: [135000, 130000, 128000, 126000, 124000, 125000],
    },
  },
};

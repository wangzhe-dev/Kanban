/**
 * 职能看板 - 库存管理 Mock 数据
 */

export default {
  // 库存总览数据
  inventoryOverview: {
    totalItems: 856,
    totalValue: 12580000,
    totalQuantity: 125680,
    warehouseUtilization: 72.5,
    turnoverRate: 8.5,
  },

  // 库存预警数据
  inventoryAlerts: {
    shortage: [
      { material: "Q345钢板", currentStock: 85, safetyStock: 150, shortfall: 65, level: "严重" },
      { material: "焊丝ER50-6", currentStock: 120, safetyStock: 180, shortfall: 60, level: "一般" },
      { material: "螺栓M12", currentStock: 850, safetyStock: 1000, shortfall: 150, level: "一般" },
    ],
    overstock: [
      { material: "包装材料A", currentStock: 5200, normalStock: 2000, excess: 3200, level: "严重" },
      { material: "辅料B", currentStock: 1850, normalStock: 1000, excess: 850, level: "一般" },
    ],
    expiring: [
      { material: "密封胶", quantity: 45, expiryDate: "2025-12-31", daysLeft: 14 },
      { material: "防锈油", quantity: 28, expiryDate: "2026-01-15", daysLeft: 29 },
    ],
  },

  // 入库记录数据
  inboundRecords: [
    { recordNo: "IN20251217001", material: "Q345钢板", quantity: 500, unit: "张", supplier: "供应商A", time: "10:30", status: "已入库" },
    { recordNo: "IN20251217002", material: "焊丝ER50-6", quantity: 200, unit: "盘", supplier: "供应商B", time: "11:15", status: "已入库" },
    { recordNo: "IN20251217003", material: "螺栓M12", quantity: 5000, unit: "个", supplier: "供应商C", time: "14:20", status: "质检中" },
    { recordNo: "IN20251217004", material: "涂料", quantity: 100, unit: "桶", supplier: "供应商D", time: "15:45", status: "待入库" },
  ],

  // 出库记录数据
  outboundRecords: [
    { recordNo: "OUT20251217001", material: "Q345钢板", quantity: 280, unit: "张", department: "生产一部", purpose: "订单PO001", time: "09:15", status: "已出库" },
    { recordNo: "OUT20251217002", material: "焊丝ER50-6", quantity: 85, unit: "盘", department: "生产二部", purpose: "订单PO002", time: "10:30", status: "已出库" },
    { recordNo: "OUT20251217003", material: "螺栓M12", quantity: 2000, unit: "个", department: "装配车间", purpose: "生产领用", time: "13:45", status: "已出库" },
    { recordNo: "OUT20251217004", material: "涂料", quantity: 15, unit: "桶", department: "表面处理", purpose: "生产领用", time: "14:50", status: "审批中" },
  ],

  // 库存周转数据
  inventoryTurnover: {
    overall: {
      turnoverRate: 8.5,
      turnoverDays: 42.9,
      target: 10.0,
    },
    byCategory: [
      { category: "原材料", turnoverRate: 12.5, turnoverDays: 29.2, status: "优秀" },
      { category: "半成品", turnoverRate: 8.2, turnoverDays: 44.5, status: "良好" },
      { category: "成品", turnoverRate: 15.8, turnoverDays: 23.1, status: "优秀" },
      { category: "辅料", turnoverRate: 5.5, turnoverDays: 66.4, status: "需改进" },
    ],
    trend: {
      labels: ["1月", "2月", "3月", "4月", "5月", "6月"],
      data: [7.2, 7.8, 8.1, 8.5, 8.3, 8.5],
    },
  },

  // 物料分类数据
  materialCategories: {
    byType: [
      { type: "原材料", quantity: 45680, value: 5850000, percentage: 46.5 },
      { type: "半成品", quantity: 32500, value: 3250000, percentage: 25.8 },
      { type: "成品", quantity: 28500, value: 2850000, percentage: 22.7 },
      { type: "辅料", quantity: 19000, value: 630000, percentage: 5.0 },
    ],
    topMaterials: [
      { name: "Q345钢板", stock: 5280, value: 1585000, turnover: 15.2 },
      { name: "Q235钢板", stock: 6850, value: 1250000, turnover: 18.5 },
      { name: "型材A", stock: 3200, value: 985000, turnover: 12.8 },
      { name: "焊丝", stock: 850, value: 285000, turnover: 22.5 },
      { name: "螺栓", stock: 125000, value: 158000, turnover: 8.5 },
    ],
  },

  // 呆滞库存数据
  slowMovingInventory: {
    total: 186,
    totalValue: 285000,
    items: [
      { material: "旧型号零件A", quantity: 850, value: 85000, stagnantDays: 185, lastOutbound: "2024-06-15" },
      { material: "淘汰产品B", quantity: 320, value: 125000, stagnantDays: 220, lastOutbound: "2024-05-10" },
      { material: "过期辅料C", quantity: 125, value: 25000, stagnantDays: 165, lastOutbound: "2024-07-05" },
      { material: "残次品D", quantity: 280, value: 50000, stagnantDays: 145, lastOutbound: "2024-07-25" },
    ],
  },

  // 库存价值数据
  inventoryValue: {
    total: 12580000,
    trend: {
      labels: ["1月", "2月", "3月", "4月", "5月", "6月"],
      data: [13250000, 12980000, 12850000, 12720000, 12650000, 12580000],
    },
    composition: {
      rawMaterials: 5850000,
      workInProgress: 3250000,
      finishedGoods: 2850000,
      auxiliary: 630000,
    },
    aging: [
      { period: "0-30天", value: 7850000, percentage: 62.4 },
      { period: "31-60天", value: 2850000, percentage: 22.7 },
      { period: "61-90天", value: 1250000, percentage: 9.9 },
      { period: "90天以上", value: 630000, percentage: 5.0 },
    ],
  },
};

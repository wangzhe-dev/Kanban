/**
 * 职能看板 - 智控中心 Mock 数据
 */

export default {
  // 系统状态数据
  systemStatus: {
    overallHealth: 98.5,
    runningServices: 45,
    totalServices: 48,
    cpuUsage: 62.5,
    memoryUsage: 58.3,
    diskUsage: 45.8,
    networkLoad: 1256, // MB/s
    activeConnections: 2580,
    uptime: "25天8小时36分钟",
  },

  // 数据流监控数据
  dataFlowMonitoring: {
    realTimeData: {
      incoming: 12580, // 条/分钟
      outgoing: 8650,
      processing: 3850,
      failed: 15,
    },
    trend: {
      labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
      incoming: [8500, 6200, 15800, 18500, 16200, 12500],
      outgoing: [6200, 4500, 11200, 13500, 11800, 9200],
    },
    dataQuality: {
      accuracy: 99.2,
      completeness: 98.8,
      timeliness: 97.5,
      consistency: 99.5,
    },
  },

  // 实时告警数据
  realTimeAlarms: {
    summary: {
      critical: 2,
      warning: 8,
      info: 15,
      total: 25,
    },
    alarms: [
      { level: "critical", type: "设备故障", device: "PLC-A1", message: "通讯中断", time: "15:45:23", duration: "15分钟", status: "未处理" },
      { level: "critical", type: "安全告警", device: "门禁系统", message: "异常开启", time: "15:30:12", duration: "30分钟", status: "处理中" },
      { level: "warning", type: "性能告警", device: "数据库服务器", message: "CPU使用率过高", time: "15:25:45", duration: "45分钟", status: "已处理" },
      { level: "warning", type: "网络告警", device: "交换机-B2", message: "带宽占用率85%", time: "15:20:18", duration: "1小时", status: "监控中" },
      { level: "info", type: "系统信息", device: "应用服务器", message: "定时任务完成", time: "15:00:00", duration: "-", status: "已确认" },
    ],
    statistics: {
      labels: ["今日", "昨日", "本周", "本月"],
      critical: [2, 1, 8, 35],
      warning: [8, 12, 65, 280],
      info: [15, 18, 125, 520],
    },
  },

  // 设备控制数据
  deviceControl: {
    controlledDevices: 125,
    onlineDevices: 118,
    offlineDevices: 7,
    remoteControlEnabled: 112,
    devices: [
      { id: "DEV001", name: "生产线A", status: "运行", mode: "自动", speed: 85, temperature: 45, controlEnabled: true },
      { id: "DEV002", name: "生产线B", status: "运行", mode: "自动", speed: 92, temperature: 48, controlEnabled: true },
      { id: "DEV003", name: "机器人C", status: "待机", mode: "手动", speed: 0, temperature: 35, controlEnabled: true },
      { id: "DEV004", name: "检测设备D", status: "运行", mode: "自动", speed: 78, temperature: 42, controlEnabled: true },
      { id: "DEV005", name: "输送带E", status: "离线", mode: "-", speed: 0, temperature: 30, controlEnabled: false },
    ],
  },

  // 任务调度数据
  taskScheduling: {
    scheduledTasks: 185,
    runningTasks: 42,
    completedToday: 128,
    failedTasks: 3,
    pendingTasks: 12,
    tasks: [
      { taskId: "TASK001", name: "数据备份", type: "定时任务", status: "运行中", progress: 65, startTime: "15:00:00", expectedEnd: "16:00:00" },
      { taskId: "TASK002", name: "报表生成", type: "定时任务", status: "排队中", progress: 0, startTime: "16:00:00", expectedEnd: "16:15:00" },
      { taskId: "TASK003", name: "设备巡检", type: "周期任务", status: "已完成", progress: 100, startTime: "14:00:00", expectedEnd: "14:30:00" },
      { taskId: "TASK004", name: "日志清理", type: "定时任务", status: "运行中", progress: 35, startTime: "15:30:00", expectedEnd: "16:30:00" },
      { taskId: "TASK005", name: "性能监测", type: "实时任务", status: "运行中", progress: 100, startTime: "00:00:00", expectedEnd: "-" },
    ],
    scheduling: {
      labels: ["00-04", "04-08", "08-12", "12-16", "16-20", "20-24"],
      scheduled: [15, 18, 42, 38, 35, 22],
      completed: [14, 17, 41, 36, 32, 20],
    },
  },

  // 网络拓扑数据
  networkTopology: {
    nodes: 85,
    activeNodes: 78,
    inactiveNodes: 7,
    connections: 156,
    bandwidth: 10000, // Mbps
    utilization: 45.8,
    zones: [
      { zone: "核心层", devices: 8, status: "正常", health: 100 },
      { zone: "汇聚层", devices: 18, status: "正常", health: 98.5 },
      { zone: "接入层", devices: 42, status: "告警", health: 92.3 },
      { zone: "终端设备", devices: 17, status: "正常", health: 95.8 },
    ],
  },

  // 日志监控数据
  logMonitoring: {
    totalLogs: 285600,
    todayLogs: 12580,
    errorLogs: 125,
    warningLogs: 458,
    infoLogs: 11997,
    recentLogs: [
      { level: "ERROR", service: "数据服务", message: "数据库连接超时", timestamp: "2025-12-17 15:45:32", source: "192.168.1.25" },
      { level: "WARN", service: "应用服务", message: "内存使用率超过80%", timestamp: "2025-12-17 15:44:18", source: "192.168.1.18" },
      { level: "INFO", service: "认证服务", message: "用户登录成功", timestamp: "2025-12-17 15:43:25", source: "192.168.1.100" },
      { level: "ERROR", service: "网络服务", message: "连接被拒绝", timestamp: "2025-12-17 15:42:08", source: "192.168.1.35" },
      { level: "WARN", service: "任务调度", message: "任务执行延迟", timestamp: "2025-12-17 15:40:52", source: "192.168.1.20" },
    ],
    logRate: {
      labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
      data: [850, 620, 1580, 1850, 1620, 1250],
    },
  },

  // 性能指标数据
  performanceMetrics: {
    responseTime: {
      current: 125, // ms
      average: 142,
      p95: 285,
      p99: 520,
    },
    throughput: {
      current: 2580, // 请求/秒
      average: 2350,
      peak: 3850,
    },
    availability: {
      current: 99.95,
      thisMonth: 99.92,
      thisYear: 99.88,
      target: 99.9,
    },
    errorRate: {
      current: 0.15, // %
      average: 0.18,
      threshold: 0.5,
    },
    systemResources: {
      cpu: { usage: 62.5, peak: 85.2, average: 58.3 },
      memory: { usage: 58.3, peak: 78.5, average: 52.8 },
      disk: { usage: 45.8, peak: 52.3, average: 42.5 },
      network: { usage: 45.8, peak: 85.6, average: 38.5 },
    },
  },
};

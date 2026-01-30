<template>
  <DrillTablePage
    title="报工情况"
    :filters="filters"
    :query-defaults="queryDefaults"
    :columns="columns"
    :build-rows="buildMockRows"
    :build-count="128"
    :filter-fn="filterFn"
    :action-span="24"
    index-label="#"
    @back="$emit('back')"
  />
</template>

<script>
import DrillTablePage from "../../components/DrillTablePage.vue";

function pad(num, len = 4) {
  return String(num).padStart(len, "0");
}

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDateTime(date) {
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${formatDate(date)} ${hh}:${mm}:${ss}`;
}

function timeOf(value) {
  if (!value) return null;
  if (value instanceof Date) return value.getTime();
  const str = String(value).trim();
  if (!str) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return new Date(`${str}T12:00:00`).getTime();
  return new Date(str.replace(" ", "T")).getTime();
}

const workOrderStatusOptions = [
  { label: "进行中", value: "running" },
  { label: "未开始", value: "new" },
  { label: "已完成", value: "done" },
];

const workOrderStatusColorMap = {
  done: "#67c23a",
  running: "#e6a23c",
  new: "#40d5ff",
};

const workOrderTypeOptions = [
  { label: "生产工单", value: "normal" },
  { label: "返工工单", value: "rework" },
  { label: "补料工单", value: "supplement" },
];

const reportTypeOptions = [
  { label: "正常报工", value: "normal" },
  { label: "补报", value: "patch" },
  { label: "撤销", value: "cancel" },
];

export default {
  name: "ReportTablePage",
  components: { DrillTablePage },
  data() {
    return {
      queryDefaults: {
        reportTime: "",
        taskNo: "",
        projectNo: "",
        batchNo: "",
        segmentNo: "",
        locationName: "",
        processName: "",
        materialName: "",
        workOrderStatus: "",
        workOrderType: "",
        equipmentName: "",
      },
      filters: [
        { type: "date", label: "报工时间", prop: "reportTime", span: 6, placeholder: "报工时间" },
        { type: "input", label: "任务号", prop: "taskNo", span: 6, placeholder: "任务号" },
        { type: "input", label: "项目号", prop: "projectNo", span: 6, placeholder: "项目号" },
        { type: "input", label: "批次号", prop: "batchNo", span: 6, placeholder: "批次号" },
        { type: "input", label: "分段号", prop: "segmentNo", span: 6, placeholder: "分段号" },
        { type: "input", label: "库位名称", prop: "locationName", span: 6, placeholder: "库位名称" },
        { type: "input", label: "工序名称", prop: "processName", span: 6, placeholder: "工序名称" },
        { type: "input", label: "物料名称", prop: "materialName", span: 6, placeholder: "物料名称" },
        { type: "select", label: "工单状态", prop: "workOrderStatus", span: 6, options: workOrderStatusOptions },
        { type: "select", label: "工单类型", prop: "workOrderType", span: 6, options: workOrderTypeOptions },
        { type: "input", label: "设备名称", prop: "equipmentName", span: 6, placeholder: "设备名称" },
      ],
      columns: [
        { prop: "taskNo", label: "任务号", minWidth: 220 },
        { prop: "projectNo", label: "项目号", minWidth: 180 },
        { prop: "batchNo", label: "产品批次号", minWidth: 200 },
        { prop: "segmentNo", label: "分段号", minWidth: 180 },
        { prop: "assemblyFlow", label: "组立流向", minWidth: 220 },
        { prop: "frameNo", label: "料框号", minWidth: 200 },
        { prop: "materialBatchNo", label: "物料批次号", minWidth: 220 },
        { prop: "materialName", label: "物料名称", minWidth: 220 },
        { prop: "locationName", label: "库位名称", minWidth: 200 },
        { prop: "areaName", label: "库区名称", minWidth: 200 },
        {
          prop: "workOrderStatus",
          label: "工单状态",
          width: 160,
          kind: "status",
          statusField: "workOrderStatus",
          statusOptions: workOrderStatusOptions,
          statusColorMap: workOrderStatusColorMap,
        },
        { prop: "planStartTime", label: "计划开始时间", minWidth: 220 },
        { prop: "planEndTime", label: "计划完成时间", minWidth: 220 },
        { prop: "actualStartTime", label: "实际开始时间", minWidth: 220 },
        { prop: "actualEndTime", label: "实际完成时间", minWidth: 220 },
        { prop: "equipmentName", label: "设备名称", minWidth: 200 },
        { prop: "stationName", label: "工位名称", minWidth: 180 },
        { prop: "processName", label: "工序名称", minWidth: 200 },
        {
          prop: "reportType",
          label: "报工类型",
          width: 160,
          formatter: (val) => {
            const hit = reportTypeOptions.find((o) => o.value === val);
            return hit ? hit.label : val;
          },
        },
        { prop: "reportTime", label: "报工时间", minWidth: 220 },
      ],
    };
  },
  methods: {
    filterFn(row, query) {
      const taskNo = String(query.taskNo || "").trim();
      const projectNo = String(query.projectNo || "").trim();
      const batchNo = String(query.batchNo || "").trim();
      const segmentNo = String(query.segmentNo || "").trim();
      const locationName = String(query.locationName || "").trim();
      const processName = String(query.processName || "").trim();
      const materialName = String(query.materialName || "").trim();
      const equipmentName = String(query.equipmentName || "").trim();
      const workOrderStatus = String(query.workOrderStatus || "").trim();
      const workOrderType = String(query.workOrderType || "").trim();

      if (taskNo && !String(row.taskNo || "").includes(taskNo)) return false;
      if (projectNo && !String(row.projectNo || "").includes(projectNo)) return false;
      if (batchNo && !String(row.batchNo || "").includes(batchNo)) return false;
      if (segmentNo && !String(row.segmentNo || "").includes(segmentNo)) return false;
      if (locationName && !String(row.locationName || "").includes(locationName)) return false;
      if (processName && !String(row.processName || "").includes(processName)) return false;
      if (materialName && !String(row.materialName || "").includes(materialName)) return false;
      if (equipmentName && !String(row.equipmentName || "").includes(equipmentName)) return false;

      if (workOrderStatus && row.workOrderStatus !== workOrderStatus) return false;
      if (workOrderType && row.workOrderType !== workOrderType) return false;

      const reportTime = timeOf(query.reportTime);
      if (reportTime != null) {
        const rowReport = timeOf(row.reportTime);
        if (rowReport == null) return false;
        const dayStart = new Date(reportTime).setHours(0, 0, 0, 0);
        const dayEnd = new Date(reportTime).setHours(23, 59, 59, 999);
        if (rowReport < dayStart || rowReport > dayEnd) return false;
      }

      return true;
    },
    buildMockRows(count) {
      const rows = [];
      const lineNames = ["产线A", "产线B", "产线C", "产线D"];
      const segmentPrefixes = ["FD", "SD", "BD", "JD"];
      const flows = ["组立A→B", "组立B→C", "组立C→D", "组立D→A"];
      const materialNames = ["钢板", "角钢", "槽钢", "型材", "加强筋", "连接板", "肋板"];
      const processNames = ["切割", "组立", "焊接", "打磨", "喷涂", "检验"];
      const stationNames = ["工位1", "工位2", "工位3", "工位4", "工位5", "工位6"];
      const equipmentNames = ["设备A", "设备B", "设备C", "设备D", "设备E"];
      const locationPool = ["KW-A01", "KW-A02", "KW-B01", "KW-B02", "KW-C01", "KW-C02"];
      const areaPool = ["库区A", "库区B", "库区C"];
      const workOrderStatuses = workOrderStatusOptions.map((o) => o.value);
      const workOrderTypes = workOrderTypeOptions.map((o) => o.value);
      const reportTypes = reportTypeOptions.map((o) => o.value);

      const now = new Date();
      for (let i = 1; i <= count; i += 1) {
        const dayOffset = Math.floor(Math.random() * 20);
        const base = new Date(now.getTime() - dayOffset * 24 * 60 * 60 * 1000);

        const planStart = new Date(base.getTime() - (2 + (i % 6)) * 60 * 60 * 1000);
        const planEnd = new Date(planStart.getTime() + (4 + (i % 8)) * 60 * 60 * 1000);

        const workOrderStatus = workOrderStatuses[Math.floor(Math.random() * workOrderStatuses.length)];
        const actualStart = workOrderStatus === "new" ? null : new Date(planStart.getTime() + (i % 90) * 60 * 1000);
        const actualEnd = workOrderStatus === "done" ? new Date(planEnd.getTime() + (i % 60) * 60 * 1000) : null;
        const reportTime = new Date(base.getTime() + (8 + (i % 10)) * 60 * 60 * 1000 + (i % 60) * 60 * 1000);

        rows.push({
          id: i,
          taskNo: `RW-${pad(3000 + i, 6)}`,
          projectNo: `XM-${pad(1000 + (i % 90), 5)}`,
          batchNo: `PC-${pad(1 + (i % 60), 4)}-${pad(1 + (i % 999), 3)}`,
          segmentNo: `${segmentPrefixes[i % segmentPrefixes.length]}-${pad(1 + (i % 200), 4)}`,
          assemblyFlow: flows[i % flows.length],
          frameNo: `LK-${pad(i, 6)}`,
          materialBatchNo: `WLP-${pad(1 + (i % 80), 4)}-${pad(1 + (i % 999), 3)}`,
          materialName: `${materialNames[i % materialNames.length]}-${pad(1 + (i % 99), 3)}`,
          locationName: locationPool[i % locationPool.length],
          areaName: areaPool[i % areaPool.length],
          workOrderStatus,
          workOrderType: workOrderTypes[i % workOrderTypes.length],
          lineName: lineNames[i % lineNames.length],
          planStartTime: formatDateTime(planStart),
          planEndTime: formatDateTime(planEnd),
          actualStartTime: actualStart ? formatDateTime(actualStart) : "",
          actualEndTime: actualEnd ? formatDateTime(actualEnd) : "",
          equipmentName: equipmentNames[i % equipmentNames.length],
          stationName: stationNames[i % stationNames.length],
          processName: processNames[i % processNames.length],
          reportType: reportTypes[i % reportTypes.length],
          reportTime: formatDateTime(reportTime),
        });
      }
      return rows;
    },
  },
};
</script>

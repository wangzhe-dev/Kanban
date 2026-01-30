<template>
  <DrillTablePage
    title="工单信息明细"
    :filters="filters"
    :columns="columns"
    :build-rows="buildMockRows"
    :build-count="150"
    index-label="#"
    @back="$emit('back')"
  />
</template>

<script>
import DrillTablePage from "../../components/DrillTablePage.vue";

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDateTime(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");
  return `${y}-${m}-${d} ${h}:${min}:${s}`;
}

export default {
  name: "DailyProductionTablePage",
  components: { DrillTablePage },
  data() {
    return {
      filters: [
        {
          type: "daterange",
          prop: "planTimeRange",
          label: "计划时间",
          span: 8,
          startPlaceholder: "计划开始时间",
          endPlaceholder: "计划结束时间",
          valueFormat: "yyyy-MM-dd HH:mm:ss",
        },
        {
          type: "input",
          prop: "projectNo",
          label: "项目号",
          placeholder: "请输入项目号",
          span: 6,
        },
        {
          type: "input",
          prop: "batchNo",
          label: "批次号",
          placeholder: "请输入批次号",
          span: 6,
        },
        {
          type: "input",
          prop: "segmentNo",
          label: "分段号",
          placeholder: "请输入分段号",
          span: 6,
        },
        {
          type: "select",
          prop: "workOrderStatus",
          label: "工单状态",
          placeholder: "请选择工单状态",
          span: 6,
          options: [
            { label: "未开始", value: "new" },
            { label: "进行中", value: "running" },
            { label: "已完成", value: "done" },
            { label: "已暂停", value: "paused" },
          ],
        },
        {
          type: "select",
          prop: "issueStatus",
          label: "下发状态",
          placeholder: "请选择下发状态",
          span: 6,
          options: [
            { label: "未下发", value: "pending" },
            { label: "已下发", value: "issued" },
            { label: "下发失败", value: "failed" },
          ],
        },
        {
          type: "daterange",
          prop: "issueTimeRange",
          label: "下发时间",
          span: 8,
          startPlaceholder: "下发开始时间",
          endPlaceholder: "下发结束时间",
          valueFormat: "yyyy-MM-dd HH:mm:ss",
        },
      ],
      columns: [
        { prop: "taskNo", label: "任务号", width: 200, showOverflowTooltip: true },
        { prop: "projectNo", label: "项目号", width: 160, showOverflowTooltip: true },
        { prop: "batchNo", label: "批次号", width: 160, showOverflowTooltip: true },
        { prop: "segmentNo", label: "分段号", width: 160, showOverflowTooltip: true },
        { prop: "assemblyFlow", label: "组立流向", width: 160, showOverflowTooltip: true },
        { prop: "binNo", label: "料框号", width: 160, showOverflowTooltip: true },
        { prop: "materialBatchNo", label: "物料批次号", width: 180, showOverflowTooltip: true },
        { prop: "materialName", label: "物料名称", width: 220, showOverflowTooltip: true },
        { prop: "locationName", label: "库位名称", width: 160, showOverflowTooltip: true },
        { prop: "areaName", label: "库区名称", width: 160, showOverflowTooltip: true },
        { prop: "workOrderStatus", label: "工单状态", width: 140, showOverflowTooltip: false },
        { prop: "planStartTime", label: "计划开始时间", width: 200, showOverflowTooltip: true },
        { prop: "planFinishTime", label: "计划完成时间", width: 200, showOverflowTooltip: true },
        { prop: "actualStartTime", label: "实际开始时间", width: 200, showOverflowTooltip: true },
        { prop: "actualFinishTime", label: "实际完成时间", width: 200, showOverflowTooltip: true },
        { prop: "equipmentName", label: "设备名称", width: 160, showOverflowTooltip: true },
        { prop: "stationName", label: "工位名称", width: 140, showOverflowTooltip: true },
        { prop: "processName", label: "工序名称", width: 160, showOverflowTooltip: true },
        { prop: "reportType", label: "报工类型", width: 140, showOverflowTooltip: false },
        { prop: "reportTime", label: "报工时间", width: 200, showOverflowTooltip: true },
      ],
    };
  },
  methods: {
    buildMockRows(count) {
      const rows = [];
      const projectNos = ["PRJ-2024-001", "PRJ-2024-002", "PRJ-2024-003", "PRJ-2024-004"];
      const batchNos = ["BATCH-A", "BATCH-B", "BATCH-C", "BATCH-D"];
      const segmentNos = ["SEG-01", "SEG-02", "SEG-03", "SEG-04", "SEG-05"];
      const assemblyFlows = ["流向A", "流向B", "流向C"];
      const materialNames = [
        "钢板-Q345-10mm",
        "钢板-Q235-12mm",
        "型材-H200x100",
        "角钢-L100x100",
        "槽钢-U120",
      ];
      const areaNames = ["A区", "B区", "C区", "D区"];
      const locationNames = ["A01", "A02", "B01", "B02", "C01", "C02"];
      const workOrderStatuses = ["未开始", "进行中", "已完成", "已暂停"];
      const equipmentNames = ["设备A", "设备B", "设备C", "设备D"];
      const stationNames = ["工位1", "工位2", "工位3", "工位4"];
      const processNames = ["切割", "焊接", "打磨", "组装", "检验"];
      const reportTypes = ["开工", "完工", "暂停", "恢复"];

      const now = new Date();
      for (let i = 1; i <= count; i += 1) {
        const dayOffset = Math.floor(Math.random() * 30);
        const baseDate = new Date(now.getTime() - dayOffset * 24 * 60 * 60 * 1000);

        const planStartTime = new Date(baseDate.getTime() + Math.random() * 8 * 60 * 60 * 1000);
        const planFinishTime = new Date(planStartTime.getTime() + (4 + Math.random() * 8) * 60 * 60 * 1000);

        const hasStarted = Math.random() > 0.3;
        const actualStartTime = hasStarted
          ? new Date(planStartTime.getTime() + (Math.random() - 0.5) * 2 * 60 * 60 * 1000)
          : null;

        const hasFinished = hasStarted && Math.random() > 0.5;
        const actualFinishTime = hasFinished
          ? new Date(actualStartTime.getTime() + (4 + Math.random() * 8) * 60 * 60 * 1000)
          : null;

        const reportTime = hasStarted
          ? new Date(actualStartTime.getTime() + Math.random() * 60 * 60 * 1000)
          : null;

        rows.push({
          id: i,
          taskNo: `TASK-${String(i).padStart(6, "0")}`,
          projectNo: projectNos[i % projectNos.length],
          batchNo: batchNos[i % batchNos.length],
          segmentNo: segmentNos[i % segmentNos.length],
          assemblyFlow: assemblyFlows[i % assemblyFlows.length],
          binNo: `BIN-${String(Math.floor(Math.random() * 999) + 1).padStart(3, "0")}`,
          materialBatchNo: `MB-${String(Math.floor(Math.random() * 9999) + 1).padStart(4, "0")}`,
          materialName: materialNames[i % materialNames.length],
          locationName: locationNames[i % locationNames.length],
          areaName: areaNames[i % areaNames.length],
          workOrderStatus: workOrderStatuses[i % workOrderStatuses.length],
          planStartTime: formatDateTime(planStartTime),
          planFinishTime: formatDateTime(planFinishTime),
          actualStartTime: actualStartTime ? formatDateTime(actualStartTime) : "-",
          actualFinishTime: actualFinishTime ? formatDateTime(actualFinishTime) : "-",
          equipmentName: equipmentNames[i % equipmentNames.length],
          stationName: stationNames[i % stationNames.length],
          processName: processNames[i % processNames.length],
          reportType: reportTypes[i % reportTypes.length],
          reportTime: reportTime ? formatDateTime(reportTime) : "-",
        });
      }
      return rows;
    },
  },
};
</script>

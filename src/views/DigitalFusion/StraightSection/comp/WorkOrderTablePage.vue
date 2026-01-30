<template>
  <DrillTablePage
    title="工单信息"
    :filters="filters"
    :query-defaults="queryDefaults"
    :columns="columns"
    :build-rows="buildMockRows"
    :build-count="180"
    :filter-fn="filterFn"
    :action-span="24"
    index-label="行号"
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

export default {
  name: "WorkOrderTablePage",
  components: { DrillTablePage },
  data() {
    return {
      queryDefaults: {
        planStartTime: "",
        planEndTime: "",
        projectNo: "",
        batchNo: "",
        segmentNo: "",
        workOrderStatus: "",
        issueStatus: "",
        issueTime: "",
      },
      workOrderStatusOptions: [
        { label: "进行中", value: "running" },
        { label: "未开始", value: "new" },
        { label: "已完成", value: "done" },
      ],
      issueStatusOptions: [
        { label: "未下发", value: "unissued" },
        { label: "已下发", value: "issued" },
      ],
      statusColorMap: {
        done: "#67c23a",
        running: "#e6a23c",
        new: "#40d5ff",
        issued: "#67c23a",
        unissued: "#909399",
      },
      filters: [
        { type: "date", label: "计划开始时间", prop: "planStartTime", span: 6, placeholder: "开始" },
        { type: "date", label: "计划结束时间", prop: "planEndTime", span: 6, placeholder: "结束" },
        { type: "input", label: "项目号", prop: "projectNo", span: 6, placeholder: "项目号" },
        { type: "input", label: "批次号", prop: "batchNo", span: 6, placeholder: "批次号" },
        { type: "input", label: "分段号", prop: "segmentNo", span: 6, placeholder: "分段号" },
        {
          type: "select",
          label: "工单状态",
          prop: "workOrderStatus",
          span: 6,
          options: [
            { label: "进行中", value: "running" },
            { label: "未开始", value: "new" },
            { label: "已完成", value: "done" },
          ],
        },
        {
          type: "select",
          label: "下发状态",
          prop: "issueStatus",
          span: 6,
          options: [
            { label: "未下发", value: "unissued" },
            { label: "已下发", value: "issued" },
          ],
        },
        { type: "date", label: "下发时间", prop: "issueTime", span: 6, placeholder: "下发时间" },
      ],
      columns: [
        { prop: "taskNo", label: "任务号", minWidth: 220 },
        { prop: "projectNo", label: "项目号", minWidth: 180 },
        { prop: "batchNo", label: "批次号", minWidth: 160 },
        { prop: "segmentNo", label: "分段号", minWidth: 180 },
        { prop: "flow", label: "流向", minWidth: 220 },
        {
          prop: "workOrderStatus",
          label: "工单状态",
          width: 160,
          kind: "status",
          statusField: "workOrderStatus",
          statusOptions: [
            { label: "进行中", value: "running" },
            { label: "未开始", value: "new" },
            { label: "已完成", value: "done" },
          ],
          statusColorMap: {
            running: "#e6a23c",
            new: "#40d5ff",
            done: "#67c23a",
          },
        },
        { prop: "docType", label: "单据类型", minWidth: 160 },
        { prop: "lineCode", label: "产线编码", minWidth: 180 },
        { prop: "routeCode", label: "工艺路线编码", minWidth: 220 },
        { prop: "qty", label: "数量", width: 120, showOverflowTooltip: false },
        {
          prop: "lengthM",
          label: "长度(米)",
          width: 140,
          showOverflowTooltip: false,
          formatter: (val) => Number(val).toFixed(2),
        },
        {
          prop: "weightT",
          label: "重量(吨)",
          width: 140,
          showOverflowTooltip: false,
          formatter: (val) => Number(val).toFixed(2),
        },
        { prop: "issueTime", label: "下发时间", minWidth: 200 },
        {
          prop: "issueStatus",
          label: "下发状态",
          width: 160,
          kind: "status",
          statusField: "issueStatus",
          statusOptions: [
            { label: "未下发", value: "unissued" },
            { label: "已下发", value: "issued" },
          ],
          statusColorMap: {
            unissued: "#909399",
            issued: "#67c23a",
          },
        },
        { prop: "issueFlag", label: "下发标识", width: 160, showOverflowTooltip: false },
        { prop: "materialStatus", label: "领料状态", width: 160, showOverflowTooltip: false },
        { prop: "creatorName", label: "创建者姓名", width: 160, showOverflowTooltip: false },
        { prop: "createTime", label: "创建时间", minWidth: 220 },
      ],
    };
  },
  methods: {
    filterFn(row, query) {
      const planStart = timeOf(query.planStartTime);
      const planEnd = timeOf(query.planEndTime);
      const issueTime = timeOf(query.issueTime);

      const rowPlanStart = timeOf(row.planStartTime);
      const rowPlanEnd = timeOf(row.planEndTime);
      const rowIssue = timeOf(row.issueTime);

      if (planStart != null && (rowPlanStart == null || rowPlanStart < planStart)) return false;
      if (planEnd != null && (rowPlanEnd == null || rowPlanEnd > planEnd)) return false;

      if (query.projectNo && !String(row.projectNo || "").includes(String(query.projectNo).trim())) return false;
      if (query.batchNo && !String(row.batchNo || "").includes(String(query.batchNo).trim())) return false;
      if (query.segmentNo && !String(row.segmentNo || "").includes(String(query.segmentNo).trim())) return false;

      if (query.workOrderStatus && row.workOrderStatus !== query.workOrderStatus) return false;
      if (query.issueStatus && row.issueStatus !== query.issueStatus) return false;

      if (issueTime != null) {
        if (rowIssue == null) return false;
        const dayStart = new Date(issueTime).setHours(0, 0, 0, 0);
        const dayEnd = new Date(issueTime).setHours(23, 59, 59, 999);
        if (rowIssue < dayStart || rowIssue > dayEnd) return false;
      }

      return true;
    },
    buildMockRows(count) {
      const rows = [];
      const projects = ["PJ-2025-001", "PJ-2025-002", "PJ-2025-003", "PJ-2024-018"];
      const batches = ["B01", "B02", "B03", "C01", "C02"];
      const segments = ["A01", "A02", "A03", "B01", "B02", "C01", "D01"];
      const flows = ["预处理→平直→组立", "预处理→切割→平直", "平直→校正→组立", "切割→平直→焊接"];
      const docTypes = ["生产工单", "返工单", "试制单"];
      const lineCodes = ["LINE-SS-01", "LINE-SS-02", "LINE-SS-03"];
      const routeCodes = ["ROUTE-SS-A", "ROUTE-SS-B", "ROUTE-SS-C"];
      const creators = ["张三", "李四", "王五", "赵六", "钱七", "孙八"];
      const materialStatuses = ["未领料", "部分领料", "已领料"];
      const workOrderStatuses = ["new", "running", "done"];

      const now = new Date();
      for (let i = 1; i <= count; i += 1) {
        const createOffset = Math.floor(Math.random() * 30);
        const create = new Date(now.getTime() - createOffset * 24 * 60 * 60 * 1000);

        const planStartOffset = Math.floor(Math.random() * 20);
        const planStart = new Date(now.getTime() - planStartOffset * 24 * 60 * 60 * 1000);
        const planEnd = new Date(planStart.getTime() + (1 + Math.floor(Math.random() * 10)) * 24 * 60 * 60 * 1000);

        const qty = 1 + Math.floor(Math.random() * 200);
        const lengthM = 1 + Math.random() * 24;
        const weightT = 0.1 + Math.random() * 5;

        const workOrderStatus = workOrderStatuses[Math.floor(Math.random() * workOrderStatuses.length)];
        const isIssued = Math.random() > 0.35;
        const issueStatus = isIssued ? "issued" : "unissued";
        const issueTime = isIssued
          ? formatDateTime(new Date(now.getTime() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000))
          : "";

        rows.push({
          id: i,
          taskNo: `TASK-SS-${pad(i, 6)}`,
          projectNo: projects[i % projects.length],
          batchNo: `BAT-${batches[i % batches.length]}-${pad(1 + (i % 30), 3)}`,
          segmentNo: `SEG-${segments[i % segments.length]}-${pad(1 + (i % 200), 4)}`,
          flow: flows[i % flows.length],
          workOrderStatus,
          docType: docTypes[i % docTypes.length],
          lineCode: lineCodes[i % lineCodes.length],
          routeCode: routeCodes[i % routeCodes.length],
          qty,
          lengthM,
          weightT,
          planStartTime: formatDate(planStart),
          planEndTime: formatDate(planEnd),
          issueTime,
          issueStatus,
          issueFlag: issueStatus === "issued" ? "Y" : "N",
          materialStatus: materialStatuses[i % materialStatuses.length],
          creatorName: creators[i % creators.length],
          createTime: formatDateTime(create),
        });
      }
      return rows;
    },
  },
};
</script>

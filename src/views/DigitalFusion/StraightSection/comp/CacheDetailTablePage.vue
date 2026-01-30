<template>
  <DrillTablePage title="缓存明细" :filters="filters" :query-defaults="queryDefaults" :columns="columns"
    :build-rows="buildMockRows" :build-count="96" :filter-fn="filterFn" :action-span="24" index-label="#"
    @back="$emit('back')" />
</template>

<script>
import DrillTablePage from "../../components/DrillTablePage.vue";

function pad(num, len = 4) {
  return String(num).padStart(len, "0");
}

export default {
  name: "CacheDetailTablePage",
  components: { DrillTablePage },
  data() {
    return {
      queryDefaults: {
        projectNo: "",
        lineName: "",
        segmentNo: "",
        locationName: "",
        areaName: "",
        frameNo: "",
        materialBatchNo: "",
      },
      filters: [
        { type: "input", label: "项目号", prop: "projectNo", span: 6, placeholder: "项目号" },
        { type: "input", label: "产线名称", prop: "lineName", span: 6, placeholder: "产线名称" },
        { type: "input", label: "分段号", prop: "segmentNo", span: 6, placeholder: "分段号" },
        { type: "input", label: "库位名称", prop: "locationName", span: 6, placeholder: "库位名称" },
        { type: "input", label: "库区名称", prop: "areaName", span: 6, placeholder: "库区名称" },
        { type: "input", label: "料框号", prop: "frameNo", span: 6, placeholder: "料框号" },
        { type: "input", label: "物料批次号", prop: "materialBatchNo", span: 6, placeholder: "物料批次号" },
      ],
      columns: [
        { prop: "projectNo", label: "项目号", minWidth: 180 },
        { prop: "lineName", label: "产线", minWidth: 160 },
        { prop: "segmentNo", label: "分段号", minWidth: 160 },
        { prop: "assemblyFlow", label: "组立流向", minWidth: 220 },
        { prop: "frameNo", label: "料框号", minWidth: 200 },
        { prop: "materialBatchNo", label: "物料批次号", minWidth: 220 },
        { prop: "materialName", label: "物料名称", minWidth: 220 },
        { prop: "locationName", label: "库位名称", minWidth: 200 },
        { prop: "locationDesc", label: "库位描述", minWidth: 260 },
        { prop: "areaName", label: "库区名称", minWidth: 200 },
        { prop: "areaDesc", label: "库区描述", minWidth: 260 },
      ],
    };
  },
  methods: {
    filterFn(row, query) {
      const projectNo = String(query.projectNo || "").trim();
      const lineName = String(query.lineName || "").trim();
      const segmentNo = String(query.segmentNo || "").trim();
      const locationName = String(query.locationName || "").trim();
      const areaName = String(query.areaName || "").trim();
      const frameNo = String(query.frameNo || "").trim();
      const materialBatchNo = String(query.materialBatchNo || "").trim();

      if (projectNo && !String(row.projectNo || "").includes(projectNo)) return false;
      if (lineName && !String(row.lineName || "").includes(lineName)) return false;
      if (segmentNo && !String(row.segmentNo || "").includes(segmentNo)) return false;
      if (locationName && !String(row.locationName || "").includes(locationName)) return false;
      if (areaName && !String(row.areaName || "").includes(areaName)) return false;
      if (frameNo && !String(row.frameNo || "").includes(frameNo)) return false;
      if (materialBatchNo && !String(row.materialBatchNo || "").includes(materialBatchNo)) return false;

      return true;
    },
    buildMockRows(count) {
      const rows = [];
      const lineNames = ["产线A", "产线B", "产线C", "产线D"];
      const segmentPrefixes = ["FD", "SD", "BD", "JD"];
      const flows = ["组立A→B", "组立B→C", "组立C→D", "组立D→A"];
      const materialNames = ["钢板", "角钢", "槽钢", "型材", "加强筋", "连接板", "肋板"];
      const locationPool = [
        { name: "KW-A01", desc: "A区 01号位" },
        { name: "KW-A02", desc: "A区 02号位" },
        { name: "KW-B01", desc: "B区 01号位" },
        { name: "KW-B02", desc: "B区 02号位" },
        { name: "KW-C01", desc: "C区 01号位" },
        { name: "KW-C02", desc: "C区 02号位" },
      ];
      const areaPool = [
        { name: "库区A", desc: "常温区" },
        { name: "库区B", desc: "重件区" },
        { name: "库区C", desc: "周转区" },
      ];

      for (let i = 1; i <= count; i += 1) {
        const location = locationPool[i % locationPool.length];
        const area = areaPool[i % areaPool.length];
        const materialName = materialNames[i % materialNames.length];

        rows.push({
          id: i,
          projectNo: `XM-${pad(1000 + (i % 90), 5)}`,
          lineName: lineNames[i % lineNames.length],
          segmentNo: `${segmentPrefixes[i % segmentPrefixes.length]}-${pad(1 + (i % 200), 4)}`,
          assemblyFlow: flows[i % flows.length],
          frameNo: `LK-${pad(i, 6)}`,
          materialBatchNo: `PC-${pad(1 + (i % 60), 4)}-${pad(1 + (i % 999), 3)}`,
          materialName: `${materialName}-${pad(1 + (i % 99), 3)}`,
          locationName: location.name,
          locationDesc: location.desc,
          areaName: area.name,
          areaDesc: area.desc,
        });
      }
      return rows;
    },
  },
};
</script>

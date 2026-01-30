<template>
  <div class="df-table-container" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
    <table class="df-table df-table-header">
      <colgroup>
        <col style="width: 14%" />
        <col style="width: 14%" />
        <col style="width: 14%" />
        <col style="width: 14%" />
        <col style="width: 14%" />
        <col style="width: 14%" />
        <col style="width: 16%" />
      </colgroup>
      <thead>
        <tr>
          <th>库区名称</th>
          <th>库位名称</th>
          <th>料框号</th>
          <th>项目号</th>
          <th>分段号</th>
          <th>组立流向</th>
          <th>零件数(件)</th>
        </tr>
      </thead>
    </table>

    <div class="df-table-wrapper">
      <div class="df-scroll-content" :style="scrollStyle">
        <table class="df-table df-table-body">
          <colgroup>
            <col style="width: 14%" />
            <col style="width: 14%" />
            <col style="width: 14%" />
            <col style="width: 14%" />
            <col style="width: 14%" />
            <col style="width: 14%" />
            <col style="width: 16%" />
          </colgroup>
          <tbody>
            <tr v-for="(row, index) in displayData" :key="`${row.key}-${index}`">
              <td class="lst__area">{{ row.areaName }}</td>
              <td class="lst__location">{{ row.locationName }}</td>
              <td class="lst__basket">{{ row.basketNo }}</td>
              <td class="lst__project">{{ row.projectNo }}</td>
              <td class="lst__segment">{{ row.segmentNo }}</td>
              <td class="lst__flow">{{ row.assemblyFlow }}</td>
              <td class="lst__count">{{ row.partCount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import autoScrollMixin from "@/mixin/autoScrollMixin.js";

export default {
  name: "LineSideStorageTable",
  mixins: [autoScrollMixin],
  props: {
    rows: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    normalizedRows() {
      const list = Array.isArray(this.rows) ? this.rows : [];
      return list.filter(Boolean).map((raw, index) => ({
        key: raw.key != null ? raw.key : `${raw.locationName || "loc"}-${index}`,
        areaName: raw.areaName != null ? String(raw.areaName) : "-",
        locationName: raw.locationName != null ? String(raw.locationName) : "-",
        basketNo: raw.basketNo != null ? String(raw.basketNo) : "-",
        projectNo: raw.projectNo != null ? String(raw.projectNo) : "-",
        segmentNo: raw.segmentNo != null ? String(raw.segmentNo) : "-",
        assemblyFlow: raw.assemblyFlow != null ? String(raw.assemblyFlow) : "-",
        partCount: raw.partCount != null ? String(raw.partCount) : "-",
      }));
    },
    scrollData() {
      return this.normalizedRows;
    },
  },
};
</script>

<style scoped>
.lst__area {
  color: rgb(64, 213, 255);
}

.lst__location {
  color: rgb(255, 217, 0);
}

.lst__basket {
  color: rgb(255, 153, 0);
}

.lst__project {
  color: rgb(82, 196, 26);
}

.lst__segment {
  color: rgb(105, 192, 255);
}

.lst__flow {
  color: rgb(255, 193, 7);
}

.lst__count {
  color: rgb(149, 222, 100);
  font-variant-numeric: tabular-nums;
}
</style>

<style>
@import "../../../DigitalFusion/styles/table.css";
</style>

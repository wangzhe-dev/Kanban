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
          <th>库位编码</th>
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
              <td class="pit__area">{{ row.areaName }}</td>
              <td class="pit__location">{{ row.locationCode }}</td>
              <td class="pit__basket">{{ row.basketNo }}</td>
              <td class="pit__project">{{ row.projectNo }}</td>
              <td class="pit__segment">{{ row.segmentNo }}</td>
              <td class="pit__flow">{{ row.assemblyFlow }}</td>
              <td class="pit__count">{{ row.partCount }}</td>
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
  name: "PartInventoryTable",
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
        key: raw.key != null ? raw.key : `${raw.locationCode || "loc"}-${index}`,
        areaName: raw.areaName != null ? String(raw.areaName) : "-",
        locationCode: raw.locationCode != null ? String(raw.locationCode) : "-",
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
.pit__area {
  color: rgb(64, 213, 255);
}

.pit__location {
  color: rgb(255, 217, 0);
}

.pit__basket {
  color: rgb(255, 153, 0);
}

.pit__project {
  color: rgb(82, 196, 26);
}

.pit__segment {
  color: rgb(105, 192, 255);
}

.pit__flow {
  color: rgb(255, 193, 7);
}

.pit__count {
  color: rgb(149, 222, 100);
  font-variant-numeric: tabular-nums;
}
</style>

<style>
@import "../../../DigitalFusion/styles/table.css";
</style>

<template>
  <div class="df-table-container" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
    <table class="df-table df-table-header">
      <colgroup>
        <col style="width: 20%" />
        <col style="width: 20%" />
        <col style="width: 20%" />
        <col style="width: 20%" />
        <col style="width: 20%" />
      </colgroup>
      <thead>
        <tr>
          <th>库位名称</th>
          <th>料框号</th>
          <th>项目号</th>
          <th>分段号</th>
          <th>零件数(件)</th>
        </tr>
      </thead>
    </table>

    <div class="df-table-wrapper">
      <div class="df-scroll-content" :style="scrollStyle">
        <table class="df-table df-table-body">
          <colgroup>
            <col style="width: 20%" />
            <col style="width: 20%" />
            <col style="width: 20%" />
            <col style="width: 20%" />
            <col style="width: 20%" />
          </colgroup>
          <tbody>
            <tr v-for="(row, index) in displayData" :key="`${row.key}-${index}`">
              <td class="spct__location">{{ row.locationName }}</td>
              <td class="spct__basket">{{ row.basketNo }}</td>
              <td class="spct__project">{{ row.projectNo }}</td>
              <td class="spct__segment">{{ row.segmentNo }}</td>
              <td class="spct__count">{{ row.partCount }}</td>
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
  name: "SteelPlateCuttingTable",
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
        key: raw.key != null ? raw.key : `${raw.locationName || "location"}-${index}`,
        locationName: raw.locationName != null ? String(raw.locationName) : "-",
        basketNo: raw.basketNo != null ? String(raw.basketNo) : "-",
        projectNo: raw.projectNo != null ? String(raw.projectNo) : "-",
        segmentNo: raw.segmentNo != null ? String(raw.segmentNo) : "-",
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
.spct__location {
  color: rgb(64, 213, 255);
}

.spct__basket {
  color: rgb(255, 217, 0);
}

.spct__project {
  color: rgb(255, 153, 0);
}

.spct__segment {
  color: rgb(82, 196, 26);
}

.spct__count {
  color: rgb(105, 192, 255);
  font-variant-numeric: tabular-nums;
}
</style>

<style>
@import "../../../DigitalFusion/styles/table.css";
</style>

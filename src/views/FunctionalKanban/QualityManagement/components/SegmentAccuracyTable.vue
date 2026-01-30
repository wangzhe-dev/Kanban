<template>
  <div class="df-table-container" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
    <table class="df-table df-table-header">
      <colgroup>
        <col style="width: 300px" />
        <col style="width: 260px" />
        <col style="width: 240px" />
        <col style="width: 200px" />
      </colgroup>
      <thead>
        <tr>
          <th>产线名称</th>
          <th>一次合格数</th>
          <th>测量总分段数</th>
          <th>分段精度合格率</th>
        </tr>
      </thead>
    </table>

    <div class="df-table-wrapper">
      <div class="df-scroll-content" :style="scrollStyle">
        <table class="df-table df-table-body">
          <colgroup>
            <col style="width: 300px" />
            <col style="width: 260px" />
            <col style="width: 240px" />
            <col style="width: 200px" />
          </colgroup>
          <tbody>
            <tr v-for="(row, index) in displayData" :key="row.key || index">
              <td>{{ row.lineName }}</td>
              <td>{{ row.passCount }}</td>
              <td>{{ row.totalCount }}</td>
              <td class="sat__rate-cell">{{ row.rate }}</td>
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
  name: "SegmentAccuracyTable",
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
        key: raw.key != null ? raw.key : `${raw.lineName || raw.line || "line"}-${index}`,
        lineName: raw.lineName != null ? String(raw.lineName) : String(raw.line || "-"),
        passCount: Number(raw.passCount || 0),
        totalCount: Number(raw.totalCount || 0),
        rate: this.formatRate(raw.passCount, raw.totalCount),
      }));
    },
    scrollData() {
      return this.normalizedRows;
    },
  },
  methods: {
    formatRate(passCount, totalCount) {
      const pass = Number(passCount || 0);
      const total = Number(totalCount || 0);
      if (!total) return "0%";
      const pct = Math.round((pass / total) * 100);
      return `${pct}%`;
    },
  },
};
</script>

<style scoped>
.sat__rate-cell {
  color: rgba(105, 192, 255, 1);
  font-weight: 900;
  font-variant-numeric: tabular-nums;
}
</style>

<style>
@import "../../../DigitalFusion/styles/table.css";
</style>

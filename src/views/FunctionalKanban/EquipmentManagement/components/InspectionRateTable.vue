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
          <th>产线</th>
          <th>当日点检设备个数</th>
          <th>总需点检设备数</th>
          <th>日点检率</th>
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
              <td>{{ row.line }}</td>
              <td>{{ row.today }}</td>
              <td>{{ row.total }}</td>
              <td class="irt__rate-cell">{{ row.rate }}</td>
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
  name: "InspectionRateTable",
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
        key: raw.key != null ? raw.key : `${raw.line || "line"}-${index}`,
        line: raw.line != null ? String(raw.line) : "-",
        today: Number(raw.today || 0),
        total: Number(raw.total || 0),
        rate: this.formatRate(raw.today, raw.total),
      }));
    },
    scrollData() {
      return this.normalizedRows;
    },
  },
  methods: {
    formatRate(today, total) {
      const t = Number(today || 0);
      const n = Number(total || 0);
      if (!n) return "0%";
      const pct = Math.round((t / n) * 100);
      return `${pct}%`;
    },
  },
};
</script>

<style scoped>
.irt__rate-cell {
  color: rgba(105, 192, 255, 1);
  font-weight: 900;
  font-variant-numeric: tabular-nums;
}
</style>

<style>
@import "../../../DigitalFusion/styles/table.css";
</style>

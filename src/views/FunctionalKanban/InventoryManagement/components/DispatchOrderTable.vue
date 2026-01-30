<template>
  <div class="df-table-container" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
    <table class="df-table df-table-header">
      <colgroup>
        <col style="width: 22%" />
        <col style="width: 22%" />
        <col style="width: 18%" />
        <col style="width: 18%" />
        <col style="width: 20%" />
      </colgroup>
      <thead>
        <tr>
          <th>配送工单号</th>
          <th>所属总工单编码</th>
          <th>移库创建日期</th>
          <th>移库完成日期</th>
          <th>工单集配进度(%)</th>
        </tr>
      </thead>
    </table>

    <div class="df-table-wrapper">
      <div class="df-scroll-content" :style="scrollStyle">
        <table class="df-table df-table-body">
          <colgroup>
            <col style="width: 22%" />
            <col style="width: 22%" />
            <col style="width: 18%" />
            <col style="width: 18%" />
            <col style="width: 20%" />
          </colgroup>
          <tbody>
            <tr v-for="(row, index) in displayData" :key="`${row.key}-${index}`">
              <td class="dispatch-order__dispatch">{{ row.dispatchOrderNo }}</td>
              <td class="dispatch-order__master">{{ row.masterOrderCode }}</td>
              <td class="dispatch-order__create">{{ row.createDate }}</td>
              <td class="dispatch-order__complete">{{ row.completeDate }}</td>
              <td class="dispatch-order__progress">{{ row.progress }}</td>
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
  name: "DispatchOrderTable",
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
        key: raw.key != null ? raw.key : `${raw.dispatchOrderNo || "dispatch"}-${index}`,
        dispatchOrderNo: raw.dispatchOrderNo != null ? String(raw.dispatchOrderNo) : "-",
        masterOrderCode: raw.masterOrderCode != null ? String(raw.masterOrderCode) : "-",
        createDate: raw.createDate != null ? String(raw.createDate) : "-",
        completeDate: raw.completeDate != null ? String(raw.completeDate) : "-",
        progress: this.formatPercent(raw.progress),
      }));
    },
    scrollData() {
      return this.normalizedRows;
    },
  },
  methods: {
    formatPercent(value) {
      const num = Number(value);
      if (!Number.isFinite(num)) return "-";
      return `${Math.max(0, Math.min(100, Math.round(num)))}%`;
    },
  },
};
</script>

<style scoped>
.dispatch-order__dispatch {
  color: rgb(64, 213, 255);
}

.dispatch-order__master {
  color: rgb(255, 217, 0);
}

.dispatch-order__create {
  color: rgb(255, 153, 0);
}

.dispatch-order__complete {
  color: rgb(82, 196, 26);
}

.dispatch-order__progress {
  color: rgba(105, 192, 255, 1);
  font-weight: 900;
  font-variant-numeric: tabular-nums;
}
</style>

<style>
@import "../../../DigitalFusion/styles/table.css";
</style>

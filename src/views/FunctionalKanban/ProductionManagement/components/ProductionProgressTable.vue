<template>
  <div class="df-table-container" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
    <table class="df-table df-table-header">
      <colgroup>
        <col style="width: 260px" />
        <col style="width: 220px" />
        <col style="width: 240px" />
        <col style="width: 190px" />
        <col style="width: 190px" />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th>标题</th>
          <th>日期</th>
          <th>产线</th>
          <th>计划完成</th>
          <th>实际完成</th>
          <th>完成率</th>
        </tr>
      </thead>
    </table>

    <div class="df-table-wrapper">
      <div class="df-scroll-content" :style="scrollStyle">
        <table class="df-table df-table-body">
          <colgroup>
            <col style="width: 260px" />
            <col style="width: 220px" />
            <col style="width: 240px" />
            <col style="width: 190px" />
            <col style="width: 190px" />
            <col />
          </colgroup>
          <tbody>
            <tr v-for="(row, index) in displayData" :key="index">
              <td>{{ row.title || "-" }}</td>
              <td>{{ row.date || "-" }}</td>
              <td>{{ row.lineName || "-" }}</td>
              <td class="cell-plan">{{ row.planQty ?row.planQty: "-" }}</td>
              <td class="cell-actual">{{ row.actualQty ?row.actualQty: "-" }}</td>
              <td class="cell-rate">{{ formatRate(row.completionRate) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  
  </div>
</template>

<script >
import autoScrollMixin from "@/mixin/autoScrollMixin.js";

export default {
  name: "ProductionProgressTable",
  mixins: [autoScrollMixin],
  props: {
    rows: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    scrollData() {
      return this.rows;
    },
  },
  methods: {
    formatRate(rate) {
      const num = Number(rate);
      if (!Number.isFinite(num)) return "-";
      return `${Math.max(0, Math.min(100, Math.round(num)))}%`;
    },
  },
};
</script>

<style>
@import "../../../DigitalFusion/styles/table.css";

.df-table td.cell-plan {
  color: rgb(255, 111, 0);
}

.df-table td.cell-actual {
  color: rgb(55, 217, 240);
}

.df-table td.cell-rate {
  color: rgba(255, 255, 255, 0.92);
}
</style>


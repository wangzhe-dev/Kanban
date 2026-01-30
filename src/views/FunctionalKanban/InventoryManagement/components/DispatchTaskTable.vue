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
          <th>调度任务</th>
          <th>类型</th>
          <th>料框</th>
          <th>出发点</th>
          <th>目标点</th>
          <th>日期</th>
          <th>物料数量</th>
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
              <td class="dtt__task">{{ row.taskName }}</td>
              <td class="dtt__type">{{ row.taskType }}</td>
              <td class="dtt__basket">{{ row.basketNo }}</td>
              <td class="dtt__from">{{ row.fromPoint }}</td>
              <td class="dtt__to">{{ row.toPoint }}</td>
              <td class="dtt__date">{{ row.date }}</td>
              <td class="dtt__quantity">{{ row.quantity }}</td>
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
  name: "DispatchTaskTable",
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
        key: raw.key != null ? raw.key : `${raw.taskName || "task"}-${index}`,
        taskName: raw.taskName != null ? String(raw.taskName) : "-",
        taskType: raw.taskType != null ? String(raw.taskType) : "-",
        basketNo: raw.basketNo != null ? String(raw.basketNo) : "-",
        fromPoint: raw.fromPoint != null ? String(raw.fromPoint) : "-",
        toPoint: raw.toPoint != null ? String(raw.toPoint) : "-",
        date: raw.date != null ? String(raw.date) : "-",
        quantity: raw.quantity != null ? String(raw.quantity) : "-",
      }));
    },
    scrollData() {
      return this.normalizedRows;
    },
  },
};
</script>

<style scoped>
.dtt__task {
  color: rgb(64, 213, 255);
}

.dtt__type {
  color: rgb(255, 217, 0);
}

.dtt__basket {
  color: rgb(255, 153, 0);
}

.dtt__from {
  color: rgb(82, 196, 26);
}

.dtt__to {
  color: rgb(105, 192, 255);
}

.dtt__date {
  color: rgb(255, 193, 7);
}

.dtt__quantity {
  color: rgb(149, 222, 100);
  font-variant-numeric: tabular-nums;
}
</style>

<style>
@import "../../../DigitalFusion/styles/table.css";
</style>

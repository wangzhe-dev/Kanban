<template>
  <div class="df-table-container" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
    <table class="df-table df-table-header">
      <colgroup>
        <col v-for="column in columns" :key="column.key" :style="{ width: column.width || 'auto' }" />
      </colgroup>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">
            {{ column.label }}
          </th>
        </tr>
      </thead>
    </table>
    <div class="df-table-wrapper">
      <div class="df-scroll-content" :style="scrollStyle">
        <table class="df-table df-table-body">
          <colgroup>
            <col v-for="column in columns" :key="column.key" :style="{ width: column.width || 'auto' }" />
          </colgroup>
          <tbody>
            <tr v-for="(row, index) in displayData" :key="index">
              <td v-for="column in columns" :key="column.key">
                <span
                  v-if="column.key === 'status'"
                  class="status-badge"
                  :class="getStatusClass(row[column.key])">
                  {{ row[column.key] }}
                </span>
                <span v-else :style="{ color: getCellColor(column.key, row) }">
                  {{ row[column.key] }}
                </span>
              </td>
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
  name: "TaskDetailsTable",
  mixins: [autoScrollMixin],
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    scrollData() {
      return this.tableData;
    },
  },
  methods: {
    getStatusClass(status) {
      const map = {
        待处理: "status-pending",
        进行中: "status-inProgress",
        已完成: "status-completed",
        暂停: "status-paused",
      };
      return map[status] || "status-inProgress";
    },
    getCellColor(key, row) {
      const colorMap = {
        orderNo: "rgb(64, 213, 255)",
        steelCode: "rgb(55, 217, 240)",
        project: "rgb(163, 224, 67)",
        projectNo: "rgb(163, 224, 67)",
        batch: "rgb(255, 217, 0)",
        batchNo: "rgb(255, 217, 0)",
        sectionNo: "rgb(255, 217, 0)",
        material: "rgb(163, 224, 67)",
        spec: "rgb(255, 217, 0)",
        specType: "rgb(255, 217, 0)",
        weight: "rgb(255, 153, 0)",
        category: "rgb(55, 217, 240)",
        actualStart: "rgb(64, 213, 255)",
        actualEnd: "rgb(64, 213, 255)",
        durationMin: "rgb(255, 153, 0)",
      };
      return colorMap[key] || "#a8c5e8";
    },
  },
};
</script>

<style>
@import "../../styles/table.css";
</style>

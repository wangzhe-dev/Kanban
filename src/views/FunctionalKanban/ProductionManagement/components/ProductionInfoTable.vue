<template>
  <div class="df-table-container" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
    <table class="df-table df-table-header">
      <colgroup>
        <col style="width: 240px" />
        <col style="width: 240px" />
        <col style="width: 180px" />
        <col />
        <col style="width: 200px" />
      </colgroup>
      <thead>
        <tr>
          <th>产线名称</th>
          <th>工单号</th>
          <th>状态</th>
          <th>完成时间</th>
          <th>组立号</th>
        </tr>
      </thead>
    </table>

    <div class="df-table-wrapper">
      <div class="df-scroll-content" :style="scrollStyle">
        <table class="df-table df-table-body">
          <colgroup>
            <col style="width: 240px" />
            <col style="width: 240px" />
            <col style="width: 180px" />
            <col />
            <col style="width: 200px" />
          </colgroup>
          <tbody>
            <tr v-for="(row, index) in displayData" :key="index">
              <td>{{ row.lineName || "-" }}</td>
              <td>{{ row.workOrderNo || "-" }}</td>
              <td>
                <span class="status-badge" :class="statusClass(row.status)">{{ row.status || "-" }}</span>
              </td>
              <td>{{ row.completedAt || "-" }}</td>
              <td>{{ row.assemblyNo || "-" }}</td>
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
  name: "ProductionInfoTable",
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
    statusClass(status) {
      const map = {
        待处理: "status-pending",
        进行中: "status-inProgress",
        已完成: "status-completed",
        暂停: "status-paused",
      };
      return map[status] || "status-pending";
    },
  },
};
</script>

<style>
@import "../../../DigitalFusion/styles/table.css";
</style>

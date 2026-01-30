<template>
  <div class="df-table-container" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
    <table class="df-table df-table-header">
      <colgroup>
        <col style="width: 200px" />
        <col />
        <col />
        <col />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th>项目号</th>
          <th>状态</th>
          <th>类型</th>
          <th>计划数量</th>
          <th>完成数</th>
        </tr>
      </thead>
    </table>
    <div class="df-table-wrapper">
      <div class="df-scroll-content" :style="scrollStyle">
        <table class="df-table df-table-body">
          <colgroup>
            <col style="width: 200px" />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <tbody>
            <tr v-for="(item, index) in displayData" :key="index">
              <td>{{ item.projectNo }}</td>
              <td>
                <span class="status-badge" :class="statusClass(item.status)">{{ item.status }}</span>
              </td>
              <td>{{ item.type }}</td>
              <td style="color: #f8a01c">{{ item.planQuantity }}</td>
              <td style="color: #2ebce8">{{ item.completedQuantity }}</td>
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
  name: "LogisticsProgressTable",
  mixins: [autoScrollMixin],
  props: {
    progressData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    scrollData() {
      return this.progressData;
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
@import "../../styles/table.css";
</style>

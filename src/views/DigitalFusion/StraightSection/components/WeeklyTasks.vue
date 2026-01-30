<template>
  <div class="df-table-container" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
    <table class="df-table df-table-header">
      <thead>
        <tr>
          <th>工单号</th>
          <th>船号</th>
          <th>分段号</th>
          <th>推送时间</th>
          <th>开始时间</th>
          <th>结束时间</th>
          <th>状态</th>
        </tr>
      </thead>
    </table>
    <div class="df-table-wrapper">
      <div class="df-scroll-content" :style="scrollStyle">
        <table class="df-table df-table-body">
          <tbody>
            <tr v-for="(item, index) in displayData" :key="index">
              <td>{{ item.orderNumber }}</td>
              <td>{{ item.shipNumber }}</td>
              <td>{{ item.sectionNumber }}</td>
              <td>{{ item.pushTime }}</td>
              <td>{{ item.actualStartTime }}</td>
              <td>{{ item.actualEndTime }}</td>
              <td>
                <span class="status-badge" :class="`status-${item.status}`">
                  {{ item.statusText }}
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
  name: "WeeklyTasks",
  mixins: [autoScrollMixin],
  props: {
    tasksData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    scrollData() {
      return this.tasksData;
    },
  },
};
</script>

<style>
@import "../../styles/table.css";
</style>

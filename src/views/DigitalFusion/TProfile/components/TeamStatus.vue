<template>
  <div class="df-table-container" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
    <table class="df-table df-table-header">
      <colgroup>
        <col style="width: 25%" />
        <col style="width: 30%" />
        <col style="width: 22.5%" />
        <col style="width: 22.5%" />
      </colgroup>
      <thead>
        <tr>
          <th>班组</th>
          <th>工位信息</th>
          <th>数量</th>
          <th>重量(吨)</th>
        </tr>
      </thead>
    </table>
    <div class="df-table-wrapper">
      <div class="df-scroll-content" :style="scrollStyle">
        <table class="df-table df-table-body">
          <colgroup>
            <col style="width: 25%" />
            <col style="width: 30%" />
            <col style="width: 22.5%" />
            <col style="width: 22.5%" />
          </colgroup>
          <tbody>
            <tr v-for="(item, index) in displayData" :key="index">
              <td style="color: rgb(64, 213, 255)">{{ item.team }}</td>
              <td style="color: rgb(255, 217, 0)">{{ item.stationInfo }}</td>
              <td style="color: rgb(255, 153, 0)">{{ item.quantity }}</td>
              <td style="color: rgb(255, 217, 0)">{{ item.weight }}</td>
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
  name: "TeamStatus",
  mixins: [autoScrollMixin],
  props: {
    teamData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    scrollData() {
      return this.teamData;
    },
  },
};
</script>

<style>
@import "../../styles/table.css";
</style>

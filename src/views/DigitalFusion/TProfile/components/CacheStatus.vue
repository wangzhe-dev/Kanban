<template>
  <div class="df-table-container" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
    <table class="df-table df-table-header">
      <colgroup>
        <col style="width: 18%" />
        <col style="width: 20%" />
        <col style="width: 15%" />
        <col style="width: 12%" />
        <col style="width: 15%" />
        <col style="width: 20%" />
      </colgroup>
      <thead>
        <tr>
          <th>料框号</th>
          <th>物料名称</th>
          <th>库位</th>
          <th>船号</th>
          <th>流向</th>
          <th>批次号</th>
        </tr>
      </thead>
    </table>
    <div class="df-table-wrapper">
      <div class="df-scroll-content" :style="scrollStyle">
        <table class="df-table df-table-body">
          <colgroup>
            <col style="width: 18%" />
            <col style="width: 20%" />
            <col style="width: 15%" />
            <col style="width: 12%" />
            <col style="width: 15%" />
            <col style="width: 20%" />
          </colgroup>
          <tbody>
            <tr v-for="(item, index) in displayData" :key="index">
              <td style="color: rgb(64, 213, 255)">{{ item.frameNumber }}</td>
              <td style="color: rgb(163, 224, 67)">{{ item.materialName }}</td>
              <td style="color: rgb(255, 217, 0)">{{ item.location }}</td>
              <td style="color: rgb(55, 217, 240)">{{ item.shipNumber }}</td>
              <td style="color: rgb(255, 153, 0)">{{ item.direction }}</td>
              <td style="color: rgb(140, 209, 125)">{{ item.batchNumber }}</td>
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
  name: "CacheStatus",
  mixins: [autoScrollMixin],
  props: {
    cacheData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    scrollData() {
      return this.cacheData;
    },
  },
};
</script>

<style>
@import "../../styles/table.css";
</style>

<template>
  <div class="df-table-container" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
    <table class="df-table df-table-header">
      <thead>
        <tr>
          <th>料框号</th>
          <th>物料名称</th>
          <th>库位</th>
          <th>船号</th>
          <th>流向</th>
          <th>数量</th>
        </tr>
      </thead>
    </table>
    <div class="df-table-wrapper">
      <div class="df-scroll-content" :style="scrollStyle">
        <table class="df-table df-table-body">
          <tbody>
            <tr v-for="(item, index) in displayData" :key="index">
              <td>{{ item.frameNumber }}</td>
              <td>{{ item.materialName }}</td>
              <td>{{ item.location }}</td>
              <td>{{ item.shipNumber }}</td>
              <td>{{ item.direction }}</td>
              <td>{{ item.quantity }}</td>
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

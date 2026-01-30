<template>
  <div class="df-table-container" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
    <table class="df-table df-table-header">
      <colgroup>
        <col style="width: 200px" />
        <col style="width: 80px" />
        <col style="width: 120px" />
        <col style="width: 120px" />
        <col style="width: 120px" />
        <col style="width: 100px" />
        <col style="width: 90px" />
        <col style="width: 80px" />
        <col style="width: 80px" />
        <col style="width: 160px" />
        <col style="width: 100px" />
      </colgroup>
      <thead>
        <tr>
          <th>钢板唯一识别码</th>
          <th>区域名称</th>
          <th>库区名</th>
          <th>库位编</th>
          <th>库位名称</th>
          <th>长</th>
          <th>宽</th>
          <th>厚度</th>
          <th>重量</th>
          <th>入库时间</th>
          <th>在库时长</th>
        </tr>
      </thead>
    </table>
    <div class="df-table-wrapper">
      <div class="df-scroll-content" :style="scrollStyle">
        <table class="df-table df-table-body">
          <colgroup>
            <col style="width: 200px" />
            <col style="width: 80px" />
            <col style="width: 120px" />
            <col style="width: 120px" />
            <col style="width: 120px" />
            <col style="width: 100px" />
            <col style="width: 90px" />
            <col style="width: 80px" />
            <col style="width: 80px" />
            <col style="width: 160px" />
            <col style="width: 100px" />
          </colgroup>
          <tbody>
            <tr v-for="(item, index) in displayData" :key="index">
              <td>{{ item.uniqueCode }}</td>
              <td style="color: rgb(163, 224, 67)">{{ item.areaName }}</td>
              <td style="color: rgb(255, 153, 0)">{{ item.zoneName }}</td>
              <td>{{ item.locationCode }}</td>
              <td style="color: rgb(255, 217, 0)">{{ item.locationName }}</td>
              <td style="color: rgb(55, 217, 240)">{{ item.length }}</td>
              <td style="color: rgb(140, 209, 125)">{{ item.width }}</td>
              <td style="color: rgb(255, 190, 125)">{{ item.thickness }}</td>
              <td>{{ item.weight }}</td>
              <td>{{ item.inboundTime }}</td>
              <td>{{ item.storageDuration }}</td>
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
  name: "PlateInfoTable",
  mixins: [autoScrollMixin],
  props: {
    plateInfoData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    scrollData() {
      return this.plateInfoData;
    },
  },
};
</script>

<style>
@import "../../styles/table.css";
</style>

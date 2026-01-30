<template>
  <div class="df-table-container" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
    <table class="df-table df-table-header">
      <colgroup>
        <col style="width: 24%" />
        <col style="width: 22%" />
        <col style="width: 14%" />
        <col style="width: 24%" />
        <col style="width: 16%" />
      </colgroup>
      <thead>
        <tr>
          <th>总工单编码</th>
          <th>配送工单号</th>
          <th>分段号</th>
          <th>物料名称</th>
          <th>数量</th>
        </tr>
      </thead>
    </table>

    <div class="df-table-wrapper">
      <div class="df-scroll-content" :style="scrollStyle">
        <table class="df-table df-table-body">
          <colgroup>
            <col style="width: 24%" />
            <col style="width: 22%" />
            <col style="width: 14%" />
            <col style="width: 24%" />
            <col style="width: 16%" />
          </colgroup>
          <tbody>
            <tr v-for="(row, index) in displayData" :key="`${row.key}-${index}`">
              <td class="lmt__master">{{ row.masterOrderCode }}</td>
              <td class="lmt__dispatch">{{ row.dispatchOrderNo }}</td>
              <td class="lmt__segment">{{ row.segmentNo }}</td>
              <td class="lmt__material">{{ row.materialName }}</td>
              <td class="lmt__quantity">{{ row.quantity }}</td>
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
  name: "LogisticsMaterialTable",
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
        key: raw.key != null ? raw.key : `${raw.masterOrderCode || "order"}-${index}`,
        masterOrderCode: raw.masterOrderCode != null ? String(raw.masterOrderCode) : "-",
        dispatchOrderNo: raw.dispatchOrderNo != null ? String(raw.dispatchOrderNo) : "-",
        segmentNo: raw.segmentNo != null ? String(raw.segmentNo) : "-",
        materialName: raw.materialName != null ? String(raw.materialName) : "-",
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
.lmt__master {
  color: rgb(64, 213, 255);
}

.lmt__dispatch {
  color: rgb(255, 217, 0);
}

.lmt__segment {
  color: rgb(255, 153, 0);
}

.lmt__material {
  color: rgb(105, 192, 255);
}

.lmt__quantity {
  color: rgb(82, 196, 26);
}
</style>

<style>
@import "../../../DigitalFusion/styles/table.css";
</style>

<template>
  <div class="df-table-container" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
    <table class="df-table df-table-header">
      <colgroup>
        <col style="width: 12%" />
        <col style="width: 10%" />
        <col style="width: 10%" />
        <col style="width: 12%" />
        <col style="width: 20%" />
        <col style="width: 18%" />
        <col style="width: 18%" />
      </colgroup>
      <thead>
        <tr>
          <th>船号</th>
          <th>库区</th>
          <th>库位</th>
          <th>料框号</th>
          <th>物料名称</th>
          <th>物料批次号</th>
          <th>原物料批次号</th>
        </tr>
      </thead>
    </table>

    <div class="df-table-wrapper">
      <div class="df-scroll-content" :style="scrollStyle">
        <table class="df-table df-table-body">
          <colgroup>
            <col style="width: 12%" />
            <col style="width: 10%" />
            <col style="width: 10%" />
            <col style="width: 12%" />
            <col style="width: 20%" />
            <col style="width: 18%" />
            <col style="width: 18%" />
          </colgroup>
          <tbody>
            <tr v-for="(row, index) in displayData" :key="`${row.key}-${index}`">
              <td class="pst__ship">{{ row.shipNo }}</td>
              <td class="pst__area">{{ row.area }}</td>
              <td class="pst__location">{{ row.location }}</td>
              <td class="pst__basket">{{ row.basketNo }}</td>
              <td class="pst__material">{{ row.materialName }}</td>
              <td class="pst__batch">{{ row.batchNo }}</td>
              <td class="pst__raw-batch">{{ row.rawBatchNo }}</td>
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
  name: "PartStorageTable",
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
        key: raw.key != null ? raw.key : `${raw.shipNo || "ship"}-${index}`,
        shipNo: raw.shipNo != null ? String(raw.shipNo) : "-",
        area: raw.area != null ? String(raw.area) : "-",
        location: raw.location != null ? String(raw.location) : "-",
        basketNo: raw.basketNo != null ? String(raw.basketNo) : "-",
        materialName: raw.materialName != null ? String(raw.materialName) : "-",
        batchNo: raw.batchNo != null ? String(raw.batchNo) : "-",
        rawBatchNo: raw.rawBatchNo != null ? String(raw.rawBatchNo) : "-",
      }));
    },
    scrollData() {
      return this.normalizedRows;
    },
  },
};
</script>

<style scoped>
.pst__ship {
  color: rgb(64, 213, 255);
}

.pst__area {
  color: rgb(255, 217, 0);
}

.pst__location {
  color: rgb(255, 153, 0);
}

.pst__basket {
  color: rgb(82, 196, 26);
}

.pst__material {
  color: rgb(105, 192, 255);
}

.pst__batch {
  color: rgb(255, 193, 7);
}

.pst__raw-batch {
  color: rgb(149, 222, 100);
}
</style>

<style>
@import "../../../DigitalFusion/styles/table.css";
</style>

<template>
  <div class="production-stats">
      <div class="table-wrapper">
        <table class="df-table">
          <colgroup>
            <col v-for="column in columns" :key="column.key" :style="{ width: column.width || 'auto' }" />
          </colgroup>
          <thead>
            <tr>
              <th v-for="column in columns" :key="column.key" :style="{ width: column.width }">
                {{ column.label }}
              </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td
              v-for="column in columns"
              :key="column.key"
              :style="{ color: getCellColor(column.key) }"
            >
              {{ row[column.key] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductionStats",
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
  methods: {
    getCellColor(key) {
      const colorMap = {
        station: "rgb(64, 213, 255)",
        equipmentName: "rgb(64, 213, 255)",
        quantity: "rgb(255, 153, 0)",
        weight: "rgb(255, 217, 0)",
        startedQuantity: "rgb(255, 153, 0)",
        completedQuantity: "rgb(255, 217, 0)",
      };
      return colorMap[key] || "#a8c5e8";
    },
  },
};
</script>

<style>
@import "../../styles/table.css";
</style>

<style scoped>
.production-stats {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.table-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 自定义滚动条 */
.table-wrapper::-webkit-scrollbar {
  width: 6px;
}

.table-wrapper::-webkit-scrollbar-track {
  background: rgba(30, 144, 255, 0.1);
  border-radius: 3px;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background: rgba(64, 213, 255, 0.4);
  border-radius: 3px;
}

.table-wrapper::-webkit-scrollbar-thumb:hover {
  background: rgba(64, 213, 255, 0.6);
}
</style>

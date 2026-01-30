<template>
  <div class="production-stats">
    <div class="table-wrapper">
      <table class="df-table">
        <colgroup>
          <col v-for="column in columns" :key="'col-' + column.key" :style="{ width: column.width }" />
        </colgroup>
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.key">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td v-for="(column, colIndex) in columns" :key="column.key" :style="{ color: getColumnColor(colIndex) }">
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
    getColumnColor(colIndex) {
      const colors = [
        'rgb(64, 213, 255)',   // 第一列 - 青色
        'rgb(163, 224, 67)',   // 第二列 - 绿色
        'rgb(255, 153, 0)',    // 第三列 - 橙色
        'rgb(255, 217, 0)',    // 第四列 - 金色
        'rgb(140, 209, 125)',  // 第五列 - 浅绿
      ];
      return colors[colIndex] || 'rgb(255, 255, 255)';
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

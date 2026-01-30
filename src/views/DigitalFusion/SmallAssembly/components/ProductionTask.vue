<template>
  <div class="production-task">
    <div class="right-section">
      <div class="table-wrapper">
        <table class="df-table">
          <colgroup>
            <col style="width: 14%" />
            <col style="width: 10%" />
            <col style="width: 10%" />
            <col style="width: 12%" />
            <col style="width: 12%" />
            <col style="width: 12%" />
            <col style="width: 10%" />
            <col style="width: 10%" />
            <col style="width: 10%" />
          </colgroup>
          <thead>
            <tr>
              <th>工单号</th>
              <th>船号</th>
              <th>分段号</th>
              <th>推送时间</th>
              <th>实际开始时间</th>
              <th>实际结束时间</th>
              <th>长度</th>
              <th>重量</th>
              <th>工单状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in taskData" :key="index">
              <td style="color: rgb(64, 213, 255)">{{ item.orderNumber }}</td>
              <td style="color: rgb(163, 224, 67)">{{ item.shipNumber }}</td>
              <td style="color: rgb(255, 217, 0)">{{ item.sectionNumber }}</td>
              <td style="color: rgb(163, 224, 67)">{{ item.pushTime }}</td>
              <td style="color: rgb(140, 209, 125)">{{ item.actualStartTime }}</td>
              <td style="color: rgb(55, 217, 240)">{{ item.actualEndTime }}</td>
              <td style="color: rgb(255, 153, 0)">{{ item.length }}</td>
              <td style="color: rgb(255, 217, 0)">{{ item.weight }}</td>
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
export default {
  name: "ProductionTask",
  props: {
    taskData: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
@import "../../styles/table.css";
</style>

<style scoped>
.production-task {
  width: 100%;
  height: 100%;
  display: flex;
}

/* 右侧表格区域 */
.right-section {
  flex: 1;
  min-width: 0;
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

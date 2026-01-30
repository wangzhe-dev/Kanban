<template>
  <div class="production-task">
    <!-- 左侧背景图区域 -->
    <div class="left-section">
      <div class="bg-image"></div>
      <div class="overlay-content">
        <div class="product-count">{{ productCount }}</div>
        <div class="product-label">今日进度</div>
      </div>
    </div>

    <!-- 右侧表格区域 -->
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
    productCount: {
      type: Number,
      default: 45,
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
  gap: 50px;
}

/* 左侧区域 */
.left-section {
  flex: 0 0 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.bg-image {
  width: 100%;
  height: 100%;
  background-image: url("../../../../assets/images/DF/bg-c.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  animation: rotate 2s linear infinite;
}

/* 旋转动画 - 2秒转一圈 */
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

/* 覆盖内容 */
.overlay-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  pointer-events: none;
}

.product-count {
  font-size: 72px;
  font-weight: 900;
  color: #ff9900;
  line-height: 1;
  text-shadow: 0 0 30px rgba(255, 153, 0, 0.6), 0 0 60px rgba(255, 153, 0, 0.4);
  letter-spacing: 2px;
  margin-bottom: 40px;
}

.product-label {
  font-size: 32px;
  font-weight: 900;
  color: #a8c5e8;
  letter-spacing: 2px;
  text-align: center;
  line-height: 1.8;
  white-space: nowrap;
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

/* 响应式调整 */
@media screen and (max-height: 1080px) {
  .left-section {
    flex: 0 0 240px;
  }
}
</style>

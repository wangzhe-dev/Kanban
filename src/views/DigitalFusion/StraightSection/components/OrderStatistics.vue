<template>
  <div class="order-statistics">
    <div class="statistics-grid">
      <div v-for="(item, index) in statisticsData" :key="index" class="statistics-item">
        <div class="item-bg"></div>
        <div class="item-content">
          <div class="metric-group">
            <span class="metric-label">{{ item.type }}</span>
            <span class="metric-value">{{ item.planned }}<span class="unit">{{ item.unit }}</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderStatistics",
  props: {
    statisticsData: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.order-statistics {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.statistics-grid {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  gap: 16px;
  padding: 0 20px;
}

.statistics-item {
  position: relative;
  height: 100%;
  min-height: 80px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.item-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("../../../../assets/images/DF/bg-row-itemn.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 0;
}

.item-content {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  z-index: 1;
}

.metric-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.metric-label {
  font-size: 28px;
  color: #a8c5e8;
  font-weight: 600;
  letter-spacing: 1px;
}

.metric-value {
  font-size: 48px;
  font-weight: 700;
  color: #00d9ff;
  font-family: "DIN Alternate", "Arial", "Microsoft YaHei", sans-serif;
  line-height: 1;
  letter-spacing: 1px;
}

.unit {
  font-size: 28px;
  color: #5eb8d9;
  font-weight: 500;
  margin-left: 6px;
}

/* 响应式调整 */
@media screen and (max-height: 1080px) {
  .statistics-item {
    height: 140px;
  }

  .statistics-grid {
    gap: 16px;
  }

  .metric-label {
    font-size: 24px;
  }

  .metric-value {
    font-size: 40px;
  }

  .unit {
    font-size: 24px;
  }
}
</style>

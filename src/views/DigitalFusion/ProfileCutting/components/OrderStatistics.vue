<template>
  <div class="order-statistics">
    <div class="statistics-list">
      <div v-for="(item, index) in statisticsData" :key="index" class="statistics-item" :class="`item-${index}`">
        <div class="item-bg"></div>
        <div class="item-content">
          <!-- Left: Icon + Label -->
          <div class="left-group">
            <span class="metric-label">{{ item.type }}</span>
          </div>

          <!-- Right: Value + Trend Arrow -->
          <div class="right-group">
            <span class="metric-value">{{ item.value }}</span>
            <div class="trend-arrow">个</div>
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
  flex-direction: column;
  justify-content: center;
}

.statistics-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 20px;
}

.statistics-item {
  position: relative;
  height: 100px;
  /* Adjusted height for 3 rows */
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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  z-index: 1;
}

.left-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Blue Triangle Icon */
.icon-triangle {
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 12px solid #00d9ff;
  filter: drop-shadow(0 0 5px #00d9ff);
}

.metric-label {
  font-size: 28px;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 1px;
  margin-left: 80px;
}

.right-group {
  display: flex;
  align-items: center;
  gap: 200px;
  /* Space between value and arrow */
  min-width: 130px;
  justify-content: flex-end;
}

.metric-value {
  font-size: 32px;
  font-weight: 700;
  font-family: "DIN Alternate", "Arial", sans-serif;
}

.trend-arrow {
  font-size: 24px;
  font-weight: bold;
}

/* Row-specific colors */
/* Row 1: Current Order Count (Yellow) */
.item-0 .metric-value,
.item-0 .trend-arrow {
  color: #ffcc00;
  /* Yellow */
}

/* Row 2: In Progress (Blue/Cyan) */
.item-1 .metric-value,
.item-1 .trend-arrow {
  color: #00d9ff;
  /* Cyan */
}

/* Row 3: Completed (Orange) */
.item-2 .metric-value,
.item-2 .trend-arrow {
  color: #ff6600;
  /* Orange */
}

/* Responsive Adjustments */
@media screen and (max-height: 1080px) {
  .statistics-item {
    height: 60px;
  }

  .metric-label {
    font-size: 20px;
  }

  .metric-value {
    font-size: 26px;
  }

  .trend-arrow {
    font-size: 20px;
  }

  .right-group {
    gap: 30px;
  }
}
</style>

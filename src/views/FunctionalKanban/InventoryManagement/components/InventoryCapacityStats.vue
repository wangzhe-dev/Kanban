<template>
  <div class="inventory-capacity">
    <div class="inventory-capacity__col">
      <div v-for="(item, index) in leftStats" :key="item.key || index" class="stats-item" :class="`item-${index}`">
        <div class="item-bg"></div>
        <div class="item-content">
          <div class="left-group">
            <span class="metric-label">{{ item.label }}</span>
          </div>
          <div class="right-group">
            <span class="metric-value">{{ item.value }}</span>
            <span class="unit">{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="inventory-capacity__col">
      <div v-for="(item, index) in rightStats" :key="item.key || index" class="stats-item" :class="`item-${index}`">
        <div class="item-bg"></div>
        <div class="item-content">
          <div class="left-group">
            <span class="metric-label">{{ item.label }}</span>
          </div>
          <div class="right-group">
            <span class="metric-value">{{ item.value }}</span>
            <span class="unit">{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InventoryCapacityStats",
  props: {
    leftStats: {
      type: Array,
      default: () => [],
    },
    rightStats: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.inventory-capacity {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 18px;
}

.inventory-capacity__col {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}

.stats-item {
  position: relative;
  height: 90px;
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
  padding: 0 24px;
  z-index: 1;
}

.left-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.metric-label {
  font-size: 26px;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 1px;
  margin-left: 50px;
}

.right-group {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 120px;
  justify-content: flex-end;
}

.metric-value {
  font-size: 30px;
  font-weight: 700;
  font-family: "DIN Alternate", "Arial", sans-serif;
}

.unit {
  font-size: 22px;
  font-weight: 500;
}

.item-0 .metric-value,
.item-0 .unit {
  color: #ffcc00;
}

.item-1 .metric-value,
.item-1 .unit {
  color: #00d9ff;
}

.item-2 .metric-value,
.item-2 .unit {
  color: #ff6600;
}

.item-3 .metric-value,
.item-3 .unit {
  color: #52c41a;
}

.item-4 .metric-value,
.item-4 .unit {
  color: #69c0ff;
}

@media screen and (max-height: 1080px) {
  .stats-item {
    height: 64px;
  }

  .metric-label {
    font-size: 20px;
  }

  .metric-value {
    font-size: 24px;
  }

  .unit {
    font-size: 18px;
  }
}
</style>

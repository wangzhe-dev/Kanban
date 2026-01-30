<template>
  <div class="daily-production">
    <div v-for="item in productionData" :key="item.id" class="production-item">
      <div class="item-header">{{ item.title }}</div>
      <div class="item-value">
        <span class="value-number">{{ item.value }}</span>
        <span class="value-unit">{{ item.unit }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DailyProduction",
  props: {
    productionData: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.daily-production {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 36px;
  padding: 18px 32px;
  background: linear-gradient(180deg, rgba(22, 58, 104, 0.7) 0%, rgba(4, 24, 44, 0.85) 100%);
  border: 1px solid rgba(64, 213, 255, 0.35);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.daily-production::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 3px;
  background: linear-gradient(90deg, rgba(64, 213, 255, 0), rgba(64, 213, 255, 0.85), rgba(64, 213, 255, 0));
}

.production-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 80px;
  flex: 1;
  min-width: 0;
}

.item-header {
  font-size: 38px;
  color: #d6e8ff;
  text-align: center;
  line-height: 1.4;
  font-weight: 500;
  letter-spacing: 0.6px;
}

.item-value {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.value-number {
  font-size: 64px;
  font-weight: 700;
  color: #00d9ff;
  font-family: "DIN Alternate", "Arial", "Microsoft YaHei", sans-serif;
  line-height: 1;
  text-shadow: 0 0 16px rgba(0, 217, 255, 0.35);
  letter-spacing: 1px;
}

.value-unit {
  font-size: 32px;
  color: #85c9f0;
  font-weight: 500;
  letter-spacing: 0.4px;
}

/* 响应式调整 */
@media screen and (max-height: 1080px) {
  .daily-production {
    gap: 20px;
    padding: 12px 20px;
  }

  .production-item {
    gap: 6px;
  }

  .item-header {
    font-size: 26px;
  }

  .value-number {
    font-size: 44px;
  }

  .value-unit {
    font-size: 22px;
  }
}
</style>

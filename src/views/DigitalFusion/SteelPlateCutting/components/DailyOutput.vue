<template>
  <div class="daily-production">
    <div class="production-grid">
      <div v-for="item in outputData" :key="item.id" class="production-item">
        <div class="item-header">{{ item.title }}</div>
        <div class="item-value">
          <span class="value-number">{{ item.value }}</span>
          <span class="value-unit">{{ item.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DailyOutput",
  props: {
    outputData: {
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
}

.production-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 14px;
  height: 100%;
}

.production-item {
  background: linear-gradient(135deg, rgba(30, 144, 255, 0.08) 0%, rgba(0, 191, 255, 0.04) 100%);
  border: 1px solid rgba(64, 213, 255, 0.3);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  min-height: 150px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.production-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #40d5ff, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.production-item:hover {
  border-color: rgba(64, 213, 255, 0.6);
  background: linear-gradient(135deg, rgba(30, 144, 255, 0.12) 0%, rgba(0, 191, 255, 0.06) 100%);
  transform: translateY(-2px);
}

.production-item:hover::before {
  opacity: 1;
}

.item-header {
  font-size: 26px;
  color: #a8c5e8;
  margin-bottom: 20px;
  text-align: center;
  line-height: 1.4;
  font-weight: 400;
  letter-spacing: 0.5px;
}

.item-value {
  display: flex;
  align-items: baseline;
  gap: 10px;
}

.value-number {
  font-size: 64px;
  font-weight: 700;
  color: #00d9ff;
  font-family: "DIN Alternate", "Arial", "Microsoft YaHei", sans-serif;
  line-height: 1;
  text-shadow: 0 0 20px rgba(0, 217, 255, 0.4);
  letter-spacing: 1px;
}

.value-unit {
  font-size: 28px;
  color: #5eb8d9;
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* 响应式调整 */
@media screen and (max-height: 1080px) {
  .production-grid {
    gap: 20px;
  }

  .production-item {
    padding: 20px;
  }

  .item-header {
    font-size: 22px;
    margin-bottom: 16px;
  }

  .value-number {
    font-size: 52px;
  }

  .value-unit {
    font-size: 24px;
  }
}
</style>

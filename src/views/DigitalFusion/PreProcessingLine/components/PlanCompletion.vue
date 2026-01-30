<template>
  <div class="plan-completion">
    <div class="completion-list">
      <div v-for="(item, index) in completionData" :key="index" class="completion-item">
        <div class="item-bg"></div>
        <div class="item-content">
          <div class="metric-group">
            <span class="metric-label">计划{{ item.type }}</span>
            <span class="metric-value">
              {{ item.planned }}<span class="unit">{{ item.unit }}</span>
            </span>
          </div>
          <div class="metric-group">
            <span class="metric-label">完成{{ item.type }}</span>
            <span class="metric-value">
              {{ item.completed }}<span class="unit">{{ item.unit }}</span>
            </span>
          </div>
          <div class="metric-group">
            <span class="metric-label">进度</span>
            <span class="metric-value progress">
              {{ item.progress }}<span class="unit">%</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PreProcessingLinePlanCompletion",
  props: {
    completionData: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.plan-completion {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.completion-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px;
}

.completion-item {
  position: relative;
  height: 180px;
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
  justify-content: space-around;
  padding: 0 0 0 20px;
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

.metric-value.progress {
  color: #ff9900;
  text-shadow: 0 0 20px rgba(255, 153, 0, 0.5);
}

.unit {
  font-size: 28px;
  color: #5eb8d9;
  font-weight: 500;
  margin-left: 6px;
}

@media screen and (max-height: 1080px) {
  .completion-item {
    height: 100px;
  }

  .completion-list {
    gap: 16px;
  }

  .metric-label {
    font-size: 20px;
  }

  .metric-value {
    font-size: 40px;
  }

  .unit {
    font-size: 24px;
  }
}
</style>


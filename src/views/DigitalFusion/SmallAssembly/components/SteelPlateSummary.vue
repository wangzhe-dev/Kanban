<template>
  <div class="summary-container">
    <div v-for="(item, index) in summaryData" :key="index" class="summary-item">
      <div class="item-bg"></div>
      <div class="item-content">
        <span class="label">{{ item.label }}</span>
        <span class="value" :style="{ color: valueColors[index % valueColors.length] }">
          {{ item.value }}
          <span class="unit">{{ item.unit }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SteelPlateSummary",
  props: {
    summaryData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    valueColors() {
      return ["#ffd34a", "#00d9ff", "#ff9900", "#ffd34a", "#00d9ff"];
    },
  },
};
</script>

<style scoped>
.summary-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-item {
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.item-bg {
  position: absolute;
  inset: 0;
  background-image: url("../../../../assets/images/DF/bg-row-itemn.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 0;
}

.item-content {
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  box-sizing: border-box;
}

.label {
  padding-left: 28px;
  font-size: 32px;
  color: #a8c5e8;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.value {
  font-size: 48px;
  font-weight: 800;
  color: #00d9ff;
  font-family: "DIN Alternate", "Arial", "Microsoft YaHei", sans-serif;
  letter-spacing: 1px;
  line-height: 1;
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.unit {
  font-size: 26px;
  color: #5eb8d9;
  font-weight: 600;
}

@media screen and (max-height: 1080px) {
  .summary-container {
    gap: 10px;
  }

  .label {
    font-size: 22px;
  }

  .value {
    font-size: 38px;
  }

  .unit {
    font-size: 22px;
  }
}
</style>

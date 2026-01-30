<template>
  <div class="work-order-status">
    <div class="progress-section">
      <div class="bg-image"></div>
      <div class="overlay-content">
        <div class="product-count">{{ productCount }}</div>
        <div class="product-label">工单完成率</div>
      </div>
    </div>

    <div class="summary-section">
      <SteelPlateSummary :summaryData="summaryData" />
    </div>
  </div>
</template>

<script>
import SteelPlateSummary from "./SteelPlateSummary.vue";

export default {
  name: "WorkOrderStatus",
  components: {
    SteelPlateSummary,
  },
  props: {
    summaryData: {
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

<style scoped>
.work-order-status {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 24px;
  align-items: center;
}

.progress-section {
  flex: 0 0 320px;
  height: 100%;
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

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

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
  font-size: 64px;
  font-weight: 900;
  color: #ff9900;
  line-height: 1;
  text-shadow: 0 0 30px rgba(255, 153, 0, 0.6), 0 0 60px rgba(255, 153, 0, 0.4);
  letter-spacing: 2px;
  margin-bottom: 28px;
}

.product-label {
  font-size: 28px;
  font-weight: 900;
  color: #a8c5e8;
  letter-spacing: 2px;
  text-align: center;
  line-height: 1.8;
  white-space: nowrap;
}

.summary-section {
  flex: 1;
  min-width: 0;
  height: 100%;
  display: flex;
  align-items: stretch;
}

@media screen and (max-height: 1080px) {
  .progress-section {
    flex: 0 0 240px;
  }

  .product-count {
    font-size: 52px;
    margin-bottom: 20px;
  }

  .product-label {
    font-size: 24px;
  }
}
</style>

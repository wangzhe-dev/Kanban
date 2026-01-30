<template>
  <div class="ems">
    <div class="ems__top">
      <div class="ems__top-bg" :style="{ backgroundImage: `url(${topBg})` }"></div>
      <div class="ems__top-content">
        <div class="ems__top-label">设备总数</div>
        <div class="ems__top-value">{{ total }}</div>
      </div>
    </div>

    <div class="ems__bottom">
      <div v-for="item in cards" :key="item.key" class="ems__card" :style="{ backgroundImage: `url(${item.bg})` }">
        <div class="ems__card-value">{{ item.value }}</div>
        <div class="ems__card-label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
const topBg = require("@/assets/images/ZN/shebei/t1.png");
const d1 = require("@/assets/images/ZN/shebei/d1.png");
const d2 = require("@/assets/images/ZN/shebei/d2.png");
const d3 = require("@/assets/images/ZN/shebei/d3.png");
const d4 = require("@/assets/images/ZN/shebei/d4.png");

export default {
  name: "EquipmentMonitorSummary",
  props: {
    total: {
      type: [Number, String],
      default: 0,
    },
    monthlyInspectionOrders: {
      type: [Number, String],
      default: 0,
    },
    monthlySpotCheckOrders: {
      type: [Number, String],
      default: 0,
    },
    monthlyRepairOrders: {
      type: [Number, String],
      default: 0,
    },
    utilizationRate: {
      type: [Number, String],
      default: "0%",
    },
  },
  computed: {
    topBg() {
      return topBg;
    },
    cards() {
      return [
        { key: "inspection", label: "本月巡检工单个数", value: this.monthlyInspectionOrders, bg: d1 },
        { key: "spotCheck", label: "本月点检工单个数", value: this.monthlySpotCheckOrders, bg: d2 },
        { key: "repair", label: "本月维修单个数", value: this.monthlyRepairOrders, bg: d3 },
        { key: "utilization", label: "设备利用率", value: this.utilizationRate, bg: d4 },
      ];
    },
  },
};
</script>

<style scoped>
.ems {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-height: 0;
}

.ems__top {
  position: relative;
  flex: 3;
  min-height: 0;
  border-radius: 8px;
  overflow: hidden;
}

.ems__top-bg {
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 35% 100%;
  opacity: 1;
}

.ems__top-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 20px 18px;
  box-sizing: border-box;
}

.ems__top-label {
  font-size: 38px;
  font-weight: 700;
  letter-spacing: 2px;
  color: rgba(196, 224, 255, 0.95);
}

.ems__top-value {
  font-size: 38px;
  font-weight: 900;
  letter-spacing: 2px;
  color: #ffffff;
}

.ems__bottom {
  flex: 7;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  align-items: stretch;
}

.ems__card {
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  border-radius: 10px;
  overflow: hidden;
  padding: 8px 18px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 0;
}

.ems__card-label {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 0 14px rgba(0, 0, 0, 0.35);
  line-height: 1.15;
  width: 100%;
  display: flex;
  align-items: center;
  height: 48px;
  justify-content: center;
}

.ems__card-value {
  font-size: 52px;
  font-weight: 900;
  letter-spacing: 2px;
  color: #ffffff;
  text-shadow: 0 0 18px rgba(0, 0, 0, 0.35);
  line-height: 1;
  text-align: center;
}
</style>

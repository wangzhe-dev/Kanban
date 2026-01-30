<template>
  <div class="orp" :style="{ backgroundImage: `url(${bg})` }">
    <div class="orp__grid">
      <div class="orp__item">
        <div class="orp__value">{{ total }}个</div>
        <div class="orp__label">点检合格率</div>

      </div>
      <div class="orp__item">
        <div class="orp__value">{{ online }}个</div>
        <div class="orp__label">设备利用率</div>
      </div>
      <div class="orp__item">
        <div class="orp__value">{{ rate }}</div>
        <div class="orp__label">设备联网率</div>
      </div>
    </div>
  </div>
</template>

<script>
const lc1 = require("@/assets/images/ZN/shebei/lc1.png");

export default {
  name: "OnlineRatePanel",
  props: {
    total: {
      type: [Number, String],
      default: 0,
    },
    online: {
      type: [Number, String],
      default: 0,
    },
    rate: {
      type: [Number, String],
      default: "0%",
    },
  },
  computed: {
    bg() {
      return lc1;
    },
  },
};
</script>

<style scoped>
.orp {
  width: 100%;
  height: 100%;
  min-height: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 22px;
  box-sizing: border-box;
}

.orp__grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  align-items: stretch;
}

.orp__item {
  /* background: rgba(0, 0, 0, 0.22);
  border: 1px solid rgba(64, 213, 255, 0.16);
  border-radius: 12px; */
  padding: 18px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
}

.orp__label {
  font-size: 38px;
  font-weight: 700;
  color: rgba(196, 224, 255, 0.95);
  letter-spacing: 1px;
  text-align: center;
  margin-top: 50px;
}

.orp__value {
  margin-top: -100px;
  font-size: 54px;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 2px;
  text-align: center;
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0 18px rgba(64, 213, 255, 0.35);
}

.orp__item:nth-child(1) .orp__value {
  color: #62bc5c;
}

.orp__item:nth-child(2) .orp__value {
  color: rgb(253, 218, 0);
}

.orp__item:nth-child(3) .orp__value {
  color: rgb(255, 111, 0);
}
</style>

<template>
  <div class="wgrc">
    <div class="wgrc__grid">
      <div class="wgrc__left">
        <div class="wgrc__left-value">
          <span class="wgrc__left-num">{{ displayRatio }}</span>
          <span class="wgrc__left-unit">%</span>
        </div>
        <div class="wgrc__left-title">焊磨比</div>
      </div>
      <div class="wgrc__right">
        <div class="wgrc__item">
          <div class="wgrc__item-left">
            <div class="wgrc__icon-base"></div>
            <div class="wgrc__icon-gif wgrc__icon-gif--zn1"></div>
          </div>
          <div class="wgrc__item-right">
            <div class="wgrc__label">焊接人员出勤工时</div>
            <div class="wgrc__value">
              <span class="wgrc__num">{{ displayWeldingHours }}</span><span class="wgrc__unit">H</span>
            </div>
          </div>
        </div>
         <div class="wgrc__item">
          <div class="wgrc__item-left">
            <div class="wgrc__icon-base"></div>
            <div class="wgrc__icon-gif wgrc__icon-gif--zn1"></div>
          </div>
          <div class="wgrc__item-right">
            <div class="wgrc__label">打磨人员出勤工时</div>
            <div class="wgrc__value">
              <span class="wgrc__num">{{ displayGrindingHours }}</span><span class="wgrc__unit">H</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Mock 数据
const MOCK_DATA = {
  weldingHours: 1250,
  grindingHours: 480,
};

function toNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function formatInt(value) {
  return String(Math.max(0, Math.round(toNumber(value))));
}

function formatRatio(value) {
  const num = toNumber(value);
  return num ? num.toFixed(2) : "0";
}

export default {
  name: "WeldingGrindingRatioCard",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    useMock: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    sourceData() {
      return this.useMock ? MOCK_DATA : this.data;
    },
    weldingHours() {
      return toNumber(this.sourceData?.weldingHours);
    },
    grindingHours() {
      return toNumber(this.sourceData?.grindingHours);
    },
    displayRatio() {
      if (!this.grindingHours) return "0";
      return formatRatio(this.weldingHours / this.grindingHours);
    },
    displayWeldingHours() {
      return formatInt(this.sourceData?.weldingHours);
    },
    displayGrindingHours() {
      return formatInt(this.sourceData?.grindingHours);
    },
  },
};
</script>

<style scoped>
.wgrc {
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  box-sizing: border-box;
  display: flex;
  background-image: url("~@/assets/images/ZN/zn_g_i.png");
}

.wgrc__left {
  flex: 5;
  background-image: url("~@/assets/images/ZN/zn_b.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 50px 100px;
  margin-left: 10px;
}

.wgrc__left-title {
  font-size: 38px;
  font-weight: 900;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 0 16px rgba(64, 213, 255, 0.25);
  margin-bottom: -20px;
}

.wgrc__left-value {
  margin-top: 35px;
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-variant-numeric: tabular-nums;
}

.wgrc__left-num {
  font-size: 68px;
  font-weight: 900;
  letter-spacing: 1px;
  color: rgb(55, 217, 240);
  text-shadow: 0 0 22px rgba(55, 217, 240, 0.35);
}

.wgrc__left-unit {
  font-size: 34px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.85);
}

.wgrc__right {
  flex: 5;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
}
.wgrc__grid {
  display: flex;
  height: 100%;
  width: 100%;
}

.wgrc__item {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.wgrc__item-left {
  position: relative;
  width: 250px;
  height: 100%;
  flex: 0 0 250px;
}

.wgrc__icon-base {
  position: absolute;
  inset: 0;
  background-image: url("~@/assets/images/ZN/zn_dz.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80% 65%;
  margin-bottom: -30px;
}

.wgrc__icon-gif {
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-top: -50px;
  background-size: 50% 50%;
}

.wgrc__icon-gif--zn1 {
  background-image: url("~@/assets/images/ZN/zn_1.gif");
}

.wgrc__item-right {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.wgrc__label {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.88);
  line-height: 1.15;
  display: flex;
  justify-content: flex-start;
   margin-top: 40px;
}

.wgrc__value {
  margin-top: 40px;
  display: flex;
  align-items: baseline;
  gap: 6px;
  justify-content: flex-start;
  font-variant-numeric: tabular-nums;
}

.wgrc__num {
  font-size: 52px;
  font-weight: 900;
  letter-spacing: 1px;
  color: rgb(255, 111, 0);
  text-shadow: 0 0 18px rgba(255, 111, 0, 0.25);
}

.wgrc__unit {
  font-size: 34px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.85);
}
</style>

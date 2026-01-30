<template>
  <div class="sic">
    <div class="sic__left">
      <div class="whc__icon-gif whc__icon-gif--gf"></div>
    </div>
    <div class="sic__right">
      <div class="sic__top">
        <div class="sic__stat">
          <div class="sic__label">抽检合格数</div>
          <div class="sic__value">
            <span class="sic__num">{{ displayQualified }}</span>
            <span class="sic__unit">件</span>
          </div>
        </div>
        <div class="sic__stat">
          <div class="sic__label">抽检次数</div>
          <div class="sic__value">
            <span class="sic__num">{{ displayInspections }}</span>
            <span class="sic__unit">次</span>
          </div>
        </div>
      </div>
      <div class="sic__bottom">
        <div class="sic__label">合格率</div>
        <div class="sic__progress">
          <div class="sic__progress-bar" :style="{ width: `${ratePercent}%` }"></div>
        </div>
        <div class="sic__percent">{{ ratePercent }}%</div>
      </div>
    </div>
  </div>
</template>

<script>
function toNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function formatInt(value) {
  const num = Math.round(toNumber(value));
  return String(Math.max(0, num));
}

function formatRate(value) {
  const num = toNumber(value);
  if (!Number.isFinite(num)) return 0;
  return Math.max(0, Math.min(100, Math.round(num)));
}

export default {
  name: "SamplingInspectionCard",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    displayQualified() {
      return formatInt(this.data && this.data.qualifiedCount);
    },
    displayInspections() {
      return formatInt(this.data && this.data.inspectionCount);
    },
    rateValue() {
      if (this.data && this.data.rate != null) {
        return toNumber(this.data.rate);
      }
      const qualified = toNumber(this.data && this.data.qualifiedCount);
      const total = toNumber(this.data && this.data.totalCount);
      if (!total) return 0;
      return (qualified / total) * 100;
    },
    ratePercent() {
      return formatRate(this.rateValue);
    },
  },
};
</script>

<style scoped>
.sic {
  height: 100%;
  display: flex;
  gap: 16px;
}

.sic__left {
  flex: 3;
  background-image: url("~@/assets/images/ZN/shebei/d22.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.whc__icon-gif--gf {
  width: 50%;
  height: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  background-image: url("~@/assets/images/ZN/zn_gf.gif");
}

.sic__right {
  flex: 7;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  padding: 50px 50px 0 50px;
  box-sizing: border-box;
}

.sic__top {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  align-items: center;
}

.sic__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.sic__label {
  font-size: 38px;
  font-weight: 800;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.88);
  background-image: url("~@/assets/images/ZN/shebei/d23.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  padding: 20px 50px;
}

.sic__value {
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-variant-numeric: tabular-nums;
}

.sic__num {
  font-size: 48px;
  font-weight: 900;
  margin-top: 20px;
  letter-spacing: 1px;
  color: rgb(255, 217, 0);
  text-shadow: 0 0 18px rgba(255, 217, 0, 0.25);
}

.sic__unit {
  font-size: 32px;
  font-weight: 800;
  color: rgb(255, 217, 0);
}

.sic__bottom {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
}

.sic__progress {
  flex: 1;
  height: 18px;
  background: rgba(64, 213, 255, 0.12);
  border: 1px solid rgba(64, 213, 255, 0.3);
  border-radius: 9px;
  overflow: hidden;
  position: relative;
}

.sic__progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #52c41a, #95de64);
  border-radius: 9px;
  transition: width 0.4s ease;
}

.sic__percent {
  min-width: 72px;
  text-align: right;
  font-size: 30px;
  font-weight: 800;
  color: #52c41a;
  font-variant-numeric: tabular-nums;
}
</style>

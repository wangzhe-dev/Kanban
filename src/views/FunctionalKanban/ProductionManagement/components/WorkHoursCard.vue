<template>
  <div class="whc">
    <div class="whc__left">
      <div class="whc__left-value">
        <span class="whc__left-num">{{ displayTotalHours }}</span>
        <span class="whc__left-unit">h</span>
      </div>
      <div class="whc__left-title">出勤总工时</div>
    </div>

    <div class="whc__right">
      <div class="whc__grid">
        <div class="whc__item">
          <div class="whc__item-left">
            <div class="whc__icon-base"></div>
            <div class="whc__icon-gif whc__icon-gif--zn1"></div>
          </div>
          <div class="whc__item-right">
            <div class="whc__label">维保消耗工时</div>
            <div class="whc__value">
              <span class="whc__num">{{ displayMaintenanceHours }}</span><span class="whc__unit">h</span>
            </div>
          </div>
        </div>
        <div class="whc__item">
          <div class="whc__item-left">
            <div class="whc__icon-base"></div>
            <div class="whc__icon-gif whc__icon-gif--gf"></div>
          </div>
          <div class="whc__item-right">
            <div class="whc__label">维保耗材金额</div>
            <div class="whc__value">
              <span class="whc__num">{{ displayMaintenanceCost }}</span><span class="whc__unit">元</span>
            </div>
          </div>
        </div>
        <div class="whc__item">
          <div class="whc__item-left">
            <div class="whc__icon-base"></div>
            <div class="whc__icon-gif whc__icon-gif--zn1"></div>
          </div>
          <div class="whc__item-right">
            <div class="whc__label">打磨人员出勤工时</div>
            <div class="whc__value">
              <span class="whc__num">{{ displayGrindingHours }}</span><span class="whc__unit">h</span>
            </div>
          </div>
        </div>
        <div class="whc__item">
          <div class="whc__item-left">
            <div class="whc__icon-base"></div>
            <div class="whc__icon-gif whc__icon-gif--gf"></div>
          </div>
          <div class="whc__item-right">
            <div class="whc__label">打磨耗材金额</div>
            <div class="whc__value">
              <span class="whc__num">{{ displayGrindingCost }}</span><span class="whc__unit">元</span>
            </div>
          </div>
        </div>
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

function formatMoney(value) {
  const num = Math.round(toNumber(value));
  return String(Math.max(0, num));
}

export default {
  name: "WorkHoursCard",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    displayTotalHours() {
      return formatInt(this.data && this.data.totalAttendanceHours);
    },
    displayMaintenanceHours() {
      return formatInt(this.data && this.data.maintenanceHours);
    },
    displayMaintenanceCost() {
      return formatMoney(this.data && this.data.maintenanceConsumablesAmount);
    },
    displayGrindingHours() {
      return formatInt(this.data && this.data.grindingAttendanceHours);
    },
    displayGrindingCost() {
      return formatMoney(this.data && this.data.grindingConsumablesAmount);
    },
  },
};
</script>

<style scoped>
.whc {
  height: 100%;
  display: flex;
  gap: 16px;
}

.whc__left {
  flex: 3;
  background-image: url("~@/assets/images/ZN/zn_b.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.whc__left-title {
  margin-top: 15px;
  font-size: 30px;
  font-weight: 900;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 0 16px rgba(64, 213, 255, 0.25);
  margin-bottom: -20px;
}

.whc__left-value {
  margin-top: 15px;
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-variant-numeric: tabular-nums;
}

.whc__left-num {
  font-size: 68px;
  font-weight: 900;
  letter-spacing: 1px;
  color: rgb(55, 217, 240);
  text-shadow: 0 0 22px rgba(55, 217, 240, 0.35);
}

.whc__left-unit {
  font-size: 34px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.85);
}

.whc__right {
  flex: 7;
  background-image: url("~@/assets/images/ZN/zn_g_i.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  padding: 18px 22px;
  box-sizing: border-box;
  display: flex;
}

.whc__grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 16px 18px;
}

.whc__item {
  padding: 0 18px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 14px;
  justify-content: space-between;
}

.whc__item-left {
  position: relative;
  width: 150px;
  height: 100%;
  flex: 0 0 150px;
}

.whc__icon-base {
  position: absolute;
  inset: 0;
  background-image: url("~@/assets/images/ZN/zn_dz.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 50%;
  margin-bottom: -30px;
}

.whc__icon-gif {
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-top: -50px;
  background-size: 50% 50%;
}

.whc__icon-gif--zn1 {

  background-image: url("~@/assets/images/ZN/zn_1.gif");
}

.whc__icon-gif--gf {
  background-image: url("~@/assets/images/ZN/zn_gf.gif");
}

.whc__item-right {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.whc__label {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.88);
  line-height: 1.15;
  display: flex;
  justify-content: flex-start;
}

.whc__value {
  margin-top: 10px;
  display: flex;
  align-items: baseline;
  gap: 6px;
  justify-content: flex-start;
  font-variant-numeric: tabular-nums;
}

.whc__num {
  font-size: 42px;
  font-weight: 900;
  letter-spacing: 1px;
  color: rgb(255, 111, 0);
  text-shadow: 0 0 18px rgba(255, 111, 0, 0.25);
}

.whc__unit {
  font-size: 28px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.85);
}
</style>

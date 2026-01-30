<template>
  <div class="production-overview">
    <div class="production-overview-top">
      <div class="inventory-middle-panel__stat">
        <div class="inventory-total">
          <div class="inventory-total__label">计划完成率</div>
          <div class="inventory-total__value">
            {{ overallRate }}<span class="inventory-total__unit">%</span>
          </div>
        </div>
      </div>
      <div class="logistics-kpi" :style="{ backgroundImage: `url(${logisticsTopBg})` }">
        <div class="logistics-kpi__grid">
          <div v-for="(item, index) in logisticsKpis" :key="item.key || index"
            :class="['logistics-kpi__item', `item-${index}`]">
            <div class="logistics-kpi__value" :style="{ color: kpiColors[index] }">{{ item.value }}%</div>
            <div class="logistics-kpi__label">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="production-overview-bottom">
      <div class="df-table-container">
        <table class="df-table df-table-header">
          <colgroup>
            <col style="width: 39%" />
            <col style="width: 11%" />
            <col style="width: 25%" />
            <col style="width: 25%" />
          </colgroup>
          <thead>
            <tr>
              <th>产线名称(产成品)</th>
              <th>计划量</th>
              <th>完成量</th>
              <th>完成率</th>
            </tr>
          </thead>
        </table>

        <div class="df-table-wrapper">
          <div class="df-scroll-content">
            <table class="df-table df-table-body">
              <colgroup>
                <col style="width: 39%" />
                <col style="width: 11%" />
                <col style="width: 25%" />
                <col style="width: 25%" />
              </colgroup>
              <tbody>
                <tr v-for="(row, index) in rows" :key="row.name || index">
                  <td class="cell-line">{{ row.name || "-" }}</td>
                  <td class="cell-plan">{{ formatQty(row.plan) }}</td>
                  <td class="cell-actual">{{ formatQty(row.actual) }}</td>
                  <td class="cell-rate">
                    <div class="progress-bar-wrapper">
                      <div class="progress-bar" :class="rateClass(row)" :style="{ width: (getRateValue(row) || 0) + '%' }"></div>
                      <span class="progress-label">{{ formatRate(row) }}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductionOverview",
  props: {
    logisticsTopBg: {
      type: String,
      default: "",
    },
    logisticsKpis: {
      type: Array,
      default: () => [],
    },
    kpiColors: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    overallRate() {
      const data = this.rows || [];
      const totals = data.reduce(
        (acc, item) => {
          const plan = Number(item.plan);
          const actual = Number(item.actual);
          if (Number.isFinite(plan) && plan > 0) acc.plan += plan;
          if (Number.isFinite(actual) && actual >= 0) acc.actual += actual;
          return acc;
        },
        { plan: 0, actual: 0 }
      );
      if (!totals.plan) return 0;
      return Math.max(0, Math.min(100, Math.round((totals.actual / totals.plan) * 100)));
    },
  },
  methods: {
    formatQty(value) {
      const num = Number(value);
      if (!Number.isFinite(num)) return "-";
      return num.toLocaleString("zh-CN");
    },
    getRateValue(row) {
      if (!row) return null;
      const plan = Number(row.plan);
      const actual = Number(row.actual);
      if (!Number.isFinite(plan) || plan <= 0 || !Number.isFinite(actual)) return null;
      const rate = Math.round((actual / plan) * 100);
      return Math.max(0, Math.min(100, rate));
    },
    formatRate(row) {
      const value = this.getRateValue(row);
      return value === null ? "-" : `${value}%`;
    },
    rateClass(row) {
      const value = this.getRateValue(row);
      if (value === null) return "rate-unknown";
      if (value >= 90) return "rate-high";
      if (value >= 80) return "rate-mid";
      return "rate-low";
    },
  },
};
</script>

<style scoped>
@import "../../../DigitalFusion/styles/table.css";

.production-overview {
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 100%;
}

.production-overview-top {
  flex: 3;
  display: flex;
  min-width: 0;
  min-height: 0;
}

.logistics-kpi {
  flex: 8;
  min-width: 0;
  min-height: 0;
  height: 100%;
  display: flex;
  align-items: stretch;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  border-radius: 12px;
  padding: 12px;
  box-sizing: border-box;
}

.logistics-kpi__grid {
  flex: 2;
  min-width: 0;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  align-items: stretch;
}

.logistics-kpi__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  min-width: 0;
}

.logistics-kpi__label {
  font-size: 30px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
  letter-spacing: 0.5px;
  margin: 0 0 30px 0;
}

.logistics-kpi__value {
  font-size: 52px;
  font-weight: 900;
  color: #69c0ff;
  margin:10px 0 20px 0;
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0 18px rgba(105, 192, 255, 0.35);
}

.inventory-middle-panel__stat {
  flex: 2;
  min-width: 0;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inventory-total {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  background-image: url("../../../../assets/images/cx/icon-底座@2x.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.inventory-total__label {
  position: absolute;
  bottom: -5%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
}

.inventory-total__value {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 52px;
  font-weight: 900;
  color: #ffd700;
  text-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 4px 20px rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.inventory-total__unit {
  font-size: 28px;
  font-weight: 800;
  color: #ffd700;
}

.production-overview-bottom {
  flex: 7;
  min-height: 0;
  margin-top: 10px;
  box-sizing: border-box;
}
.df-table-container{
  padding: 50px 0 0 0;
}
.production-overview-bottom .df-table td.cell-line {
  white-space: normal;
  line-height: 1.3;
}

.production-overview-bottom .df-table td.cell-plan {
  color: rgba(255, 174, 0, 0.95);
}

.production-overview-bottom .df-table td.cell-actual {
  color: rgba(0, 216, 255, 0.95);
}

.production-overview-bottom .df-table td.cell-rate {
  color: rgba(255, 255, 255, 0.9);
  padding: 0 12px;
}

.progress-bar-wrapper {
  position: relative;
  width: 100%;
  height: 38px;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 19px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-bar {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  border-radius: 19px;
  transition: width 0.4s ease-in-out, background-color 0.4s ease;
}

.progress-label {
  position: relative;
  z-index: 1;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
}

.progress-bar.rate-high {
  background-color: #00e676;
  box-shadow: 0 0 16px rgba(0, 230, 118, 0.35);
}

.progress-bar.rate-mid {
  background-color: #ffca28;
  box-shadow: 0 0 16px rgba(255, 202, 40, 0.3);
}

.progress-bar.rate-low {
  background-color: #ff5252;
  box-shadow: 0 0 16px rgba(255, 82, 82, 0.3);
}

.progress-bar.rate-unknown {
  background-color: transparent;
}

.production-overview-bottom .df-table th,
.production-overview-bottom .df-table td {
  font-size: 32px;
}

.production-overview-bottom .df-table th:first-child,
.production-overview-bottom .df-table td:first-child {
  text-align: left;
}

</style>

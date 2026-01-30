<template>
  <div class="sco">
    <div class="sco__top">
      <div v-for="item in topStats" :key="item.key" class="sco__top-item">
        <div class="sco__top-icon" :class="`is-${item.key}`"></div>
        <div class="sco__top-content">
          <div class="sco__top-label">{{ item.label }}</div>
          <div class="sco__top-value" :class="`is-${item.key}`">{{ item.value }}</div>
        </div>
      </div>
    </div>

    <div class="sco__grid">
      <div v-for="(item, index) in metrics" :key="item.key" class="sco__metric"
        :class="index % 2 === 0 ? 'is-left' : 'is-right'">
        <div class="sco__metric-label">{{ item.label }}</div>
        <div class="sco__metric-value">
          <span class="sco__metric-num">{{ item.value }}</span>
          <span v-if="item.unit" class="sco__metric-unit">{{ item.unit }}</span>
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

function formatNumber(value) {
  const num = toNumber(value);
  if (!Number.isFinite(num)) return "0";
  if (Math.abs(num) >= 1000) return String(Math.round(num));
  return String(Math.round(num * 10) / 10);
}

const defaultData = {
  people: {
    total: 156,
    construction: 132,
    management: 24,
  },
  metrics: [
    { label: "下料预制全员人均吨位", value: 3.6, unit: "t/人" },
    { label: "分段建造全员人均吨位", value: 2.8, unit: "t/人" },
    { label: "分段建造平均吨位工时", value: 1.9, unit: "h/t" },
    { label: "分段胎架面积产能", value: 6.2, unit: "t/㎡" },
    { label: "分段在胎周期", value: 4.5, unit: "天" },
    { label: "平均胎架周转率", value: 86, unit: "%" },
  ],
};

export default {
  name: "SegmentCapacityOverview",
  props: {
    data: {
      type: Object,
      default: () => defaultData,
    },
  },
  computed: {
    topStats() {
      const people = (this.data && this.data.people) || {};
      return [
        { key: "total", label: "人员总数", value: formatNumber(people.total) },
        { key: "construction", label: "施工人员", value: formatNumber(people.construction) },
        { key: "management", label: "管理人员", value: formatNumber(people.management) },
      ];
    },
    metrics() {
      const list = Array.isArray(this.data && this.data.metrics) ? this.data.metrics : [];
      return list.slice(0, 6).map((raw, index) => ({
        key: (raw && raw.key != null ? raw.key : null) || `${index}-${raw && raw.label ? raw.label : "metric"}`,
        label: (raw && raw.label) || "-",
        value: raw && raw.value != null ? formatNumber(raw.value) : "0",
        unit: raw && raw.unit ? String(raw.unit) : "",
      }));
    },
  },
};
</script>

<style scoped>
.sco {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sco__top {
  flex: 2;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.sco__top-item {
  border-radius: 10px;
  background: rgba(6, 22, 48, 0.18);
  border: 1px solid rgba(64, 213, 255, 0.16);
  padding: 12px 14px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 90px;
}

.sco__top-icon {
  width: 150px;
  height: 100px;
  flex: 0 0 150px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
}

.sco__top-icon.is-total {
  background-image: url("~@/assets/images/ZN/zn_g.png");
}

.sco__top-icon.is-construction {
  background-image: url("~@/assets/images/ZN/zn_y.png");
}

.sco__top-icon.is-management {
  background-image: url("~@/assets/images/ZN/zn_h.png");
}

.sco__top-content {
  /* flex: 1; */
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.sco__top-value {
  font-size: 48px;
  font-weight: 900;
  letter-spacing: 1px;
  color: rgb(55, 217, 240);
  text-shadow: 0 0 18px rgba(55, 217, 240, 0.25);
  font-variant-numeric: tabular-nums;
}

.sco__top-value.is-total {
  color: rgb(129, 216, 208);
  text-shadow: 0 0 18px rgba(129, 216, 208, 0.25);
}

.sco__top-value.is-construction {
  color: rgb(255, 217, 0);
  text-shadow: 0 0 18px rgba(255, 217, 0, 0.25);
}

.sco__top-value.is-management {
  color: rgb(255, 111, 0);
  text-shadow: 0 0 18px rgba(255, 111, 0, 0.25);
}

.sco__top-label {
  margin-top: 6px;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.88);
}

.sco__grid {
  flex: 8;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: 16px 18px;
  min-height: 0;
}

.sco__metric {
  border-radius: 10px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  align-items: center;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  overflow: hidden;
}

.sco__metric.is-left {
  background-image: url("~@/assets/images/ZN/zn_i_r_b.png");
}

.sco__metric.is-right {
  background-image: url("~@/assets/images/ZN/zn_i_r_b.png");
}

.sco__metric-label {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.15;
}

.sco__metric-value {
  margin-top: 10px;
  display: flex;
  align-items: baseline;
  gap: 8px;
  justify-content: flex-end;
  font-variant-numeric: tabular-nums;
}

.sco__metric-num {
  font-size: 44px;
  font-weight: 900;
  letter-spacing: 1px;
  color: rgb(255, 111, 0);
  text-shadow: 0 0 18px rgba(255, 111, 0, 0.25);
}

.sco__metric.is-left .sco__metric-num {
  color: rgb(129, 216, 208);
  text-shadow: 0 0 18px rgba(129, 216, 208, 0.25);
}

.sco__metric.is-right .sco__metric-num {
  color: rgb(255, 217, 0);
  text-shadow: 0 0 18px rgba(255, 217, 0, 0.25);
}

.sco__metric-unit {
  font-size: 26px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.85);
}

.sco__metric.is-left .sco__metric-unit {
  color: rgb(129, 216, 208);
}

.sco__metric.is-right .sco__metric-unit {
  color: rgb(255, 217, 0);
}
</style>

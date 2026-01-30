<template>
  <div class="mwop">
    <div class="mwop__grid">
      <div v-for="item in normalizedItems" :key="item.key" class="mwop__item">
        <div class="mwop__name" :title="item.name">{{ item.name }}</div>
        <div class="mwop__meta">
          <div class="mwop__meta-row">
            <span class="mwop__meta-label">本月实际工单</span>
            <span class="mwop__meta-val mwop__meta-val--actual">{{ item.actualOrders }}</span>
          </div>
          <div class="mwop__meta-row">
            <span class="mwop__meta-label">本月计划工单</span>
            <span class="mwop__meta-val mwop__meta-val--plan">{{ item.planOrders }}</span>
          </div>
        </div>

        <div class="mwop__value">
          <div class="mwop__bar">
            <div class="mwop__bar-fill" :class="item.levelClass" :style="{ width: item.displayValue + '%' }"></div>
          </div>
          <div class="mwop__bar-text">{{ item.displayValue }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const defaultItems = [
  { name: "钢板预处理线", actualOrders: 86, planOrders: 95 },
  { name: "型材预处理线", actualOrders: 78, planOrders: 92 },
  { name: "钢板下料分拣智能产线", actualOrders: 64, planOrders: 80 },
  { name: "型材下料智能产线", actualOrders: 58, planOrders: 75 },
  { name: "小组立智能产线", actualOrders: 88, planOrders: 96 },
  { name: "T型材智能产线", actualOrders: 60, planOrders: 74 },
  { name: "片体拼板智能产线", actualOrders: 55, planOrders: 70 },
  { name: "平直分段智能产线", actualOrders: 68, planOrders: 82 },
];

function clampPercent(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return 0;
  return Math.max(0, Math.min(100, Math.round(num)));
}

function toNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

export default {
  name: "MonthlyWorkOrderProgress",
  props: {
    items: {
      type: Array,
      default: () => defaultItems,
    },
  },
  computed: {
    normalizedItems() {
      const list = Array.isArray(this.items) ? this.items : [];
      return list.slice(0, 8).map((raw, index) => {
        const name = raw && raw.name ? String(raw.name) : "-";
        const actualOrders = Math.max(0, Math.round(toNumber(raw && raw.actualOrders)));
        const planOrders = Math.max(0, Math.round(toNumber(raw && raw.planOrders)));
        const displayValue = clampPercent(planOrders > 0 ? (actualOrders / planOrders) * 100 : 0);

        let levelClass = "is-mid";
        if (displayValue >= 90) levelClass = "is-high";
        else if (displayValue >= 80) levelClass = "is-mid";
        else levelClass = "is-low";

        return {
          key: raw && raw.key != null ? raw.key : `${name}-${index}`,
          name,
          actualOrders,
          planOrders,
          displayValue,
          levelClass,
        };
      });
    },
  },
};
</script>

<style scoped>
.mwop {
  height: 100%;
  /* padding: 22px 22px 18px; */
  box-sizing: border-box;
  background-image: url("~@/assets/images/ZN/zn_i_bg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
}

.mwop__grid {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 0 6px;
}

.mwop__item {
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  /* border-radius: 10px; */
  /* background: rgba(6, 22, 48, 0.18); */
  /* border: 1px solid rgba(64, 213, 255, 0.16); */
}

.mwop__meta {
  /* margin-top: 6px; */
  padding: 0 6px;
  display: grid;
  gap: 6px;
}

.mwop__meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.mwop__meta-label {
  font-size: 22px;
  color: rgba(255, 255, 255, 0.78);
  letter-spacing: 1px;
  white-space: nowrap;
}

.mwop__meta-val {
  font-size: 24px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

.mwop__name {
  padding: 0px 6px 0 6px;
  font-size: 26px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.92);
  letter-spacing: 1px;
  /* line-height: 1.2; */
  /* text-align: center; */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2em;
}

.mwop__meta-val--actual {
  color: rgb(255, 111, 0);
}

.mwop__meta-val--plan {
  color: rgb(55, 217, 240);
}

.mwop__value {
  margin-top: auto;
  padding: 0px 6px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.mwop__bar {
  flex: 1;
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  overflow: hidden;
}

.mwop__bar-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.6s ease;
}

.mwop__bar-text {
  width: 74px;
  text-align: right;
  font-size: 24px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.92);
  font-variant-numeric: tabular-nums;
}

.is-high.mwop__bar-fill {
  background: linear-gradient(90deg, rgba(76, 217, 100, 0.25), rgba(76, 217, 100, 0.92));
}

.is-mid.mwop__bar-fill {
  background: linear-gradient(90deg, rgba(64, 213, 255, 0.25), rgba(64, 213, 255, 0.92));
}

.is-low.mwop__bar-fill {
  background: linear-gradient(90deg, rgba(255, 179, 64, 0.25), rgba(255, 179, 64, 0.92));
}
</style>

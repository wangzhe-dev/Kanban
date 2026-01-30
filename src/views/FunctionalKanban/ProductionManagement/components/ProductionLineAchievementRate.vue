<template>
  <div class="plar">
    <div
      v-for="item in normalizedItems"
      :key="item.key"
      class="plar__item"
    >
      <div class="plar__value" :class="[item.levelClass, item.rowClass]" :style="{ backgroundImage: `url(${item.bgImage})` }">
        <span class="plar__value-num">{{ item.displayValue }}</span><span class="plar__value-unit">%</span>
      </div>

      <div class="plar__name" :title="item.name">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
const row1Bg = require("@/assets/images/ZN/item_bg_l.png");
const row2Bg = require("@/assets/images/ZN/item_bg_h.png");

const defaultItems = [
  { name: "钢板预处理线", value: 92 },
  { name: "型材预处理线", value: 88 },
  { name: "钢板下料分拣智能产线", value: 86 },
  { name: "型材下料智能产线", value: 84 },
  { name: "小组立智能产线", value: 90 },
  { name: "T型材智能产线", value: 82 },
  { name: "片体拼板智能产线", value: 79 },
  { name: "平直分段智能产线", value: 85 },
];

function clampPercent(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return 0;
  return Math.max(0, Math.min(100, Math.round(num)));
}

export default {
  name: "ProductionLineAchievementRate",
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
        const displayValue = clampPercent(raw && raw.value);
        const bgImage = index < 4 ? row1Bg : row2Bg;
        const rowClass = index < 4 ? "is-row1" : "is-row2";

        let levelClass = "is-mid";
        if (displayValue >= 90) levelClass = "is-high";
        else if (displayValue >= 80) levelClass = "is-mid";
        else levelClass = "is-low";

        return {
          key: raw && raw.key != null ? raw.key : `${name}-${index}`,
          name,
          displayValue,
          levelClass,
          rowClass,
          bgImage,
        };
      });
    },
  },
};
</script>

<style scoped>
.plar {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 16px 18px;
}

.plar__item {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.plar__name {
  margin-top: auto;
  padding: 0 22px;
  font-size: 26px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.92);
  letter-spacing: 1px;
  line-height: 1.2;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.4em;
}

.plar__value {
  flex: 0 0 auto;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 2px;
  font-variant-numeric: tabular-nums;
  padding: 18px 22px 18px;
  min-height: 96px;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
}

.plar__value-num {
  font-size: 44px;
  font-weight: 900;
  letter-spacing: 1px;
  text-shadow: 0 0 16px rgba(64, 213, 255, 0.35);
}

.plar__value-unit {
  font-size: 26px;
  font-weight: 700;
  opacity: 0.9;
}

.is-high .plar__value-num {
  background: linear-gradient(180deg, #c2ffd0 0%, #4cd964 60%, #22b455 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.is-mid .plar__value-num {
  background: linear-gradient(180deg, #d2f2ff 0%, #40d5ff 60%, #188dd8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.is-low .plar__value-num {
  background: linear-gradient(180deg, #ffe7c2 0%, #ffb340 60%, #ff7a00 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.is-row1 .plar__value-num,
.is-row1 .plar__value-unit {
  background: none;
  -webkit-text-fill-color: rgb(55, 217, 240);
  color: rgb(55, 217, 240);
  text-shadow: 0 0 16px rgba(55, 217, 240, 0.35);
}

.is-row2 .plar__value-num,
.is-row2 .plar__value-unit {
  background: none;
  -webkit-text-fill-color: rgb(255, 217, 0);
  color: rgb(255, 217, 0);
  text-shadow: 0 0 16px rgba(255, 217, 0, 0.35);
}
</style>

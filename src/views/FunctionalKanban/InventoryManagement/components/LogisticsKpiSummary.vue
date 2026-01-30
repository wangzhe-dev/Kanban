<template>
  <div class="lks">
    <div v-for="(item, index) in cards" :key="item.key" class="lks__card" :style="{ backgroundImage: `url(${item.bg})` }">
      <div class="lks__value" :style="{ color: colors[index] }">{{ formatValue(item.value) }}</div>
      <div class="lks__label">{{ item.label }}</div>
    </div>
  </div>
</template>

<script>
const d1 = require("@/assets/images/ZN/shebei/d1.png");
const d2 = require("@/assets/images/ZN/shebei/d2.png");
const d3 = require("@/assets/images/ZN/shebei/d3.png");
const d4 = require("@/assets/images/ZN/shebei/d4.png");

export default {
  name: "LogisticsKpiSummary",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      colors: [
        "rgb(255, 153, 0)",
        "rgb(8, 234, 223)",
        "rgb(255, 217, 0)",
        "rgb(255, 111, 0)",
        "rgb(129, 216, 208)",
      ],
    };
  },
  computed: {
    cards() {
      const list = Array.isArray(this.items) ? this.items : [];
      const backgrounds = [d1, d2, d3, d4, d4];
      const fallbackBg = backgrounds[backgrounds.length - 1];

      return list.filter(Boolean).map((raw, index) => ({
        key: raw.key != null ? raw.key : `kpi-${index}`,
        label: raw.label != null ? String(raw.label) : "-",
        value: raw.value != null ? raw.value : "-",
        bg: backgrounds[index] || fallbackBg,
      }));
    },
  },
  methods: {
    formatValue(value) {
      if (value === null || value === undefined || value === "") return "-";
      const str = String(value);
      return str.includes("%") ? str : `${str}%`;
    },
  },
};
</script>

<style scoped>
.lks {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 18px;
  align-items: stretch;
}

.lks__card {
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
  justify-content: space-around;
  min-height: 0;
}

.lks__label {
  font-size: 30px;
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
  text-align: center;
}

.lks__value {
  font-size: 52px;
  font-weight: 900;
  letter-spacing: 2px;
  color: #ffffff;
  text-shadow: 0 0 18px rgba(0, 0, 0, 0.35);
  line-height: 1;
  text-align: center;
}
</style>

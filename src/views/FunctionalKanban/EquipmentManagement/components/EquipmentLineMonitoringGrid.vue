<template>
  <div class="elmg">
    <div class="elmg__grid">
      <div
        v-for="item in normalizedItems"
        :key="item.key"
        class="elmg__item"
        role="button"
        tabindex="0"
        :style="{ backgroundImage: `url(${item.bgImage})` }"
        @click="openRoute(item)"
        @keydown.enter.prevent="openRoute(item)"
        @keydown.space.prevent="openRoute(item)"
      >
        <div class="elmg__label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
const zngbkBg = require("@/assets/images/ZN/zngbk.png");
const yclcxBg = require("@/assets/images/ZN/yclcx.png");
const gbxlBg = require("@/assets/images/ZN/gbxl.png");
const xcxlBg = require("@/assets/images/ZN/xcxl.png");
const xzlBg = require("@/assets/images/ZN/xzl.png");
const txcBg = require("@/assets/images/ZN/txc.png");
const pzfdBg = require("@/assets/images/ZN/pzfd.png");
const ptpbBg = require("@/assets/images/ZN/ptpb.png");
const defaultBg = require("@/assets/images/ZN/item_bg_l.png");

const orderedBgs = [zngbkBg, yclcxBg, gbxlBg, xcxlBg, xzlBg, txcBg, pzfdBg, ptpbBg];

const defaultItems = [
  { label: "西部车间智控中心", routeName: "", bgImage: orderedBgs[0] },
  { label: "钢板料理间", routeName: "", bgImage: orderedBgs[1] },
  { label: "钢板下料分拣", routeName: "", bgImage: orderedBgs[2] },
  { label: "激光切割区监控", routeName: "", bgImage: orderedBgs[3] },
  { label: "激光分拣区监控", routeName: "", bgImage: orderedBgs[4] },
  { label: "DIG型材线", routeName: "", bgImage: orderedBgs[5] },
  { label: "智能T排焊接", routeName: "", bgImage: orderedBgs[6] },
  { label: "智能小组立焊接", routeName: "", bgImage: orderedBgs[7] },
  { label: "智能分段焊接", routeName: "", bgImage: orderedBgs[0] },
];

export default {
  name: "EquipmentLineMonitoringGrid",
  props: {
    items: {
      type: Array,
      default: () => defaultItems,
    },
  },
  computed: {
    normalizedItems() {
      const list = Array.isArray(this.items) ? this.items : [];
      return list.slice(0, 12).map((raw, index) => {
        const label = raw && raw.label ? String(raw.label) : "-";
        const routeName = raw && raw.routeName ? String(raw.routeName) : "";
        const fallbackBg = orderedBgs.length ? orderedBgs[index % orderedBgs.length] : defaultBg;
        const bgImage = (raw && raw.bgImage) || fallbackBg || defaultBg;

        return {
          key: (raw && raw.key != null ? raw.key : null) || `${routeName || label}-${index}`,
          label,
          routeName,
          bgImage,
        };
      });
    },
  },
  methods: {
    openRoute(item) {
      if (!item || !item.routeName) return;
      const resolved = this.$router && this.$router.resolve ? this.$router.resolve({ name: item.routeName }) : null;
      const href = resolved && resolved.href ? resolved.href : "";
      if (!href) return;

      const win = window.open(href, "_blank");
      if (win) win.opener = null;
    },
  },
};
</script>

<style scoped>
.elmg {
  height: 100%;
}

.elmg__grid {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px 18px;
  align-content: start;
}

.elmg__item {
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px 24px;
  box-sizing: border-box;
  min-height: 128px;
  outline: none;
}

.elmg__item::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(70% 60% at 50% 30%, rgba(255, 255, 255, 0.1), transparent 60%);
  pointer-events: none;
}

.elmg__item:hover {
  filter: brightness(1.05);
}

.elmg__item:active {
  transform: translateY(1px);
}

.elmg__label {
  position: relative;
  z-index: 1;
  font-size: 28px;
  font-weight: 900;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 0 18px rgba(64, 213, 255, 0.35);
  text-align: center;
  line-height: 1.15;
  margin-left: 85px;
}

@media (max-width: 1400px) {
  .elmg__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .elmg__grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>

<template>
  <div class="frg">
    <div class="frg__grid">
      <div
        v-for="item in normalizedItems"
        :key="item.key"
        class="frg__item"
        role="button"
        tabindex="0"
        :style="{ backgroundImage: `url(${item.bgImage})` }"
        @click="openRoute(item)"
        @keydown.enter.prevent="openRoute(item)"
        @keydown.space.prevent="openRoute(item)"
      >
        <div class="frg__label">{{ item.label }}</div>
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

const defaultItems = [
  { label: "智能钢板库", routeName: "SmartSteelPlateLibrary", bgImage: zngbkBg },
  { label: "预处理产线", routeName: "PreProcessingLine", bgImage: yclcxBg },
  { label: "钢板下料", routeName: "SteelPlateCutting", bgImage: gbxlBg },
  { label: "型材下料", routeName: "ProfileCutting", bgImage: xcxlBg },
  { label: "T型材", routeName: "TProfile", bgImage: txcBg },
  { label: "小组立", routeName: "SmallAssembly", bgImage: xzlBg },
  { label: "片体拼板", routeName: "PanelAssembly", bgImage: ptpbBg },
  { label: "平直分段", routeName: "StraightSection", bgImage: pzfdBg },
];

export default {
  name: "FusionRouterGrid",
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
        const bgImage = (raw && raw.bgImage) || defaultBg;

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
.frg {
  height: 100%;
}

.frg__grid {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px 18px;
  align-content: start;
}

.frg__item {
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

.frg__item::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(70% 60% at 50% 30%, rgba(255, 255, 255, 0.10), transparent 60%);
  pointer-events: none;
}

.frg__item:hover {
  filter: brightness(1.05);
}

.frg__item:active {
  transform: translateY(1px);
}

.frg__label {
  position: relative;
  z-index: 1;
  font-size: 38px;
  font-weight: 900;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 0 18px rgba(64, 213, 255, 0.35);
  text-align: center;
  line-height: 1.15;
  margin-left: 50px;
}

@media (max-width: 1400px) {
  .frg__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .frg__grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>

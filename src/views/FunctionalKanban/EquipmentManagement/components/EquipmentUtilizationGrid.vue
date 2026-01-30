<template>
  <div class="eug">
    <div class="eug__col">
      <div v-for="item in leftItems" :key="item.key" class="eug__item" :style="{ backgroundImage: `url(${bg})` }">
        <div class="eug__item-inner">
          <div class="eug__item-left">
            <div class="eug__line">{{ item.line }}</div>
            <div class="eug__meta">已用设备 <span class="eug__num">{{ item.used }}</span>个</div>
          </div>
          <div class="eug__item-right">
            <div class="eug__meta">设备利用率 <span class="eug__rate">{{ formatRate(item.used, item.total) }}</span></div>
            <div class="eug__meta">总可用设备 <span class="eug__num">{{ item.total }}</span>个</div>
          </div>
        </div>
      </div>
    </div>

    <div class="eug__col">
      <div v-for="item in rightItems" :key="item.key" class="eug__item" :style="{ backgroundImage: `url(${bg})` }">
        <div class="eug__item-inner">
          <div class="eug__item-left">
            <div class="eug__line">{{ item.line }}</div>
            <div class="eug__meta">已用设备 <span class="eug__num">{{ item.used }}</span>个</div>
          </div>
          <div class="eug__item-right">
            <div class="eug__meta">设备利用率 <span class="eug__rate">{{ formatRate(item.used, item.total) }}</span></div>
            <div class="eug__meta">总可用设备 <span class="eug__num">{{ item.total }}</span>个</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const bg = require("@/assets/images/ZN/shebei/r1.png");

export default {
  name: "EquipmentUtilizationGrid",
  props: {
    leftItems: {
      type: Array,
      default: () => [],
    },
    rightItems: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    bg() {
      return bg;
    },
  },
  methods: {
    formatRate(used, total) {
      const u = Number(used || 0);
      const t = Number(total || 0);
      if (!t) return "0%";
      const pct = Math.round((u / t) * 100);
      return `${pct}%`;
    },
  },
};
</script>

<style scoped>
.eug {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  gap: 10px;
}

.eug__col {
  flex: 5;
  min-width: 0;
  display: grid;
  grid-template-rows: repeat(4, minmax(0, 1fr));
}

.eug__item {
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  min-height: 0;
}

.eug__item-inner {
  width: 100%;
  display: flex;
  gap: 18px;
  align-items: center;
  min-width: 0;
}

.eug__item-left,
.eug__item-right {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 65px;
  gap: 10px;
}

.eug__line {
  font-size: 24px;
  font-weight: 900;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.95);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.eug__meta {
  font-size: 26px;
  font-weight: 700;
  color: rgba(196, 224, 255, 0.95);
  display: flex;
  align-items: baseline;
  gap: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.eug__num {
  font-size: 26px;
  font-weight: 900;
  color: #ffffff;
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0 14px rgba(64, 213, 255, 0.25);
}

.eug__rate {
  font-size: 26px;
  font-weight: 900;
  color: rgba(105, 192, 255, 1);
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0 14px rgba(64, 213, 255, 0.25);
}
</style>

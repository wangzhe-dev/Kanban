<template>
  <div class="df-main-layout">
    <TimeDisplay />
    <div class="weather-display">
      <SmartWeatherBar />
    </div>
    <TabNavigation v-if="showNavigation" :activeTab="activeTab" :autoRotate="autoRotate"
      :rotateInterval="rotateInterval" @tab-click="handleTabClick" />

    <main class="main-content" :class="{ 'no-navigation': !showNavigation }" :style="columnWidthVars">
      <!-- Left Column -->
      <div class="column column--left">
        <slot name="left-top"></slot>
        <slot name="left-middle"></slot>
        <slot name="left-bottom"></slot>
        <slot name="left"></slot>
      </div>

      <!-- Center Column -->
      <div class="column column--center">
        <slot name="center-top"></slot>
        <slot name="center-middle"></slot>
        <slot name="center-bottom"></slot>
        <slot name="center"></slot>
      </div>

      <!-- Right Column -->
      <div class="column column--right">
        <slot name="right-top"></slot>
        <slot name="right-middle"></slot>
        <slot name="right-bottom"></slot>
        <slot name="right"></slot>
      </div>
    </main>
  </div>
</template>

<script>
import TabNavigation from "./TabNavigation.vue";
import TimeDisplay from "./TimeDisplay.vue";
import SmartWeatherBar from "./SmartWeatherBar.vue";

export default {
  name: "MainLayout",
  components: {
    TimeDisplay,
    TabNavigation,
    SmartWeatherBar,
  },
  props: {
    activeTab: {
      type: String,
      default: "",
    },
    showNavigation: {
      type: Boolean,
      default: true,
    },
    centerWidth: {
      type: [Number, String],
      default: 55, // 默认 55%
    },
    autoRotate: {
      type: Boolean,
      default: false,
    },
    rotateInterval: {
      type: Number,
      default: 10000,
    },
  },
  computed: {
    columnWidthVars() {
      // 将 centerWidth 转换为数字（去掉 % 符号）
      const center = typeof this.centerWidth === 'string'
        ? parseFloat(this.centerWidth)
        : this.centerWidth;

      // 计算左右列的宽度：(100% - center) / 2
      const side = (100 - center) / 2;

      return {
        '--column-left-width': `${side}%`,
        '--column-center-width': `${center}%`,
        '--column-right-width': `${side}%`,
      };
    },
  },
  methods: {
    handleTabClick(route) {
      this.$emit("tab-click", route);
    },
  },
};
</script>

<style scoped>
.df-main-layout {
  width: 100%;
  height: 100%;
  position: relative;
}

.weather-display {
  position: absolute;
  top: 89px;
  right: 71px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

/* Main Content Layout */
.main-content {
  position: absolute;
  top: 350px;
  /* Scaled from 146px: 146 × 2.3974 = 350px */
  left: 120px;
  right: 120px;
  bottom: 60px;
  padding: 0;
  display: flex;
  gap: 32px;
  /* Keep consistent spacing without over-squeezing columns */
  justify-content: stretch;
  align-items: stretch;
  min-height: 0;
  box-sizing: border-box;
}

/* Adjust layout when navigation is hidden */
.main-content.no-navigation {
  top: 200px;
  /* Closer to TimeDisplay when no navigation */
}

.column {
  display: flex;
  flex-direction: column;
  gap: 18px;
  /* Scaled from 10px: 10 × 1.7778 = 18px */
  height: 100%;
  min-height: 0;
  min-width: 0;
  overflow-y: auto;
  align-items: stretch;
}

.column--left {
  flex: 0 0 var(--column-left-width, 22.5%);
  max-width: var(--column-left-width, 22.5%);
}

.column--center {
  flex: 0 0 var(--column-center-width, 55%);
  max-width: var(--column-center-width, 55%);
}

.column--right {
  flex: 0 0 var(--column-right-width, 22.5%);
  max-width: var(--column-right-width, 22.5%);
}

/* Scrollbar Styles */
.column::-webkit-scrollbar {
  width: 4px;
}

.column::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.column::-webkit-scrollbar-thumb {
  background: rgba(64, 213, 255, 0.3);
  border-radius: 2px;
}
</style>

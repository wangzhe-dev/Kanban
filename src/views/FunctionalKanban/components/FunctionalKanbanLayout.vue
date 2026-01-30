<template>
  <div class="fk-main-layout">
    <TimeDisplay />
    <div class="weather-display">
      <SmartWeatherBar />
    </div>
    <FunctionalKanbanTabNavigation
      v-if="showNavigation"
      :activeTab="activeTab"
      :autoRotate="autoRotate"
      :rotateInterval="rotateInterval"
      @tab-click="handleTabClick" />

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
import SmartWeatherBar from "@/views/DigitalFusion/components/SmartWeatherBar.vue";
import TimeDisplay from "@/views/DigitalFusion/components/TimeDisplay.vue";
import FunctionalKanbanTabNavigation from "./FunctionalKanbanTabNavigation.vue";

export default {
  name: "FunctionalKanbanLayout",
  components: {
    TimeDisplay,
    FunctionalKanbanTabNavigation,
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
      default: 32,
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
      const center = typeof this.centerWidth === 'string'
        ? parseFloat(this.centerWidth)
        : this.centerWidth;

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
.fk-main-layout {
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

.main-content {
  position: absolute;
  top: 350px;
  left: 120px;
  right: 120px;
  bottom: 60px;
  padding: 0;
  display: flex;
  gap: 32px;
  justify-content: stretch;
  align-items: stretch;
  min-height: 0;
  box-sizing: border-box;
}

.main-content.no-navigation {
  top: 200px;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 18px;
  height: 100%;
  min-height: 0;
  min-width: 0;
  overflow-y: auto;
  align-items: stretch;
}

.column--left {
  flex: 0 0 var(--column-left-width, 34%);
  max-width: var(--column-left-width, 34%);
}

.column--center {
  flex: 0 0 var(--column-center-width, 32%);
  max-width: var(--column-center-width, 32%);
}

.column--right {
  flex: 0 0 var(--column-right-width, 34%);
  max-width: var(--column-right-width, 34%);
}

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

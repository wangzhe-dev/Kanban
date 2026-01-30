<template>
  <div class="df-card" :class="{ 'card--has-header': hasHeader }" :style="cardStyle">
    <header v-if="title || showTimeRange" class="card__header" :style="headerStyle">
      <div class="card__title" :style="titleStyle">
        <span class="card__title-text">{{ title }}</span>

      </div>
      <img v-if="showDrill" class="card__drill-icon" :src="drillIcon" alt="下钻" @click.stop="handleDrillClick" />

      <div v-if="showTimeRange" class="card__time-tabs " :style="timeTabsStyle">

        <transition-group name="tab-fade" tag="div" class="tabs-wrapper">
          <div v-for="tab in timeRangeTabs" :key="tab.key" class="time-tab"
            :class="{ active: timeRange === tab.key, 'has-custom-bg': activeTabBgImage }" :style="getTabStyle(tab.key)"
            @click="handleTimeRangeClick(tab.key)">
            {{ tab.label }}
          </div>
        </transition-group>
      </div>
    </header>

    <div class="card__body" :style="bodyStyle">
      <div v-if="showBodyTabs" class="card__body-tabs" :class="`align-${bodyTabsAlign}`" :style="bodyTabsStyle">

        <transition-group name="tab-fade" tag="div" class="tabs-wrapper">
          <div v-for="tab in bodyTabsList" :key="tab.key" class="time-tab" :class="{ active: bodyTabValue === tab.key }"
            @click="handleBodyTabClick(tab.key)">
            {{ tab.label }}
          </div>
        </transition-group>
      </div>
      <transition name="content-fade" mode="out-in">
        <div :key="contentKey" class="card__content">
          <slot></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
const defaultTimeRangeTabs = [
  { label: "日", key: "day" },
  { label: "周", key: "week" },
  { label: "月", key: "month" },
];

const drillIcon = require('@/assets/images/DF/xz.gif');

// Background image mapping
const backgroundImages = {
  // Center column backgrounds
  'center-3': require('@/assets/images/DF/bg-center3.png'),
  'center-2': require('@/assets/images/DF/bg-center2.png'),
  'center-1': require('@/assets/images/DF/bg-item-1.png'),

  // Left/Right column backgrounds
  'side-3': require('@/assets/images/DF/bg-item3.png'),
  'side-2': require('@/assets/images/DF/bg-item2.png'),
  'side-1': require('@/assets/images/DF/bg-item-1.png'),
};

export default {
  name: "Card",
  props: {
    title: {
      type: String,
      default: "",
    },
    showDrill: {
      type: Boolean,
      default: false,
    },
    showTimeRange: {
      type: Boolean,
      default: false,
    },
    timeRange: {
      type: String,
      default: "day",
    },
    // 自定义 timeRange tabs
    customTimeRangeTabs: {
      type: Array,
      default: null,
    },
    backgroundImage: {
      type: String,
      default: "",
    },
    activeTabBgImage: {
      type: String,
      default: "",
    },
    // Optional tabs inside body
    showBodyTabs: {
      type: Boolean,
      default: false,
    },
    bodyTabs: {
      type: Array,
      default: () => [],
    },
    bodyTabValue: {
      type: String,
      default: "",
    },
    bodyTabsAlign: {
      type: String,
      default: "left",
      validator: (value) => ["left", "center", "right"].includes(value),
    },
    bodyTabsWidth: {
      type: String,
      default: "100%",
    },
    headerPadding: {
      type: String,
      default: "0",
    },
    headerMargin: {
      type: String,
      default: "0",
    },
    headerTop: {
      type: String,
      default: "35px",
    },
    headerTabTop: {
      type: String,
      default: "15px",
    },
    titlePadding: {
      type: String,
      default: "0",
    },
    titleMargin: {
      type: String,
      default: "0",
    },
    timeTabsPadding: {
      type: String,
      default: "0",
    },
    timeTabsMargin: {
      type: String,
      default: "0",
    },
    bodyPadding: {
      type: String,
      default: "0",
    },
    bodyMargin: {
      type: String,
      default: "0",
    },
    contentGap: {
      type: String,
      default: "18px",
    },
    flex: {
      type: [Number, String],
      default: 1,
    },
    // New props for auto background selection
    position: {
      type: String,
      default: "single", // 'top', 'middle', 'bottom', 'single'
      validator: (value) => ['top', 'middle', 'bottom', 'single'].includes(value),
    },
    column: {
      type: String,
      default: "center", // 'left', 'center', 'right'
      validator: (value) => ['left', 'center', 'right'].includes(value),
    },
    totalCards: {
      type: Number,
      default: 1, // 1, 2, or 3
      validator: (value) => [1, 2, 3].includes(value),
    },
    // Auto rotation props
    autoRotate: {
      type: Boolean,
      default: false,
    },
    rotateInterval: {
      type: Number,
      default: 5000, // 5 seconds
    },
  },
  data() {
    return {
      rotationTimer: null,
      drillIcon,
    };
  },
  computed: {
    // Use custom timeRangeTabs if provided, otherwise use default
    timeRangeTabs() {
      return this.customTimeRangeTabs || defaultTimeRangeTabs;
    },
    hasHeader() {
      return Boolean(this.title || this.showTimeRange);
    },
    bodyTabsList() {
      return this.bodyTabs && this.bodyTabs.length ? this.bodyTabs : this.timeRangeTabs;
    },
    contentKey() {
      // Combine timeRange and bodyTabValue to create unique key for content transition
      return `${this.timeRange}-${this.bodyTabValue}`;
    },
    cardStyle() {
      const style = {
        flex: this.flex,
        "--card-content-gap": this.contentGap,
      };

      // Use custom background if provided, otherwise auto-select
      // Check if backgroundImage prop was explicitly set (even if empty string)
      const hasBackgroundProp = this.$options.propsData && 'backgroundImage' in this.$options.propsData;

      if (hasBackgroundProp) {
        // Prop was explicitly set - use it (even if empty string means no background)
        if (this.backgroundImage) {
          style.backgroundImage = `url(${this.backgroundImage})`;
        }
        // If empty string, don't set any background
      } else {
        // Prop not set - auto-select background
        const bgImage = this.getAutoBackground();
        if (bgImage) {
          style.backgroundImage = `url(${bgImage})`;
        }
      }

      // Background rendering rules: single image covers the full card area
      style.backgroundRepeat = 'no-repeat';
      style.backgroundSize = 'cover';
      style.backgroundPosition = 'center center';

      return style;
    },
    headerStyle() {
      return {
        padding: this.headerPadding,
        margin: this.headerMargin,
        top: this.headerTop,
      };
    },
    titleStyle() {
      return {
        padding: this.titlePadding,
        margin: this.titleMargin,
      };
    },
    timeTabsStyle() {
      return {
        padding: this.timeTabsPadding,
        margin: this.timeTabsMargin,
        top: this.headerTabTop,
      };
    },
    bodyStyle() {
      return {
        padding: this.bodyPadding,
        margin: this.bodyMargin,
      };
    },
    bodyTabsStyle() {
      return {
        width: this.bodyTabsWidth,
      };
    },
  },
  methods: {
    handleDrillClick(event) {
      const rect = this.$el && this.$el.getBoundingClientRect ? this.$el.getBoundingClientRect() : null;
      const origin = rect
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        : null;

      this.$emit("drill-click", {
        title: this.title,
        origin,
        rect: rect
          ? {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
            right: rect.right,
            bottom: rect.bottom,
          }
          : null,
        nativeEvent: event || null,
      });
    },
    handleTimeRangeClick(key) {
      if (key !== this.timeRange) {
        this.$emit("time-range-change", key);
      }
    },
    handleBodyTabClick(key) {
      if (key !== this.bodyTabValue) {
        this.$emit("body-tab-change", key);
      }
    },
    getTabStyle(tabKey) {
      if (this.activeTabBgImage && this.timeRange === tabKey) {
        return {
          backgroundImage: `url(${this.activeTabBgImage})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        };
      }
      return {};
    },
    getAutoBackground() {
      // Determine background key based on column and total cards
      const columnType = this.column === 'center' ? 'center' : 'side';
      const key = `${columnType}-${this.totalCards}`;

      return backgroundImages[key];
    },
    startAutoRotation() {
      if (!this.autoRotate) return;

      this.stopAutoRotation();

      this.rotationTimer = setInterval(() => {
        // Auto rotate time range tabs
        if (this.showTimeRange) {
          const currentIndex = this.timeRangeTabs.findIndex(tab => tab.key === this.timeRange);
          const nextIndex = (currentIndex + 1) % this.timeRangeTabs.length;
          const nextTab = this.timeRangeTabs[nextIndex];
          this.$emit("time-range-change", nextTab.key);
        }

        // Auto rotate body tabs
        if (this.showBodyTabs) {
          const currentIndex = this.bodyTabsList.findIndex(tab => tab.key === this.bodyTabValue);
          const nextIndex = (currentIndex + 1) % this.bodyTabsList.length;
          const nextTab = this.bodyTabsList[nextIndex];
          this.$emit("body-tab-change", nextTab.key);
        }
      }, this.rotateInterval);
    },
    stopAutoRotation() {
      if (this.rotationTimer) {
        clearInterval(this.rotationTimer);
        this.rotationTimer = null;
      }
    },
  },
  mounted() {
    this.startAutoRotation();
  },
  beforeDestroy() {
    this.stopAutoRotation();
  },
  watch: {
    autoRotate(newVal) {
      if (newVal) {
        this.startAutoRotation();
      } else {
        this.stopAutoRotation();
      }
    },
    rotateInterval() {
      if (this.autoRotate) {
        this.startAutoRotation();
      }
    },
  },
};
</script>

<style scoped>
.df-card {
  --card-header-height: 60px;
  --card-horizontal-offset: 32px;
  --card-content-gap: 18px;
  width: 100%;
  height: 100%;
  min-height: 0;
  background-size: 100% 100% !important;
  background-repeat: no-repeat;
  background-position: center center;
  display: block;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  font-size: 28px;
}

.card__header {
  position: absolute;
  /* top: var(--header-top); */
  /* left: 35px; */
  width: 100% !important;
  /* left: var(--card-horizontal-offset);
  right: var(--card-horizontal-offset); */
  /* height: var(--card-header-height); */
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  z-index: 10;
  /* Ensure header appears above content */
}

.card__title {
  font-size: 36px;
  font-weight: 800;
  color: #ffffff;
  position: relative;
  left: 40px;
  letter-spacing: 2px;
  display: flex;
  align-items: center;

}

.card__title-text {
  display: inline-flex !important;
}




.card__drill-icon {
  width: 80px;
  object-fit: contain;
  flex: 0 0 auto;
  cursor: pointer;
  position: absolute;
  right: 50px;
  top: 20px;
}

.card__time-tabs {
  display: flex;
  position: relative;
  /* top: 15px; */
  right: 50px;
  gap: 16px;
}

.time-tab {
  padding: 8px 24px;
  font-size: 28px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  user-select: none;
}

.time-tab:hover {
  color: rgba(255, 255, 255, 0.8);
  background: rgba(64, 213, 255, 0.1);
}

.time-tab.active {
  color: #ffffff;
  background: #ff9900;
  font-weight: 600;
}

/* When using custom background image, remove default background */
.time-tab.active.has-custom-bg {
  background: transparent;
}

.card__body {
  position: absolute;
  top: var(--card-content-gap);
  left: 0;
  right: 0;
  bottom: var(--card-content-gap);
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: auto;
}

.card--has-header .card__body {
  top: calc(var(--card-header-height) + var(--card-content-gap));
}

.card__body-tabs {
  display: flex;
  gap: 16px;
  padding: 8px 0 12px;
}

.card__body-tabs.align-left {
  justify-content: flex-start;
}

.card__body-tabs.align-center {
  justify-content: center;
}

.card__body-tabs.align-right {
  justify-content: flex-end;
}

/* Tabs wrapper for transition-group */
.tabs-wrapper {
  display: flex;
  gap: 16px;
}

/* Tab fade transition */
.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: all 0.3s ease;
}

.tab-fade-enter,
.tab-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Content fade transition - 左右滑动 */
.card__content {
  width: 100%;
  flex: 1;
  min-height: 0;
}

.content-fade-enter-active {
  transition: all 0.5s ease;
}

.content-fade-leave-active {
  transition: all 0.3s ease;
}

.content-fade-enter {
  opacity: 0;
  transform: translateX(30px);
}

.content-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>

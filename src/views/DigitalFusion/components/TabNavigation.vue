<template>
  <div class="tab-navigation">
    <transition-group name="tab-slide" tag="div" class="tab-navigation-wrapper">
      <div v-for="tab in tabs" :key="tab.route" class="tab-item" :class="{ active: isActive(tab.route) }"
        @click="handleClick(tab.route)">
        {{ tab.label }}
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "TabNavigation",
  props: {
    activeTab: {
      type: String,
      default: "TProfile",
    },
    autoRotate: {
      type: Boolean,
      default: false,
    },
    rotateInterval: {
      type: Number,
      default: 10000, // 10 seconds
    },
  },
  data() {
    return {
      tabs: [
        { label: "智能钢板库", route: "SmartSteelPlateLibrary" },
        { label: "预处理产线", route: "PreProcessingLine" },
        { label: "钢板下料", route: "SteelPlateCutting" },
        { label: "型材下料", route: "ProfileCutting" },
        { label: "T型材", route: "TProfile" },
        { label: "小组立", route: "SmallAssembly" },
        { label: "片体拼板", route: "PanelAssembly" },
        { label: "平直分段", route: "StraightSection" },
      ],
      rotationTimer: null,
    };
  },
  methods: {
    isActive(route) {
      return this.activeTab === route;
    },
    handleClick(route) {
      let href = "";
      try {
        href = this.$router.resolve({ name: route }).href;
      } catch (e) {
        try {
          href = this.$router.resolve(route).href;
        } catch (e2) {
          href = "";
        }
      }
      if (href) {
        const url = href.startsWith("http") ? href : `${window.location.origin}${href}`;
        window.open(url, "_blank", "noopener,noreferrer");
      }

      // Reset rotation timer when user manually clicks
      if (this.autoRotate) {
        this.startAutoRotation();
      }
    },
    startAutoRotation() {
      if (!this.autoRotate) return;

      this.stopAutoRotation();

      this.rotationTimer = setInterval(() => {
        const currentIndex = this.tabs.findIndex(tab => tab.route === this.activeTab);
        const nextIndex = (currentIndex + 1) % this.tabs.length;
        const nextTab = this.tabs[nextIndex];
        this.$emit("tab-click", nextTab.route);
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
.tab-navigation {
  position: absolute;
  top: 235px;
  /* Scaled from 98px: 98 × 2.3974 = 235px */
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.tab-navigation-wrapper {
  display: flex;
  gap: 82px;
  /* Scaled from 46px: 46 × 1.7778 = 82px */
}

.tab-item {
  width: 213px;
  /* Scaled from 119.8px: 1198/10 = 119.8, 119.8 × 1.7778 = 213px */
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 38px;
  font-weight: 500;
  color: #ff9900;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
}

.tab-item.active {
  color: #b1c5ea;
  transform: scale(1.05);
}

.tab-item:hover {
  opacity: 0.8;
}

/* Tab slide transition */
.tab-slide-enter-active {
  transition: all 0.5s ease;
}

.tab-slide-leave-active {
  transition: all 0.3s ease;
}

.tab-slide-enter {
  opacity: 0;
  transform: scale(0.8) translateY(-10px);
}

.tab-slide-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(10px);
}

.tab-slide-move {
  transition: transform 0.5s ease;
}
</style>

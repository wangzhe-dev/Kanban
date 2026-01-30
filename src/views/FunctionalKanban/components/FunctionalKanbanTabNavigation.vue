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
  name: "FunctionalKanbanTabNavigation",
  props: {
    activeTab: {
      type: String,
      default: "FunctionalKanbanHome",
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
  data() {
    return {
      tabs: [
        { label: "库存管理", route: "InventoryManagement" },
        { label: "生产管理", route: "ProductionManagement" },
        { label: "设备管理", route: "EquipmentManagement" },
        { label: "质量管理", route: "QualityManagement" },
        { label: "能耗管理", route: "EnergyManagement" },
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
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.tab-navigation-wrapper {
  display: flex;
  gap: 82px;
}

.tab-item {
  width: 213px;
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

<template>
  <div class="equipment-status">
    <div class="df-table-container">
      <table class="df-table df-table-header">
        <colgroup>
          <col style="width: 50%" />
          <col style="width: 50%" />
        </colgroup>
        <thead>
          <tr>
            <th>工序</th>
            <th>零件数量</th>
          </tr>
        </thead>
      </table>
      <div class="df-table-wrapper">
        <div class="df-scroll-content">
          <table class="df-table df-table-body">
            <colgroup>
              <col style="width: 50%" />
              <col style="width: 50%" />
            </colgroup>
            <tbody>
              <tr v-for="(item, index) in equipmentData" :key="index">
                <td style="color: rgb(64, 213, 255)">{{ item.name }}</td>
                <td style="color: rgb(163, 224, 67)">{{ item.quantity }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CuttingEquipment",
  props: {
    equipmentData: {
      type: Array,
      default: () => [],
    },
    rowHeight: {
      type: Number,
      default: 60,
    },
    scrollInterval: {
      type: Number,
      default: 2000,
    },
  },
  data() {
    return {
      scrollY: 0,
      isTransitioning: true,
      isPaused: false,
      scrollTimer: null,
    };
  },
  computed: {
    displayData() {
      if (this.equipmentData.length <= 4) {
        return this.equipmentData;
      }
      return [...this.equipmentData, ...this.equipmentData];
    },
    scrollStyle() {
      return {
        transform: `translateY(-${this.scrollY}px)`,
        transition: this.isTransitioning ? 'transform 0.5s ease' : 'none',
      };
    },
  },
  methods: {
    startScroll() {
      if (this.equipmentData.length <= 4) return;

      this.scrollTimer = setInterval(() => {
        if (this.isPaused) return;

        this.isTransitioning = true;
        this.scrollY += this.rowHeight;

        const totalHeight = this.equipmentData.length * this.rowHeight;
        if (this.scrollY >= totalHeight) {
          setTimeout(() => {
            this.isTransitioning = false;
            this.scrollY = 0;
          }, 500);
        }
      }, this.scrollInterval);
    },
    stopScroll() {
      if (this.scrollTimer) {
        clearInterval(this.scrollTimer);
        this.scrollTimer = null;
      }
    },
    pauseScroll() {
      this.isPaused = true;
    },
    resumeScroll() {
      this.isPaused = false;
    },
  },
  mounted() {
    this.startScroll();
  },
  beforeDestroy() {
    this.stopScroll();
  },
  watch: {
    equipmentData: {
      handler() {
        this.scrollY = 0;
        this.stopScroll();
        this.startScroll();
      },
      deep: true,
    },
  },
};
</script>

<style>
@import "../../styles/table.css";
</style>

<style scoped>
.equipment-status {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.df-table-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.df-table-wrapper {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.df-scroll-content {
  position: relative;
}

.df-table-header {
  flex-shrink: 0;
}

.df-table-body {
  width: 100%;
}

.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.status-indicator.running {
  color: #52c41a;
}

.status-indicator.running .status-dot {
  background: #52c41a;
  box-shadow: 0 0 8px #52c41a;
  animation: pulse 1.5s infinite;
}

.status-indicator.standby {
  color: #faad14;
}

.status-indicator.standby .status-dot {
  background: #faad14;
}

.status-indicator.maintenance {
  color: #1890ff;
}

.status-indicator.maintenance .status-dot {
  background: #1890ff;
}

.status-indicator.error {
  color: #ff4d4f;
}

.status-indicator.error .status-dot {
  background: #ff4d4f;
  animation: pulse 0.8s infinite;
}

.efficiency-value {
  font-weight: bold;
  font-size: 26px;
}

.efficiency-value.high {
  color: #52c41a;
}

.efficiency-value.medium {
  color: #faad14;
}

.efficiency-value.low {
  color: #ff4d4f;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>

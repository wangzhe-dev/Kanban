<template>
  <div class="cache-details">
    <!-- 左边 - 线边库 -->
    <div class="cache-section">
      <div class="section-header">
        <h3 class="section-title">线边库</h3>
      </div>
      <div class="df-table-container" @mouseenter="pauseScroll('lineSide')" @mouseleave="resumeScroll('lineSide')">
        <table class="df-table df-table-header">
          <colgroup>
            <col style="width: 16%" />
            <col style="width: 18%" />
            <col style="width: 16%" />
            <col style="width: 16%" />
            <col style="width: 16%" />
            <col style="width: 18%" />
          </colgroup>
          <thead>
            <tr>
              <th>料框号</th>
              <th>物料名称</th>
              <th>库位</th>
              <th>船号</th>
              <th>流向</th>
              <th>批次号</th>
            </tr>
          </thead>
        </table>
        <div class="df-table-wrapper">
          <div class="df-scroll-content" :style="getScrollStyle('lineSide')">
            <table class="df-table df-table-body">
              <colgroup>
                <col style="width: 16%" />
                <col style="width: 18%" />
                <col style="width: 16%" />
                <col style="width: 16%" />
                <col style="width: 16%" />
                <col style="width: 18%" />
              </colgroup>
              <tbody>
                <tr v-for="(item, index) in displayLineSideData" :key="'line-' + index">
                  <td style="color: rgb(64, 213, 255)">{{ item.frameNo }}</td>
                  <td style="color: rgb(163, 224, 67)">{{ item.materialName }}</td>
                  <td style="color: rgb(255, 153, 0)">{{ item.location }}</td>
                  <td style="color: rgb(255, 217, 0)">{{ item.shipNo }}</td>
                  <td style="color: rgb(140, 209, 125)">{{ item.direction }}</td>
                  <td style="color: rgb(55, 217, 240)">{{ item.batchNo }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- 分隔线 -->
    <div class="divider"></div>

    <!-- 右边 - 部件立库 -->
    <div class="cache-section">
      <div class="section-header">
        <h3 class="section-title">部件立库</h3>
      </div>
      <div class="df-table-container" @mouseenter="pauseScroll('component')" @mouseleave="resumeScroll('component')">
        <table class="df-table df-table-header">
          <colgroup>
            <col style="width: 16%" />
            <col style="width: 18%" />
            <col style="width: 16%" />
            <col style="width: 16%" />
            <col style="width: 16%" />
            <col style="width: 18%" />
          </colgroup>
          <thead>
            <tr>
              <th>料框号</th>
              <th>物料名称</th>
              <th>库位</th>
              <th>船号</th>
              <th>流向</th>
              <th>批次号</th>
            </tr>
          </thead>
        </table>
        <div class="df-table-wrapper">
          <div class="df-scroll-content" :style="getScrollStyle('component')">
            <table class="df-table df-table-body">
              <colgroup>
                <col style="width: 16%" />
                <col style="width: 18%" />
                <col style="width: 16%" />
                <col style="width: 16%" />
                <col style="width: 16%" />
                <col style="width: 18%" />
              </colgroup>
              <tbody>
                <tr v-for="(item, index) in displayComponentData" :key="'comp-' + index">
                  <td style="color: rgb(64, 213, 255)">{{ item.frameNo }}</td>
                  <td style="color: rgb(163, 224, 67)">{{ item.materialName }}</td>
                  <td style="color: rgb(255, 153, 0)">{{ item.location }}</td>
                  <td style="color: rgb(255, 217, 0)">{{ item.shipNo }}</td>
                  <td style="color: rgb(140, 209, 125)">{{ item.direction }}</td>
                  <td style="color: rgb(55, 217, 240)">{{ item.batchNo }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CacheDetails",
  props: {
    cacheData: {
      type: Object,
      default: () => ({
        lineSide: [],
        componentWarehouse: [],
      }),
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
      scrollY: {
        lineSide: 0,
        component: 0,
      },
      isTransitioning: {
        lineSide: true,
        component: true,
      },
      isPaused: {
        lineSide: false,
        component: false,
      },
      scrollTimers: {
        lineSide: null,
        component: null,
      },
    };
  },
  computed: {
    displayLineSideData() {
      const data = this.cacheData.lineSide || [];
      if (!data.length) return [];
      return [...data, ...data];
    },
    displayComponentData() {
      const data = this.cacheData.componentWarehouse || [];
      if (!data.length) return [];
      return [...data, ...data];
    },
  },
  mounted() {
    this.startAutoScroll('lineSide', this.cacheData.lineSide);
    this.startAutoScroll('component', this.cacheData.componentWarehouse);
  },
  beforeDestroy() {
    this.stopAllScroll();
  },
  methods: {
    getScrollStyle(key) {
      return {
        transform: `translateY(${-this.scrollY[key]}px)`,
        transition: this.isTransitioning[key] ? 'transform 0.8s ease-in-out' : 'none',
      };
    },
    startAutoScroll(key, data) {
      if (this.scrollTimers[key]) {
        clearInterval(this.scrollTimers[key]);
      }

      this.scrollTimers[key] = setInterval(() => {
        if (this.isPaused[key]) return;
        if (!data || !data.length) return;

        const totalOriginalHeight = data.length * this.rowHeight;

        this.isTransitioning[key] = true;
        this.scrollY[key] += this.rowHeight;

        // 当滚动到复制数据的位置时，瞬间重置
        if (this.scrollY[key] >= totalOriginalHeight) {
          setTimeout(() => {
            this.isTransitioning[key] = false;
            this.scrollY[key] = 0;
          }, 800);
        }
      }, this.scrollInterval);
    },
    stopAutoScroll(key) {
      if (this.scrollTimers[key]) {
        clearInterval(this.scrollTimers[key]);
        this.scrollTimers[key] = null;
      }
    },
    stopAllScroll() {
      this.stopAutoScroll('lineSide');
      this.stopAutoScroll('component');
    },
    pauseScroll(key) {
      this.isPaused[key] = true;
    },
    resumeScroll(key) {
      this.isPaused[key] = false;
    },
  },
};
</script>

<style>
@import "../../styles/table.css";
</style>

<style scoped>
.cache-details {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
}

.cache-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}

.divider {
  width: 2px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(64, 213, 255, 0.3) 20%,
    rgba(64, 213, 255, 0.3) 80%,
    transparent
  );
}

.section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;
  flex-shrink: 0;
}

.section-title {
  font-size: 32px;
  font-weight: 600;
  color: #ffffff;
  display: flex;
  width: 280px;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  position: relative;
  padding: 0 70px;
}

.section-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background-image: url("../../../../assets/images/DF/icon-right@2x.png");
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
}

.section-title::after {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background-image: url("../../../../assets/images/DF/icon-left@2x.png");
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
}
</style>

<!--
  钢板下料大屏页面

  布局结构：
  - 左栏: 1个卡片（工单信息）
  - 中栏: 3个卡片（切割任务、设备状态、生产进度）
  - 右栏: 3个卡片（当日产量、产量统计、质量统计）
-->
<template>
  <div class="container-SteelPlateCutting">
    <div class="steel-plate-cutting-screen" ref="appRef">
      <MainLayout activeTab="SteelPlateCutting" @tab-click="handleTabClick">
        <!-- Left Column: 1 card -->
        <template #left>
          <Card title="工单信息" :bodyPadding="'20px'" :showTimeRange="false" column="left" position="single"
            :totalCards="1">
            <div class="left-card-layout">
              <!-- 上部分 - 工单统计 -->
              <div class="left-card-section" style="flex:5;">
                <div class="section-header">
                  <h3 class="section-title">工单统计</h3>
                  <div class="section-tabs">
                    <span v-for="tab in timeRangeTabs" :key="tab.key" class="section-tab"
                      :class="{ active: leftSections.top === tab.key }" @click="handleSectionTabClick('top', tab.key)">
                      {{ tab.label }}
                    </span>
                  </div>
                </div>
                <transition name="content-fade" mode="out-in">
                  <div :key="leftSections.top" class="section-content">
                    <OrderStatistics :statisticsData="orderStatisticsData" />
                  </div>
                </transition>
              </div>

              <!-- 下部分 - 计划完成度 -->
              <div class="left-card-section" style="flex:5;">
                <div class="section-header">
                  <h3 class="section-title">计划完成度</h3>
                  <div class="section-tabs">
                    <span v-for="tab in timeRangeTabs" :key="tab.key" class="section-tab"
                      :class="{ active: leftSections.bottom === tab.key }"
                      @click="handleSectionTabClick('bottom', tab.key)">
                      {{ tab.label }}
                    </span>
                  </div>
                </div>
                <transition name="content-fade" mode="out-in">
                  <div :key="leftSections.bottom" class="section-content">
                    <PlanCompletion :completionData="planCompletionData" />
                  </div>
                </transition>
              </div>
            </div>
          </Card>
        </template>

        <!-- Center Column: 3 cards -->
        <template #center-top>
          <Card title="工单详情" :flex="3" column="center" position="top" :totalCards="3" :showTimeRange="true"
            :timeRange="bodyTabValues.cuttingTask"
            @time-range-change="(tab) => handleBodyTabChange('cuttingTask', tab)"
            :bodyPadding="'60px 20px 20px 20px'">
            <CuttingTask :taskData="currentCuttingTaskData" :productCount="45" />
          </Card>
        </template>

        <template #center-middle>
          <div class="center-middle-wrapper">
            <Card title="切割" column="center" position="middle" :totalCards="3"
              :bodyPadding="'40px 20px 20px 20px'">
              <EquipmentStatus :equipmentData="cuttingEquipmentData" />
            </Card>
            <Card title="分拣" column="center" position="middle" :totalCards="3"
              :bodyPadding="'40px 20px 20px 20px'">
              <SortingStats :sortingData="sortingStatsData" />
            </Card>
          </div>
        </template>

        <template #center-bottom>
          <Card title="缓存详情" :flex="3" column="center" position="bottom" :totalCards="3"
            :bodyPadding="'50px 20px 20px 20px'">
            <CacheDetails :cacheData="cacheDetailsData" />
          </Card>
        </template>

        <!-- Right Column: 3 cards -->
        <template #right-top>
          <Card title="当日生产" :titleMargin="'20px 0 0 0'" :flex="3" column="right" position="top" :totalCards="3"
            :showTimeRange="false" :bodyPadding="'60px 20px 20px 20px'">
            <DailyOutput :outputData="dailyOutputData" />
          </Card>
        </template>

        <template #right-middle>
          <Card title="产量统计" :titleMargin="'20px 0 0 0'" :timeTabsMargin="'10px 0 0 0'" :flex="3" column="right"
            position="middle" :totalCards="3" :showTimeRange="true" :customTimeRangeTabs="productionTabs"
            :timeRange="bodyTabValues.production" :autoRotate="true" :rotateInterval="5000"
            :bodyPadding="'60px 20px 20px 20px'" @time-range-change="(tab) => handleBodyTabChange('production', tab)">
            <ProductionStats :columns="currentProductionStats.columns" :tableData="currentProductionStats.data" />
          </Card>
        </template>

        <template #right-bottom>
          <Card title="报工情况" :titleMargin="'20px 0 0 0'" :timeTabsMargin="'10px 0 0 0'" :flex="3" column="right"
            position="bottom" :totalCards="3" :showTimeRange="true" :customTimeRangeTabs="qualityTabs"
            :timeRange="bodyTabValues.quality" :autoRotate="true" :rotateInterval="6000"
            :bodyPadding="'60px 20px 20px 20px'" @time-range-change="(tab) => handleBodyTabChange('quality', tab)">
            <QualityChart :chartData="currentQualityData" />
          </Card>
        </template>
      </MainLayout>
    </div>
  </div>
</template>

<script>
import drawMixin from "@/mixin/drawMixin.js";
import Card from "../components/Card.vue";
import MainLayout from "../components/MainLayout.vue";
import CacheDetails from "./components/CacheDetails.vue";
import CuttingTask from "./components/CuttingTask.vue";
import DailyOutput from "./components/DailyOutput.vue";
import EquipmentStatus from "./components/EquipmentStatus.vue";
import OrderStatistics from "./components/OrderStatistics.vue";
import PlanCompletion from "./components/PlanCompletion.vue";
import ProductionStats from "./components/ProductionStats.vue";
import QualityChart from "./components/QualityChart.vue";
import SortingStats from "./components/SortingStats.vue";
import {
  getCacheDetailsData,
  getCuttingTaskData,
  getDailyOutputData,
  getEquipmentStatusData,
  getOrderStatisticsData,
  getPlanCompletionData,
  getProductionStatsData,
  getQualityData,
  getSortingStatsData,
} from "./mock.js";

const timeRangeTabs = [
  { label: "日", key: "day" },
  { label: "周", key: "week" },
  { label: "月", key: "month" },
];

// 产量统计 tabs
const productionTabs = [
  { label: "工位", key: "station" },
  { label: "班组", key: "team" },
  { label: "产成品", key: "product" },
];

// 质量统计 tabs
const qualityTabs = [
  { label: "工序", key: "process" },
  { label: "工位", key: "station" },
  { label: "设备", key: "equipment" },
];

export default {
  name: "SteelPlateCutting",
  components: {
    Card,
    MainLayout,
    CacheDetails,
    CuttingTask,
    DailyOutput,
    EquipmentStatus,
    OrderStatistics,
    PlanCompletion,
    ProductionStats,
    QualityChart,
    SortingStats,
  },
  mixins: [drawMixin],
  data() {
    return {
      leftSections: {
        top: "day",
        bottom: "day",
      },
      bodyTabValues: {
        production: "station",
        quality: "process",
        cuttingTask: "day",
      },
      timeRangeTabs,
      productionTabs,
      qualityTabs,
      sectionRotationTimers: {
        top: null,
        bottom: null,
      },
      cuttingTaskTimer: null,
    };
  },
  computed: {
    currentQualityData() {
      return getQualityData(this.bodyTabValues.quality);
    },
    dailyOutputData() {
      return getDailyOutputData();
    },
    currentProductionStats() {
      return getProductionStatsData(this.bodyTabValues.production);
    },
    currentCuttingTaskData() {
      return getCuttingTaskData(this.bodyTabValues.cuttingTask);
    },
    cuttingEquipmentData() {
      return getEquipmentStatusData("cutting");
    },
    sortingStatsData() {
      return getSortingStatsData();
    },
    cacheDetailsData() {
      return getCacheDetailsData();
    },
    planCompletionData() {
      return getPlanCompletionData();
    },
    orderStatisticsData() {
      return getOrderStatisticsData(this.leftSections.top);
    },
  },
  methods: {
    handleTabClick(route) {
      this.$router.push({ name: route });
    },
    handleSectionTabClick(section, tab) {
      this.$set(this.leftSections, section, tab);
      this.startSectionAutoRotation(section);
    },
    handleBodyTabChange(cardName, tab) {
      this.$set(this.bodyTabValues, cardName, tab);
      if (cardName === "cuttingTask") {
        this.startCuttingTaskRotation();
      }
    },
    startSectionAutoRotation(section) {
      if (this.sectionRotationTimers[section]) {
        clearInterval(this.sectionRotationTimers[section]);
      }

      const intervals = {
        top: 5000,
        bottom: 7000,
      };

      this.sectionRotationTimers[section] = setInterval(() => {
        const currentIndex = this.timeRangeTabs.findIndex(
          tab => tab.key === this.leftSections[section]
        );
        const nextIndex = (currentIndex + 1) % this.timeRangeTabs.length;
        const nextTab = this.timeRangeTabs[nextIndex];
        this.$set(this.leftSections, section, nextTab.key);
      }, intervals[section]);
    },
    startAllSectionRotations() {
      this.startSectionAutoRotation("top");
      this.startSectionAutoRotation("bottom");
    },
    startCuttingTaskRotation() {
      if (this.cuttingTaskTimer) {
        clearInterval(this.cuttingTaskTimer);
      }
      this.cuttingTaskTimer = setInterval(() => {
        const currentIndex = this.timeRangeTabs.findIndex(
          tab => tab.key === this.bodyTabValues.cuttingTask
        );
        const nextIndex = (currentIndex + 1) % this.timeRangeTabs.length;
        const nextTab = this.timeRangeTabs[nextIndex];
        this.$set(this.bodyTabValues, "cuttingTask", nextTab.key);
      }, 5000);
    },
    stopAllSectionRotations() {
      Object.keys(this.sectionRotationTimers).forEach(section => {
        if (this.sectionRotationTimers[section]) {
          clearInterval(this.sectionRotationTimers[section]);
          this.sectionRotationTimers[section] = null;
        }
      });
    },
  },
  mounted() {
    this.startAllSectionRotations();
    this.startCuttingTaskRotation();
  },
  beforeDestroy() {
    this.stopAllSectionRotations();
    if (this.cuttingTaskTimer) {
      clearInterval(this.cuttingTaskTimer);
      this.cuttingTaskTimer = null;
    }
  },
};
</script>

<style scoped>
.container-SteelPlateCutting {
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
  position: relative;
}

.steel-plate-cutting-screen {
  background-image: url("../../../assets/images/DF/bg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 3840px;
  height: 2160px;
  color: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: 0 0;
  overflow: hidden;
}

/* 左侧卡片内部布局 */
.left-card-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 0;
}

.left-card-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}

/* 每个部分的头部 */
.section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;
  margin-top: 30px;
}

.section-title {
  font-size: 32px;
  font-weight: 600;
  color: #ffffff;
  margin-top: 20px;
  display: flex;
  width: 325px;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  position: relative;
  padding: 0 80px;
}

.section-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  background-image: url("../../../assets/images/DF/icon-right@2x.png");
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
  width: 60px;
  height: 60px;
  background-image: url("../../../assets/images/DF/icon-left@2x.png");
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
}

/* 部分内的 Tabs */
.section-tabs {
  display: flex;
  gap: 24px;
  justify-content: flex-end;
  width: 100%;
  margin: 20px 0;
}

.section-tab {
  padding: 6px 18px;
  font-size: 24px;
  min-width: 100px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 6px;
  user-select: none;
  background: rgba(64, 213, 255, 0.1);
}

.section-tab:hover {
  background: rgba(64, 213, 255, 0.2);
}

.section-tab.active {
  color: #ffffff;
  background: #ff9900;
  font-weight: 600;
  transform: scale(1.05);
}

/* 内容区域 */
.section-content {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 8px 0;
}

/* 内容淡入淡出动画 - 左右滑动 */
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

/* 中间区域双Card左右布局 */
.center-middle-wrapper {
  display: flex;
  gap: 20px;
  width: 100%;
  height: 100%;
  flex: 3;
}

.center-middle-wrapper > * {
  flex: 1;
  min-width: 0;
}
</style>

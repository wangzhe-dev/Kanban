<!--
  型材下料大屏页面

  左侧布局：上中下三部分
  - 上部分：工单统计
  - 中部分：下料统计
  - 下部分：设备状态

  中间区域：3个卡片（生产任务、缓存情况、任务情况周）
  右侧区域：3个卡片（当日生产、产量统计、报工情况）
-->
<template>
  <div class="container-ProfileCutting">
    <div class="df-screen" ref="appRef">
      <MainLayout activeTab="ProfileCutting" @tab-click="handleTabClick">
        <template #left>
          <Card title="工单信息" :bodyPadding="'20px'" :showTimeRange="false" column="left" position="single"
            :totalCards="1">
            <div class="left-card-layout">
              <!-- 上部分：工单信息 -->
              <div class="left-card-section" style="flex:3;">
                <div class="section-tabs" style=" padding: 40px 20px 0 0;">
                  <span v-for="tab in timeRangeTabs" :key="tab.key" class="section-tab"
                    :class="{ active: leftSections.top === tab.key }" @click="handleSectionTabClick('top', tab.key)">
                    {{ tab.label }}
                  </span>
                </div>
                <transition name="content-fade" mode="out-in">
                  <div :key="leftSections.top" class="section-content">
                    <OrderStatistics :statisticsData="orderStatisticsData" />
                  </div>
                </transition>
              </div>
              <!-- 中部分：工单信息 -->
              <div class="left-card-section" style="flex:3;">
                <div class="section-tabs" style=" padding: 0px 20px 20px 0;">
                  <span v-for="tab in timeRangeTabs" :key="tab.key" class="section-tab"
                    :class="{ active: leftSections.middle === tab.key }"
                    @click="handleSectionTabClick('middle', tab.key)">
                    {{ tab.label }}
                  </span>
                </div>
                <transition name="content-fade" mode="out-in">
                  <div :key="leftSections.middle" class="section-content">
                    <CuttingStatistics :statisticsData="cuttingStatisticsData" />
                  </div>
                </transition>
              </div>

              <!-- 下部分：工单信息 -->
              <div class="left-card-section" style="flex:4;">
                <div class="section-header">
                  <h3 class="section-title">型材立库</h3>
                </div>
                <div class="section-content">
                  <EquipmentStatus :equipmentData="equipmentStatusData" />
                </div>
              </div>
            </div>
          </Card>
        </template>


        <!-- Center Column: Top + Middle + Bottom (3 cards, center column) -->
        <template #center-top>
          <Card title="工单详情" :flex="3" column="center" position="top" :totalCards="3" :showTimeRange="true"
            :timeRange="bodyTabValues.productionTask"
            @time-range-change="(tab) => handleBodyTabChange('productionTask', tab)"
            :bodyPadding="'60px 20px 20px 20px'">
            <ProductionTask :taskData="currentProductionTaskData" />
          </Card>
        </template>

        <template #center-middle>
          <Card title="零部件" :flex="3" column="center" position="middle" :totalCards="3"
            :bodyPadding="'40px 20px 20px 20px'">
            <div class="component-wrapper">
              <CuttingEquipment :equipmentData="cuttingEquipmentData" />
              <div class="divider"></div>
              <ComponentStats :sortingData="componentStatsData" />
            </div>
          </Card>
        </template>

        <template #center-bottom>
          <Card title="缓存详情" :flex="3" column="center" position="bottom" :totalCards="3"
            :bodyPadding="'50px 20px 20px 20px'">
            <CacheDetails :cacheData="cacheDetailsData" />
          </Card>
        </template>


        <!-- right Column: Top + Middle + Bottom (3 cards, side column) -->
        <template #right-top>
          <Card title="当日生产" :titleMargin="'20px 0 0 0'" :flex="3" column="right" position="top" :totalCards="3"
            :showTimeRange="false" :bodyPadding="'60px 20px 20px 20px'">
            <DailyProduction :productionData="dailyProductionData" />
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
            position="bottom" :totalCards="3" :showTimeRange="true" :customTimeRangeTabs="reportTabs"
            :timeRange="bodyTabValues.report" :autoRotate="true" :rotateInterval="6000"
            :bodyPadding="'60px 20px 20px 20px'" @time-range-change="(tab) => handleBodyTabChange('report', tab)">
            <QualityChart :chartData="currentReportData" />
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
import ComponentStats from "./components/ComponentStats.vue";
import CuttingEquipment from "./components/CuttingEquipment.vue";
import CuttingStatistics from "./components/CuttingStatistics.vue";
import DailyProduction from "./components/DailyProduction.vue";
import EquipmentStatus from "./components/EquipmentStatus.vue";
import OrderStatistics from "./components/OrderStatistics.vue";
import ProductionStats from "./components/ProductionStats.vue";
import ProductionTask from "./components/ProductionTask.vue";
import QualityChart from "./components/QualityChart.vue";
import { getCacheDetailsData, getComponentStatsData, getCuttingEquipmentData, getCuttingStatisticsData, getDailyProductionData, getEquipmentStatusData, getOrderStatisticsData, getProductionStatsData, getProductionTaskData, getReportData } from "./mock.js";

const timeRangeTabs = [
  { label: "日", key: "day" },
  { label: "周", key: "week" },
  { label: "月", key: "month" },
];

// 产量统计 tabs
const productionTabs = [
  { label: "船号", key: "ship" },
  { label: "批次", key: "batch" },
  { label: "分段", key: "segment" },
];

// 报工情况 tabs
const reportTabs = [
  { label: "工序", key: "process" },
  { label: "工位", key: "station" },
  { label: "设备", key: "equipment" },
];

export default {
  name: "ProfileCutting",
  components: {
    Card,
    MainLayout,
    QualityChart,
    DailyProduction,
    OrderStatistics,
    CuttingStatistics,
    EquipmentStatus,
    ProductionStats,
    ProductionTask,
    CuttingEquipment,
    ComponentStats,
    CacheDetails,
  },
  mixins: [drawMixin],
  data() {
    return {
      leftSections: {
        top: "day",
        middle: "day",
        bottom: "day",
      },
      bodyTabValues: {
        production: "ship", // 产量统计默认选中"船号"
        report: "process", // 报工情况默认选中"工序"
        productionTask: "day", // 生产任务情况默认选中"日"
      },
      timeRangeTabs,
      productionTabs,
      reportTabs,
      sectionRotationTimers: {
        top: null,
        middle: null,
        bottom: null,
      },
      productionTaskTimer: null,
    };
  },
  computed: {
    currentReportData() {
      return getReportData(this.bodyTabValues.report);
    },
    dailyProductionData() {
      return getDailyProductionData();
    },
    currentProductionStats() {
      return getProductionStatsData(this.bodyTabValues.production);
    },
    currentProductionTaskData() {
      return getProductionTaskData(this.bodyTabValues.productionTask);
    },
    cuttingEquipmentData() {
      return getCuttingEquipmentData();
    },
    componentStatsData() {
      return getComponentStatsData();
    },
    cacheDetailsData() {
      return getCacheDetailsData();
    },
    orderStatisticsData() {
      return getOrderStatisticsData();
    },
    cuttingStatisticsData() {
      return getCuttingStatisticsData();
    },
    equipmentStatusData() {
      return getEquipmentStatusData();
    },
  },
  methods: {
    handleTabClick(route) {
      console.log("Tab clicked:", route);
    },
    handleSectionTabClick(section, tab) {
      this.$set(this.leftSections, section, tab);
      // 用户手动点击时重置该部分的自动轮播
      this.startSectionAutoRotation(section);
    },
    handleBodyTabChange(cardName, tab) {
      this.$set(this.bodyTabValues, cardName, tab);
      console.log(`${cardName} body tab changed to:`, tab);
      // 如果是 productionTask，重启自动轮播
      if (cardName === 'productionTask') {
        this.startProductionTaskRotation();
      }
    },
    startProductionTaskRotation() {
      if (this.productionTaskTimer) {
        clearInterval(this.productionTaskTimer);
      }
      this.productionTaskTimer = setInterval(() => {
        const currentIndex = this.timeRangeTabs.findIndex(
          tab => tab.key === this.bodyTabValues.productionTask
        );
        const nextIndex = (currentIndex + 1) % this.timeRangeTabs.length;
        const nextTab = this.timeRangeTabs[nextIndex];
        this.$set(this.bodyTabValues, 'productionTask', nextTab.key);
      }, 5000); // 5秒切换一次
    },
    startSectionAutoRotation(section) {
      // 清除现有定时器
      if (this.sectionRotationTimers[section]) {
        clearInterval(this.sectionRotationTimers[section]);
      }

      // 为每个部分设置不同的轮播间隔
      const intervals = {
        top: 5000,    // 5秒
        middle: 6000, // 6秒
        bottom: 7000, // 7秒
      };

      // 启动自动轮播
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
      this.startSectionAutoRotation("middle");
      // 设备状态不需要轮播，故不启动 bottom
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
    // 启动左侧两个部分的自动轮播（设备状态不需要轮播）
    this.startAllSectionRotations();
    // 启动工单详情的自动轮播
    this.startProductionTaskRotation();
  },
  beforeDestroy() {
    // 清理所有定时器
    this.stopAllSectionRotations();
    if (this.productionTaskTimer) {
      clearInterval(this.productionTaskTimer);
    }
  },
};
</script>

<style scoped>
.container-ProfileCutting {
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
  position: relative;
}

.df-screen {
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

/* 左侧卡片内部上中下布局 */
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
  /* 让内部的section-title居中 */
  margin-bottom: 12px;
  margin-top: 20px;
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
  /* 为左右icon留出空间 */
}

.section-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  /* 增加高度以显示图标 */
  background-image: url("../../../assets/images/DF/icon-right@2x.png");
  background-size: auto;
  /* 使用原始图片大小 */
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
  /* 增加高度以显示图标 */
  background-image: url("../../../assets/images/DF/icon-left@2x.png");
  background-size: auto;
  /* 使用原始图片大小 */
  background-repeat: no-repeat;
  background-position: center;
}

/* 部分内的 Tabs */
.section-tabs {
  display: flex;
  gap: 24px;
  justify-content: flex-end;
  width: 100%;
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

.section-content p {
  margin: 8px 0;
  font-size: 26px;
  color: #b1c5ea;
  line-height: 1.5;
}

.section-content h3 {
  margin: 0 0 12px 0;
  font-size: 28px;
  color: #40d5ff;
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

/* 零部件区域左右布局 */
.component-wrapper {
  display: flex;
  gap: 20px;
  width: 100%;
  height: 100%;
}

.component-wrapper > *:not(.divider) {
  flex: 1;
  min-width: 0;
}

.component-wrapper .divider {
  width: 2px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(64, 213, 255, 0.3) 20%,
    rgba(64, 213, 255, 0.3) 80%,
    transparent
  );
}
</style>

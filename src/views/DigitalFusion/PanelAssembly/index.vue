<!--
  自动轮播示例页面

  一、Card 组件自动轮播功能：
  1. :autoRotate="true" - 启用自动轮播
  2. :rotateInterval="5000" - 设置轮播间隔（毫秒）
  3. 支持 timeRangeTabs（日/周/月）和 bodyTabsList 的自动切换
  4. 内容会随着 tab 切换自动过渡动画

  Card 示例：
  - 左上卡片：Header timeRange 自动轮播（6秒）
  - 中间卡片：Header timeRange + 内容自动轮播（4秒）
  - 右侧卡片：内部上中下三部分布局，每部分独立自动轮播

  二、右侧卡片内部布局示例：
  - 使用 flex 布局（上中下三部分）
  - 每部分独立的 tab 切换
  - 每部分独立的自动轮播（不同的间隔时间）
  - 支持 transition 动画
  - 宽度自适应，使用 gap 间距
  特点：
  - 上部分：flex: 3，5秒自动轮播
  - 中部分：flex: 4，6秒自动轮播
  - 下部分：flex: 3，7秒自动轮播

  三、MainLayout 页面自动切换功能（可选）：
  如需启用页面自动切换，请在 MainLayout 上添加：
  <MainLayout
    activeTab="TProfile"
    :autoRotate="true"
    :rotateInterval="10000"
    @tab-click="handleTabClick">

  这样会自动在所有页面间轮播：
  首页 → 智能钢板库 → 预处理产线 → ... → 平直分段 → 首页（循环）
-->
<template>
  <div class="container-PanelAssembly">
    <div class="t-profile-screen" ref="appRef">
      <MainLayout activeTab="PanelAssembly" @tab-click="handleTabClick">
        <template #left>
          <Card title="工单信息" :bodyPadding="'20px'" :showTimeRange="false" column="left" position="single"
            :totalCards="1">
            <div class="left-card-layout">
              <!-- 上部分 -->
              <div class="left-card-section" style="flex:5;">
                <div class="section-header">
                  <h3 class="section-title">工单统计</h3>
                  <div class="section-tabs">
                    <span v-for="tab in timeRangeTabs" :key="tab.key" class="section-tab"
                      :class="{ active: rightSections.top === tab.key }" @click="handleSectionTabClick('top', tab.key)">
                      {{ tab.label }}
                    </span>
                  </div>
                </div>
                <transition name="content-fade" mode="out-in">
                  <div :key="rightSections.top" class="section-content">
                    <OrderStatistics :statisticsData="orderStatisticsData" />
                  </div>
                </transition>
              </div>

              <!-- 下部分 -->
              <div class="left-card-section" style="flex:5;">
                <div class="section-header">
                  <h3 class="section-title">计划完成度</h3>
                  <div class="section-tabs">
                    <span v-for="tab in timeRangeTabs" :key="tab.key" class="section-tab"
                      :class="{ active: rightSections.bottom === tab.key }"
                      @click="handleSectionTabClick('bottom', tab.key)">
                      {{ tab.label }}
                    </span>
                  </div>
                </div>
                <transition name="content-fade" mode="out-in">
                  <div :key="rightSections.bottom" class="section-content">
                    <PlanCompletion :completionData="planCompletionData" />
                  </div>
                </transition>
              </div>
            </div>
          </Card>
        </template>


        <!-- Center Column: Top + Middle + Bottom (3 cards, center column) :titleMargin="'60px 0 0 0'" :timeTabsMargin="'90px 0 0 0'"-->
        <template #center-top>
          <Card title="工单详情" :flex="3" column="center" position="top" :totalCards="3" :showTimeRange="true"
            :timeRange="bodyTabValues.productionTask"
            @time-range-change="(tab) => handleBodyTabChange('productionTask', tab)"
            :bodyPadding="'60px 20px 20px 20px'">
            <ProductionTask :taskData="currentProductionTaskData" />
          </Card>
        </template>

        <template #center-middle>
          <Card title="报工情况" :flex="3" column="center" position="middle" :totalCards="3"
            :bodyPadding="'40px 20px 20px 20px'">
            <ReportDetails :reportData="reportDetailsData" />
          </Card>
        </template>

        <template #center-bottom>
          <Card title="缓存情况" :flex="3" column="center" position="bottom" :totalCards="3"
            :bodyPadding="'50px'">
            <CacheStatus :cacheData="cacheStatusData" />
          </Card>
        </template>


        <!-- right Column: Top + Middle + Bottom (2 cards, side column) -->
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
            :bodyPadding="'40px'" @time-range-change="(tab) => handleBodyTabChange('production', tab)">
            <ProductionStats :columns="currentProductionStats.columns" :tableData="currentProductionStats.data" />

          </Card>
        </template>
        <template #right-bottom>
          <Card title="班组" :titleMargin="'20px 0 0 0'" :flex="3" column="right" position="bottom" :totalCards="3"
            :showTimeRange="false" :bodyPadding="'40px'">
            <TeamStatus :teamData="teamStatusData" />
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
import CacheStatus from "./components/CacheStatus.vue";
import DailyProduction from "./components/DailyProduction.vue";
import OrderStatistics from "./components/OrderStatistics.vue";
import PlanCompletion from "./components/PlanCompletion.vue";
import ProductionStats from "./components/ProductionStats.vue";
import ProductionTask from "./components/ProductionTask.vue";
import ReportDetails from "./components/ReportDetails.vue";
import TeamStatus from "./components/TeamStatus.vue";
import { getCacheStatusData, getDailyProductionData, getOrderStatisticsData, getPlanCompletionData, getProductionStatsData, getProductionTaskData, getReportDetailsData, getTeamStatusData } from "./mock.js";

const timeRangeTabs = [
  { label: "日", key: "day" },
  { label: "周", key: "week" },
  { label: "月", key: "month" },
];

// 产量统计 tabs
const productionTabs = [
  { label: "工位", key: "station" },
  { label: "设备", key: "equipment" },
];

export default {
  name: "PanelAssembly",
  components: {
    Card,
    MainLayout,
    DailyProduction,
    OrderStatistics,
    PlanCompletion,
    ProductionStats,
    ProductionTask,
    CacheStatus,
    ReportDetails,
    TeamStatus,
  },
  mixins: [drawMixin],
  data() {
    return {
      timeRanges: {
        leftTop: "day",
        centerMiddle: "month",
        right: "week",
      },
      rightSections: {
        top: "day",
        middle: "week",
        bottom: "month",
      },
      bodyTabValues: {
        production: "station", // 产量统计默认选中"工位"
        productionTask: "day", // 生产任务情况默认选中"日"
      },
      timeRangeTabs,
      productionTabs,
      sectionRotationTimers: {
        top: null,
        middle: null,
        bottom: null,
      },
      productionTaskTimer: null,
    };
  },
  computed: {
    reportDetailsData() {
      return getReportDetailsData();
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
    cacheStatusData() {
      return getCacheStatusData();
    },
    teamStatusData() {
      return getTeamStatusData();
    },
    planCompletionData() {
      return getPlanCompletionData(this.rightSections.bottom);
    },
    orderStatisticsData() {
      return getOrderStatisticsData(this.rightSections.top);
    },
  },
  methods: {
    handleTabClick(route) {
      console.log("Tab clicked:", route);
    },
    handleTimeRangeChange(card, range) {
      this.$set(this.timeRanges, card, range);
      console.log(`${card} time range changed to:`, range);
    },
    handleSectionTabClick(section, tab) {
      this.$set(this.rightSections, section, tab);
      // 用户手动点击时重置该部分的自动轮播
      this.startSectionAutoRotation(section);
    },
    handleBodyTabChange(cardName, tab) {
      this.$set(this.bodyTabValues, cardName, tab);
      console.log(`${cardName} body tab changed to:`, tab);
      if (cardName === "productionTask") {
        this.startProductionTaskRotation();
      }
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
          tab => tab.key === this.rightSections[section]
        );
        const nextIndex = (currentIndex + 1) % this.timeRangeTabs.length;
        const nextTab = this.timeRangeTabs[nextIndex];
        this.$set(this.rightSections, section, nextTab.key);
      }, intervals[section]);
    },
    startAllSectionRotations() {
      this.startSectionAutoRotation("top");
      this.startSectionAutoRotation("middle");
      this.startSectionAutoRotation("bottom");
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
        this.$set(this.bodyTabValues, "productionTask", nextTab.key);
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
    // 启动右侧三个部分的自动轮播
    this.startAllSectionRotations();
    // 启动工单详情的自动轮播
    this.startProductionTaskRotation();
  },
  beforeDestroy() {
    // 清理所有定时器
    this.stopAllSectionRotations();
    if (this.productionTaskTimer) {
      clearInterval(this.productionTaskTimer);
      this.productionTaskTimer = null;
    }
  },
};
</script>

<style scoped>
.container-PanelAssembly {
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
  position: relative;
}

.t-profile-screen {
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

/* 右侧卡片内部上中下布局 */
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
</style>

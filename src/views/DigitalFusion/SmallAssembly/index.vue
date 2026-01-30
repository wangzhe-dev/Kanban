<template>
  <div class="container-SmallAssembly">
    <div class="df-screen" ref="appRef">
      <MainLayout activeTab="SmallAssembly" @tab-click="handleTabClick">
        <template #left-top>
          <Card title="工单情况" column="left" position="top" :totalCards="2" :showTimeRange="true"
            :timeRange="workOrderTimeRange" :autoRotate="true" :rotateInterval="6000"
            @time-range-change="handleWorkOrderTimeRangeChange"
            :bodyPadding="'50px'">
            <WorkOrderStatus :summaryData="workOrderSummaryData" :productCount="workOrderProgressCount" />
          </Card>
        </template>

        <template #left-bottom>
          <Card title="当日齐套情况" column="left" position="bottom" :totalCards="2" :showTimeRange="false"
            :bodyPadding="'50px'">
            <DailyKittingStatus :kittingData="dailyKittingData" />
          </Card>
        </template>

        <template #center-top>
          <Card title="工单详情" :flex="3" column="center" position="top" :totalCards="3" :showTimeRange="true"
            :timeRange="bodyTabValues.productionTask"
            @time-range-change="(tab) => handleBodyTabChange('productionTask', tab)"
            :bodyPadding="'50px'">
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

        <template #right-top>
          <Card title="当日生产" :titleMargin="'20px'" :flex="3" column="right" position="top" :totalCards="3"
            :showTimeRange="false" :bodyPadding="'60px 40px 10px 40px'">
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
import DailyKittingStatus from "./components/DailyKittingStatus.vue";
import DailyProduction from "./components/DailyProduction.vue";
import ProductionStats from "./components/ProductionStats.vue";
import ProductionTask from "./components/ProductionTask.vue";
import ReportDetails from "./components/ReportDetails.vue";
import TeamStatus from "./components/TeamStatus.vue";
import WorkOrderStatus from "./components/WorkOrderStatus.vue";
import {
  getCacheStatusData,
  getDailyKittingData,
  getDailyProductionData,
  getOrderStatisticsData,
  getProductionStatsData,
  getProductionTaskData,
  getReportDetailsData,
  getTeamStatusData,
} from "./mock.js";

const timeRangeTabs = [
  { label: "日", key: "day" },
  { label: "周", key: "week" },
  { label: "月", key: "month" },
];

const productionTabs = [
  { label: "工位", key: "station" },
  { label: "设备", key: "equipment" },
];

export default {
  name: "SmallAssembly",
  components: {
    Card,
    MainLayout,
    ReportDetails,
    DailyProduction,
    ProductionStats,
    ProductionTask,
    CacheStatus,
    TeamStatus,
    WorkOrderStatus,
    DailyKittingStatus,
  },
  mixins: [drawMixin],
  data() {
    return {
      bodyTabValues: {
        production: "station",
        productionTask: "day",
      },
      timeRangeTabs,
      productionTabs,
      productionTaskTimer: null,
      workOrderTimeRange: "day",
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
    dailyKittingData() {
      return getDailyKittingData();
    },
    workOrderSummaryData() {
      const wantedTypes = [
        "计划工单数",
        "进行中工单数",
        "待开工工单数",
        "延迟未完成工单数",
        "完成工单数",
      ];
      const data = getOrderStatisticsData(this.workOrderTimeRange);
      const mapByType = data.reduce((acc, item) => {
        acc[item.type] = item;
        return acc;
      }, {});
      return wantedTypes
        .map(type => mapByType[type])
        .filter(Boolean)
        .map(item => ({
          label: item.type,
          value: item.planned,
          unit: item.unit,
        }));
    },
    workOrderProgressCount() {
      const completed =
        this.dailyProductionData.find(i => i.title === "已完成组立数量") ||
        this.dailyProductionData.find(i => i.title === "完成数量");
      return Number(completed?.value ?? 0);
    },
  },
  methods: {
    handleTabClick(route) {
      console.log("Tab clicked:", route);
    },
    handleWorkOrderTimeRangeChange(tab) {
      this.workOrderTimeRange = tab;
    },
    handleBodyTabChange(cardName, tab) {
      this.$set(this.bodyTabValues, cardName, tab);
      if (cardName === "productionTask") {
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
        this.$set(this.bodyTabValues, "productionTask", nextTab.key);
      }, 5000);
    },
  },
  mounted() {
    this.startProductionTaskRotation();
  },
  beforeDestroy() {
    if (this.productionTaskTimer) {
      clearInterval(this.productionTaskTimer);
      this.productionTaskTimer = null;
    }
  },
};
</script>

<style scoped>
.container-SmallAssembly {
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

.placeholder-block {
  width: 100%;
  height: 100%;
  border: 1px dashed rgba(64, 213, 255, 0.35);
  border-radius: 12px;
  background: rgba(64, 213, 255, 0.05);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  padding: 16px 18px;
  color: #9fb7d8;
  box-sizing: border-box;
}

.placeholder-title {
  font-size: 26px;
  font-weight: 600;
  color: #40d5ff;
  margin: 0;
}

.placeholder-desc {
  margin: 0;
  font-size: 22px;
  color: #8fa6c6;
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

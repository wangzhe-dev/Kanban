<template>
  <div class="container-PreProcessingLine">
    <div class="df-screen" ref="appRef">
      <MainLayout activeTab="PreProcessingLine" @tab-click="handleTabClick">
        <template #left>
          <Card
            title="工单信息"
            :bodyPadding="'20px'"
            :showTimeRange="false"
            column="left"
            position="single"
            :totalCards="1">
            <div class="left-card-layout">
              <div class="left-card-section" style="flex: 5">
                <div class="section-header">
                  <h3 class="section-title">板材工单</h3>
                  <div class="section-tabs">
                    <span
                      v-for="tab in timeRangeTabs"
                      :key="tab.key"
                      class="section-tab"
                      :class="{ active: leftSections.top === tab.key }"
                      @click="handleSectionTabClick('top', tab.key)">
                      {{ tab.label }}
                    </span>
                  </div>
                </div>
                <transition name="content-fade" mode="out-in">
                  <div :key="leftSections.top" class="section-content">
                    <OrderStatistics :statisticsData="plateOrderStatisticsData" />
                  </div>
                </transition>
              </div>

              <div class="left-card-section" style="flex: 5">
                <div class="section-header">
                  <h3 class="section-title">型材工单</h3>
                  <div class="section-tabs">
                    <span
                      v-for="tab in timeRangeTabs"
                      :key="tab.key"
                      class="section-tab"
                      :class="{ active: leftSections.bottom === tab.key }"
                      @click="handleSectionTabClick('bottom', tab.key)">
                      {{ tab.label }}
                    </span>
                  </div>
                </div>
                <transition name="content-fade" mode="out-in">
                  <div :key="leftSections.bottom" class="section-content">
                    <OrderStatistics :statisticsData="profileOrderStatisticsData" />
                  </div>
                </transition>
              </div>
            </div>
          </Card>
        </template>

        <template #center-top>
          <Card
            title="预处理信息"
            :flex="3"
            column="center"
            position="top"
            :totalCards="3"
            :showTimeRange="false"
            :bodyPadding="'60px 50px 20px 50px'">
            <PreProcessingInfo
              :leftTaskCount="preProcessingInfoData.leftTaskCount"
              :leftTaskLabel="preProcessingInfoData.leftTaskLabel"
              :rightTaskCount="preProcessingInfoData.rightTaskCount"
              :rightTaskLabel="preProcessingInfoData.rightTaskLabel"
              :productionData="preProcessingInfoData.productionData" />
          </Card>
        </template>

        <template #center-middle>
          <Card
            title="钢板预处理任务详情"
            :flex="3"
            column="center"
            position="middle"
            :totalCards="3"
            :showTimeRange="true"
            :timeRange="bodyTabValues.steelPlateTask"
            @time-range-change="(tab) => handleBodyTabChange('steelPlateTask', tab)"
            :autoRotate="true"
            :rotateInterval="5000"
            :bodyPadding="'40px 20px 20px 20px'">
            <TaskDetailsTable :columns="steelPlateTaskTable.columns" :tableData="steelPlateTaskTable.data" />
          </Card>
        </template>

        <template #center-bottom>
          <Card
            title="型材预处理任务详情"
            :flex="3"
            column="center"
            position="bottom"
            :totalCards="3"
            :showTimeRange="true"
            :timeRange="bodyTabValues.profileTask"
            @time-range-change="(tab) => handleBodyTabChange('profileTask', tab)"
            :autoRotate="true"
            :rotateInterval="5500"
            :bodyPadding="'40px 20px 20px 20px'">
            <TaskDetailsTable :columns="profileTaskTable.columns" :tableData="profileTaskTable.data" />
          </Card>
        </template>

        <template #right-top>
          <Card
            title="钢板处理完成数量"
            :titleMargin="'20px 0 0 0'"
            :flex="5"
            column="right"
            position="top"
            :totalCards="2"
            :showTimeRange="true"
            :timeRange="bodyTabValues.steelPlateCompletion"
            @time-range-change="(tab) => handleBodyTabChange('steelPlateCompletion', tab)"
            :autoRotate="true"
            :rotateInterval="6000"
            :bodyPadding="'60px 20px 20px 20px'">
            <CompletionBarLineChart
              :categories="steelPlateCompletionData.categories"
              :barData="steelPlateCompletionData.counts"
              :lineData="steelPlateCompletionData.weights"
              barName="处理钢板张数"
              barUnit="张"
              lineName="钢板重量"
              lineUnit="吨" />
          </Card>
        </template>

        <template #right-bottom>
          <Card
            title="型材处理完成数量"
            :titleMargin="'20px 0 0 0'"
            :flex="5"
            column="right"
            position="bottom"
            :totalCards="2"
            :showTimeRange="true"
            :timeRange="bodyTabValues.profileCompletion"
            @time-range-change="(tab) => handleBodyTabChange('profileCompletion', tab)"
            :autoRotate="true"
            :rotateInterval="6500"
            :bodyPadding="'60px 20px 20px 20px'">
            <CompletionBarLineChart
              :categories="profileCompletionData.categories"
              :barData="profileCompletionData.counts"
              :lineData="profileCompletionData.weights"
              barName="处理型材根数"
              barUnit="根"
              lineName="型材重量"
              lineUnit="吨" />
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
import OrderStatistics from "./components/OrderStatistics.vue";
import CompletionBarLineChart from "./components/CompletionBarLineChart.vue";
import PreProcessingInfo from "./components/PreProcessingInfo.vue";
import TaskDetailsTable from "./components/TaskDetailsTable.vue";
import {
  getCompletionChartData,
  getPlateOrderStatisticsData,
  getPreProcessingInfoData,
  getProfileOrderStatisticsData,
  getProfileTaskTableData,
  getSteelPlateTaskTableData,
} from "./mock.js";

const timeRangeTabs = [
  { label: "日", key: "day" },
  { label: "周", key: "week" },
  { label: "月", key: "month" },
];

export default {
  name: "PreProcessingLine",
  components: {
    Card,
    MainLayout,
    OrderStatistics,
    PreProcessingInfo,
    TaskDetailsTable,
    CompletionBarLineChart,
  },
  mixins: [drawMixin],
  data() {
    return {
      timeRangeTabs,
      leftSections: {
        top: "day",
        bottom: "day",
      },
      leftRotationTimers: {
        top: null,
        bottom: null,
      },
      bodyTabValues: {
        steelPlateTask: "day",
        profileTask: "day",
        steelPlateCompletion: "day",
        profileCompletion: "day",
      },
    };
  },
  computed: {
    plateOrderStatisticsData() {
      return getPlateOrderStatisticsData(this.leftSections.top);
    },
    profileOrderStatisticsData() {
      return getProfileOrderStatisticsData(this.leftSections.bottom);
    },
    preProcessingInfoData() {
      return getPreProcessingInfoData("day");
    },
    steelPlateTaskTable() {
      return getSteelPlateTaskTableData(this.bodyTabValues.steelPlateTask);
    },
    profileTaskTable() {
      return getProfileTaskTableData(this.bodyTabValues.profileTask);
    },
    steelPlateCompletionData() {
      return getCompletionChartData("steelPlate", this.bodyTabValues.steelPlateCompletion);
    },
    profileCompletionData() {
      return getCompletionChartData("profile", this.bodyTabValues.profileCompletion);
    },
  },
  methods: {
    handleTabClick(route) {
      console.log("Tab clicked:", route);
    },
    handleSectionTabClick(section, tab) {
      this.$set(this.leftSections, section, tab);
      this.startLeftSectionAutoRotation(section);
    },
    handleBodyTabChange(cardName, tab) {
      this.$set(this.bodyTabValues, cardName, tab);
    },
    startLeftSectionAutoRotation(section) {
      if (this.leftRotationTimers[section]) {
        clearInterval(this.leftRotationTimers[section]);
      }

      const intervals = {
        top: 5000,
        bottom: 6000,
      };

      this.leftRotationTimers[section] = setInterval(() => {
        const currentIndex = this.timeRangeTabs.findIndex((t) => t.key === this.leftSections[section]);
        const nextIndex = (currentIndex + 1) % this.timeRangeTabs.length;
        const nextTab = this.timeRangeTabs[nextIndex];
        this.$set(this.leftSections, section, nextTab.key);
      }, intervals[section] || 5000);
    },
    startAllLeftRotations() {
      this.startLeftSectionAutoRotation("top");
      this.startLeftSectionAutoRotation("bottom");
    },
    stopAllLeftRotations() {
      Object.keys(this.leftRotationTimers).forEach((section) => {
        if (this.leftRotationTimers[section]) {
          clearInterval(this.leftRotationTimers[section]);
          this.leftRotationTimers[section] = null;
        }
      });
    },
  },
  mounted() {
    this.startAllLeftRotations();
  },
  beforeDestroy() {
    this.stopAllLeftRotations();
  },
};
</script>

<style scoped>
.container-PreProcessingLine {
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

.section-content {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 8px 0;
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

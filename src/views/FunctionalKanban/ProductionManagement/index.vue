<template>
  <div class="container-ProductionManagement">
    <div class="df-screen" ref="appRef">
      <FunctionalKanbanLayout activeTab="ProductionManagement" centerWidth="34%" @tab-click="handleTabClick">
        <!-- Left Column: 3 cards -->
        <template #left-top>
          <Card title="分段建造产能" :flex="3" column="left" position="top" :totalCards="3" :headerTop="'10px'"
            :backgroundImage="cardBg" :bodyPadding="'10px 20px 0px 20px'">
            <SegmentCapacityOverview :data="mockData.segmentCapacityOverview" />

          </Card>
        </template>

        <template #left-middle>
          <Card title="人员工时" :flex="3" column="left" position="middle" :totalCards="3" :headerTop="'10px'"
            :backgroundImage="cardBg">
            <div class="work-hours">
              <WorkHoursCard :data="mockData.workHours" />
            </div>
          </Card>
        </template>

        <template #left-bottom>
          <Card title="当日生产&物量" :flex="4" column="left" position="bottom" :totalCards="3" headerTop="15px"
            :headerTabTop="'0px'" :show-time-range="true" :time-range="leftBottomView"
            :custom-time-range-tabs="leftBottomTabs" @time-range-change="handleLeftBottomViewChange"
            :active-tab-bg-image="tabActiveBg" :bodyPadding="'20px'" :backgroundImage="cardBg">
            <ProductionProgressTable v-if="leftBottomView === 'progress'" :rows="mockData.productionProgress.day" />
            <MaterialStatisticsChart v-else :chartData="mockData.materialStatistics.day" />
          </Card>
        </template>

        <!-- Center Column: 2 cards -->
        <template #center-top>
          <Card title="" :flex="6" column="center" position="top" :totalCards="2" :backgroundImage="znCenterBg">
          </Card>
        </template>

        <template #center-bottom>
          <Card title="各产线-数据监控" :flex="4" column="right" position="top" :totalCards="3" :headerTop="'20px'"
            :bodyPadding="'50px 30px 30px 30px'" :backgroundImage="cardBg">
            <FusionRouterGrid />
          </Card>
        </template>
        <template #right-top>
          <Card title="本月进度" :flex="3" column="right" position="bottom" :totalCards="3" :headerTop="'10px'"
            :backgroundImage="cardBg">
            <div class="monthly-progress">
              <MonthlyWorkOrderProgress :items="mockData.monthlyWorkOrderProgress" />
            </div>
          </Card>
        </template>
        <template #right-middle>
          <Card title="产线达成率" :flex="3" column="right" position="middle" :totalCards="3" :headerTop="'10px'"
            :backgroundImage="cardBg">
            <div class="achievement-rate">
              <ProductionLineAchievementRate :items="mockData.lineAchievementRates" />
            </div>
          </Card>
        </template>

        <template #right-bottom>
          <Card title="生产信息情况" :flex="4" column="right" position="bottom" :totalCards="3" :headerTop="'20px'"
            :backgroundImage="cardBg">
            <div class="production-info">
              <ProductionInfoTable :rows="mockData.productionInfoRows" />
            </div>
          </Card>
        </template>


      </FunctionalKanbanLayout>
    </div>
  </div>
</template>

<script>
import cardBg from "@/assets/images/cx/bg-1@2x.png";
import znCenterBg from "@/assets/images/ZN/scgl1.png";
import drawMixin from "@/mixin/drawMixin.js";
import Card from "@/views/DigitalFusion/components/Card.vue";
import FunctionalKanbanLayout from "../components/FunctionalKanbanLayout.vue";
import FusionRouterGrid from "./components/FusionRouterGrid.vue";
import MaterialStatisticsChart from "./components/MaterialStatisticsChart.vue";
import MonthlyWorkOrderProgress from "./components/MonthlyWorkOrderProgress.vue";
import ProductionInfoTable from "./components/ProductionInfoTable.vue";
import ProductionLineAchievementRate from "./components/ProductionLineAchievementRate.vue";
import ProductionProgressTable from "./components/ProductionProgressTable.vue";
import SegmentCapacityOverview from "./components/SegmentCapacityOverview.vue";
import WorkHoursCard from "./components/WorkHoursCard.vue";
import mockData from "./mock.js";

export default {
  name: "ProductionManagement",
  components: {
    FunctionalKanbanLayout,
    Card,
    ProductionLineAchievementRate,
    MonthlyWorkOrderProgress,
    FusionRouterGrid,
    ProductionInfoTable,
    ProductionProgressTable,
    MaterialStatisticsChart,
    SegmentCapacityOverview,
    WorkHoursCard,
  },
  mixins: [drawMixin],
  data() {
    return {
      cardBg,
      mockData,
      znCenterBg,
      tabActiveBg: require("@/assets/images/cx/tab-选中@2x-1.png"),
      leftBottomView: "progress",
      leftBottomTabs: [
        { label: "生产进度", key: "progress" },
        { label: "物量统计", key: "material" },
      ],
    };
  },
  methods: {
    handleTabClick(route) {
      if (route) {
        this.$router.push(route);
      }
    },
    handleLeftBottomViewChange(key) {
      this.leftBottomView = key;
    },
  },
  mounted() {
    // 初始化数据
  },
};
</script>

<style scoped>
.container-ProductionManagement {
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
  position: relative;
}

.achievement-rate {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
}

.segment-capacity {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
}

.work-hours {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
}

.monthly-progress {
  height: 100%;
}

.fusion-router-grid {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
}

.production-info {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
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
</style>

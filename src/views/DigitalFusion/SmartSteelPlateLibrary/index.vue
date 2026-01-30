<template>
  <div class="container-SmartSteelPlateLibrary">
    <div class="df-screen" ref="appRef">
      <MainLayout activeTab="SmartSteelPlateLibrary" @tab-click="handleTabClick">
        <!-- Left Column -->
        <template #left-top>
          <Card title="钢板库情况" :flex="5" column="left" position="top" :bodyPadding="'60px 20px 20px 20px'"
            :totalCards="2">
            <SteelPlateSummary :summaryData="steelPlateSummaryData" />
          </Card>
        </template>

        <template #left-bottom>
          <Card title="出入库累计" :flex="5" column="left" position="bottom" :totalCards="2"
            :bodyPadding="'0px 20px 20px 20px'">
            <EntryExitPie :pieData="entryExitPieData.pie" :bottomStats="entryExitPieData.bottom" />
          </Card>
        </template>

        <!-- Center Column -->
        <template #center-top>
          <Card title="钢板库存" :flex="5" column="center" position="top" :totalCards="2" :bodyPadding="'50px 30px 20px 30px'">
            <SteelPlateStock :layout="steelPlateStockLayout" :plateInfoData="plateInfoData" />
          </Card>
        </template>

        <template #center-bottom>
          <Card title="钢板信息" :flex="5" column="center" position="bottom" :totalCards="2" :bodyPadding="'50px 30px 20px 30px'">
            <PlateInfoTable :plateInfoData="plateInfoData" />
          </Card>
        </template>

        <!-- Right Column -->
        <template #right-top>
          <Card title="实时库存" :flex="5" column="right" position="top" :totalCards="2"
            :bodyPadding="'60px 20px 20px 20px'">
            <SteelPlateSummary :summaryData="realTimeInventoryData" />
          </Card>
        </template>

        <template #right-bottom>
          <Card title="物流调度单进度" :flex="5" column="right" position="bottom" :totalCards="2" :bodyPadding="'50px 30px 20px 30px'">
            <LogisticsProgressTable :progressData="logisticsProgressData" />
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
import EntryExitPie from "./components/EntryExitPie.vue";
import LogisticsProgressTable from "./components/LogisticsProgressTable.vue";
import PlateInfoTable from "./components/PlateInfoTable.vue";
import SteelPlateStock from "./components/SteelPlateStock.vue";
import SteelPlateSummary from "./components/SteelPlateSummary.vue";
import {
  getEntryExitPieData,
  getLogisticsProgressData,
  getRealTimeInventoryData,
  getSteelPlateInfoData,
  getSteelPlateStockLayout,
  getSteelPlateSummaryData,
} from "./mock.js";

export default {
  name: "SmartSteelPlateLibrary",
  components: {
    Card,
    MainLayout,
    EntryExitPie,
    LogisticsProgressTable,
    SteelPlateSummary,
    SteelPlateStock,
    PlateInfoTable,
  },
  mixins: [drawMixin],
  data() {
    return {
      entryExitPieData: getEntryExitPieData(),
      steelPlateStockLayout: getSteelPlateStockLayout(),
      steelPlateSummaryData: getSteelPlateSummaryData(),
      realTimeInventoryData: getRealTimeInventoryData(),
      logisticsProgressData: getLogisticsProgressData(),
      plateInfoData: getSteelPlateInfoData(),
    };
  },
  methods: {
    handleTabClick(route) {
      console.log("Tab clicked:", route);
    },
  },
};
</script>

<style scoped>
.container-SmartSteelPlateLibrary {
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

.card-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: rgba(255, 255, 255, 0.75);
  text-align: center;
  padding: 24px;
  box-sizing: border-box;
}
</style>

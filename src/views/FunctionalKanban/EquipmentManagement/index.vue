<template>
  <div class="container-EquipmentManagement">
    <div class="df-screen" ref="appRef">
      <FunctionalKanbanLayout activeTab="EquipmentManagement" centerWidth="34%" @tab-click="handleTabClick">
        <template #left-top>
          <Card title="设备监控状态（月）" :flex="3" column="left" position="top" :totalCards="3" :headerTop="'10px'"
            :backgroundImage="cardBg" :bodyPadding="'10px 20px 0px 20px'">
            <EquipmentMonitorSummary :total="88" :monthlyInspectionOrders="0" :monthlySpotCheckOrders="0"
              :monthlyRepairOrders="0" utilizationRate="9%" />
          </Card>
        </template>
        <template #left-middle>
          <Card title="设备点检" :flex="4" column="left" position="middle" :totalCards="3" headerTop="15px"
            :bodyPadding="'20px'" :backgroundImage="cardBg">
            <InspectionRateTable :rows="inspectionRateRows" />
          </Card>
        </template>
        <template #left-bottom>
          <Card title="智慧设备" :flex="3" column="left" position="bottom" :totalCards="3" :headerTop="'10px'"
            :bodyPadding="'20px'" :backgroundImage="cardBg">
            <SmartEquipmentBarChart :items="smartEquipmentItems" />
          </Card>
        </template>



        <!-- Center Column: 2 cards -->
        <template #center-top>
          <Card title="" :flex="2" column="center" position="top" :totalCards="2">
            <OnlineRatePanel :total="88" :online="87" rate="99%" />
          </Card>
        </template>
        <template #center-middle>
          <Card title="设备正常运行趋势" :flex="4" column="center" position="bottom" :totalCards="4" :headerTop="'20px'"
            :bodyPadding="'50px 30px 30px 30px'" :backgroundImage="cardBg" :show-time-range="true" headerTabTop="-10px"
            :time-range="centerTrendRange" @time-range-change="handleCenterTrendRangeChange" :autoRotate="true"
            :rotateInterval="5000">
            <MaintenancePlanCenter :time-range="centerTrendRange" />
          </Card>
        </template>

        <template #center-bottom>
          <Card title="各产线-数据监控" :flex="4" column="right" position="top" :totalCards="3" :headerTop="'20px'"
            :bodyPadding="'50px 30px 30px 30px'" :backgroundImage="cardBg">
            <EquipmentLineMonitoringGrid :items="equipmentLineMonitoringItems" />
          </Card>
        </template>

        <!-- Right Column: 3 cards -->
        <template #right-top>
          <Card title="设备稼动率" :flex="3" column="right" position="top" :totalCards="3" :headerTop="'10px'"
            :bodyPadding="'20px'" :backgroundImage="cardBg">
            <EquipmentAvailabilityRatePanel :overallRate="51.44" :rows="availabilityRows" />
          </Card>
        </template>

        <template #right-middle>
          <Card title="设备利用率" :flex="3" column="right" position="middle" :totalCards="3" :headerTop="'10px'"
            :bodyPadding="'10px 0 0 0'" :backgroundImage="cardBg">
            <EquipmentUtilizationGrid :leftItems="utilizationLeft" :rightItems="utilizationRight" />
          </Card>
        </template>

        <template #right-bottom>
          <Card title="异常设备运行状况（日）" :flex="3" column="right" position="bottom" :totalCards="3" :headerTop="'10px'"
            :bodyPadding="'20px'" :backgroundImage="cardBg">
            <AbnormalDurationStackedBar :rows="abnormalDurationRows" />
          </Card>
        </template>
      </FunctionalKanbanLayout>
    </div>
  </div>
</template>

<script>
import cardBg from "@/assets/images/cx/bg-1@2x.png";
import znCenterBg from "@/assets/images/ZN/zn_c_bg.png";
import drawMixin from "@/mixin/drawMixin.js";
import Card from "@/views/DigitalFusion/components/Card.vue";
import FunctionalKanbanLayout from "../components/FunctionalKanbanLayout.vue";
import AbnormalDurationStackedBar from "./components/AbnormalDurationStackedBar.vue";
import EquipmentAvailabilityRatePanel from "./components/EquipmentAvailabilityRatePanel.vue";
import EquipmentLineMonitoringGrid from "./components/EquipmentLineMonitoringGrid.vue";
import EquipmentMonitorSummary from "./components/EquipmentMonitorSummary.vue";
import EquipmentUtilizationGrid from "./components/EquipmentUtilizationGrid.vue";
import InspectionRateTable from "./components/InspectionRateTable.vue";
import MaintenancePlanCenter from "./components/MaintenancePlanCenter.vue";
import OnlineRatePanel from "./components/OnlineRatePanel.vue";
import SmartEquipmentBarChart from "./components/SmartEquipmentBarChart.vue";
import mockData from "./mock.js";

export default {
  name: "EquipmentManagement",
  components: {
    FunctionalKanbanLayout,
    Card,
    AbnormalDurationStackedBar,
    EquipmentLineMonitoringGrid,
    EquipmentMonitorSummary,
    EquipmentAvailabilityRatePanel,
    EquipmentUtilizationGrid,
    InspectionRateTable,
    MaintenancePlanCenter,
    OnlineRatePanel,
    SmartEquipmentBarChart,
  },
  mixins: [drawMixin],
  data() {
    return {
      cardBg,
      znCenterBg,
      mockData,
      centerTrendRange: "day",
      centerTrendTabs: [
        { label: "日", key: "day" },
        { label: "周", key: "week" },
        { label: "月", key: "month" },
      ],
      smartEquipmentItems: [
        { code: "HJ-FD01", name: "平直分段智能生产线-3", value: 1 },
        { code: "HJ-FD03", name: "平直分段智能生产线-1", value: 1 },
        { code: "ZNGBK", name: "智能钢板库", value: 1 },
        { code: "YCL-BC", name: "钢板预处理线", value: 6 },
        { code: "YCL-XC", name: "型材预处理线", value: 1 },
        { code: "QQ-BC", name: "型材分段智能生产线", value: 1 },
        { code: "QQ-XC", name: "型材下料智能生产线", value: 1 },
        { code: "HJ-TP", name: "小组立智能生产线", value: 1 },
        { code: "HJ-XZ", name: "T型材智能生产线", value: 1 },
        { code: "HJ-PT", name: "片体拼板智能生产线", value: 1 },
        { code: "HJ-FD02", name: "钢板下料智能生产线", value: 1 },
      ],
      abnormalDurationRows: [
        { name: "T型材智能产线", waiting: 1200, preparation: 30, downtime: 50, emergencyStop: 0 },
        { name: "钢板下料分拣智能产线", waiting: 0, preparation: 30, downtime: 100, emergencyStop: 0 },
        { name: "钢板预处理线", waiting: 1000, preparation: 30, downtime: 0, emergencyStop: 40 },
        { name: "小组立智能产线", waiting: 0, preparation: 0, downtime: 0, emergencyStop: 30 },
        { name: "型材下料智能产线", waiting: 0, preparation: 40, downtime: 30, emergencyStop: 0 },
        { name: "型材预处理线", waiting: 0, preparation: 0, downtime: 0, emergencyStop: 0 },
        { name: "智能钢板库", waiting: 1000, preparation: 70, downtime: 20, emergencyStop: 100 },
      ],
      inspectionRateRows: [
        { line: "钢板预处理线", today: 0, total: 0 },
        { line: "型材预处理线", today: 0, total: 0 },
        { line: "钢板下科分拣智能产线", today: 0, total: 0 },
        { line: "型材下科智能产线", today: 0, total: 0 },
        { line: "小组立智能产线", today: 0, total: 0 },
        { line: "T型材智能产线", today: 0, total: 0 },
        { line: "片体拼版智能产线", today: 0, total: 0 },
        { line: "平直分段智能产线", today: 0, total: 0 },
      ],
      utilizationLeft: [
        { line: "钢板预处理线", used: 6, total: 6 },
        { line: "型材预处理线", used: 6, total: 6 },
        { line: "钢板下科分拣智能产线", used: 6, total: 6 },
        { line: "型材下科智能产线", used: 6, total: 6 },
      ],
      utilizationRight: [
        { line: "小组立智能产线", used: 6, total: 6 },
        { line: "T型材智能产线", used: 6, total: 6 },
        { line: "片体拼版智能产线", used: 6, total: 6 },
        { line: "平直分段智能产线", used: 6, total: 6 },
      ],
      availabilityRows: [
        { lineName: "钢板预处理线", deviceName: "设备-01", stationName: "工位-01", rate: 52.13 },
        { lineName: "型材预处理线", deviceName: "设备-02", stationName: "工位-02", rate: 48.76 },
        { lineName: "钢板下科分拣智能产线", deviceName: "设备-03", stationName: "工位-01", rate: 61.04 },
        { lineName: "型材下科智能产线", deviceName: "设备-04", stationName: "工位-03", rate: 55.88 },
        { lineName: "小组立智能产线", deviceName: "设备-05", stationName: "工位-02", rate: 50.32 },
        { lineName: "T型材智能产线", deviceName: "设备-06", stationName: "工位-01", rate: 53.90 },
        { lineName: "片体拼版智能产线", deviceName: "设备-07", stationName: "工位-04", rate: 46.21 },
        { lineName: "平直分段智能产线", deviceName: "设备-08", stationName: "工位-02", rate: 58.67 },
      ],
      equipmentLineMonitoringItems: [
        { label: "西部车间智控中心", routeName: "" },
        { label: "钢板料理间", routeName: "" },
        { label: "钢板下料分拣", routeName: "" },
        { label: "激光切割区监控", routeName: "" },
        { label: "激光分拣区监控", routeName: "" },
        { label: "DIG型材线", routeName: "" },
        { label: "智能T排焊接", routeName: "" },
        { label: "智能小组立焊接", routeName: "" },
        { label: "智能分段焊接", routeName: "" },
      ],
      leftBottomView: "inspection",
      leftBottomTabs: [
        { label: "点检率", key: "inspection" },
        { label: "联网率", key: "online" },
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
    handleCenterTrendRangeChange(range) {
      this.centerTrendRange = range;
    },
  },
  mounted() {
    // 初始化数据
  },
};
</script>

<style scoped>
.container-EquipmentManagement {
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
  position: relative;
}

.fk-main-layout {
  background-image: url("../../../assets/images//ZN/shebei/sb1.gif");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 82%;
}

.df-card {
  background: rgba(0, 0, 0, 0.1) !important;
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

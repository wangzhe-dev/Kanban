<template>
  <div class="container-EnergyManagement">
    <div class="df-screen" ref="appRef">
      <FunctionalKanbanLayout activeTab="EnergyManagement" centerWidth="34%" @tab-click="handleTabClick">
        <template #left-top>
          <Card title="能源消耗" :flex="3" column="left" position="top" :totalCards="3" :headerTop="'10px'"
            :backgroundImage="cardBg" :bodyPadding="'10px 20px 0px 20px'">
            <EnergyConsumptionPanel :percent="energyConsumption.percent" :icon="energyConsumption.icon"
              :metrics="energyConsumption.metrics" />
          </Card>
        </template>
        <template #left-middle>
          <Card title="单位能耗" :flex="3" column="left" position="middle" :totalCards="3" headerTop="10px"
            :bodyPadding="'20px'" :backgroundImage="cardBg">
            <UnitEnergyPanel :cards="unitEnergyCards" />
          </Card>
        </template>
        <template #left-bottom>
          <Card title="清洁能源发电趋势" :flex="4" column="left" position="bottom" :totalCards="3" :headerTop="'20px'"
            :bodyPadding="'20px'" :backgroundImage="cardBg">
            <CleanEnergyTrendChart :labels="cleanEnergyTrend.labels" :values="cleanEnergyTrend.values"
              :unit="cleanEnergyTrend.unit" />
          </Card>
        </template>

        <!-- Center Column: 2 cards -->
        <template #center-top>
          <Card title="" :flex="6" column="center" position="top" :totalCards="2" :backgroundImage="znCenterBg">
            <!-- <MaintenancePlanCenter /> -->
          </Card>
        </template>

        <template #center-bottom>
          <Card title="车间综合能耗"  headerTabTop="-10px" :flex="4" column="right" position="top" :totalCards="3" :headerTop="'20px'"
            :bodyPadding="'50px 30px 30px 30px'" :backgroundImage="cardBg" :showTimeRange="true"
            :timeRange="workshopEnergyTab" @time-range-change="handleWorkshopEnergyTabChange">
            <WorkshopEnergyBarChart :categories="activeWorkshopEnergy.categories" :values="activeWorkshopEnergy.values"
              :unit="activeWorkshopEnergy.unit" :yMax="activeWorkshopEnergy.yMax" />
          </Card>
        </template>

        <!-- Right Column: 3 cards -->
        <template #right-top>
          <Card title="万元产值综合能耗" :flex="3" column="right" position="top" :totalCards="3" :headerTop="'10px'"
            :bodyPadding="'20px'" :backgroundImage="cardBg">
            <OutputEnergyCostPanel :icon="outputEnergyCost.icon" :label="outputEnergyCost.label"
              :value="outputEnergyCost.value" :unit="outputEnergyCost.unit" :tips="outputEnergyCost.tips" />
          </Card>
        </template>

        <template #right-middle>
          <Card title="产线水电气消耗" :flex="3" column="right" position="middle" :totalCards="3" :headerTop="'10px'"
            :bodyPadding="'10px 0 0 0'" :backgroundImage="cardBg">
            <WaterPowerGasPanel :items="waterPowerGasItems" />
          </Card>
        </template>

        <template #right-bottom>
          <Card title="产线能耗统计"  headerTabTop="-10px"  :flex="4" column="right" position="bottom" :totalCards="3" :headerTop="'20px'"
            :bodyPadding="'20px'" :backgroundImage="cardBg" :showTimeRange="true" :custom-time-range-tabs="energyLineTabs"
            :timeRange="energyLineTab" @time-range-change="handleEnergyLineTabChange">
            <LineEnergyBarChart :categories="activeLineEnergy.categories" :values="activeLineEnergy.values"
              :unit="activeLineEnergy.unit" />
          </Card>
        </template>
      </FunctionalKanbanLayout>
    </div>
  </div>
</template>

<script>
import cardBg from "@/assets/images/cx/bg-1@2x.png";
import znCenterBg from "@/assets/images/ZN/nh/n5.png";
import drawMixin from "@/mixin/drawMixin.js";
import Card from "@/views/DigitalFusion/components/Card.vue";
import FunctionalKanbanLayout from "../components/FunctionalKanbanLayout.vue";
import MaintenancePlanCenter from "../EquipmentManagement/components/MaintenancePlanCenter.vue";
import LineEnergyBarChart from "./components/LineEnergyBarChart.vue";
import energyMock from "./mock";
import CleanEnergyTrendChart from "./components/CleanEnergyTrendChart.vue";
import WorkshopEnergyBarChart from "./components/WorkshopEnergyBarChart.vue";
import UnitEnergyPanel from "./components/UnitEnergyPanel.vue";
import WaterPowerGasPanel from "./components/WaterPowerGasPanel.vue";
import EnergyConsumptionPanel from "./components/EnergyConsumptionPanel.vue";
import OutputEnergyCostPanel from "./components/OutputEnergyCostPanel.vue";

export default {
  name: "EnergyManagement",
  components: {
    FunctionalKanbanLayout,
    Card,
    MaintenancePlanCenter,
    LineEnergyBarChart,
    CleanEnergyTrendChart,
    WorkshopEnergyBarChart,
    UnitEnergyPanel,
    WaterPowerGasPanel,
    EnergyConsumptionPanel,
    OutputEnergyCostPanel,
  },
  mixins: [drawMixin],
  data() {
    return {
      cardBg,
      znCenterBg,
      energyLineTabs: [
        { label: "耗电", key: "power" },
        { label: "耗气", key: "gas" },
      ],
      energyLineTab: "power",
      workshopEnergyTab: "month",
    };
  },
  computed: {
    activeLineEnergy() {
      const stats = energyMock.lineEnergyStats || {};
      return stats[this.energyLineTab] || { categories: [], values: [], unit: "" };
    },
    cleanEnergyTrend() {
      return energyMock.cleanEnergyTrend || { labels: [], values: [], unit: "kWh" };
    },
    activeWorkshopEnergy() {
      const stats = energyMock.workshopEnergyStats || {};
      return stats[this.workshopEnergyTab] || { categories: [], values: [], unit: "kWh", yMax: 0 };
    },
    unitEnergyCards() {
      return energyMock.unitEnergyCards || [];
    },
    waterPowerGasItems() {
      return (energyMock.waterPowerGasStats && energyMock.waterPowerGasStats.items) || [];
    },
    energyConsumption() {
      return energyMock.energyConsumption || { percent: 0, icon: "", metrics: [] };
    },
    outputEnergyCost() {
      return energyMock.outputEnergyCost || { icon: "", label: "", value: 0, unit: "", tips: "" };
    },
  },
  methods: {
    handleTabClick(route) {
      if (route) {
        this.$router.push(route);
      }
    },
    handleEnergyLineTabChange(tab) {
      this.energyLineTab = tab;
    },
    handleWorkshopEnergyTabChange(tab) {
      this.workshopEnergyTab = tab;
    },
  },
  mounted() {
    // 初始化数据
  },
};
</script>

<style scoped>
.container-EnergyManagement {
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
</style>

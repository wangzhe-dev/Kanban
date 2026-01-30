<template>
  <div class="container-FunctionalKanbanHome">
    <div class="df-screen" ref="appRef">
      <FunctionalKanbanLayout activeTab="FunctionalKanbanHome" centerWidth="32%" @tab-click="handleTabClick">
        <!-- Left Column: 2 cards -->
        <template #left-top>
          <Card title="生产总览" headerTop="15px" headerTabTop="-10px" :flex="5" column="left" position="top" :totalCards="2"
            bodyPadding="40px 0 0 0"
            :backgroundImage="cardBg3"
            :showTimeRange="true"
            :timeRange="productionOverviewTab"
            @time-range-change="handleProductionOverviewTabChange"
            :autoRotate="true"
            >
            <ProductionOverview :logistics-top-bg="logisticsTopBg" :logistics-kpis="logisticsKpis"
              :kpi-colors="kpiColors" :rows="productionOverviewData" />
          </Card>
        </template>

        <template #left-bottom>
          <Card title="库存管理" headerTop="15px" :flex="5" column="left" position="bottom" :totalCards="2"
            :backgroundImage="cardBg3">
            <div style="padding: 20px;">
              <!-- 关键指标内容 -->
            </div>
          </Card>
        </template>

        <!-- Center Column: 2 cards -->
        <template #center-top>
          <Card title="" :flex="6" column="center" position="top" :totalCards="2" :backgroundImage="''">
            <div style="padding: 20px;">
              <!-- 实时数据内容 -->
            </div>
          </Card>
        </template>

        <template #center-bottom>
          <Card title="安灯管理(实况)" headerTop="20px" :flex="4" column="center" position="bottom" :totalCards="2" :backgroundImage="cardBg">
            <div style="padding: 20px;">
              <!-- 任务进度内容 -->
            </div>
          </Card>
        </template>

        <!-- Right Column: 3 cards -->
        <template #right-top>
          <Card title="能源管理" :flex="3" headerTop="15px" column="right" position="top" :totalCards="4" :backgroundImage="cardBg">
            <div style="padding: 20px;">
              <!-- 能源管理内容 -->
            </div>
          </Card>
        </template>

        <template #right-middle>
          <Card title="设备指标（实况）" :flex="3" headerTop="15px" column="right" position="middle" :totalCards="3" :backgroundImage="cardBg">
            <div style="padding: 20px;">
              <!-- 设备指标（实况） -->
            </div>
          </Card>
        </template>

        <template #right-bottom>
          <Card title="实时监控" :flex="3" headerTop="15px" column="right" position="bottom" :totalCards="3" :backgroundImage="cardBg">
            <div style="padding: 20px;">
              <!-- 实时监控内容 -->
            </div>
          </Card>
        </template>
      </FunctionalKanbanLayout>
    </div>
  </div>
</template>

<script>
import cardBg from "@/assets/images/cx/bg-1@2x.png";
import cardBg3 from "@/assets/images/cx/bg-3.png";
import logisticsTopBg from "@/assets/images/ZN/shebei/d24.png";
import drawMixin from "@/mixin/drawMixin.js";
import Card from "@/views/DigitalFusion/components/Card.vue";
import FunctionalKanbanLayout from "../components/FunctionalKanbanLayout.vue";
import ProductionOverview from "./components/ProductionOverview.vue";
import mockData from "./mock.js";
export default {
  name: "FunctionalKanbanHome",
  components: { FunctionalKanbanLayout, Card, ProductionOverview },
  mixins: [drawMixin],
  data() {
    return {
      logisticsTopBg,
      cardBg,
      cardBg3,
      kpiColors: ['#ffcc00', '#00d9ff', '#ff6600', '#52c41a', '#69c0ff'],
      mockData,
      logisticsKpis: [
        { key: "kitting", label: "完成分段数", value: 92 },
        { key: "dispatch", label: "计划分段数", value: 88 },
        { key: "temp", label: "进行中分段数", value: 14 },
      ],
      productionOverviewTab: "day", //
      timeRangeTabs: [
        { label: "日", key: "day" },
        { label: "周", key: "week" },
        { label: "月", key: "month" },
      ],
    };
  },
  computed: {
    productionOverviewData() {
      switch (this.productionOverviewTab) {
        case "week":
          return this.mockData.productionLineProgress.map((item) => ({
            ...item,
            plan: Math.floor(item.plan * 5.5),
            actual: Math.floor(item.actual * 5.2 + Math.random() * 100),
          }));
        case "month":
          return this.mockData.productionLineProgress.map((item) => ({
            ...item,
            plan: item.plan * 22,
            actual: Math.floor(item.actual * 21.5 + Math.random() * 400),
          }));
        case "day":
        default:
          return this.mockData.productionLineProgress;
      }
    },
  },
  methods: {
    handleTabClick(route) {
      if (route) {
        this.$router.push(route);
      }
    },
    handleProductionOverviewTabChange(tab) {
      this.productionOverviewTab = tab;
    },
  },
  mounted() {
    // 初始化数据
  },
};
</script>

<style scoped>
.container-FunctionalKanbanHome {
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

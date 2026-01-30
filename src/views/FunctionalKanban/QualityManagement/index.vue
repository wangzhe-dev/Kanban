<template>
  <div class="container-QualityManagement">
    <div class="df-screen" ref="appRef">
      <FunctionalKanbanLayout activeTab="QualityManagement" centerWidth="34%" @tab-click="handleTabClick">
        <template #left-top>
          <Card title="抽检状况（日）" :flex="3" column="left" position="top" :totalCards="3" :headerTop="'10px'"
            :backgroundImage="cardBg" :bodyPadding="'0px'">
            <div class="sampling-inspection">
              <SamplingInspectionCard :data="samplingInspection" />
            </div>
          </Card>
        </template>
        <template #left-middle>
          <Card title="分段状况（周）" :flex="3" column="left" position="middle" :totalCards="3" headerTop="10px"
            :bodyPadding="'20px'" :backgroundImage="cardBg">
            <SegmentAccuracyTable :rows="segmentAccuracyWeekRows" />
          </Card>
        </template>
        <template #left-bottom>
          <Card title="探伤合格（周）" :flex="4" column="left" position="bottom" :totalCards="3" :headerTop="'20px'"
            :bodyPadding="'20px'" :backgroundImage="cardBg">
            <NdtQualifiedRateChart :rows="ndtQualificationWeekRows" />
          </Card>
        </template>

        <!-- Center Column: 2 cards -->
        <template #center-top>
          <Card title="" :flex="6" column="center" position="top" :totalCards="2" :backgroundImage="znCenterBg">
          </Card>
        </template>

        <template #center-bottom>
          <Card title="焊磨比（日）" :flex="4" column="right" position="top" :totalCards="3" :headerTop="'20px'"
            :bodyPadding="'0px'" :backgroundImage="cardBg">
            <div class="welding-grinding">
              <WeldingGrindingRatioCard :data="weldingGrindingRatio" />
            </div>
          </Card>
        </template>

        <!-- Right Column: 3 cards -->
        <template #right-top>
          <Card title="报验合格率（日）" :flex="3" column="right" position="top" :totalCards="3" :headerTop="'10px'"
            :bodyPadding="'20px'" :backgroundImage="cardBg">
            <div class="ndt-pie-grid">
              <NdtQualifiedPieCard
                v-for="(item, index) in ndtQualificationDailyCards"
                :key="item.key || index"
                :title="item.title"
                :value="item.value"
                :total="item.total"
                :center-text="item.centerText"
                :value-label="item.valueLabel"
                :rest-label="item.restLabel" />
            </div>
          </Card>
        </template>

        <template #right-middle>
          <Card title="分段状况（月）" :flex="3" column="right" position="middle" :totalCards="3" :headerTop="'10px'"
            :bodyPadding="'10px 0 0 0'" :backgroundImage="cardBg">
            <SegmentAccuracyTable :rows="segmentAccuracyMonthRows" />
          </Card>
        </template>

        <template #right-bottom>
          <Card title="探伤合格率（月）" :flex="4" column="right" position="bottom" :totalCards="3"
            :headerTop="'20px'" :bodyPadding="'20px'" :backgroundImage="cardBg">
            <NdtQualifiedRateChart :rows="ndtQualificationMonthRows" />
          </Card>
        </template>
      </FunctionalKanbanLayout>
    </div>
  </div>
</template>

<script>
import cardBg from "@/assets/images/cx/bg-1@2x.png";
import znCenterBg from "@/assets/images/ZN/zn_c_bg_ZL.png";
import drawMixin from "@/mixin/drawMixin.js";
import Card from "@/views/DigitalFusion/components/Card.vue";
import FunctionalKanbanLayout from "../components/FunctionalKanbanLayout.vue";
import NdtQualifiedPieCard from "./components/NdtQualifiedPieCard.vue";
import NdtQualifiedRateChart from "./components/NdtQualifiedRateChart.vue";
import SamplingInspectionCard from "./components/SamplingInspectionCard.vue";
import SegmentAccuracyTable from "./components/SegmentAccuracyTable.vue";
import WeldingGrindingRatioCard from "./components/WeldingGrindingRatioCard.vue";
import mockData from "./mock.js";

export default {
  name: "QualityManagement",
  components: {
    FunctionalKanbanLayout,
    Card,
    NdtQualifiedPieCard,
    NdtQualifiedRateChart,
    SamplingInspectionCard,
    SegmentAccuracyTable,
    WeldingGrindingRatioCard,
  },
  mixins: [drawMixin],
  data() {
    return {
      cardBg,
      znCenterBg,
      mockData,
      segmentAccuracyWeekRows: [
        { lineName: "钢板预处理线", passCount: 126, totalCount: 132 },
        { lineName: "型材预处理线", passCount: 118, totalCount: 125 },
        { lineName: "钢板下料分拣智能产线", passCount: 152, totalCount: 160 },
        { lineName: "型材下料智能产线", passCount: 141, totalCount: 150 },
        { lineName: "小组立智能产线", passCount: 132, totalCount: 138 },
        { lineName: "T型材智能产线", passCount: 147, totalCount: 156 },
        { lineName: "片体拼板智能产线", passCount: 120, totalCount: 128 },
        { lineName: "平直分段智能产线", passCount: 138, totalCount: 145 },
      ],
      segmentAccuracyMonthRows: [
        { lineName: "钢板预处理线", passCount: 528, totalCount: 545 },
        { lineName: "型材预处理线", passCount: 502, totalCount: 520 },
        { lineName: "钢板下料分拣智能产线", passCount: 612, totalCount: 630 },
        { lineName: "型材下料智能产线", passCount: 570, totalCount: 590 },
        { lineName: "小组立智能产线", passCount: 548, totalCount: 560 },
        { lineName: "T型材智能产线", passCount: 590, totalCount: 615 },
        { lineName: "片体拼板智能产线", passCount: 520, totalCount: 540 },
        { lineName: "平直分段智能产线", passCount: 568, totalCount: 590 },
      ],
      ndtQualificationWeekRows: [
        { name: "钢板预处理线", passCount: 86, totalCount: 92 },
        { name: "型材预处理线", passCount: 80, totalCount: 88 },
        { name: "钢板下料分拣智能产线", passCount: 96, totalCount: 102 },
        { name: "型材下料智能产线", passCount: 90, totalCount: 98 },
        { name: "小组立智能产线", passCount: 84, totalCount: 90 },
        { name: "T型材智能产线", passCount: 92, totalCount: 100 },
        { name: "片体拼板智能产线", passCount: 78, totalCount: 84 },
        { name: "平直分段智能产线", passCount: 88, totalCount: 96 },
      ],
      ndtQualificationMonthRows: [
        { name: "钢板预处理线", passCount: 356, totalCount: 372 },
        { name: "型材预处理线", passCount: 332, totalCount: 350 },
        { name: "钢板下料分拣智能产线", passCount: 392, totalCount: 410 },
        { name: "型材下料智能产线", passCount: 368, totalCount: 388 },
        { name: "小组立智能产线", passCount: 344, totalCount: 360 },
        { name: "T型材智能产线", passCount: 380, totalCount: 402 },
        { name: "片体拼板智能产线", passCount: 320, totalCount: 336 },
        { name: "平直分段智能产线", passCount: 372, totalCount: 390 },
      ],
      ndtQualificationDailyCards: [
        {
          key: "ndt-pass",
          title: "探伤合格数",
          value: 146,
          total: 160,
          centerText: "146",
          valueLabel: "合格",
          restLabel: "未合格",
        },
        {
          key: "ndt-total",
          title: "探伤总数",
          value: 160,
          total: 180,
          centerText: "160",
          valueLabel: "已探伤",
          restLabel: "未探伤",
        },
        {
          key: "ndt-rate",
          title: "探伤合格率",
          value: 91,
          total: 100,
          centerText: "91%",
          valueLabel: "合格",
          restLabel: "未合格",
        },
      ],
      samplingInspection: {
        qualifiedCount: 100,
        inspectionCount: 10,
        rate: 92,
      },
      weldingGrindingRatio: {
        weldingHours: 328,
        grindingHours: 214,
        weldingConsumablesAmount: 15680,
        grindingConsumablesAmount: 9820,
      },
    };
  },
  methods: {
    handleTabClick(route) {
      if (route) {
        this.$router.push(route);
      }
    },
  },
  mounted() {
    // 初始化数据
  },
};
</script>

<style scoped>
.container-QualityManagement {
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

.ndt-pie-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: 1fr;
  gap: 16px;
  height: 100%;
}

.ndt-pie-grid > * {
  min-height: 0;
}

.sampling-inspection {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
}

.welding-grinding {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
}
</style>

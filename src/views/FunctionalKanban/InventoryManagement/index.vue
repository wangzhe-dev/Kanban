<template>
  <div class="container-InventoryManagement">
    <div class="df-screen" ref="appRef">
      <FunctionalKanbanLayout activeTab="InventoryManagement" centerWidth="34%" @tab-click="handleTabClick">
        <template #left-top>
          <Card title="钢板库库存信息" :flex="3" column="left" position="top" :totalCards="3" :headerTop="'10px'"
            :backgroundImage="cardBg">
            <InventoryCapacityStats :left-stats="plateInventoryLeftStats" :right-stats="plateInventoryRightStats" />
          </Card>
        </template>
        <template #left-middle>
          <Card title="部件立库信息" :flex="3" column="left" position="middle" :totalCards="3" headerTop="10px"
            :backgroundImage="cardBg">
            <div class="inventory-middle-panel">
              <div class="inventory-middle-panel__stat">
                <div class="inventory-total">
                  <div class="inventory-total__label">库存总量</div>
                  <div class="inventory-total__value">147<span class="inventory-total__unit">件</span></div>
                </div>
              </div>
              <div class="inventory-middle-panel__chart">
                <InventoryInOutTrendChart :labels="leftMiddleTrend.labels" :series="leftMiddleTrend.series"
                  unit="件" />
              </div>
            </div>
          </Card>
        </template>
        <template #left-bottom>
          <Card title="钢板下料统计" :flex="4" column="left" position="bottom" :totalCards="3" :headerTop="'20px'"
            :bodyPadding="'20px'" :backgroundImage="cardBg">
            <div class="plate-cutting-panel">
              <div class="plate-cutting-panel__pie">
                <PlateCuttingPieChart :chartData="plateCuttingPieData" :palette="plateCuttingPiePalette" />
              </div>
              <div class="plate-cutting-panel__table">
                <SteelPlateCuttingTable :rows="plateCuttingRows" />
              </div>
            </div>
          </Card>
        </template>

        <!-- Center Column: 3 cards -->
        <template #center-top>
          <Card title="" :flex="3" column="center" position="top" :totalCards="3">
            <LogisticsKpiSummary :items="centerKpiItems" />
          </Card>
        </template>

        <template #center-middle>
          <Card title="零件库存信息" :flex="3" column="center" position="middle" :totalCards="3" :headerTop="'20px'"
            :bodyPadding="'10px 10px 10px 10px'" :backgroundImage="cardBg">
            <PartInventoryTable :rows="partInventoryRows" />
          </Card>
        </template>

        <template #center-bottom>
          <Card title="物流调度单" :flex="3" column="center" position="bottom" :totalCards="3" :headerTop="'20px'"
            :bodyPadding="'10px 10px 10px 10px'" :backgroundImage="cardBg">
            <DispatchOrderTable :rows="dispatchOrderRows" />
          </Card>
        </template>

        <!-- Right Column: 3 cards -->
        <template #right-top>
          <Card title="配送工单信息" :flex="3" column="right" position="top" :totalCards="3" :headerTop="'10px'"
            :bodyPadding="'20px'" :backgroundImage="cardBg">
            <DispatchTaskTable :rows="dispatchTaskRows" />
          </Card>
        </template>

        <template #right-middle>
          <Card title="型材立库信息" :flex="3" column="right" position="middle" :totalCards="3" :headerTop="'10px'"
            :backgroundImage="cardBg">
            <div class="inventory-middle-panel">
              <div class="inventory-middle-panel__stat">
                <div class="inventory-total">
                  <div class="inventory-total__label">库存总量</div>
                  <div class="inventory-total__value">213<span class="inventory-total__unit">根</span></div>
                </div>
              </div>
              <div class="inventory-middle-panel__chart">
                <InventoryInOutTrendChart :labels="rightMiddleTrend.labels" :series="rightMiddleTrend.series"
                  unit="根" />
              </div>
            </div>
          </Card>
        </template>

        <template #right-bottom>
          <Card title="型材下料统计" :flex="4" column="right" position="bottom" :totalCards="3" :headerTop="'20px'"
            :bodyPadding="'20px'" :backgroundImage="cardBg">
            <LineSideStorageTable :rows="lineSideStorageRows" />
          </Card>
        </template>
      </FunctionalKanbanLayout>
    </div>
  </div>
</template>

<script>
import cardBg from "@/assets/images/cx/bg-1@2x.png";
import drawMixin from "@/mixin/drawMixin.js";
import Card from "@/views/DigitalFusion/components/Card.vue";
import FunctionalKanbanLayout from "../components/FunctionalKanbanLayout.vue";
import DispatchOrderTable from "./components/DispatchOrderTable.vue";
import DispatchTaskTable from "./components/DispatchTaskTable.vue";
import InventoryCapacityStats from "./components/InventoryCapacityStats.vue";
import InventoryInOutTrendChart from "./components/InventoryInOutTrendChart.vue";
import LineSideStorageTable from "./components/LineSideStorageTable.vue";
import LogisticsKpiSummary from "./components/LogisticsKpiSummary.vue";
import PartInventoryTable from "./components/PartInventoryTable.vue";
import PlateCuttingPieChart from "./components/PlateCuttingPieChart.vue";
import SteelPlateCuttingTable from "./components/SteelPlateCuttingTable.vue";

export default {
  name: "InventoryManagement",
  components: {
    FunctionalKanbanLayout,
    Card,
    DispatchOrderTable,
    DispatchTaskTable,
    InventoryInOutTrendChart,
    InventoryCapacityStats,
    LineSideStorageTable,
    LogisticsKpiSummary,
    PartInventoryTable,
    PlateCuttingPieChart,
    SteelPlateCuttingTable,
  },
  mixins: [drawMixin],
  data() {
    return {
      cardBg,
      centerKpiItems: [
        { key: "segment", label: "分段齐套率", value: "80%" },
        { key: "assembly", label: "组立齐套率", value: "0%" },
        { key: "tempTask", label: "临时任务比率", value: "0%" },
        { key: "onTime", label: "及时送达率", value: "0%" },
        { key: "dispatchDone", label: "配送完成率", value: "75.5%" },
      ],
      plateInventoryLeftStats: [
        { key: "current", label: "当前库存量", value: "2.29", unit: "吨" },
        { key: "slots", label: "总库位数", value: "125", unit: "个" },
        { key: "inside", label: "线内库位张数", value: "0", unit: "张" },
        { key: "outside", label: "线外库位张数", value: "864", unit: "张" },
        { key: "usage", label: "库位使用率", value: "91", unit: "%" },
      ],
      plateInventoryRightStats: [
        { key: "inboundToday", label: "今日入库量", value: "0", unit: "张" },
        { key: "outboundToday", label: "今日出库量", value: "7", unit: "张" },
        { key: "inboundTotal", label: "已入库量", value: "43", unit: "张" },
        { key: "outboundTotal", label: "已出库量", value: "19", unit: "张" },
        { key: "capacity", label: "库存总容量", value: "223", unit: "张" },
      ],
      leftMiddleTrend: {
        labels: ["1-01", "1-02", "1-03", "1-04", "1-05", "1-06", "1-07"],
        series: [
          { name: "入库量", values: [12, 18, 16, 22, 19, 26, 24], color: "#00d9ff" },
          { name: "出库量", values: [10, 14, 13, 18, 16, 20, 21], color: "#ffb347" },
        ],
      },
      rightMiddleTrend: {
        labels: ["1-01", "1-02", "1-03", "1-04", "1-05", "1-06", "1-07"],
        series: [
          { name: "日入库量", values: [20, 26, 24, 30, 28, 34, 32], color: "#00d9ff" },
          { name: "日出库量", values: [18, 22, 21, 27, 25, 29, 30], color: "#ffb347" },
        ],
      },
      plateCuttingPieData: [
        { name: "板材切割区", value: 68 },
        { name: "部件立库", value: 32 },
      ],
      plateCuttingPiePalette: [
        { start: "#00d9ff", end: "#00aaff" },
        { start: "#ffb347", end: "#ff8c00" },
      ],
      plateCuttingRows: [
        {
          locationName: "A-01-03",
          basketNo: "BK-019",
          projectNo: "XM-2308",
          segmentNo: "FD-01",
          partCount: "118",
        },
        {
          locationName: "A-01-05",
          basketNo: "BK-023",
          projectNo: "XM-2308",
          segmentNo: "FD-02",
          partCount: "96",
        },
        {
          locationName: "B-02-02",
          basketNo: "BK-031",
          projectNo: "XM-2309",
          segmentNo: "FD-03",
          partCount: "84",
        },
        {
          locationName: "B-02-04",
          basketNo: "BK-042",
          projectNo: "XM-2309",
          segmentNo: "FD-04",
          partCount: "110",
        },
        {
          locationName: "C-01-01",
          basketNo: "BK-048",
          projectNo: "XM-2310",
          segmentNo: "FD-05",
          partCount: "72",
        },
        {
          locationName: "C-01-03",
          basketNo: "BK-054",
          projectNo: "XM-2310",
          segmentNo: "FD-06",
          partCount: "95",
        },
        {
          locationName: "D-02-01",
          basketNo: "BK-061",
          projectNo: "XM-2311",
          segmentNo: "FD-07",
          partCount: "138",
        },
        {
          locationName: "D-02-03",
          basketNo: "BK-067",
          projectNo: "XM-2311",
          segmentNo: "FD-08",
          partCount: "88",
        },
      ],
      partInventoryRows: [
        {
          areaName: "A区",
          locationCode: "A-01-01",
          basketNo: "BK-101",
          projectNo: "XM-2308",
          segmentNo: "FD-01",
          assemblyFlow: "装配一线",
          partCount: 128,
        },
        {
          areaName: "A区",
          locationCode: "A-01-02",
          basketNo: "BK-102",
          projectNo: "XM-2308",
          segmentNo: "FD-02",
          assemblyFlow: "装配二线",
          partCount: 96,
        },
        {
          areaName: "B区",
          locationCode: "B-02-03",
          basketNo: "BK-203",
          projectNo: "XM-2309",
          segmentNo: "FD-03",
          assemblyFlow: "装配一线",
          partCount: 84,
        },
        {
          areaName: "B区",
          locationCode: "B-02-05",
          basketNo: "BK-207",
          projectNo: "XM-2309",
          segmentNo: "FD-04",
          assemblyFlow: "装配三线",
          partCount: 110,
        },
        {
          areaName: "C区",
          locationCode: "C-03-01",
          basketNo: "BK-309",
          projectNo: "XM-2310",
          segmentNo: "FD-05",
          assemblyFlow: "装配二线",
          partCount: 72,
        },
        {
          areaName: "C区",
          locationCode: "C-03-04",
          basketNo: "BK-312",
          projectNo: "XM-2310",
          segmentNo: "FD-06",
          assemblyFlow: "装配三线",
          partCount: 95,
        },
        {
          areaName: "D区",
          locationCode: "D-01-02",
          basketNo: "BK-401",
          projectNo: "XM-2311",
          segmentNo: "FD-07",
          assemblyFlow: "装配一线",
          partCount: 138,
        },
        {
          areaName: "D区",
          locationCode: "D-01-04",
          basketNo: "BK-405",
          projectNo: "XM-2311",
          segmentNo: "FD-08",
          assemblyFlow: "装配二线",
          partCount: 88,
        },
      ],
      dispatchTaskRows: [
        {
          taskName: "DT-2401-001",
          taskType: "常规配送",
          basketNo: "BK-019",
          fromPoint: "A-01-01",
          toPoint: "线边库-01",
          date: "2024-01-09",
          quantity: "120",
        },
        {
          taskName: "DT-2401-002",
          taskType: "紧急配送",
          basketNo: "BK-023",
          fromPoint: "B-02-03",
          toPoint: "线边库-02",
          date: "2024-01-10",
          quantity: "96",
        },
        {
          taskName: "DT-2401-003",
          taskType: "回库",
          basketNo: "BK-031",
          fromPoint: "线边库-03",
          toPoint: "C-03-01",
          date: "2024-01-10",
          quantity: "88",
        },
        {
          taskName: "DT-2401-004",
          taskType: "常规配送",
          basketNo: "BK-042",
          fromPoint: "B-02-05",
          toPoint: "线边库-04",
          date: "2024-01-11",
          quantity: "72",
        },
        {
          taskName: "DT-2401-005",
          taskType: "补料",
          basketNo: "BK-048",
          fromPoint: "C-03-02",
          toPoint: "线边库-05",
          date: "2024-01-11",
          quantity: "64",
        },
        {
          taskName: "DT-2401-006",
          taskType: "常规配送",
          basketNo: "BK-054",
          fromPoint: "A-02-08",
          toPoint: "线边库-06",
          date: "2024-01-12",
          quantity: "105",
        },
        {
          taskName: "DT-2401-007",
          taskType: "紧急配送",
          basketNo: "BK-061",
          fromPoint: "D-01-01",
          toPoint: "线边库-07",
          date: "2024-01-12",
          quantity: "90",
        },
        {
          taskName: "DT-2401-008",
          taskType: "回库",
          basketNo: "BK-067",
          fromPoint: "线边库-08",
          toPoint: "B-01-05",
          date: "2024-01-12",
          quantity: "58",
        },
      ],
      dispatchOrderRows: [
        {
          dispatchOrderNo: "PS-202401-001",
          masterOrderCode: "MO-2308-001",
          createDate: "2024-01-05",
          completeDate: "2024-01-06",
          progress: 86,
        },
        {
          dispatchOrderNo: "PS-202401-002",
          masterOrderCode: "MO-2308-002",
          createDate: "2024-01-06",
          completeDate: "2024-01-07",
          progress: 78,
        },
        {
          dispatchOrderNo: "PS-202401-003",
          masterOrderCode: "MO-2309-001",
          createDate: "2024-01-06",
          completeDate: "2024-01-08",
          progress: 92,
        },
        {
          dispatchOrderNo: "PS-202401-004",
          masterOrderCode: "MO-2309-002",
          createDate: "2024-01-07",
          completeDate: "2024-01-08",
          progress: 64,
        },
        {
          dispatchOrderNo: "PS-202401-005",
          masterOrderCode: "MO-2310-001",
          createDate: "2024-01-07",
          completeDate: "2024-01-09",
          progress: 88,
        },
        {
          dispatchOrderNo: "PS-202401-006",
          masterOrderCode: "MO-2310-002",
          createDate: "2024-01-08",
          completeDate: "2024-01-10",
          progress: 73,
        },
        {
          dispatchOrderNo: "PS-202401-007",
          masterOrderCode: "MO-2311-001",
          createDate: "2024-01-08",
          completeDate: "2024-01-10",
          progress: 95,
        },
        {
          dispatchOrderNo: "PS-202401-008",
          masterOrderCode: "MO-2311-002",
          createDate: "2024-01-09",
          completeDate: "2024-01-11",
          progress: 81,
        },
      ],
      lineSideStorageRows: [
        {
          areaName: "A区",
          locationName: "A-01-01",
          basketNo: "BK-019",
          projectNo: "XM-2308",
          segmentNo: "FD-01",
          assemblyFlow: "组立一线",
          partCount: "32",
        },
        {
          areaName: "A区",
          locationName: "A-01-02",
          basketNo: "BK-023",
          projectNo: "XM-2308",
          segmentNo: "FD-02",
          assemblyFlow: "组立二线",
          partCount: "28",
        },
        {
          areaName: "B区",
          locationName: "B-02-01",
          basketNo: "BK-031",
          projectNo: "XM-2309",
          segmentNo: "FD-03",
          assemblyFlow: "组立一线",
          partCount: "24",
        },
        {
          areaName: "B区",
          locationName: "B-02-02",
          basketNo: "BK-042",
          projectNo: "XM-2309",
          segmentNo: "FD-04",
          assemblyFlow: "组立三线",
          partCount: "36",
        },
        {
          areaName: "C区",
          locationName: "C-03-01",
          basketNo: "BK-048",
          projectNo: "XM-2310",
          segmentNo: "FD-05",
          assemblyFlow: "组立二线",
          partCount: "30",
        },
        {
          areaName: "C区",
          locationName: "C-03-02",
          basketNo: "BK-054",
          projectNo: "XM-2310",
          segmentNo: "FD-06",
          assemblyFlow: "组立三线",
          partCount: "22",
        },
        {
          areaName: "D区",
          locationName: "D-01-01",
          basketNo: "BK-061",
          projectNo: "XM-2311",
          segmentNo: "FD-07",
          assemblyFlow: "组立一线",
          partCount: "27",
        },
        {
          areaName: "D区",
          locationName: "D-01-02",
          basketNo: "BK-067",
          projectNo: "XM-2311",
          segmentNo: "FD-08",
          assemblyFlow: "组立二线",
          partCount: "25",
        },
      ],
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
.container-InventoryManagement {
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
  position: relative;

  /* background-image: url("../../../assets/images/DF/bg_g.gif"); */
  /* background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 3840px;
  height: 2160px; */
  /* color: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column; */
}
.fk-main-layout{
  background-image: url("../../../assets/images/DF/bg_g.gif");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 80%;
}
.df-card{
 background: rgba(0,0,0,0.1) !important;
}
/*   background-image: url("../../../assets/images/DF/bg_g.gif"); */
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

.plate-cutting-panel {
  height: 100%;
  display: flex;
  gap: 20px;
  align-items: stretch;
  min-height: 0;
}

.plate-cutting-panel__pie {
  flex: 4;
  min-width: 0;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plate-cutting-panel__table {
  flex: 6;
  min-width: 0;
  min-height: 0;
}

.plate-cutting-panel__pie ::v-deep .plate-cutting-pie {
  height: 100%;
}

.inventory-middle-panel {
  height: 100%;
  display: flex;
  gap: 16px;
  align-items: stretch;
  min-height: 0;
}

.inventory-middle-panel__stat {
  flex: 3;
  min-width: 0;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inventory-middle-panel__chart {
  flex: 7;
  min-width: 0;
  min-height: 0;
}

.inventory-total {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  background-image: url("../../../assets/images/cx/icon-底座@2x.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.inventory-total__label {
  position: absolute;
  bottom: 0%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 38px;
  font-weight: 700;
  color: #40d5ff;
  letter-spacing: 2px;
  white-space: nowrap;
  text-shadow: 0 0 15px rgba(64, 213, 255, 0.6);
}

.inventory-total__value {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 64px;
  font-weight: 900;
  color: #ffd700;
  letter-spacing: 2px;
  text-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 4px 20px rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.inventory-total__unit {
  font-size: 32px;
  font-weight: 800;
  color: #ffd700;
}

.logistics-kpi {
  height: 100%;
  display: flex;
  align-items: stretch;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  border-radius: 12px;
  padding: 12px;
  box-sizing: border-box;
}

.logistics-kpi__grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
  align-items: stretch;
}

.logistics-kpi__item {
  /* border-radius: 12px; */
  /* border: 1px solid rgba(64, 213, 255, 0.35);
  background: linear-gradient(180deg, rgba(2, 12, 25, 0.2), rgba(2, 12, 25, 0.6));
  box-shadow: inset 0 0 18px rgba(64, 213, 255, 0.15); */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  /* padding: 10px 8px; */
  min-width: 0;
}

.logistics-kpi__label {
  font-size: 30px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
  letter-spacing: 0.5px;
}

.logistics-kpi__value {
  font-size: 52px;
  font-weight: 900;
  color: #69c0ff;
  padding-bottom: 70px;
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0 18px rgba(105, 192, 255, 0.35);
}
</style>

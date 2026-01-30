<template>
  <div class="report-details">
    <!-- 左边 - 工序统计 -->
    <div class="report-section">
      <div class="section-header">
        <h3 class="section-title">工序统计</h3>
      </div>
      <div class="chart-area">
        <div class="chart-container" ref="processChart"></div>
      </div>
    </div>

    <!-- 分隔线 -->
    <div class="divider"></div>

    <!-- 右边 - 工位统计 -->
    <div class="report-section">
      <div class="section-header">
        <h3 class="section-title">工位统计</h3>
      </div>
      <div class="chart-area">
        <div class="chart-container" ref="stationChart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "ReportDetails",
  props: {
    reportData: {
      type: Object,
      default: () => ({
        process: [],
        station: [],
      }),
    },
  },
  data() {
    return {
      processChartInstance: null,
      stationChartInstance: null,
    };
  },
  watch: {
    reportData: {
      handler() {
        this.updateCharts();
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initCharts();
    });
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    if (this.processChartInstance) {
      this.processChartInstance.dispose();
      this.processChartInstance = null;
    }
    if (this.stationChartInstance) {
      this.stationChartInstance.dispose();
      this.stationChartInstance = null;
    }
  },
  methods: {
    initCharts() {
      if (this.$refs.processChart) {
        this.processChartInstance = echarts.init(this.$refs.processChart);
      }
      if (this.$refs.stationChart) {
        this.stationChartInstance = echarts.init(this.$refs.stationChart);
      }
      this.updateCharts();
    },
    handleResize() {
      if (this.processChartInstance) {
        this.processChartInstance.resize();
      }
      if (this.stationChartInstance) {
        this.stationChartInstance.resize();
      }
    },
    updateCharts() {
      this.updateChart(this.processChartInstance, this.reportData.process || []);
      this.updateChart(this.stationChartInstance, this.reportData.station || []);
    },
    updateChart(chartInstance, data) {
      if (!chartInstance || !data.length) return;

      const names = data.map((item) => item.name);
      const totals = data.map((item) => item.started + item.completed);
      const barWidth = 20;
      const barRadius = barWidth / 2;

      const startedData = data.map((item) => ({
        value: item.started,
        itemStyle: {
          barBorderRadius: barRadius,
        },
      }));

      const completedData = data.map((item) => ({
        value: item.completed,
        itemStyle: {
          barBorderRadius: barRadius,
        },
      }));

      const maxValue = Math.max(...totals, 0);
      const targetIntervals = 6;
      const rawInterval = maxValue / targetIntervals;
      const magnitude = Math.pow(10, Math.floor(Math.log10(rawInterval)));
      const normalized = rawInterval / magnitude;
      let interval;
      if (normalized <= 1) interval = magnitude;
      else if (normalized <= 2) interval = 2 * magnitude;
      else if (normalized <= 5) interval = 5 * magnitude;
      else interval = 10 * magnitude;

      const xAxisMax = Math.ceil(maxValue / interval) * interval;

      const option = {
        color: ["#faad14", "#52c41a"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          borderColor: "#40d5ff",
          textStyle: {
            color: "#fff",
            fontSize: 22,
          },
          formatter: (params) => {
            const name = params[0]?.name || "";
            let startVal = 0;
            let completeVal = 0;
            params.forEach((p) => {
              if (p.seriesName === "已开工") {
                startVal = Number(p.value || 0);
              } else if (p.seriesName === "完工") {
                completeVal = Number(p.value || 0);
              }
            });
            const totalVal = startVal + completeVal;
            return `${name}<br/>已开工: ${startVal}<br/>完工: ${completeVal}<br/>合计: ${totalVal.toFixed(1)}`;
          },
        },
        legend: {
          data: ["已开工", "完工"],
          top: 5,
          textStyle: {
            color: "#fff",
            fontSize: 22,
          },
        },
        grid: {
          left: "2%",
          right: "10%",
          bottom: "3%",
          top: "50",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          max: xAxisMax,
          min: 0,
          interval: interval,
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(64, 213, 255, 0.3)",
            },
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: "rgba(64, 213, 255, 0.3)",
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgba(64, 213, 255, 0.1)",
            },
          },
          axisLabel: {
            show: true,
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: 18,
            formatter: (value) => {
              return value.toFixed(1);
            },
          },
        },
        yAxis: {
          type: "category",
          data: names,
          inverse: true,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.9)",
            fontSize: 20,
            margin: 15,
          },
        },
        series: [
          {
            name: "已开工",
            type: "bar",
            stack: "total",
            barWidth: barWidth,
            itemStyle: {
              color: "#faad14",
            },
            emphasis: {
              itemStyle: {
                color: "#faad14",
              },
            },
            data: startedData,
          },
          {
            name: "完工",
            type: "bar",
            stack: "total",
            barWidth: barWidth,
            label: {
              show: true,
              position: "right",
              color: "#fff",
              fontSize: 18,
              formatter: (params) => {
                const idx = params.dataIndex;
                const total = totals[idx] || 0;
                return total.toFixed(1);
              },
            },
            itemStyle: {
              color: "#52c41a",
            },
            emphasis: {
              itemStyle: {
                color: "#52c41a",
              },
            },
            data: completedData,
          },
        ],
      };

      chartInstance.setOption(option, { notMerge: true });
    },
  },
};
</script>

<style scoped>
.report-details {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
}

.report-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}

.divider {
  width: 2px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(64, 213, 255, 0.3) 20%,
    rgba(64, 213, 255, 0.3) 80%,
    transparent
  );
}

.section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;
  flex-shrink: 0;
}

.section-title {
  font-size: 32px;
  font-weight: 600;
  color: #ffffff;
  display: flex;
  width: 280px;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  position: relative;
  padding: 0 70px;
}

.section-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background-image: url("../../../../assets/images/DF/icon-right@2x.png");
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
  width: 50px;
  height: 50px;
  background-image: url("../../../../assets/images/DF/icon-left@2x.png");
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
}

.chart-area {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.chart-container {
  width: 100%;
  height: 100%;
}
</style>

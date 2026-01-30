<template>
  <div class="maintenance-plan-center">
    <div class="chart-wrapper" ref="chartRef"></div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "MaintenancePlanCenter",
  props: {
    timeRange: {
      type: String,
      default: "day",
    },
  },
  data() {
    return {
      chart: null,
      colorPalette: ["#5B8FF9", "#5AD8A6", "#E76BF3", "#FF6B72", "#FF9F7F", "#9E9EFF", "#2FC6F0"],
      trendData: {
        day: {
          axis: ["12-30", "12-31", "1-1", "1-2", "1-3", "1-4", "1-5"],
          series: [
            { name: "智能钢板库", values: [0.05, 0.06, 0.05, 0.06, 0.05, 0.04, 0.03] },
            { name: "钢板预处理", values: [0.08, 0.09, 0.07, 0.1, 0.06, 0.05, 0.04] },
            { name: "型材预处理", values: [0.07, 0.07, 0.08, 0.09, 0.06, 0.05, 0.05] },
            { name: "钢板下料", values: [0.12, 0.15, 0.31, 0.04, 0.05, 0.06, 0.05] },
            { name: "型材下料", values: [0.06, 0.08, 0.09, 0.11, 0.1, 0.08, 0.07] },
            { name: "T型材", values: [0.04, 0.05, 0.04, 0.05, 0.04, 0.03, 0.02] },
            { name: "小组立", values: [0.03, 0.03, 0.04, 0.05, 0.04, 0.03, 0.03] },
          ],
        },
        week: {
          axis: ["12-16", "12-23", "12-30", "1-6", "1-13", "1-20", "1-27"],
          series: [
            { name: "智能钢板库", values: [0.05, 0.06, 0.05, 0.07, 0.06, 0.05, 0.05] },
            { name: "钢板预处理", values: [0.09, 0.1, 0.11, 0.09, 0.08, 0.07, 0.07] },
            { name: "型材预处理", values: [0.07, 0.08, 0.08, 0.09, 0.09, 0.07, 0.07] },
            { name: "钢板下料", values: [0.1, 0.12, 0.18, 0.16, 0.14, 0.11, 0.1] },
            { name: "型材下料", values: [0.08, 0.09, 0.08, 0.1, 0.09, 0.08, 0.08] },
            { name: "T型材", values: [0.05, 0.05, 0.05, 0.05, 0.04, 0.04, 0.04] },
            { name: "小组立", values: [0.04, 0.04, 0.05, 0.05, 0.04, 0.04, 0.04] },
          ],
        },
        month: {
          axis: ["8月", "9月", "10月", "11月", "12月", "1月", "2月"],
          series: [
            { name: "智能钢板库", values: [0.04, 0.06, 0.05, 0.07, 0.06, 0.06, 0.05] },
            { name: "钢板预处理", values: [0.07, 0.09, 0.08, 0.1, 0.09, 0.09, 0.08] },
            { name: "型材预处理", values: [0.06, 0.07, 0.07, 0.09, 0.08, 0.08, 0.07] },
            { name: "钢板下料", values: [0.09, 0.11, 0.13, 0.16, 0.12, 0.11, 0.1] },
            { name: "型材下料", values: [0.06, 0.08, 0.08, 0.09, 0.08, 0.08, 0.07] },
            { name: "T型材", values: [0.04, 0.04, 0.05, 0.05, 0.05, 0.04, 0.04] },
            { name: "小组立", values: [0.03, 0.04, 0.04, 0.04, 0.04, 0.03, 0.03] },
          ],
        },
      },
    };
  },
  computed: {
    currentTrend() {
      return this.trendData[this.timeRange] || { axis: [], series: [] };
    },
  },
  watch: {
    timeRange() {
      this.$nextTick(() => {
        this.updateChart();
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      window.addEventListener("resize", this.handleResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  },
  methods: {
    initChart() {
      if (!this.$refs.chartRef) return;
      this.chart = echarts.init(this.$refs.chartRef);
      this.updateChart();
    },
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    formatTooltip(params) {
      if (!Array.isArray(params) || !params.length) return "";
      const header = params[0].axisValue;
      const lines = params
        .map((item) => `${item.marker}${item.seriesName}：${Number(item.data || 0).toFixed(2)}h`);
      return [header, ...lines].join("<br/>");
    },
    updateChart() {
      if (!this.chart) return;
      const { axis, series } = this.currentTrend;
      const legendData = series.map((item) => item.name);
      const chartSeries = series.map((item) => ({
        name: item.name,
        type: "line",
        smooth: true,
        data: item.values,
        symbol: "circle",
        symbolSize: 18,
        lineStyle: {
          width: 3,
        },
        areaStyle: {
          opacity: 0.08,
        },
        emphasis: { focus: "series" },
      }));
      this.chart.setOption(
        {
          color: this.colorPalette,
          grid: { left: "3%", right: "3%", top: "18%", bottom: "2%", containLabel: true },
          tooltip: {
            trigger: "axis",
            backgroundColor: "rgba(0, 27, 60, 0.95)",
            borderColor: "#3AD1F3",
            borderWidth: 1,
            textStyle: { fontSize: 24 },
            formatter: this.formatTooltip,
          },
          legend: {
            top: 5,
            textStyle: { color: "rgba(255,255,255,0.85)", fontSize: 24 },
            itemWidth: 18,
            itemHeight: 12,
            data: legendData,
          },
          xAxis: {
            type: "category",
            data: axis,
            boundaryGap: false,
            axisLine: { lineStyle: { color: "rgba(58, 209, 243, 0.35)" } },
            axisLabel: { color: "#fff", fontSize: 24, margin: 18 },
            axisTick: { show: false },
          },
          yAxis: {
            type: "value",
            min: 0,
            max: 0.35,
            interval: 0.1,
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
              color: "#fff",
              fontSize: 24,
              formatter: (value) => `${Number(value).toFixed(1)}h`,
            },
            splitLine: { lineStyle: { color: "rgba(58, 209, 243, 0.15)", type: "dashed" } },
          },
          series: chartSeries,
        },
        true
      );
    },
  },
};
</script>

<style scoped>
.maintenance-plan-center {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
}



.chart-wrapper {
  flex: 1;
  width: 100%;
  min-height: 360px;
}
</style>

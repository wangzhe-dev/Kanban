<template>
  <div class="inventory-inout-trend-chart" ref="chartRef"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "InventoryInOutTrendChart",
  props: {
    labels: {
      type: Array,
      default: () => [],
    },
    series: {
      type: Array,
      default: () => [],
    },
    unit: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      chart: null,
      defaultColors: ["#00d9ff", "#ffb347", "#52c41a", "#5B8FF9"],
    };
  },
  watch: {
    labels: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
    series: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
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
      window.addEventListener("resize", this.handleResize);
    },
    handleResize() {
      if (this.chart) this.chart.resize();
    },
    toRgba(color, alpha) {
      if (!color || typeof color !== "string") return color;
      if (color.startsWith("rgba") || color.startsWith("rgb")) return color;
      const hex = color.replace("#", "");
      if (hex.length === 6) {
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
      return color;
    },
    formatValue(value) {
      const num = Number(value);
      if (Number.isNaN(num)) return "-";
      return `${num}${this.unit}`;
    },
    updateChart() {
      if (!this.chart) return;

      const labels = Array.isArray(this.labels) ? this.labels : [];
      const rawSeries = Array.isArray(this.series) ? this.series : [];
      if (!labels.length || !rawSeries.length) {
        this.chart.clear();
        return;
      }

      const legendData = rawSeries.map((item) => item.name);
      const chartSeries = rawSeries.map((item, index) => {
        const color = item.color || this.defaultColors[index % this.defaultColors.length];
        return {
          name: item.name,
          type: "line",
          smooth: true,
          data: Array.isArray(item.values) ? item.values : [],
          symbol: "circle",
          symbolSize: 10,
          lineStyle: { width: 3, color },
          itemStyle: { color },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: this.toRgba(color, 0.25) },
              { offset: 1, color: this.toRgba(color, 0) },
            ]),
          },
          emphasis: { focus: "series" },
        };
      });

      const option = {
        grid: { left: "6%", right: "4%", top: "10%", bottom: "10%", containLabel: true },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0, 27, 60, 0.95)",
          borderColor: "#3AD1F3",
          borderWidth: 1,
          textStyle: { fontSize: 28, color: "#ffffff", fontWeight: 700 },
          formatter: (params) => {
            if (!Array.isArray(params) || !params.length) return "";
            const header = params[0].axisValue;
            const lines = params.map((item) => `${item.marker}${item.seriesName}：${this.formatValue(item.data)}`);
            return [header, ...lines].join("<br/>");
          },
        },
        legend: {
          top: 0,
          textStyle: { color: "rgba(255,255,255,0.85)", fontSize: 28, fontWeight: 700 },
          itemWidth: 18,
          itemHeight: 12,
          data: legendData,
        },
        xAxis: {
          type: "category",
          data: labels,
          boundaryGap: false,
          axisLine: { lineStyle: { color: "rgba(58, 209, 243, 0.35)" } },
          axisLabel: { color: "#fff", fontSize: 28, margin: 50,formatter: (value) => value},
          axisTick: { show: false },
        },
        yAxis: {
          type: "value",
          axisLine: { show: false },
          axisTick: { show: false },

          axisLabel: {
            color: "#fff",
            fontSize: 28,
            formatter: (value) => `${value}${this.unit}`,
            margin: 50,
          },
          splitLine: { lineStyle: { color: "rgba(58, 209, 243, 0.15)", type: "dashed" } },
        },
        series: chartSeries,
      };

      this.chart.setOption(option, true);
    },
  },
};
</script>

<style scoped>
.inventory-inout-trend-chart {
  width: 100%;
  height: 100%;
  min-height:450px;
}
</style>

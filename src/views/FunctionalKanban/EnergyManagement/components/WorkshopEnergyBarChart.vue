<template>
  <div class="workshop-energy-bar-chart" ref="chartRef"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "WorkshopEnergyBarChart",
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    values: {
      type: Array,
      default: () => [],
    },
    unit: {
      type: String,
      default: "kWh",
    },
    yMax: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    categories: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
    values: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
    yMax() {
      this.updateChart();
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
    formatValue(value) {
      const num = Number(value);
      if (Number.isNaN(num)) return "-";
      return `${num}${this.unit}`;
    },
    getYAxisMax(values) {
      if (this.yMax && this.yMax > 0) return this.yMax;
      const maxVal = Math.max(...values, 0);
      if (maxVal === 0) return 100;
      const step = Math.pow(10, Math.floor(Math.log10(maxVal)));
      const normalized = Math.ceil(maxVal / step);
      return normalized * step;
    },
    updateChart() {
      if (!this.chart) return;

      const categories = Array.isArray(this.categories) ? this.categories : [];
      const values = Array.isArray(this.values) ? this.values : [];
      if (!categories.length) {
        this.chart.clear();
        return;
      }

      const safeValues = categories.map((_, idx) => Number(values[idx]) || 0);
      const yAxisMax = this.getYAxisMax(safeValues);
      const barWidth = Math.max(30, Math.min(60, Math.round(240 / categories.length)));

      const option = {
        grid: {
          left: "6%",
          right: "6%",
          top: "12%",
          bottom: "12%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          borderColor: "#40d5ff",
          borderWidth: 1,
          textStyle: { color: "#ffffff", fontSize: 22 },
          formatter: (params) => {
            const item = params?.[0];
            if (!item) return "";
            return `${item.axisValue}<br/>能耗: ${this.formatValue(item.data)}`;
          },
        },
        xAxis: {
          type: "category",
          data: categories,
          axisTick: { show: false },
          axisLine: {
            lineStyle: { color: "rgba(255, 255, 255, 0.5)" },
          },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.85)",
            fontSize: 20,
          },
        },
        yAxis: {
          type: "value",
          max: yAxisMax,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: 20,
            formatter: (value) => `${value}${this.unit}`,
          },
          splitLine: {
            lineStyle: { color: "rgba(255, 255, 255, 0.18)", type: "dashed" },
          },
        },
        series: [
          {
            name: "能耗",
            type: "bar",
            data: safeValues,
            barWidth,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#71F3FF" },
                { offset: 1, color: "#3AD7FF" },
              ]),
              barBorderRadius: [barWidth / 2, barWidth / 2, barWidth / 2, barWidth / 2],
            },
            label: {
              show: true,
              position: "top",
              color: "#ffffff",
              fontSize: 18,
              formatter: (params) => this.formatValue(params.value),
            },
          },
        ],
      };

      this.chart.setOption(option, true);
    },
  },
};
</script>

<style scoped>
.workshop-energy-bar-chart {
  width: 100%;
  height: 100%;
  min-height: 320px;
}
</style>

<template>
  <div class="clean-energy-trend-chart" ref="chartRef"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "CleanEnergyTrendChart",
  props: {
    labels: {
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
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    labels: {
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
      return `${num.toLocaleString()}${this.unit}`;
    },
    updateChart() {
      if (!this.chart) return;

      const labels = Array.isArray(this.labels) ? this.labels : [];
      const values = Array.isArray(this.values) ? this.values : [];
      if (!labels.length) {
        this.chart.clear();
        return;
      }

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
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          borderColor: "#40d5ff",
          borderWidth: 1,
          textStyle: { color: "#ffffff", fontSize: 22 },
          formatter: (params) => {
            const item = params?.[0];
            if (!item) return "";
            return `${item.axisValue}<br/>发电量: ${this.formatValue(item.data)}`;
          },
        },
        xAxis: {
          type: "category",
          data: labels,
          boundaryGap: false,
          axisLine: {
            lineStyle: { color: "rgba(255, 255, 255, 0.5)" },
          },
          axisTick: { show: false },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.85)",
            fontSize: 20,
          },
        },
        yAxis: {
          type: "value",
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: 20,
            formatter: (value) => `${Number(value).toLocaleString()}${this.unit}`,
          },
          splitLine: {
            lineStyle: { color: "rgba(255, 255, 255, 0.18)", type: "dashed" },
          },
        },
        series: [
          {
            name: "发电量",
            type: "line",
            data: values,
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: {
              width: 3,
              color: "#44E6FF",
            },
            itemStyle: {
              color: "#44E6FF",
              borderColor: "#C7FAFF",
              borderWidth: 2,
            },
            label: {
              show: true,
              position: "top",
              color: "#ffffff",
              fontSize: 18,
              formatter: (params) => this.formatValue(params.value),
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(68, 230, 255, 0.25)" },
                { offset: 1, color: "rgba(68, 230, 255, 0)" },
              ]),
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
.clean-energy-trend-chart {
  width: 100%;
  height: 100%;
  min-height: 320px;
}
</style>

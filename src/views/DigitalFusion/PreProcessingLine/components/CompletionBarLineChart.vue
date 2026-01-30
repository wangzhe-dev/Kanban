<template>
  <div class="completion-bar-line-chart" ref="chartRef"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "CompletionBarLineChart",
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    barData: {
      type: Array,
      default: () => [],
    },
    lineData: {
      type: Array,
      default: () => [],
    },
    barName: {
      type: String,
      default: "数量",
    },
    barUnit: {
      type: String,
      default: "",
    },
    lineName: {
      type: String,
      default: "重量",
    },
    lineUnit: {
      type: String,
      default: "",
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
    barData: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
    lineData: {
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
    updateChart() {
      if (!this.chart) return;

      const categories = this.categories || [];
      const barData = this.barData || [];
      const lineData = this.lineData || [];
      const categoryCount = Math.max(categories.length, 1);
      const barWidth = Math.max(16, Math.min(60, Math.round(220 / categoryCount)));

      const option = {
        grid: {
          left: "6%",
          right: "6%",
          top: "14%",
          bottom: "10%",
          containLabel: true,
        },
        legend: {
          top: 0,
          left: "center",
          itemWidth: 28,
          itemHeight: 18,
          itemGap: 30,
          textStyle: {
            color: "#ffffff",
            fontSize: 24,
          },
          data: [this.barName, this.lineName],
        },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          borderColor: "#40d5ff",
          borderWidth: 1,
          textStyle: { color: "#ffffff", fontSize: 24 },
          formatter: (params) => {
            const title = params?.[0]?.axisValue ?? "";
            const bar = params?.find((p) => p.seriesType === "bar");
            const line = params?.find((p) => p.seriesType === "line");
            const barSuffix = this.barUnit ? ` ${this.barUnit}` : "";
            const lineSuffix = this.lineUnit ? ` ${this.lineUnit}` : "";
            return [
              title,
              `${this.barName}: ${bar?.data ?? "-"}${barSuffix}`,
              `${this.lineName}: ${line?.data ?? "-"}${lineSuffix}`,
            ].join("<br/>");
          },
        },
        xAxis: [
          {
            type: "category",
            data: categories,
            axisTick: { show: false },
            axisLine: {
              lineStyle: { color: "rgba(255, 255, 255, 0.6)" },
            },
            axisLabel: {
              color: "rgba(255, 255, 255, 0.85)",
              fontSize: 22,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: this.barUnit ? `(${this.barUnit})` : "",
            nameTextStyle: { color: "rgba(255,255,255,0.6)", fontSize: 18 },
            axisLine: {
              show: true,
              lineStyle: { color: "rgba(255, 255, 255, 0.6)" },
            },
            axisTick: { show: false },
            axisLabel: { color: "rgba(255, 255, 255, 0.85)", fontSize: 22 },
            splitLine: { show: false },
          },
          {
            type: "value",
            name: this.lineUnit ? `(${this.lineUnit})` : "",
            nameTextStyle: { color: "rgba(255,255,255,0.6)", fontSize: 18 },
            axisLine: {
              show: true,
              lineStyle: { color: "rgba(255, 255, 255, 0.6)" },
            },
            axisTick: { show: false },
            axisLabel: { color: "rgba(255, 255, 255, 0.85)", fontSize: 22 },
            splitLine: { show: false },
          },
        ],
        series: [
          {
            name: this.barName,
            type: "bar",
            data: barData,
            barWidth,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(90, 220, 255, 0.95)" },
                { offset: 1, color: "rgba(0, 160, 255, 0.85)" },
              ]),
              barBorderRadius: [12, 12, 0, 0],
            },
          },
          {
            name: this.lineName,
            type: "line",
            yAxisIndex: 1,
            data: lineData,
            symbol: "circle",
            symbolSize: 10,
            lineStyle: {
              width: 4,
              color: "#ff9900",
            },
            itemStyle: {
              color: "#ff9900",
            },
            smooth: true,
          },
        ],
      };

      this.chart.setOption(option, true);
    },
  },
};
</script>

<style scoped>
.completion-bar-line-chart {
  width: 100%;
  height: 100%;
  min-height: 420px;
}
</style>

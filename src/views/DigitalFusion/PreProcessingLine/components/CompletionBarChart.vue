<template>
  <div class="completion-bar-chart" ref="chartRef"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "CompletionBarChart",
  props: {
    chartData: {
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
    };
  },
  watch: {
    chartData: {
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

      const categories = this.chartData.map((i) => i.name);
      const values = this.chartData.map((i) => i.value);

      const option = {
        grid: {
          left: "5%",
          right: "4%",
          bottom: "8%",
          top: "14%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          borderColor: "#40d5ff",
          borderWidth: 1,
          textStyle: { color: "#ffffff", fontSize: 24 },
          formatter: (params) => {
            const p = params?.[0];
            if (!p) return "";
            const suffix = this.unit ? ` ${this.unit}` : "";
            return `${p.axisValue}<br/>完成: ${p.data}${suffix}`;
          },
        },
        xAxis: {
          type: "category",
          data: categories,
          axisLine: {
            lineStyle: { color: "rgba(64, 213, 255, 0.3)" },
          },
          axisTick: { show: false },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.85)",
            fontSize: 22,
            margin: 20,
          },
        },
        yAxis: {
          type: "value",
          name: this.unit ? `单位(${this.unit})` : "",
          nameTextStyle: { color: "rgba(255,255,255,0.6)", fontSize: 18, padding: [0, 0, 0, 10] },
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: "rgba(255, 255, 255, 0.7)", fontSize: 22 },
          splitLine: {
            lineStyle: { color: "rgba(64, 213, 255, 0.12)", type: "dashed" },
          },
        },
        series: [
          {
            name: "完成数量",
            type: "bar",
            data: values,
            barWidth: "34%",
            itemStyle: {
              barBorderRadius: [16, 16, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#69C0FF" },
                { offset: 1, color: "#1890FF" },
              ]),
            },
            label: {
              show: true,
              position: "top",
              color: "#ffffff",
              fontSize: 20,
              formatter: (p) => {
                const suffix = this.unit ? this.unit : "";
                return `${p.value}${suffix}`;
              },
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
.completion-bar-chart {
  width: 100%;
  height: 100%;
  min-height: 420px;
}
</style>


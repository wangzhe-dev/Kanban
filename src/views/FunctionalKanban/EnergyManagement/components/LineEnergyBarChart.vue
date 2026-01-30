<template>
  <div class="line-energy-bar-chart" ref="chartRef"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "LineEnergyBarChart",
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
      default: "",
    },
    autoHighlight: {
      type: Boolean,
      default: true,
    },
    highlightInterval: {
      type: Number,
      default: 2500,
    },
  },
  data() {
    return {
      chart: null,
      highlightTimer: null,
      currentIndex: 0,
    };
  },
  watch: {
    categories: {
      handler() {
        this.updateChart();
        this.startAutoHighlight();
      },
      deep: true,
    },
    values: {
      handler() {
        this.updateChart();
        this.startAutoHighlight();
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      this.startAutoHighlight();
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
    this.stopAutoHighlight();
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
      if (value === null || value === undefined || Number.isNaN(value)) return "-";
      const num = Number(value);
      return Number.isInteger(num) ? num.toLocaleString() : num.toLocaleString(undefined, { maximumFractionDigits: 3 });
    },
    formatCategory(label) {
      if (!label) return "";
      const text = String(label);
      if (text.length <= 4) return text;
      return `${text.slice(0, 4)}\n${text.slice(4)}`;
    },
    updateChart() {
      if (!this.chart) return;

      const categories = Array.isArray(this.categories) ? this.categories : [];
      const values = Array.isArray(this.values) ? this.values : [];
      if (!categories.length) {
        this.chart.clear();
        return;
      }

      const safeValues = categories.map((_, index) => Number(values[index]) || 0);
      const maxValue = Math.max(...safeValues, 0);
      const baseValue = maxValue === 0 ? 1 : maxValue;
      const backgroundValues = categories.map(() => baseValue);
      const barWidth = Math.max(18, Math.min(44, Math.round(240 / categories.length)));

      const option = {
        grid: {
          left: "6%",
          right: "4%",
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
            const item = params?.find((p) => p.seriesName === "实际能耗");
            if (!item) return "";
            const suffix = this.unit ? ` ${this.unit}` : "";
            return `${item.axisValue}<br/>能耗: ${this.formatValue(item.data)}${suffix}`;
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
            interval: 0,
            margin: 18,
            formatter: (value) => this.formatCategory(value),
          },
        },
        yAxis: {
          type: "value",
          max: baseValue * 1.25,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: 20,
          },
          splitLine: {
            lineStyle: { color: "rgba(255, 255, 255, 0.18)", type: "dashed" },
          },
        },
        series: [
          {
            name: "背景",
            type: "bar",
            data: backgroundValues,
            barWidth,
            barGap: "-100%",
            silent: true,
            itemStyle: {
              color: "rgba(255, 255, 255, 0.18)",
              barBorderRadius: [12, 12, 0, 0],
            },
          },
          {
            name: "实际能耗",
            type: "bar",
            data: safeValues,
            barWidth,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#9CFFFE" },
                { offset: 0.45, color: "#6BE7FF" },
                { offset: 0.75, color: "#FFD36A" },
                { offset: 1, color: "#FF9900" },
              ]),
              barBorderRadius: [12, 12, 0, 0],
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 30,
                shadowColor: "rgba(255, 197, 64, 0.7)",
              },
            },
            label: {
              show: true,
              position: "top",
              color: "#ffffff",
              fontSize: 20,
              fontWeight: 600,
              formatter: (params) => {
                if (!params.value) return "";
                return this.formatValue(params.value);
              },
            },
          },
        ],
      };

      this.chart.setOption(option, true);
      this.currentIndex = Math.min(this.currentIndex, categories.length - 1);
      this.highlightBar(this.currentIndex);
    },
    highlightBar(index) {
      if (!this.chart) return;
      this.chart.dispatchAction({ type: "downplay", seriesIndex: 1 });
      this.chart.dispatchAction({ type: "highlight", seriesIndex: 1, dataIndex: index });
      this.chart.dispatchAction({ type: "showTip", seriesIndex: 1, dataIndex: index });
    },
    startAutoHighlight() {
      if (!this.autoHighlight) return;
      this.stopAutoHighlight();

      const categories = Array.isArray(this.categories) ? this.categories : [];
      if (!categories.length) return;

      this.highlightTimer = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % categories.length;
        this.highlightBar(this.currentIndex);
      }, this.highlightInterval);
    },
    stopAutoHighlight() {
      if (this.highlightTimer) {
        clearInterval(this.highlightTimer);
        this.highlightTimer = null;
      }
    },
  },
};
</script>

<style scoped>
.line-energy-bar-chart {
  width: 100%;
  height: 100%;
  min-height: 420px;
}
</style>

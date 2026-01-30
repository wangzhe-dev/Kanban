<template>
  <div class="msc" ref="chartRef"></div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "MaterialStatisticsChart",
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chart: null,
      currentIndex: 0,
      highlightTimer: null,
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
    this.initChart();
    this.startAutoHighlight();
    window.addEventListener("resize", this.handleResize);
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
    handleResize() {
      if (this.chart) this.chart.resize();
    },
    initChart() {
      if (!this.$refs.chartRef) return;
      this.chart = echarts.init(this.$refs.chartRef);
      this.updateChart();
    },
    updateChart() {
      if (!this.chart) return;

      const list = Array.isArray(this.chartData) ? this.chartData : [];
      if (!list.length) {
        this.chart.clear();
        return;
      }

      const categories = list.map((item) => item.name);
      const planValues = list.map((item) => Number(item.plan) || 0);
      const actualValues = list.map((item) => {
        if (item && item.actual != null) return Number(item.actual) || 0;
        return Number(item.value) || 0; // backward-compatible
      });

      const option = {
        legend: {
          top: "2%",
          right: "30%",
          itemWidth: 18,
          itemHeight: 10,
          textStyle: {
            color: "rgba(255,255,255,0.9)",
            fontSize: 20,
            fontWeight: 700,
          },
          data: ["计划物量", "实际物量"],
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "18%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
        },
        xAxis: {
          type: "category",
          data: categories,
          axisLine: { lineStyle: { color: "rgba(64, 213, 255, 0.3)" } },
          axisLabel: {
            color: "#ffffff",
            fontSize: 20,
            interval: 0,
            margin: 12,
          },
          axisTick: { show: false },
        },
        yAxis: {
          type: "value",
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: "#ffffff", fontSize: 20 },
          splitLine: {
            lineStyle: { color: "rgba(64, 213, 255, 0.1)", type: "dashed" },
          },
        },
        series: [
          {
            name: "计划物量",
            type: "bar",
            data: planValues,
            barWidth: "28%",
            itemStyle: {
              barBorderRadius: [20, 20, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#2EBCE8" },
                { offset: 1, color: "#1A5DFF" },
              ]),
            },
            emphasis: {
              itemStyle: {
                barBorderRadius: [20, 20, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#FFFFFF" },
                  { offset: 0.3, color: "#66E6FF" },
                  { offset: 1, color: "#1A6DFF" },
                ]),
                borderColor: "#FFFFFF",
                borderWidth: 4,
                shadowColor: "rgba(46, 188, 232, 0.9)",
                shadowBlur: 40,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
              },
            },
            label: {
              show: true,
              position: "top",
              color: "#ffffff",
              fontSize: 22,
              fontWeight: "bold",
              formatter: (params) => (params.value > 0 ? params.value : ""),
            },
          },
          {
            name: "实际物量",
            type: "bar",
            data: actualValues,
            barWidth: "28%",
            itemStyle: {
              barBorderRadius: [20, 20, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FFD700" },
                { offset: 1, color: "#FF9900" },
              ]),
            },
            emphasis: {
              itemStyle: {
                barBorderRadius: [20, 20, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#FFFFFF" },
                  { offset: 0.3, color: "#FFE44D" },
                  { offset: 1, color: "#FFAA33" },
                ]),
                borderColor: "#FFFFFF",
                borderWidth: 4,
                shadowColor: "rgba(255, 215, 0, 0.9)",
                shadowBlur: 40,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
              },
            },
            label: {
              show: true,
              position: "top",
              color: "#ffffff",
              fontSize: 22,
              fontWeight: "bold",
              formatter: (params) => (params.value > 0 ? params.value : ""),
            },
          },
        ],
      };

      this.chart.setOption(option, true);
      this.highlightBar(this.currentIndex);
    },
    highlightBar(index) {
      if (!this.chart) return;
      this.chart.dispatchAction({ type: "downplay", seriesIndex: 0 });
      this.chart.dispatchAction({ type: "downplay", seriesIndex: 1 });
      this.chart.dispatchAction({ type: "highlight", seriesIndex: 0, dataIndex: index });
      this.chart.dispatchAction({ type: "highlight", seriesIndex: 1, dataIndex: index });
      this.chart.dispatchAction({ type: "showTip", seriesIndex: 0, dataIndex: index });
    },
    startAutoHighlight() {
      this.stopAutoHighlight();
      this.highlightTimer = setInterval(() => {
        const list = Array.isArray(this.chartData) ? this.chartData : [];
        if (!list.length) return;
        this.currentIndex = (this.currentIndex + 1) % list.length;
        this.highlightBar(this.currentIndex);
      }, 2000);
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
.msc {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>

<template>
  <div class="report-chart" ref="chartRef"></div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "ReportChart",
  props: {
    chartData: {
      type: Array,
      default: () => [],
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
    this.initChart();
  },
  beforeDestroy() {
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
    updateChart() {
      if (!this.chart || !this.chartData.length) return;

      const categories = this.chartData.map(item => item.name);
      const startedData = this.chartData.map(item => item.started);
      const notStartedData = this.chartData.map(item => item.notStarted);
      const completedData = this.chartData.map(item => item.completed);

      const option = {
        grid: {
          left: "5%",
          right: "5%",
          bottom: "0%",
          top: "15%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          borderColor: "#40d5ff",
          borderWidth: 1,
          textStyle: {
            color: "#ffffff",
            fontSize: 24,
          },
        },
        legend: {
          data: ["已开工", "未开工", "完工"],
          top: "0%",
          textStyle: {
            color: "#ffffff",
            fontSize: 24,
          },
          itemWidth: 30,
          itemHeight: 20,
          itemGap: 40,
        },
        xAxis: {
          type: "category",
          data: categories,
          axisLine: {
            lineStyle: {

              color: "rgba(64, 213, 255, 0.3)",
            },
          },
          axisLabel: {
            color: "#ffffff",
            fontSize: 24,
            rotate: 15,
            interval: 0,
            margin: 30, // 标签与轴线的距离
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#ffffff",
            fontSize: 24,
          },
          splitLine: {
            lineStyle: {
              color: "rgba(64, 213, 255, 0.1)",
              type: "dashed",
            },
          },
        },
        series: [
          {
            name: "已开工",
            type: "bar",
            barWidth: "20%",
            data: startedData,
            itemStyle: {
              barBorderRadius: [20, 20, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#69C0FF" },
                { offset: 1, color: "#1890FF" },
              ]),
            },
          },
          {
            name: "未开工",
            type: "bar",
            barWidth: "20%",
            data: notStartedData,
            itemStyle: {
              barBorderRadius: [20, 20, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FFB347" },
                { offset: 1, color: "#FF9900" },
              ]),
            },
          },
          {
            name: "完工",
            type: "bar",
            barWidth: "20%",
            data: completedData,
            itemStyle: {
              barBorderRadius: [20, 20, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#95DE64" },
                { offset: 1, color: "#52C41A" },
              ]),
            },
          },
        ],
      };

      this.chart.setOption(option);
    },
  },
};
</script>

<style scoped>
.report-chart {
  width: 100%;
  height: 100%;
  min-height: 400px;
}
</style>

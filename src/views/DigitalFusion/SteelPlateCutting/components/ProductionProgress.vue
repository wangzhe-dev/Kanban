<template>
  <div class="production-progress">
    <div class="chart-wrapper" ref="chartWrapper">
      <div class="chart-container" ref="chartContainer"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "ProductionProgress",
  props: {
    progressData: {
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
    progressData: {
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
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  },
  methods: {
    initChart() {
      if (!this.$refs.chartContainer) return;

      this.chart = echarts.init(this.$refs.chartContainer);
      this.updateChart();

      window.addEventListener("resize", this.handleResize);
    },
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    updateChart() {
      if (!this.chart) return;

      const days = this.progressData.map(item => item.day);
      const planned = this.progressData.map(item => item.planned);
      const actual = this.progressData.map(item => item.actual);

      const option = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          borderColor: "#40d5ff",
          textStyle: {
            color: "#fff",
            fontSize: 20,
          },
        },
        legend: {
          data: ["计划产量", "实际产量"],
          top: 10,
          textStyle: {
            color: "#fff",
            fontSize: 22,
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "60",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: days,
          axisLine: {
            lineStyle: {
              color: "rgba(64, 213, 255, 0.3)",
            },
          },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: 22,
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
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
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: 20,
          },
        },
        series: [
          {
            name: "计划产量",
            type: "bar",
            barWidth: "30%",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(64, 213, 255, 0.8)" },
                { offset: 1, color: "rgba(64, 213, 255, 0.2)" },
              ]),
              borderRadius: [4, 4, 0, 0],
            },
            data: planned,
          },
          {
            name: "实际产量",
            type: "bar",
            barWidth: "30%",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(82, 196, 26, 0.8)" },
                { offset: 1, color: "rgba(82, 196, 26, 0.2)" },
              ]),
              borderRadius: [4, 4, 0, 0],
            },
            data: actual,
          },
        ],
      };

      this.chart.setOption(option);
    },
  },
};
</script>

<style scoped>
.production-progress {
  width: 100%;
  height: 100%;
}

.chart-wrapper {
  width: 100%;
  height: 100%;
}

.chart-container {
  width: 100%;
  height: 100%;
}
</style>

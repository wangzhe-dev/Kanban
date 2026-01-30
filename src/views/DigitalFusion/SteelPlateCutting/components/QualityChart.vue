<template>
  <div class="quality-chart">
    <div class="chart-wrapper" ref="chartWrapper">
      <div class="chart-container" ref="chartContainer"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "QualityChart",
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

      const names = this.chartData.map((item) => item.name);
      const totals = this.chartData.map(
        (item) => item.started + item.completed
      );
      const barWidth = 22;
      const barRadius = barWidth / 2;

      // 每段都是独立的胶囊形状（左右都有圆角）
      const startedData = this.chartData.map((item) => ({
        value: item.started,
        itemStyle: {
          barBorderRadius: barRadius,
        },
      }));

      const completedData = this.chartData.map((item) => ({
        value: item.completed,
        itemStyle: {
          barBorderRadius: barRadius,
        },
      }));

      // 计算最大值，用于设置X轴范围
      const maxValue = Math.max(...totals, 0);

      // 根据最大值计算合适的间隔，使得大约有8个间隔
      const targetIntervals = 8;
      const rawInterval = maxValue / targetIntervals;

      // 将间隔圆整到合适的值（0.1, 0.2, 0.5, 1, 2, 5, 10等）
      const magnitude = Math.pow(10, Math.floor(Math.log10(rawInterval)));
      const normalized = rawInterval / magnitude;
      let interval;
      if (normalized <= 1) interval = magnitude;
      else if (normalized <= 2) interval = 2 * magnitude;
      else if (normalized <= 5) interval = 5 * magnitude;
      else interval = 10 * magnitude;

      const xAxisMax = Math.ceil(maxValue / interval) * interval;

      const option = {
        color: ["#faad14", "#52c41a"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          borderColor: "#40d5ff",
          textStyle: {
            color: "#fff",
            fontSize: 26,
          },
          formatter: (params) => {
            const name = params[0]?.name || "";
            let startVal = 0;
            let completeVal = 0;
            params.forEach(p => {
              if (p.seriesName === "已开工") {
                startVal = Number(p.value || 0);
              } else if (p.seriesName === "完工") {
                completeVal = Number(p.value || 0);
              }
            });
            const totalVal = startVal + completeVal;
            return `${name}<br/>已开工: ${startVal}<br/>完工: ${completeVal}<br/>合计: ${totalVal.toFixed(1)}`;
          },
        },
        legend: {
          data: ["已开工", "完工"],
          top: 10,
          textStyle: {
            color: "#fff",
            fontSize: 26,
          },
        },
        grid: {
          left: "2%",
          right: "8%",
          bottom: "3%",
          top: "60",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          max: xAxisMax,
          min: 0,
          interval: interval,
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(64, 213, 255, 0.3)",
            },
          },
          axisTick: {
            show: true,
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
            show: true,
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: 22,
            formatter: (value) => {
              return value.toFixed(1);
            },
          },
        },
        yAxis: {
          type: "category",
          data: names,
          inverse: true,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.9)",
            fontSize: 22,
            margin: 15,
          },
        },
        series: [
          {
            name: "已开工",
            type: "bar",
            stack: "total",
            barWidth: barWidth,
            itemStyle: {
              color: "#faad14",
            },
            emphasis: {
              itemStyle: {
                color: "#faad14",
              },
            },
            data: startedData,
          },
          {
            name: "完工",
            type: "bar",
            stack: "total",
            barWidth: barWidth,
            label: {
              show: true,
              position: "right",
              color: "#fff",
              fontSize: 20,
              formatter: (params) => {
                const idx = params.dataIndex;
                const total = totals[idx] || 0;
                return total.toFixed(1);
              },
            },
            itemStyle: {
              color: "#52c41a",
            },
            emphasis: {
              itemStyle: {
                color: "#52c41a",
              },
            },
            data: completedData,
          },
        ],
      };

      this.chart.setOption(option, { notMerge: true });
    },
  },
};
</script>

<style scoped>
.quality-chart {
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

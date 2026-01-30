<template>
  <div class="equipment-chart" ref="chartRef"></div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "EquipmentStatus",
  props: {
    equipmentData: {
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
    equipmentData: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
  },
  mounted() {
    this.initChart();
    this.startAutoHighlight();
  },
  beforeDestroy() {
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
    },
    updateChart() {
      if (!this.chart || !this.equipmentData.length) return;

      const categories = this.equipmentData.map(item => item.name);
      const values = this.equipmentData.map(item => item.value);

      const option = {
        grid: {
          left: "3%",
          right: "3%",
          bottom: "15%",
          top: "10%",
          containLabel: true,
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
            fontSize: 20,
            interval: 0,
            margin: 12,
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
            fontSize: 20,
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
            type: "bar",
            data: values,
            barWidth: "40%",
            itemStyle: {
              barBorderRadius: [20, 20, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FFD700" },
                { offset: 1, color: "#FF9900" },
              ]),
              borderRadius: [20, 20, 0, 0],
            },
            emphasis: {
              itemStyle: {
                barBorderRadius: [20, 20, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#FFFFFF" },
                  { offset: 0.3, color: "#FFE44D" },
                  { offset: 1, color: "#FFAA33" },
                ]),
                borderRadius: [20, 20, 0, 0],
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
              formatter: (params) => {
                return params.value > 0 ? params.value : "";
              },
            },
          },
        ],
      };

      this.chart.setOption(option);

      // Highlight the first bar initially
      this.highlightBar(this.currentIndex);
    },
    highlightBar(index) {
      if (!this.chart) return;

      // Downplay all bars first
      this.chart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
      });

      // Highlight the current bar
      this.chart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: index,
      });

      // Show tooltip
      this.chart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: index,
      });
    },
    startAutoHighlight() {
      if (this.highlightTimer) {
        clearInterval(this.highlightTimer);
      }

      this.highlightTimer = setInterval(() => {
        if (!this.equipmentData.length) return;

        this.currentIndex = (this.currentIndex + 1) % this.equipmentData.length;
        this.highlightBar(this.currentIndex);
      }, 2000); // 2 seconds interval
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
.equipment-chart {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>

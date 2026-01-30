<template>
  <div class="inventory-status-chart" ref="chartRef"></div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "InventoryEquipmentStatusChart",
  props: {
    items: {
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
  computed: {
    normalizedItems() {
      const list = Array.isArray(this.items) ? this.items : [];
      return list.filter(Boolean).map((item, index) => ({
        key: item.key != null ? item.key : `${item.name || "item"}-${index}`,
        name: item.name != null ? String(item.name) : "-",
        value: Number(item.value || 0),
      }));
    },
  },
  watch: {
    normalizedItems: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
      this.startAutoHighlight();
      window.addEventListener("resize", this.handleResize);
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
    },
    handleResize() {
      if (this.chart) this.chart.resize();
    },
    updateChart() {
      if (!this.chart || !this.normalizedItems.length) return;

      const categories = this.normalizedItems.map((item) => item.name);
      const values = this.normalizedItems.map((item) => item.value);

      const option = {
        grid: {
          left: "3%",
          right: "3%",
          bottom: "5%",
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
            fontSize: 24,
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

      this.currentIndex = Math.min(this.currentIndex, this.normalizedItems.length - 1);
      this.highlightBar(this.currentIndex);
    },
    highlightBar(index) {
      if (!this.chart) return;

      this.chart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
      });

      this.chart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: index,
      });

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
        if (!this.normalizedItems.length) return;

        this.currentIndex = (this.currentIndex + 1) % this.normalizedItems.length;
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
.inventory-status-chart {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>

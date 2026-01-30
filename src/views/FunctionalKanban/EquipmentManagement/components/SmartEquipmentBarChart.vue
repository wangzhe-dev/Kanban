<template>
  <div class="smart-equipment-bar-chart" ref="chartRef"></div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "SmartEquipmentBarChart",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    autoHighlight: {
      type: Boolean,
      default: true,
    },
    highlightInterval: {
      type: Number,
      default: 2000,
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
      return list
        .filter(Boolean)
        .map((raw, index) => ({
          key: raw.key != null ? raw.key : `${raw.code || raw.name || "item"}-${index}`,
          code: raw.code != null ? String(raw.code) : "",
          name: raw.name != null ? String(raw.name) : "",
          value: Number(raw.value || 0),
        }));
    },
  },
  watch: {
    normalizedItems: {
      handler() {
        this.updateChart();
        this.restartAutoHighlight();
      },
      deep: true,
    },
    autoHighlight() {
      this.restartAutoHighlight();
    },
    highlightInterval() {
      this.restartAutoHighlight();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
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
      this.restartAutoHighlight();
    },
    handleResize() {
      if (this.chart) this.chart.resize();
    },
    updateChart() {
      if (!this.chart) return;

      const categories = this.normalizedItems.map((i) => i.code || i.name || "-");
      const values = this.normalizedItems.map((i) => i.value);

      const option = {
        grid: {
          left: "3%",
          right: "3%",
          bottom: "4%",
          top: "10%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          backgroundColor: "rgba(0, 0, 0, 0.82)",
          borderColor: "rgba(64, 213, 255, 0.6)",
          borderWidth: 1,
          textStyle: { color: "#ffffff", fontSize: 22 },
          formatter: (params) => {
            const p = params && params[0];
            if (!p) return "";
            const item = this.normalizedItems[p.dataIndex] || {};
            const code = item.code ? `(${item.code})` : "";
            return `${item.name || p.axisValue}${code}<br/>数量：${p.value}`;
          },
        },
        xAxis: {
          type: "category",
          data: categories,
          axisLine: { lineStyle: { color: "rgba(64, 213, 255, 0.3)" } },
          axisTick: { show: false },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.85)",
            fontSize: 20,
            interval: 0,
            margin: 16,
          },
        },
        yAxis: {
          type: "value",
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: "rgba(255, 255, 255, 0.75)", fontSize: 20 },
          splitLine: {
            lineStyle: { color: "rgba(64, 213, 255, 0.12)", type: "dashed" },
          },
        },
        series: [
          {
            type: "bar",
            data: values,
            barWidth: "40%",
            itemStyle: {
              barBorderRadius: [18, 18, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FFD700" },
                { offset: 1, color: "#FF9900" },
              ]),
            },
            emphasis: {
              itemStyle: {
                barBorderRadius: [18, 18, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#FFFFFF" },
                  { offset: 0.3, color: "#FFE44D" },
                  { offset: 1, color: "#FFAA33" },
                ]),
                borderColor: "#FFFFFF",
                borderWidth: 4,
                shadowColor: "rgba(255, 215, 0, 0.9)",
                shadowBlur: 34,
              },
            },
            label: {
              show: true,
              position: "top",
              color: "#ffffff",
              fontSize: 20,
              fontWeight: "bold",
              formatter: (p) => (p.value > 0 ? p.value : ""),
            },
          },
        ],
      };

      this.chart.setOption(option, true);

      if (this.normalizedItems.length) {
        this.currentIndex = Math.min(this.currentIndex, this.normalizedItems.length - 1);
        this.highlightBar(this.currentIndex);
      }
    },
    highlightBar(index) {
      if (!this.chart) return;
      this.chart.dispatchAction({ type: "downplay", seriesIndex: 0 });
      this.chart.dispatchAction({ type: "highlight", seriesIndex: 0, dataIndex: index });
      this.chart.dispatchAction({ type: "showTip", seriesIndex: 0, dataIndex: index });
    },
    startAutoHighlight() {
      if (!this.autoHighlight) return;
      if (this.highlightTimer) clearInterval(this.highlightTimer);

      this.highlightTimer = setInterval(() => {
        const n = this.normalizedItems.length;
        if (!n) return;
        this.currentIndex = (this.currentIndex + 1) % n;
        this.highlightBar(this.currentIndex);
      }, this.highlightInterval);
    },
    stopAutoHighlight() {
      if (this.highlightTimer) {
        clearInterval(this.highlightTimer);
        this.highlightTimer = null;
      }
    },
    restartAutoHighlight() {
      this.stopAutoHighlight();
      this.startAutoHighlight();
    },
  },
};
</script>

<style scoped>
.smart-equipment-bar-chart {
  width: 100%;
  height: 100%;
  min-height: 260px;
}
</style>

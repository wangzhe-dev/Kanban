<template>
  <div class="ndt-qualified-chart" ref="chartRef"></div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "NdtQualifiedRateChart",
  props: {
    rows: {
      type: Array,
      default: () => [],
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
      currentIndex: 0,
      highlightTimer: null,
    };
  },
  computed: {
    normalizedRows() {
      const list = Array.isArray(this.rows) ? this.rows : [];
      return list.filter(Boolean).map((raw, index) => ({
        key: raw.key != null ? raw.key : `${raw.name || raw.lineName || "row"}-${index}`,
        name: raw.name != null ? String(raw.name) : String(raw.lineName || "-"),
        passCount: Number(raw.passCount || 0),
        totalCount: Number(raw.totalCount || 0),
        rate: this.formatRate(raw.passCount, raw.totalCount),
      }));
    },
  },
  watch: {
    normalizedRows: {
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
    formatRate(passCount, totalCount) {
      const pass = Number(passCount || 0);
      const total = Number(totalCount || 0);
      if (!total) return 0;
      return Math.round((pass / total) * 100);
    },
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

      const names = this.normalizedRows.map((row) => row.name);
      const passCounts = this.normalizedRows.map((row) => row.passCount);
      const totalCounts = this.normalizedRows.map((row) => row.totalCount);
      const rates = this.normalizedRows.map((row) => row.rate);

      const maxCount = Math.max(0, ...passCounts, ...totalCounts);
      const ySteps = 4;
      const yInterval = maxCount <= 0 ? 10 : Math.ceil(maxCount / ySteps / 10) * 10;
      const yMax = yInterval * ySteps;

      const option = {
        grid: {
          left: "6%",
          right: "6%",
          top: "12%",
          bottom: "0%",
          containLabel: true,
        },
        legend: {
          top: 0,
          itemWidth: 18,
          itemHeight: 10,
          textStyle: { color: "rgba(255,255,255,0.9)", fontSize: 26 },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          backgroundColor: "rgba(0, 0, 0, 0.82)",
          borderColor: "rgba(64, 213, 255, 0.6)",
          borderWidth: 1,
          textStyle: { color: "#ffffff", fontSize: 22 },
          formatter: (params) => {
            const first = params && params[0];
            if (!first) return "";
            const idx = first.dataIndex;
            const row = this.normalizedRows[idx];
            if (!row) return "";
            return [
              `${row.name}`,
              `探伤合格数：${row.passCount}`,
              `探伤总数：${row.totalCount}`,
              `探伤合格率：${row.rate}%`,
            ].join("<br/>");
          },
        },
        xAxis: {
          type: "category",
          data: names,
          axisLine: { lineStyle: { color: "rgba(64, 213, 255, 0.35)" } },
          axisTick: { show: false },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.9)",
            fontSize: 24,
            interval: 0,
            rotate: 28,
            margin: 18,
          },
        },
        yAxis: [
          {
            type: "value",
            max: yMax,
            interval: yInterval,
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
              color: "rgba(255, 255, 255, 0.75)",
              fontSize: 20,
            },
            splitLine: { lineStyle: { color: "rgba(64, 213, 255, 0.12)", type: "dashed" } },
          },
          {
            type: "value",
            min: 0,
            max: 100,
            interval: 20,
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: 20,
              formatter: (value) => `${value}%`,
            },
            splitLine: { show: false },
          },
        ],
        series: [
          {
            name: "探伤合格数",
            type: "bar",
            barWidth: 20,
            data: passCounts,
            itemStyle: { color: "#69C0FF" },
            emphasis: { focus: "series" },
          },
          {
            name: "探伤总数",
            type: "bar",
            data: totalCounts,
            itemStyle: { color: "#52C41A" },
            emphasis: { focus: "series" },
          },
          {
            name: "探伤合格率",
            type: "line",
            yAxisIndex: 1,
            data: rates,
            smooth: true,
            symbolSize: 8,
            itemStyle: { color: "#FAAD14" },
            lineStyle: { width: 3, color: "#FAAD14" },
          },
        ],
      };

      this.chart.setOption(option, true);

      if (this.normalizedRows.length) {
        this.currentIndex = Math.min(this.currentIndex, this.normalizedRows.length - 1);
        this.highlightBar(this.currentIndex);
      }
    },
    highlightBar(index) {
      if (!this.chart) return;
      const seriesCount = 3;
      for (let i = 0; i < seriesCount; i += 1) {
        this.chart.dispatchAction({ type: "downplay", seriesIndex: i });
      }
      for (let i = 0; i < seriesCount; i += 1) {
        this.chart.dispatchAction({ type: "highlight", seriesIndex: i, dataIndex: index });
      }
      this.chart.dispatchAction({ type: "showTip", seriesIndex: 0, dataIndex: index });
    },
    startAutoHighlight() {
      if (!this.autoHighlight) return;
      if (this.highlightTimer) clearInterval(this.highlightTimer);

      this.highlightTimer = setInterval(() => {
        const total = this.normalizedRows.length;
        if (!total) return;
        this.currentIndex = (this.currentIndex + 1) % total;
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
.ndt-qualified-chart {
  width: 100%;
  height: 100%;
  min-height: 260px;
}
</style>

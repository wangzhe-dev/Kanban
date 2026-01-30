<template>
  <div class="abnormal-duration-chart" ref="chartRef"></div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "AbnormalDurationStackedBar",
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
        key: raw.key != null ? raw.key : `${raw.name || "row"}-${index}`,
        name: raw.name != null ? String(raw.name) : "-",
        waiting: Number(raw.waiting || 0),
        preparation: Number(raw.preparation || 0),
        downtime: Number(raw.downtime || 0),
        emergencyStop: Number(raw.emergencyStop || 0),
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

      const names = this.normalizedRows.map((r) => r.name);
      const waiting = this.normalizedRows.map((r) => r.waiting);
      const preparation = this.normalizedRows.map((r) => r.preparation);
      const downtime = this.normalizedRows.map((r) => r.downtime);
      const emergencyStop = this.normalizedRows.map((r) => r.emergencyStop);

      const maxValue = Math.max(0, ...waiting, ...preparation, ...downtime, ...emergencyStop);
      const yInterval = 2000;
      const yMax = maxValue <= 0 ? yInterval * 2 : Math.ceil(maxValue / yInterval) * yInterval;

      const option = {
        grid: {
          left: "6%",
          right: "2%",
          top: "10%",
          bottom: "0%",
          containLabel: true,
        },
        legend: {
          top: 0,
          // right: "2%",
          itemWidth: 18,
          itemHeight: 10,
          textStyle: { color: "rgba(255,255,255,0.9)", fontSize: 28 },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          backgroundColor: "rgba(0, 0, 0, 0.82)",
          borderColor: "rgba(64, 213, 255, 0.6)",
          borderWidth: 1,
          textStyle: { color: "#ffffff", fontSize: 22 },
          formatter: (params) => {
            const p0 = params && params[0];
            if (!p0) return "";
            const idx = p0.dataIndex;
            const row = this.normalizedRows[idx];
            if (!row) return "";
            return [
              `${row.name}`,
              `等待时长：${row.waiting} min`,
              `整备时长：${row.preparation} min`,
              `停机时长：${row.downtime} min`,
              `急停时长：${row.emergencyStop} min`,
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
            fontSize: 28,
            interval: 0,
            rotate: 30,
            margin: 20,
          },
        },
        yAxis: {
          type: "value",
          max: yMax,
          interval: yInterval,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.75)",
            fontSize: 20,
            formatter: (value) => `${Math.round((Number(value) || 0) / 1000)}k`,
          },
          splitLine: { lineStyle: { color: "rgba(64, 213, 255, 0.12)", type: "dashed" } },
        },
        series: [
          {
            name: "等待时长",
            type: "bar",
            barWidth: 26,
            data: waiting,
            itemStyle: { color: "#69C0FF" },
            emphasis: { focus: "series" },
          },
          {
            name: "整备时长",
            type: "bar",
            data: preparation,
            itemStyle: { color: "#52C41A" },
            emphasis: { focus: "series" },
          },
          {
            name: "停机时长",
            type: "bar",
            data: downtime,
            itemStyle: { color: "#FAAD14" },
            emphasis: { focus: "series" },
          },
          {
            name: "急停时长",
            type: "bar",
            data: emergencyStop,
            itemStyle: { color: "#FF4D4F" },
            emphasis: { focus: "series" },
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
      const seriesCount = 4;
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
        const n = this.normalizedRows.length;
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
.abnormal-duration-chart {
  width: 100%;
  height: 100%;
  min-height: 260px;
}
</style>

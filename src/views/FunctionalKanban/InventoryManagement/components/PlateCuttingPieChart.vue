<template>
  <div class="plate-cutting-pie" ref="chartRef"></div>
</template>

<script>
export default {
  name: "PlateCuttingPieChart",
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
    palette: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chart: null,
      defaultPalette: [
        { start: "#00d9ff", end: "#00aaff" },
        { start: "#ffb347", end: "#ff8c00" },
        { start: "#36ffd0", end: "#14caa6" },
        { start: "#2c7bff", end: "#46c0ff" },
      ],
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.setOptions();
      },
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
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  },
  methods: {
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    initChart() {
      if (!this.$refs.chartRef) return;
      this.chart = this.$echarts.init(this.$refs.chartRef);
      this.setOptions();
    },
    setOptions() {
      if (!this.chart) return;

      const paletteSource = (this.palette && this.palette.length) ? this.palette : this.defaultPalette;
      const gradients = paletteSource.map((item) => {
        if (typeof item === "string") {
          return { start: item, end: item };
        }
        if (item && typeof item === "object") {
          const start = item.start || item.color || "#00c9ff";
          return { start, end: item.end || start };
        }
        return { start: "#00c9ff", end: "#00aaff" };
      });

      const seriesData = (this.chartData || []).map((item, index) => {
        const colorPair = gradients[index % gradients.length];
        const accent = colorPair.end || colorPair.start;
        return {
          value: Number(item.value) || 0,
          name: item.name,
          itemStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: colorPair.start },
              { offset: 1, color: colorPair.end },
            ]),
            shadowColor: accent,
            shadowBlur: 20,
            shadowOffsetY: 6,
            borderColor: "rgba(2, 12, 25, 0.9)",
            borderWidth: 2,
          },
          labelLine: {
            show: false,
          },
        };
      });

      const option = {
        backgroundColor: "transparent",
        legend: {
          show: true,
          orient: "horizontal",
          left: "center",
          bottom: "4%",
          textStyle: {
            color: "#e1f5ff",
            fontSize: 24,
            fontWeight: 700,
          },
          itemWidth: 14,
          itemHeight: 14,
          itemGap: 18,
          formatter: (name) => {
            const item = seriesData.find((entry) => entry.name === name);
            if (!item) return name;
            return `${name}  ${item.value}`;
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>{c} ({d}%)",
          backgroundColor: "rgba(10, 25, 48, 0.95)",
          borderColor: "rgba(108, 203, 255, 0.5)",
          borderWidth: 1,
          textStyle: {
            fontSize: 26,
            color: "#e1f5ff",
          },
          padding: [10, 14],
        },
        series: [
          {
            type: "pie",
            radius: ["35%", "70%"],
            center: ["50%", "46%"],
            startAngle: 200,
            avoidLabelOverlap: true,
            label: {
              show: false,
            },
            data: seriesData,
          },
        ],
      };

      this.chart.setOption(option, true);
    },
  },
};
</script>

<style scoped>
.plate-cutting-pie {
  width: 100%;
  height: 100%;
  min-height: 0;
}
</style>

<template>
  <div class="ndt-pie-card">
    <div class="ndt-pie-card__header">
      <h3 class="section-title">{{ title }}</h3>
    </div>
    <div class="ndt-pie-card__chart" ref="chartRef"></div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "NdtQualifiedPieCard",
  props: {
    title: {
      type: String,
      default: "",
    },
    value: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    centerText: {
      type: String,
      default: "",
    },
    valueLabel: {
      type: String,
      default: "探伤合格数",
    },
    restLabel: {
      type: String,
      default: "探伤未合格数",
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  computed: {
    valueCount() {
      return Number(this.value || 0);
    },
    totalCount() {
      return Number(this.total || 0);
    },
    restCount() {
      return Math.max(this.totalCount - this.valueCount, 0);
    },
    displayText() {
      if (this.centerText) return this.centerText;
      return String(this.valueCount);
    },
  },
  watch: {
    value() {
      this.updateChart();
    },
    total() {
      this.updateChart();
    },
    centerText() {
      this.updateChart();
    },
    valueLabel() {
      this.updateChart();
    },
    restLabel() {
      this.updateChart();
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
    initChart() {
      if (!this.$refs.chartRef) return;
      this.chart = echarts.init(this.$refs.chartRef);
      this.updateChart();
    },
    handleResize() {
      if (this.chart) this.chart.resize();
    },
    updateChart() {
      if (!this.chart) return;
      const valueCount = this.valueCount;
      const restCount = this.restCount;

      const option = {
        title: {
          text: this.displayText,
          left: "center",
          top: "48%",
          textStyle: {
            color: "#ffffff",
            fontSize: 52,
            fontWeight: 700,
          },
        },
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(0, 0, 0, 0.82)",
          borderColor: "rgba(64, 213, 255, 0.6)",
          borderWidth: 1,
          textStyle: { color: "#ffffff", fontSize: 20 },
          formatter: (params) => {
            const total = valueCount + restCount;
            const pct = total ? ((params.value / total) * 100).toFixed(1) : 0;
            return `${params.name}<br/>${params.value} (${pct}%)`;
          },
        },
        series: [
          {
            type: "pie",
            radius: ["55%", "78%"],
            center: ["50%", "55%"],
            avoidLabelOverlap: true,
            label: { show: false },
            labelLine: { show: false },
            data: [
              { value: valueCount, name: this.valueLabel },
              { value: restCount, name: this.restLabel },
            ],
            itemStyle: {
              borderColor: "rgba(2, 12, 25, 0.8)",
              borderWidth: 2,
            },
            color: ["#69C0FF", "#FF7875"],
            emphasis: { scale: true, scaleSize: 10 },
          },
        ],
      };

      this.chart.setOption(option, true);
    },
  },
};
</script>

<style scoped>
.ndt-pie-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid rgba(188, 185, 185, 0.2);
  border-radius: 20px;
}

.ndt-pie-card__header {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 50px;
  margin-left: -20px
}

.section-title {
  font-size: 30px;
  font-weight: 600;
  color: #ffffff;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 0 6px 0;
  position: relative;
  padding: 0 36px;
  letter-spacing: 0.5px;
  box-sizing: border-box;
  white-space: nowrap;
}

.section-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  background-image: url("../../../../assets/images/DF/icon-right@2x.png");
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
}

.section-title::after {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  background-image: url("../../../../assets/images/DF/icon-left@2x.png");
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
}

.ndt-pie-card__chart {
  flex: 8;
  min-height: 220px;
}
</style>

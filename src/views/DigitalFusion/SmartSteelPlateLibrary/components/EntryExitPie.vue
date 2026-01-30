<template>
  <div class="pie-card">
    <div class="chart-area">
      <div class="pie-chart" ref="chartRef"></div>
    </div>
    <div class="info-row">
      <div v-for="(item, index) in bottomStats" :key="index" class="info-item">
        <span class="info-label">{{ item.label }}</span>
        <span class="info-value">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "EntryExitPie",
  props: {
    pieData: {
      type: Array,
      default: () => [],
    },
    bottomStats: {
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
    pieData: {
      deep: true,
      handler() {
        this.currentIndex = 0;
        this.updateChart();
        this.startAutoHighlight();
      },
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
    getPaletteColor(index) {
      const palette = [
        ["#5AC8FF", "#0C9CFF"],
        ["#FFD166", "#FF8F1F"],
        ["#7CFFCB", "#2CE5B5"],
        ["#CFA3FF", "#7F5DFF"],
        ["#8AE0FF", "#3FB1FF"],
      ];
      return palette[index % palette.length];
    },
    buildGradient(baseColor, index) {
      // Use provided color as start; fall back to palette pair
      const [start, end] = baseColor
        ? [this.lightenColor(baseColor, 0.08), this.lightenColor(baseColor, -0.12)]
        : this.getPaletteColor(index);

      return new echarts.graphic.LinearGradient(0, 0, 1, 1, [
        { offset: 0, color: start },
        { offset: 1, color: end },
      ]);
    },
    lightenColor(hex, amount = 0.15) {
      if (!hex || typeof hex !== "string" || !hex.startsWith("#")) return hex;
      const raw = hex.replace("#", "");
      if (![3, 6].includes(raw.length)) return hex;
      const full = raw.length === 3 ? raw.split("").map(c => c + c).join("") : raw;
      const num = parseInt(full, 16);
      const clamp = (v) => Math.max(0, Math.min(255, v));
      const adjust = (v) => clamp(Math.round(v + 255 * amount));
      const r = adjust((num >> 16) & 0xff);
      const g = adjust((num >> 8) & 0xff);
      const b = adjust(num & 0xff);
      const toHex = (v) => v.toString(16).padStart(2, "0");
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    },
    initChart() {
      if (!this.$refs.chartRef) return;
      this.chart = echarts.init(this.$refs.chartRef);
      this.updateChart();
    },
    updateChart() {
      if (!this.chart || !this.pieData.length) return;

      const colors = this.pieData.map(item => item.color || null);
      const dataWithStyle = this.pieData.map((item, index) => ({
        ...item,
        itemStyle: {
          color: this.buildGradient(colors[index], index),
          shadowBlur: 24,
          shadowColor: (colors[index] || this.getPaletteColor(index)[0]) + "66",
        },
      }));

      const option = {
        color: colors,
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          borderColor: "#40d5ff",
          borderWidth: 1,
          textStyle: { color: "#fff", fontSize: 22 },
          formatter: "{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          right: "6%",
          top: "center",
          textStyle: {
            color: "#ffffff",
            fontSize: 32,
          },
          icon: "rect",
          itemWidth: 24,
          itemHeight: 24,
          itemGap: 40,
        },
        series: [
          {
            type: "pie",
            radius: "62%",
            center: ["32%", "50%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "outside",
              formatter: "{name|{b}}\\n{value|{c}}  {percent|{d}%}",
              rich: {
                name: { fontSize: 22, color: "#a8c5e8", lineHeight: 26 },
                value: { fontSize: 28, color: "#ffffff", fontWeight: 700, lineHeight: 32 },
                percent: { fontSize: 22, color: "#ffd34a", fontWeight: 600 },
              },
            },
            labelLine: {
              length: 20,
              length2: 14,
              smooth: true,
              lineStyle: { color: "rgba(255,255,255,0.45)" },
            },
            itemStyle: {
              borderColor: "rgba(255,255,255,0.1)",
              borderWidth: 2,
            },
            data: dataWithStyle,
            animationDuration: 800,
            animationEasing: "cubicOut",
          },
        ],
      };

      this.chart.setOption(option);
      this.highlightSlice(this.currentIndex);
    },
    highlightSlice(index) {
      if (!this.chart || !this.pieData.length) return;

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
      this.stopAutoHighlight();

      if (!this.pieData.length) return;

      this.highlightTimer = setInterval(() => {
        if (!this.pieData.length) return;
        this.currentIndex = (this.currentIndex + 1) % this.pieData.length;
        this.highlightSlice(this.currentIndex);
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
.pie-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  padding: 0 10px 10px;
}

.chart-area {
  flex: 1;
  min-height: 0;
  display: flex;
}

.pie-chart {
  flex: 1;
  min-height: 0;
}

.info-row {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 18px 24px;
  background-image: url("../../../../assets/images/DF/bg-row-itemn.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  box-sizing: border-box;
}

.info-item {
  display: flex;
  align-items: center;
  padding-left: 60px;
  gap: 12px;
  margin: 30px 0;
}

.info-label {
  font-size: 36px;
  color: #a8c5e8;
  font-weight: 900;
}

.info-value {
  font-size: 36px;
  color: #ffd34a;
  font-weight: 900;
  letter-spacing: 0.5px;
}

@media screen and (max-height: 1080px) {
  .pie-card {
    gap: 12px;
  }

  .info-row {
    padding: 12px 18px;
  }

  .info-label {
    font-size: 26px;
  }

  .info-value {
    font-size: 28px;
  }
}
</style>

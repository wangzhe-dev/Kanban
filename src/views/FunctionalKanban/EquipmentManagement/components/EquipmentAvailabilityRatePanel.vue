<template>
  <div class="earp">
    <div class="earp__left">
      <div class="earp__value">{{ formattedRate }}</div>
      <div class="earp__label">设备稼动率</div>
    </div>

    <div class="earp__right">
      <div class="df-table-container" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
        <table class="df-table df-table-header">
            <colgroup>
            <col style="width: 30%" />
            <col style="width: 20%" />
            <col style="width: 20%" />
            <col style="width: 30%" />
            </colgroup>
          <thead>
            <tr>
              <th>产线名称</th>
              <th>设备名称</th>
              <th>工位名称</th>
              <th>稼动率_平均</th>
            </tr>
          </thead>
        </table>

        <div class="df-table-wrapper">
          <div class="df-scroll-content" :style="scrollStyle">
            <table class="df-table df-table-body">
              <colgroup>
            <col style="width: 30%" />
            <col style="width: 20%" />
            <col style="width: 20%" />
            <col style="width: 30%" />
              </colgroup>
              <tbody>
                <tr v-for="(row, index) in displayData" :key="row.key || index">
                  <td>{{ row.lineName }}</td>
                  <td>{{ row.deviceName }}</td>
                  <td>{{ row.stationName }}</td>
                  <td class="earp__rate-cell">{{ row.rate }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import autoScrollMixin from "@/mixin/autoScrollMixin.js";

const sbBg = require("@/assets/images/ZN/shebei/sb.png");
const sbduBg = require("@/assets/images/ZN/shebei/sbdu.png");

export default {
  name: "EquipmentAvailabilityRatePanel",
  mixins: [autoScrollMixin],
  props: {
    overallRate: {
      type: [Number, String],
      default: 0,
    },
    rows: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    valueBgStyle() {
      return {
        backgroundImage: `url(${sbBg}), url(${sbduBg})`,
      };
    },
    formattedRate() {
      const val = this.overallRate;
      if (typeof val === "string" && val.includes("%")) return val;
      const num = Number(val || 0);
      return `${num.toFixed(2)}%`;
    },
    normalizedRows() {
      const list = Array.isArray(this.rows) ? this.rows : [];
      return list.filter(Boolean).map((raw, index) => ({
        key: raw.key != null ? raw.key : `${raw.lineName || "line"}-${raw.deviceName || "device"}-${index}`,
        lineName: raw.lineName != null ? String(raw.lineName) : "-",
        deviceName: raw.deviceName != null ? String(raw.deviceName) : "-",
        stationName: raw.stationName != null ? String(raw.stationName) : "-",
        rate: this.formatRate(raw.rate),
      }));
    },
    scrollData() {
      return this.normalizedRows;
    },
  },
  methods: {
    formatRate(value) {
      if (typeof value === "string" && value.includes("%")) return value;
      const num = Number(value);
      if (!Number.isFinite(num)) return "-";
      return `${num.toFixed(2)}%`;
    },
  },
};
</script>

<style scoped>
.earp {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  gap: 18px;
}

.earp__left {
  flex: 3;
  min-width: 0;
  border: 1px solid rgba(64, 213, 255, 0.16);
  background: rgba(0, 0, 0, 0.18);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 18px 10px;
  box-sizing: border-box;
}

.earp__value {
  font-size: 56px;
  font-weight: 900;
  letter-spacing: 2px;
  color: rgb(255, 111, 0);
  text-shadow: 0 0 18px rgba(255, 111, 0, 0.45);
  font-variant-numeric: tabular-nums;
  line-height: 1;
  width: min(320px, 100%);
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat, no-repeat;
  background-position: center, center;
  background-size: contain, contain;
}

.earp__label {
  margin-top: 10px;
  font-size: 38px;
  font-weight: 800;
  letter-spacing: 2px;
  color: rgba(196, 224, 255, 0.95);
  text-shadow: 0 0 16px rgba(64, 213, 255, 0.25);
  margin-top:50px ;
}

.earp__right {
  flex: 7;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.earp__rate-cell {
  color: rgba(105, 192, 255, 1);
  font-weight: 900;
  font-variant-numeric: tabular-nums;
}
</style>

<style>
@import "../../../DigitalFusion/styles/table.css";
</style>

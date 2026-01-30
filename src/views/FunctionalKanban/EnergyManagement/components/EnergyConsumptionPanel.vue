<template>
  <div class="energy-consumption">
    <div class="energy-consumption__left">
      <div class="energy-consumption__percent">{{ percentText }}</div>
      <div class="energy-consumption__icon">
        <img :src="icon" alt="清洁能源" />
      </div>
      <div class="energy-consumption__label">清洁能源占比</div>
    </div>
    <div class="energy-consumption__right">
      <div class="metric" v-for="(item, index) in metrics" :key="index">
        <div class="metric__title">{{ item.label }}</div>
        <div class="metric__value">{{ formatValue(item.value, item.unit) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EnergyConsumptionPanel",
  props: {
    percent: {
      type: [Number, String],
      default: 0,
    },
    icon: {
      type: String,
      default: "",
    },
    metrics: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    percentText() {
      const num = Number(this.percent);
      if (Number.isNaN(num)) return "0%";
      return `${num}%`;
    },
  },
  methods: {
    formatValue(value, unit) {
      if (value === null || value === undefined || value === "") return "-";
      const num = Number(value);
      const display = Number.isNaN(num) ? value : num.toLocaleString();
      return `${display}${unit || ""}`;
    },
  },
};
</script>

<style scoped>
.energy-consumption {
  display: grid;
  grid-template-columns: 38% 62%;
  height: 100%;
  align-items: center;
}

.energy-consumption__left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.energy-consumption__percent {
  font-size: 38px;
  font-weight: 700;
  color: #66e6ff;
}

.energy-consumption__icon {
  /* width: 150px;
  height: 150px; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.energy-consumption__icon img {
  /* width: 134px;
  height: 134px; */
  object-fit: contain;
}

.energy-consumption__label {
  font-size: 22px;
  color: rgba(255, 255, 255, 0.8);
}

.energy-consumption__right {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  height: 100%;
  align-items: center;
  padding-top: 10px;
}

.metric {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.metric:not(:last-child)::after {
  content: "";
  position: absolute;
  right: 0;
  top: 12%;
  bottom: 12%;
  width: 1px;
  background: rgba(255, 255, 255, 0.25);
}

.metric__title {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.85);
}

.metric__value {
  font-size: 48px;
  font-weight: 700;
  color: #66e6ff;
}
</style>

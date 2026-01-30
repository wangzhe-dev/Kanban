<!--
 * @Descripttion:
 * @version:
 * @Author: lj
 * @Date: 2026-01-05 15:36:40
 * @LastEditors: liangjia
 * @LastEditTime: 2026-01-05 15:44:20
-->
<template>
  <div class="water-power-gas">
    <div class="metric" v-for="(item, index) in items" :key="index">
      <div class="metric__value" :class="{ accent: index === 0 }">{{ formatValue(item.value, item.unit) }}</div>
      <div class="metric__label">{{ item.label }}</div>
      <div class="metric__icon">
        <span class="metric__glow"></span>
        <img :src="item.icon" :alt="item.label" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WaterPowerGasPanel",
  props: {
    items: {
      type: Array,
      default: () => [],
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
.water-power-gas {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 36px;
  width: 100%;
  height: 100%;
  align-items: center;
  padding-top: 4px;
}

.metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
}

.metric__value {
  font-size: 30px;
  font-weight: 700;
  color: #6fe9ff;
}

.metric__value.accent {
  color: #ffd146;
}

.metric__label {
  font-size: 19px;
  color: rgba(255, 255, 255, 0.75);
}

.metric__icon {
  position: relative;
  width: 132px;
  height: 132px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.metric__icon img {
  /* width: 76px;
  height: 76px; */
  object-fit: contain;
  z-index: 2;
  margin-top: 70px;
}

.metric__glow {
  position: absolute;
  width: 132px;
  height: 40px;
  bottom: 10px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(71, 227, 255, 0.45) 0%, rgba(71, 227, 255, 0.12) 55%, rgba(71, 227, 255, 0) 70%);
  filter: blur(1px);
}
</style>

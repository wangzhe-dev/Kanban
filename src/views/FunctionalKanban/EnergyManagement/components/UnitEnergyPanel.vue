<template>
  <div class="unit-energy-panel">
    <div v-for="(card, index) in cards" :key="index" class="unit-card">
      <div class="unit-card__title">{{ card.title }}</div>
      <div class="unit-card__divider"></div>
      <div class="unit-card__rows">
        <div v-for="(row, rowIndex) in card.rows" :key="rowIndex" class="unit-card__row">
          <span class="unit-card__label">{{ row.label }}</span>
          <span class="unit-card__line"></span>
          <span class="unit-card__value">{{ formatValue(row.value, row.unit) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnitEnergyPanel",
  props: {
    cards: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    formatValue(value, unit) {
      if (value === null || value === undefined || value === "") return "-";
      const num = Number(value);
      const display = Number.isNaN(num) ? value : num;
      return `${display}${unit || ""}`;
    },
  },
};
</script>

<style scoped>
.unit-energy-panel {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  width: 100%;
  height: 100%;
  min-height: 260px;
}

.unit-card {
  position: relative;
  background: rgba(15, 40, 68, 0.8);
  border-radius: 12px;
  padding: 18px 18px 16px 18px;
  box-shadow: inset 0 0 20px rgba(20, 80, 140, 0.2);
  overflow: hidden;
}

.unit-card::before {
  content: "";
  position: absolute;
  left: 22px;
  top: 0;
  width: 60%;
  height: 3px;
  background: linear-gradient(90deg, rgba(255, 214, 64, 0) 0%, #ffd640 35%, #ffb400 100%);
}

.unit-card__title {
  font-size: 22px;
  color: #ffffff;
  font-weight: 600;
  margin-bottom: 8px;
}

.unit-card__divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.15);
  margin-bottom: 12px;
}

.unit-card__rows {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.unit-card__row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 20px;
}

.unit-card__label {
  white-space: nowrap;
}

.unit-card__line {
  height: 2px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
}

.unit-card__value {
  font-size: 12px;
    color: rgb(255, 153, 0);
  font-weight: 700;
  white-space: nowrap;
}
</style>

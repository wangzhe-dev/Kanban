<template>
  <div class="output-energy">
    <div class="output-energy__icon">
      <img :src="icon" alt="综合能耗" />
    </div>
    <div class="output-energy__content">
      <!-- <div class="output-energy__label">{{ label }}</div> -->
      <!-- <div class="output-energy__value">
        <span class="output-energy__number">{{ displayValue }}</span>
        <span class="output-energy__unit">{{ unit }}</span>
      </div> -->
      <div v-if="tips" class="output-energy__tips">{{ tips }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OutputEnergyCostPanel",
  props: {
    icon: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "单位产值综合能耗",
    },
    value: {
      type: [Number, String],
      default: 0,
    },
    unit: {
      type: String,
      default: "kWh/万元",
    },
    tips: {
      type: String,
      default: "",
    },
  },
  computed: {
    displayValue() {
      const num = Number(this.value);
      if (Number.isNaN(num)) return this.value;
      return num.toLocaleString();
    },
  },
};
</script>

<style scoped>
.output-energy {
  display: grid;
  grid-template-columns: 40% 60%;
  gap: 16px;
  align-items: center;
  height: 100%;
}

.output-energy__icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.output-energy__icon img {
  /* width: 140px;
  height: 140px; */
  object-fit: contain;
}

.output-energy__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
}

.output-energy__label {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.85);
}

.output-energy__value {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.output-energy__number {
  font-size: 44px;
  font-weight: 700;
  color: #66e6ff;
}

.output-energy__unit {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
}

.output-energy__tips {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
}
</style>

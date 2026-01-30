<template>
  <div class="time-display">
    <strong>{{ now.date }} {{ now.weekday }} {{ now.time }}</strong>
  </div>
</template>

<script>
const weekdays = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];

const buildNowValue = () => {
  const date = new Date();
  const pad = (num) => num.toString().padStart(2, "0");
  return {
    date: `${date.getFullYear()}年${pad(date.getMonth() + 1)}月${pad(
      date.getDate()
    )}日`,
    weekday: weekdays[date.getDay()],
    time: `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
      date.getSeconds()
    )}`,
  };
};

export default {
  name: "TimeDisplay",
  data() {
    return {
      now: buildNowValue(),
    };
  },
  mounted() {
    // 每秒更新时间
    this.timer = setInterval(() => {
      this.now = buildNowValue();
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<style scoped>
.time-display {
  position: absolute;
  top: 89px;
  /* Scaled from 37px: 37 × 2.3974 = 89px */
  left: 71px;
  /* Scaled from 40px: 40 × 1.7778 = 71px */
  z-index: 10;
}

.time-display strong {
  font-size: 38px;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
</style>

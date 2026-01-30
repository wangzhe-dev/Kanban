<template>
  <div class="weather-bar">

    <!-- 温度 -->
    <div class="weather-item">
      <span class="weather-item-label">温度：</span>

      <span class="weather-item-value weather-item-value--temp">
        {{ temperature }}<span v-if="temperature !== '--'">℃</span>
      </span>
    </div>
    <!-- 湿度 -->
    <div class="weather-item">
      <span class="weather-item-label">湿度：</span>

      <span class="weather-item-value weather-item-value--humidity">
        {{ humidity }}<span v-if="humidity !== '--'">%</span>
      </span>
    </div>
    <!-- 天气（带小图标） -->
    <div class="weather-item">
      <span class="weather-icon" v-if="weatherIcon">
        <img :src="weatherIcon" alt="" />
      </span>
      <span class="weather-item-label">天气：</span>
      <span class="weather-item-value">{{ weatherText }}</span>

    </div>

    <!-- 空气质量 -->
    <div class="weather-item">
      <span class="weather-item-label">空气质量：</span>
      <span class="weather-item-value weather-item-value--aqi">{{ aqiLevel }}</span>

    </div>
    <!-- PM2.5 -->
    <div class="weather-item">
      <span class="weather-item-label">PM2.5：</span>
      <span class="weather-item-value weather-item-value--pm25">{{ pm25 }}</span>

    </div>


  </div>
</template>

<script>
export default {
  name: 'WeatherBar',
  props: {
    pm25: {
      type: [Number, String],
      default: '--'
    },
    aqiLevel: {
      type: String,
      default: '--'
    },
    weatherText: {
      type: String,
      default: '--'
    },
    humidity: {
      type: [Number, String],
      default: '--'
    },
    temperature: {
      type: [Number, String],
      default: '--'
    },
    weatherIcon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.weather-bar {
  display: flex;
  align-items: center;
  gap: 35px;
  /* 放大字号后拉开间距 */
  width: 100%;
  height: 100%;
}

.weather-item {
  display: flex;
  align-items: center;
  gap: 5px;
  /* 对应 Figma gap-[2px] */
  font-family: 'PingFang SC', -apple-system, BlinkMacSystemFont, 'Microsoft YaHei',
    sans-serif;
  font-size: 26px;
  white-space: nowrap;
}

.weather-item-label {
  color: #ffffff;
}

.weather-item-value {
  font-weight: 600;
}

/* 不同指标配色，对齐 Figma */
.weather-item-value--pm25 {
  color: #b1c5ea;
}

.weather-item-value--aqi {
  color: #00efff;
}

.weather-item-value--humidity {
  color: #ff9900;
}

.weather-item-value--temp {
  color: #ffd900;
}

.weather-icon {
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.weather-icon img {
  width: 100%;
  height: 100%;
  display: block;
}
</style>

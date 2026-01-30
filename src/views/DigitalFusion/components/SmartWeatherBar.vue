<template>
  <div class="smart-weather-bar">
    <WeatherBar :pm25="env.pm25" :aqiLevel="env.aqiLevel" :weatherText="env.weatherText" :humidity="env.humidity"
      :temperature="env.temperature" :weatherIcon="env.weatherIcon" />
    <!-- 小状态提示，可按需删掉 -->
    <span v-if="loading" class="weather-status">更新中...</span>
    <span v-else-if="error" class="weather-status weather-status--error">
      {{ error }}
    </span>
  </div>
</template>

<script>
import axios from 'axios';
import WeatherBar from './WeatherBar.vue';
import weatherIconLocal from '@/assets/images/DF/tq.png';

export default {
  name: 'SmartWeatherBar',
  components: { WeatherBar },
  data() {
    return {
      env: {
        pm25: '--',
        aqiLevel: '--',
        weatherText: '--',
        humidity: '--',
        temperature: '--',
        // 默认使用本地图标
        weatherIcon: weatherIconLocal
      },
      loading: false,
      error: null
    }
  },
  mounted() {
    this.loadWeather()
  },
  methods: {
    loadWeather() {
      this.loading = true
      this.error = null

      // 浏览器定位
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          pos => {
            const lat = pos.coords.latitude
            const lon = pos.coords.longitude
            this.fetchWeatherByCoords(lat, lon)
          },
          () => {
            // 定位失败走备用经纬度（你可以改成船厂坐标）
            const fallbackLat = 31.2
            const fallbackLon = 121.5
            this.fetchWeatherByCoords(fallbackLat, fallbackLon)
          },
          {
            timeout: 5000
          }
        )
      } else {
        // 浏览器不支持定位，直接用备用经纬度
        const fallbackLat = 31.2
        const fallbackLon = 121.5
        this.fetchWeatherByCoords(fallbackLat, fallbackLon)
      }
    },

    async fetchWeatherByCoords(lat, lon) {
      try {
        // 天气 + 湿度
        const weatherPromise = axios.get(
          'https://api.open-meteo.com/v1/forecast',
          {
            params: {
              latitude: lat,
              longitude: lon,
              current_weather: true,
              // 要求返回湿度的小时数据
              hourly: 'relativehumidity_2m'
            }
          }
        )

        // 空气质量（PM2.5 + AQI）
        const airPromise = axios.get(
          'https://air-quality-api.open-meteo.com/v1/air-quality',
          {
            params: {
              latitude: lat,
              longitude: lon,
              hourly: 'pm2_5,european_aqi'
            }
          }
        )

        const [weatherRes, airRes] = await Promise.all([
          weatherPromise,
          airPromise
        ])

        const weatherData = weatherRes.data || {}
        const airData = airRes.data || {}

        const current = weatherData.current_weather || {}
        const hourly = weatherData.hourly || {}
        const humiditySeries = hourly.relativehumidity_2m || []

        // 这里简单取第一个小时的湿度；你可以按时间精确匹配
        const humidity =
          humiditySeries.length && isFinite(humiditySeries[0])
            ? Math.round(humiditySeries[0])
            : '--'

        const airHourly = (airData.hourly || {})
        const pmSeries = airHourly.pm2_5 || []
        const aqiSeries = airHourly.european_aqi || []

        const pm25 =
          pmSeries.length && isFinite(pmSeries[0])
            ? Math.round(pmSeries[0])
            : '--'
        const aqi =
          aqiSeries.length && isFinite(aqiSeries[0]) ? aqiSeries[0] : null

        // 更新 UI
        this.env.pm25 = pm25
        this.env.aqiLevel = this.mapAqiLevel(aqi)
        this.env.weatherText = this.mapWeatherCode(current.weathercode)
        this.env.humidity = humidity
        this.env.temperature =
          current.temperature != null && isFinite(current.temperature)
            ? Math.round(current.temperature)
            : '--'

        // 如果你后续按天气切 icon，可以在这里根据 weathercode 替换 env.weatherIcon
      } catch (e) {
        console.error('[SmartWeatherBar] 获取天气失败：', e)
        this.error = '天气数据获取失败'
      } finally {
        this.loading = false
      }
    },

    // Open-Meteo 的 weathercode → 中文文案（简化版）
    mapWeatherCode(code) {
      if (code == null || !isFinite(code)) return '--'
      const c = Number(code)

      if (c === 0) return '晴'
      if (c === 1 || c === 2) return '多云'
      if (c === 3) return '阴'
      if (c === 45 || c === 48) return '雾'
      if (c >= 51 && c <= 57) return '毛毛雨'
      if (c >= 61 && c <= 67) return '雨'
      if (c >= 71 && c <= 77) return '雪'
      if (c >= 80 && c <= 82) return '阵雨'
      if (c >= 95) return '雷雨'
      return '多云'
    },

    // AQI 数值 → 等级文案（这里用常见区间，你也可以按国标微调）
    mapAqiLevel(aqi) {
      if (aqi == null || !isFinite(aqi)) return '--'
      const v = Number(aqi)

      if (v <= 50) return '优'
      if (v <= 100) return '良'
      if (v <= 150) return '轻度污染'
      if (v <= 200) return '中度污染'
      if (v <= 300) return '重度污染'
      return '严重污染'
    }
  }
}
</script>

<style scoped>
.smart-weather-bar {
  display: flex;
  align-items: center;
  gap: 8px;
}

.weather-status {
  font-size: 12px;
  color: #aaa;
}

.weather-status--error {
  color: #ff6666;
}
</style>

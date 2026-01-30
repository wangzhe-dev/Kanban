/**
 * currentTimeMixin
 * - Provides reactive `currentTime` (YYYY-MM-DD HH:mm:ss) and keeps it updated every second.
 * - Components can override `formatDateTime` to customize formatting; otherwise fallback formatter is used.
 */
export default {
  data() {
    return {
      currentTime: "",
      clockTimer: null,
    };
  },
  mounted() {
    this.updateCurrentTime();
    this.startClockTimer();
  },
  beforeDestroy() {
    this.stopClockTimer();
  },
  methods: {
    startClockTimer() {
      this.stopClockTimer();
      this.clockTimer = setInterval(() => {
        this.updateCurrentTime();
      }, 1000);
    },
    stopClockTimer() {
      if (this.clockTimer) {
        clearInterval(this.clockTimer);
        this.clockTimer = null;
      }
    },
    updateCurrentTime() {
      const now = new Date();
      if (typeof this.formatDateTime === "function") {
        this.currentTime = this.formatDateTime(now);
      } else {
        this.currentTime = this.defaultClockFormatter(now);
      }
    },
    defaultClockFormatter(date) {
      if (!(date instanceof Date) || !Number.isFinite(date.getTime())) return "-";
      const pad = (n) => String(n).padStart(2, "0");
      const y = date.getFullYear();
      const m = pad(date.getMonth() + 1);
      const d = pad(date.getDate());
      const hh = pad(date.getHours());
      const mm = pad(date.getMinutes());
      const ss = pad(date.getSeconds());
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    },
  },
};

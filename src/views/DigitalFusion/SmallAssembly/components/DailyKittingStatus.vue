<template>
  <div class="daily-kitting-status">
    <div class="left-section">
      <div class="wl-bg"></div>
    </div>

    <div class="right-section">
      <div class="table-wrapper">
        <table class="df-table">
          <colgroup>
            <col style="width: 32%" />
            <col style="width: 32%" />
            <col style="width: 36%" />
          </colgroup>
          <thead>
            <tr>
              <th>物流总工单</th>
              <th>来料齐套数</th>
              <th>集配进度</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in kittingData" :key="index">
              <td style="color: rgb(64, 213, 255)">{{ item.totalOrders }}</td>
              <td style="color: rgb(255, 217, 0)">{{ item.readyCount }}</td>
              <td>
                <span class="progress-text">{{ `${getPercent(item.progress)}%` }}</span>

              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DailyKittingStatus",
  props: {
    kittingData: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getPercent(val) {
      if (val === null || val === undefined || val === "") return 0;
      const num = Number(val);
      if (Number.isNaN(num)) return 0;
      const percent = num > 1 ? num : num * 100;
      return Math.max(0, Math.min(100, Math.round(percent)));
    },
  },
};
</script>

<style>
@import "../../styles/table.css";
</style>

<style scoped>
.daily-kitting-status {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 28px;
  align-items: center;
}

.left-section {
  flex: 0 0 200px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.wl-bg {
  width: 100%;
  height: 100%;
  background-image: url("../../../../assets/images/DF/wl.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.right-section {
  flex: 1;
  min-width: 0;
  height: 100%;
  overflow: hidden;
}

.table-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.progress-text {
  width: 72px;
  text-align: right;
  font-size: 24px;
  font-weight: 800;
  color: #ff9900;
  font-family: "DIN Alternate", "Arial", "Microsoft YaHei", sans-serif;
}

@media screen and (max-height: 1080px) {
  .left-section {
    flex: 0 0 150px;
  }

  .progress-text {
    font-size: 20px;
    width: 60px;
  }

  .progress-bar {
    height: 10px;
  }
}
</style>

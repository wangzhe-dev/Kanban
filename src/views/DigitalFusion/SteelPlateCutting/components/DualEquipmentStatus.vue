<template>
  <div class="dual-equipment-status">
    <!-- 左侧 - 切割 -->
    <div class="equipment-section">
      <div class="section-header">
        <h3 class="section-title">切割</h3>
      </div>
      <div class="section-content">
        <EquipmentStatus :equipmentData="cuttingData" />
      </div>
    </div>

    <!-- 分隔线 -->
    <div class="divider"></div>

    <!-- 右侧 - 分拣 -->
    <div class="equipment-section">
      <div class="section-header">
        <h3 class="section-title">分拣</h3>
      </div>
      <div class="section-content">
        <EquipmentStatus :equipmentData="sortingData" />
      </div>
    </div>
  </div>
</template>

<script>
import EquipmentStatus from "./EquipmentStatus.vue";

export default {
  name: "DualEquipmentStatus",
  components: {
    EquipmentStatus,
  },
  props: {
    cuttingData: {
      type: Array,
      default: () => [],
    },
    sortingData: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.dual-equipment-status {
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
}

.equipment-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}

.divider {
  width: 2px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(64, 213, 255, 0.3) 20%,
    rgba(64, 213, 255, 0.3) 80%,
    transparent
  );
}

.section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;
  flex-shrink: 0;
}

.section-title {
  font-size: 32px;
  font-weight: 600;
  color: #ffffff;
  display: flex;
  width: 200px;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  position: relative;
  padding: 0 60px;
}

.section-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background-image: url("../../../../assets/images/DF/icon-right@2x.png");
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
}

.section-title::after {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background-image: url("../../../../assets/images/DF/icon-left@2x.png");
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center;
}

.section-content {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
</style>

<template>
  <div class="container-IntelligentControlCenter">
    <div class="df-screen" ref="appRef">
      <FunctionalKanbanLayout activeTab="IntelligentControlCenter" centerWidth="32%" @tab-click="handleTabClick">
        <!-- Left Column: 2 cards -->
        <template #left-top>
          <Card
            title="系统状态"
            :flex="5"
            column="left"
            position="top"
            :totalCards="2"
            :backgroundImage="cardBg">
            <div style="padding: 20px;">
              <!-- 系统状态内容 -->
            </div>
          </Card>
        </template>

        <template #left-bottom>
          <Card
            title="数据流监控"
            :flex="5"
            column="left"
            position="bottom"
            :totalCards="2"
            :backgroundImage="cardBg">
            <div style="padding: 20px;">
              <!-- 数据流监控内容 -->
            </div>
          </Card>
        </template>

        <!-- Center Column: 2 cards -->
        <template #center-top>
          <Card
            title="实时告警"
            :flex="6"
            column="center"
            position="top"
            :totalCards="2"
            :backgroundImage="''">
            <div style="padding: 20px;">
              <!-- 实时告警内容 -->
            </div>
          </Card>
        </template>

        <template #center-bottom>
          <Card
            title="任务调度"
            :flex="4"
            column="center"
            position="bottom"
            :totalCards="2"
            :backgroundImage="cardBg">
            <div style="padding: 20px;">
              <!-- 任务调度内容 -->
            </div>
          </Card>
        </template>

        <!-- Right Column: 3 cards -->
        <template #right-top>
          <Card
            title="网络拓扑"
            :flex="3"
            column="right"
            position="top"
            :totalCards="3"
            :backgroundImage="cardBg">
            <div style="padding: 20px;">
              <!-- 网络拓扑内容 -->
            </div>
          </Card>
        </template>

        <template #right-middle>
          <Card
            title="日志监控"
            :flex="3"
            column="right"
            position="middle"
            :totalCards="3"
            :backgroundImage="cardBg">
            <div style="padding: 20px;">
              <!-- 日志监控内容 -->
            </div>
          </Card>
        </template>

        <template #right-bottom>
          <Card
            title="性能指标"
            :flex="3"
            column="right"
            position="bottom"
            :totalCards="3"
            :backgroundImage="cardBg">
            <div style="padding: 20px;">
              <!-- 性能指标内容 -->
            </div>
          </Card>
        </template>
      </FunctionalKanbanLayout>
    </div>
  </div>
</template>

<script>
import cardBg from "@/assets/images/cx/bg-1@2x.png";
import drawMixin from "@/mixin/drawMixin.js";
import Card from "@/views/DigitalFusion/components/Card.vue";
import FunctionalKanbanLayout from "../components/FunctionalKanbanLayout.vue";
import mockData from "./mock.js";

export default {
  name: "IntelligentControlCenter",
  components: { FunctionalKanbanLayout, Card },
  mixins: [drawMixin],
  data() {
    return {
      cardBg,
      mockData,
    };
  },
  methods: {
    handleTabClick(route) {
      if (route) {
        this.$router.push(route);
      }
    },
  },
  mounted() {
    // 初始化数据
  },
};
</script>

<style scoped>
.container-IntelligentControlCenter {
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
  position: relative;
}

.df-screen {
  background-image: url("../../../assets/images/DF/bg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 3840px;
  height: 2160px;
  color: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: 0 0;
  overflow: hidden;
}
</style>

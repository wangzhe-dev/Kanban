<template>
  <div class="container-Home">
    <div class="df-screen" ref="appRef">
      <MainLayout activeTab="Home" @tab-click="handleTabClick">
        <template #left>
          <!-- Left column content -->
        </template>

        <template #center>
          <!-- Center column content -->
        </template>

        <template #right>
          <!-- Right column content -->
        </template>
      </MainLayout>
    </div>
  </div>
</template>

<script>
import drawMixin from "@/mixin/drawMixin.js";
import MainLayout from "../components/MainLayout.vue";

export default {
  name: "Home",
  components: {
    MainLayout,
  },
  mixins: [drawMixin],
  data() {
    return {};
  },
  methods: {
    handleTabClick(route) {
      console.log("Tab clicked:", route);
    },
  },
};
</script>

<style scoped>
.container-Home {
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

<template>
  <div class="zoom-page-switch" :style="vars">
    <div class="zoom-layer zoom-layer--main" v-show="!value">
      <slot name="main" />
    </div>
    <transition :name="transitionName">
      <div v-if="value" class="zoom-layer zoom-layer--detail">
        <slot name="detail" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ZoomPageSwitch",
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    origin: {
      type: Object,
      default: null,
    },
    scaleFrom: {
      type: Number,
      default: 0.06,
    },
    openDuration: {
      type: Number,
      default: 480,
    },
    closeDuration: {
      type: Number,
      default: 420,
    },
  },
  data() {
    return {
      transitionName: "zoom-open",
      containerRect: null,
    };
  },
  computed: {
    vars() {
      const rect = this.containerRect;
      const origin = this.origin;

      const x =
        rect && origin && typeof origin.x === "number" ? `${origin.x - rect.left}px` : "50%";
      const y =
        rect && origin && typeof origin.y === "number" ? `${origin.y - rect.top}px` : "50%";

      return {
        "--zoom-origin-x": x,
        "--zoom-origin-y": y,
        "--zoom-scale-from": String(this.scaleFrom),
        "--zoom-open-duration": `${this.openDuration}ms`,
        "--zoom-close-duration": `${this.closeDuration}ms`,
      };
    },
  },
  watch: {
    value(next) {
      this.transitionName = next ? "zoom-open" : "zoom-close";
      this.$nextTick(() => {
        this.updateContainerRect();
      });
    },
  },
  mounted() {
    this.updateContainerRect();
    window.addEventListener("resize", this.updateContainerRect, { passive: true });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateContainerRect);
  },
  methods: {
    updateContainerRect() {
      if (!this.$el || !this.$el.getBoundingClientRect) return;
      this.containerRect = this.$el.getBoundingClientRect();
    },
    close() {
      this.$emit("input", false);
    },
  },
};
</script>

<style scoped>
.zoom-page-switch {
  position: relative;
  width: 100%;
  height: 100%;
}

.zoom-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform-origin: var(--zoom-origin-x, 50%) var(--zoom-origin-y, 50%);
}

.zoom-layer--detail {
  will-change: transform;
}

.zoom-open-enter-active {
  transition: transform var(--zoom-open-duration, 480ms) cubic-bezier(0.22, 1, 0.36, 1);
}

.zoom-open-enter {
  transform: scale(var(--zoom-scale-from, 0.06));
}

.zoom-close-leave-active {
  transition: transform var(--zoom-close-duration, 420ms) cubic-bezier(0.22, 1, 0.36, 1);
}

.zoom-close-leave-to {
  transform: scale(var(--zoom-scale-from, 0.06));
}
</style>


/**
 * 表格滚动动画 Mixin
 *
 * 使用方法：
 * 1. 在组件中引入: import autoScrollMixin from "@/mixin/autoScrollMixin.js";
 * 2. 添加到 mixins: mixins: [autoScrollMixin]
 * 3. 在 template 中使用:
 *    - 根元素添加 @mouseenter="pauseScroll" @mouseleave="resumeScroll"
 *    - 滚动容器使用 :style="scrollStyle"
 * 4. 定义 computed 属性 scrollData 返回需要滚动的数据数组
 *
 * Props (可选):
 * - rowHeight: 行高，默认 60
 * - scrollInterval: 滚动间隔，默认 2000ms
 */

export default {
  props: {
    rowHeight: {
      type: Number,
      default: 60,
    },
    scrollInterval: {
      type: Number,
      default: 2000,
    },
  },
  data() {
    return {
      scrollY: 0,
      isTransitioning: true,
      isPaused: false,
      scrollTimer: null,
    };
  },
  computed: {
    // 复制数据以实现无缝循环
    displayData() {
      const data = this.scrollData || [];
      if (!data.length) return [];
      return [...data, ...data];
    },
    // 滚动样式
    scrollStyle() {
      return {
        transform: `translateY(${-this.scrollY}px)`,
        transition: this.isTransitioning ? 'transform 0.8s ease-in-out' : 'none',
      };
    },
  },
  mounted() {
    this.startAutoScroll();
  },
  beforeDestroy() {
    this.stopAutoScroll();
  },
  methods: {
    startAutoScroll() {
      if (this.scrollTimer) {
        clearInterval(this.scrollTimer);
      }

      this.scrollTimer = setInterval(() => {
        if (this.isPaused) return;

        const data = this.scrollData || [];
        if (!data.length) return;

        const totalOriginalHeight = data.length * this.rowHeight;

        this.isTransitioning = true;
        this.scrollY += this.rowHeight;

        // 当滚动到复制数据的位置时，瞬间重置
        if (this.scrollY >= totalOriginalHeight) {
          setTimeout(() => {
            this.isTransitioning = false;
            this.scrollY = 0;
          }, 800);
        }
      }, this.scrollInterval);
    },
    stopAutoScroll() {
      if (this.scrollTimer) {
        clearInterval(this.scrollTimer);
        this.scrollTimer = null;
      }
    },
    pauseScroll() {
      this.isPaused = true;
    },
    resumeScroll() {
      this.isPaused = false;
    },
  },
};

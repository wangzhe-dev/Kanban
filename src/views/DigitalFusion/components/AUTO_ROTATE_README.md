# 数字融合大屏自动轮播功能使用说明

## 功能概述

为数字融合大屏添加了完整的自动轮播和动画功能，包括：
- ✅ Card 组件的 tabs 自动切换
- ✅ Card 组件的内容自动切换
- ✅ TabNavigation 页面自动切换
- ✅ 平滑的过渡动画效果

---

## 一、Card 组件自动轮播

### 1.1 基本用法

```vue
<Card
  title="示例卡片"
  :showTimeRange="true"
  :timeRange="currentTimeRange"
  :autoRotate="true"
  :rotateInterval="5000"
  @time-range-change="handleTimeRangeChange">
  <!-- 卡片内容 -->
</Card>
```

### 1.2 属性说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `autoRotate` | Boolean | `false` | 是否启用自动轮播 |
| `rotateInterval` | Number | `5000` | 轮播间隔时间（毫秒） |

### 1.3 支持的轮播类型

#### A. Header 时间范围轮播
当 `showTimeRange="true"` 时，会自动在日/周/月之间切换。

```vue
<Card
  :showTimeRange="true"
  :timeRange="timeRange"
  :autoRotate="true"
  :rotateInterval="6000"
  @time-range-change="handleChange">
</Card>
```

#### B. Body Tabs 轮播
当 `showBodyTabs="true"` 时，会自动在 body tabs 之间切换。

```vue
<Card
  :showBodyTabs="true"
  :bodyTabValue="currentTab"
  :autoRotate="true"
  :rotateInterval="5000"
  @body-tab-change="handleChange">
</Card>
```

#### C. 内容自动切换
配合 `v-if` 使用，实现内容随 tab 自动切换：

```vue
<Card
  :showBodyTabs="true"
  :bodyTabValue="currentTab"
  :autoRotate="true"
  :rotateInterval="5000"
  @body-tab-change="handleChange">
  <div v-if="currentTab === 'day'">日数据</div>
  <div v-else-if="currentTab === 'week'">周数据</div>
  <div v-else-if="currentTab === 'month'">月数据</div>
</Card>
```

### 1.4 动画效果

Card 组件包含以下动画：

1. **Tab 切换动画**（`tab-fade`）
   - 淡入淡出效果
   - 轻微缩放效果（scale: 0.9）
   - 过渡时间：300ms
   - 激活的 Tab 有橙色高亮背景

2. **内容切换动画**（`content-fade`）
   - 淡入淡出效果
   - **左右滑动效果**（默认）
   - 新内容从右侧滑入（translateX: 30px → 0）
   - 旧内容向左侧滑出（translateX: 0 → -30px）
   - 过渡时间：500ms（进入），300ms（离开）

---

## 二、TabNavigation 页面自动切换

### 2.1 基本用法

通过 MainLayout 组件启用页面自动切换：

```vue
<MainLayout
  activeTab="TProfile"
  :autoRotate="true"
  :rotateInterval="10000"
  @tab-click="handleTabClick">
  <!-- 页面内容 -->
</MainLayout>
```

### 2.2 属性说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `autoRotate` | Boolean | `false` | 是否启用页面自动切换 |
| `rotateInterval` | Number | `10000` | 页面切换间隔（毫秒） |

### 2.3 轮播顺序

页面会按以下顺序自动轮播：

1. 首页
2. 智能钢板库
3. 预处理产线
4. 智能分拣线
5. 智能切割线
6. 型材下料
7. T型材
8. 小组立
9. 片体拼板
10. 平直分段
11. 回到首页（循环）

### 2.4 动画效果

**Tab 切换动画**（`tab-slide`）

- 激活的 Tab 会有轻微放大效果（scale: 1.05）
- Tab 切换时有淡入淡出 + 上下滑动 + 缩放效果
  - 进入：从下方缩小滑入（translateY: -10px, scale: 0.8）
  - 离开：向上方缩小滑出（translateY: 10px, scale: 0.8）
- 过渡时间：500ms（进入），300ms（离开）
- 激活 Tab 颜色：#b1c5ea（浅蓝色）
- 默认 Tab 颜色：#ff9900（橙色）

---

## 三、表格自动滚动（固定表头 + 无缝轮播）

项目内表格的自动滚动推荐使用 `autoScrollMixin` + `table.css` 的结构（参考 `CacheStatus.vue`）。

### 3.1 基本结构

```vue
<template>
  <div class="df-table-container" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
    <!-- 固定表头 -->
    <table class="df-table df-table-header">
      <thead>
        <tr>
          <th>列1</th>
          <th>列2</th>
        </tr>
      </thead>
    </table>

    <!-- 表体：通过 translateY 做无缝滚动 -->
    <div class="df-table-wrapper">
      <div class="df-scroll-content" :style="scrollStyle">
        <table class="df-table df-table-body">
          <tbody>
            <tr v-for="(row, idx) in displayData" :key="idx">
              <td>{{ row.col1 }}</td>
              <td>{{ row.col2 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import autoScrollMixin from "@/mixin/autoScrollMixin.js";

export default {
  mixins: [autoScrollMixin],
  props: { rows: Array },
  computed: {
    scrollData() {
      return this.rows;
    },
  },
};
</script>

<style>
@import "../styles/table.css";
</style>
```

### 3.2 可调参数

- `rowHeight`：行高（默认 `60`）
- `scrollInterval`：滚动间隔（默认 `2000ms`）
- 鼠标悬停：`@mouseenter="pauseScroll"` 暂停，`@mouseleave="resumeScroll"` 继续

---

## 三、常用动画效果库

本节提供了常用的动画效果代码，可以直接复制使用或根据需要调整。

### 3.1 内容切换动画

#### A. 左右滑动（默认）

```css
.content-fade-enter-active {
  transition: all 0.5s ease;
}

.content-fade-leave-active {
  transition: all 0.3s ease;
}

.content-fade-enter {
  opacity: 0;
  transform: translateX(30px);
}

.content-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
```

#### B. 上下滑动

```css
.content-slide-enter-active {
  transition: all 0.5s ease;
}

.content-slide-leave-active {
  transition: all 0.3s ease;
}

.content-slide-enter {
  opacity: 0;
  transform: translateY(20px);
}

.content-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
```

#### C. 缩放淡入淡出

```css
.scale-fade-enter-active {
  transition: all 0.5s ease;
}

.scale-fade-leave-active {
  transition: all 0.3s ease;
}

.scale-fade-enter {
  opacity: 0;
  transform: scale(0.9);
}

.scale-fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
```

#### D. 旋转淡入淡出

```css
.rotate-fade-enter-active {
  transition: all 0.6s ease;
}

.rotate-fade-leave-active {
  transition: all 0.4s ease;
}

.rotate-fade-enter {
  opacity: 0;
  transform: rotate(-5deg) scale(0.95);
}

.rotate-fade-leave-to {
  opacity: 0;
  transform: rotate(5deg) scale(0.95);
}
```

#### E. 翻转效果

```css
.flip-enter-active {
  transition: all 0.6s ease;
}

.flip-leave-active {
  transition: all 0.4s ease;
}

.flip-enter {
  opacity: 0;
  transform: rotateY(90deg);
}

.flip-leave-to {
  opacity: 0;
  transform: rotateY(-90deg);
}
```

### 3.2 Tab 切换动画

#### A. 缩放效果（Card 组件默认）

```css
.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: all 0.3s ease;
}

.tab-fade-enter,
.tab-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
```

#### B. 滑动 + 缩放效果（TabNavigation 默认）

```css
.tab-slide-enter-active {
  transition: all 0.5s ease;
}

.tab-slide-leave-active {
  transition: all 0.3s ease;
}

.tab-slide-enter {
  opacity: 0;
  transform: scale(0.8) translateY(-10px);
}

.tab-slide-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(10px);
}
```

#### C. 弹跳效果

```css
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-out 0.3s;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}
```

### 3.3 使用方法

在 Vue 组件中使用动画：

```vue
<template>
  <transition name="content-fade" mode="out-in">
    <div :key="currentTab" class="content">
      <!-- 内容 -->
    </div>
  </transition>
</template>

<style scoped>
/* 复制上面的动画 CSS 代码 */
.content-fade-enter-active {
  transition: all 0.5s ease;
}
/* ... */
</style>
```

### 3.4 动画组合建议

#### 轻量级页面（快速响应）

- Tab 切换：`tab-fade`（缩放）
- 内容切换：`content-fade`（左右滑动）
- 时间：300-500ms

#### 重型页面（视觉冲击）

- Tab 切换：`tab-slide`（滑动+缩放）
- 内容切换：`flip`（翻转）或 `rotate-fade`（旋转）
- 时间：500-800ms

#### 数据展示类

- Tab 切换：`tab-fade`
- 内容切换：`scale-fade`（缩放）或 `content-slide`（上下滑动）
- 时间：400-600ms

---

## 四、完整示例

查看 [TProfile/index.vue](../TProfile/index.vue) 获取完整的实现示例。

### 4.1 示例 1：Header 时间范围自动轮播

```vue
<Card
  title="生产数据"
  :showTimeRange="true"
  :timeRange="timeRange"
  :autoRotate="true"
  :rotateInterval="6000"
  @time-range-change="handleTimeRangeChange">
  <div>当前时间维度: {{ timeRange }}</div>
</Card>
```

### 4.2 示例 2：Body Tabs + 内容自动轮播

```vue
<Card
  title="统计报表"
  :showBodyTabs="true"
  :bodyTabValue="currentTab"
  :autoRotate="true"
  :rotateInterval="5000"
  @body-tab-change="handleTabChange">
  <div v-if="currentTab === 'day'">
    <h3>日报数据</h3>
    <p>今日产量: 1,234 件</p>
  </div>
  <div v-else-if="currentTab === 'week'">
    <h3>周报数据</h3>
    <p>本周产量: 8,567 件</p>
  </div>
  <div v-else-if="currentTab === 'month'">
    <h3>月报数据</h3>
    <p>本月产量: 35,678 件</p>
  </div>
</Card>
```

### 4.3 示例 3：页面自动切换

```vue
<template>
  <div class="container">
    <div class="screen" ref="appRef">
      <MainLayout
        :activeTab="currentPage"
        :autoRotate="true"
        :rotateInterval="10000"
        @tab-click="handleTabClick">
        <!-- 页面内容 -->
      </MainLayout>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: "Home",
    };
  },
  methods: {
    handleTabClick(route) {
      this.currentPage = route;
      // 可以在这里添加路由导航
      this.$router.push({ name: route });
    },
  },
};
</script>
```

### 4.4 示例 4：卡片内部上中下布局（独立轮播）

完整的右侧卡片实现，包含三个独立轮播的部分：

```vue
<template>
  <!-- Right Column: Single Card with Auto Rotation -->
  <template #right>
    <Card
      title="右侧单卡片（自动轮播示例）"
      :titleMargin="'50px 0 0 0'"
      :timeTabsMargin="'80px 0 0 0'"
      :bodyPadding="'20px'"
      :showTimeRange="false"
      column="right"
      position="single"
      :totalCards="1">
      <!-- 上中下三部分布局 -->
      <div class="right-card-layout">
        <!-- 上部分 -->
        <div class="right-card-section" style="flex: 3;">
          <div class="section-header">
            <h3 class="section-title">上部数据</h3>
            <div class="section-tabs">
              <span
                v-for="tab in timeRangeTabs"
                :key="tab.key"
                class="section-tab"
                :class="{ active: rightSections.top === tab.key }"
                @click="handleSectionTabClick('top', tab.key)">
                {{ tab.label }}
              </span>
            </div>
          </div>
          <transition name="content-fade" mode="out-in">
            <div :key="rightSections.top" class="section-content">
              <div v-if="rightSections.top === 'day'">
                <p>📊 上部-日数据</p>
                <p>数据项 1: 100</p>
                <p>数据项 2: 200</p>
              </div>
              <div v-else-if="rightSections.top === 'week'">
                <p>📈 上部-周数据</p>
                <p>数据项 1: 700</p>
                <p>数据项 2: 1400</p>
              </div>
              <div v-else>
                <p>📉 上部-月数据</p>
                <p>数据项 1: 3000</p>
                <p>数据项 2: 6000</p>
              </div>
            </div>
          </transition>
        </div>

        <!-- 中部分 -->
        <div class="right-card-section" style="flex: 4;">
          <div class="section-header">
            <h3 class="section-title">中部数据</h3>
            <div class="section-tabs">
              <span
                v-for="tab in timeRangeTabs"
                :key="tab.key"
                class="section-tab"
                :class="{ active: rightSections.middle === tab.key }"
                @click="handleSectionTabClick('middle', tab.key)">
                {{ tab.label }}
              </span>
            </div>
          </div>
          <transition name="content-fade" mode="out-in">
            <div :key="rightSections.middle" class="section-content">
              <div v-if="rightSections.middle === 'day'">
                <p>📊 中部-日数据</p>
                <p>数据项 A: 300</p>
                <p>数据项 B: 400</p>
              </div>
              <div v-else-if="rightSections.middle === 'week'">
                <p>📈 中部-周数据</p>
                <p>数据项 A: 2100</p>
                <p>数据项 B: 2800</p>
              </div>
              <div v-else>
                <p>📉 中部-月数据</p>
                <p>数据项 A: 9000</p>
                <p>数据项 B: 12000</p>
              </div>
            </div>
          </transition>
        </div>

        <!-- 下部分 -->
        <div class="right-card-section" style="flex: 3;">
          <div class="section-header">
            <h3 class="section-title">下部数据</h3>
            <div class="section-tabs">
              <span
                v-for="tab in timeRangeTabs"
                :key="tab.key"
                class="section-tab"
                :class="{ active: rightSections.bottom === tab.key }"
                @click="handleSectionTabClick('bottom', tab.key)">
                {{ tab.label }}
              </span>
            </div>
          </div>
          <transition name="content-fade" mode="out-in">
            <div :key="rightSections.bottom" class="section-content">
              <div v-if="rightSections.bottom === 'day'">
                <p>📊 下部-日数据</p>
                <p>数据项 X: 500</p>
                <p>数据项 Y: 600</p>
              </div>
              <div v-else-if="rightSections.bottom === 'week'">
                <p>📈 下部-周数据</p>
                <p>数据项 X: 3500</p>
                <p>数据项 Y: 4200</p>
              </div>
              <div v-else>
                <p>📉 下部-月数据</p>
                <p>数据项 X: 15000</p>
                <p>数据项 Y: 18000</p>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </Card>
  </template>
</template>

<script>
const timeRangeTabs = [
  { label: "日", key: "day" },
  { label: "周", key: "week" },
  { label: "月", key: "month" },
];

export default {
  data() {
    return {
      timeRangeTabs,
      rightSections: {
        top: "day",
        middle: "week",
        bottom: "month",
      },
      sectionRotationTimers: {
        top: null,
        middle: null,
        bottom: null,
      },
    };
  },
  mounted() {
    // 启动右侧三个部分的自动轮播
    this.startAllSectionRotations();
  },
  beforeDestroy() {
    // 清理所有定时器
    this.stopAllSectionRotations();
  },
  methods: {
    handleSectionTabClick(section, tab) {
      this.$set(this.rightSections, section, tab);
      // 用户手动点击时重置该部分的自动轮播
      this.startSectionAutoRotation(section);
    },
    startSectionAutoRotation(section) {
      // 清除现有定时器
      if (this.sectionRotationTimers[section]) {
        clearInterval(this.sectionRotationTimers[section]);
      }

      // 为每个部分设置不同的轮播间隔
      const intervals = {
        top: 5000,    // 5秒
        middle: 6000, // 6秒
        bottom: 7000, // 7秒
      };

      // 启动自动轮播
      this.sectionRotationTimers[section] = setInterval(() => {
        const currentIndex = this.timeRangeTabs.findIndex(
          tab => tab.key === this.rightSections[section]
        );
        const nextIndex = (currentIndex + 1) % this.timeRangeTabs.length;
        const nextTab = this.timeRangeTabs[nextIndex];
        this.$set(this.rightSections, section, nextTab.key);
      }, intervals[section]);
    },
    startAllSectionRotations() {
      this.startSectionAutoRotation("top");
      this.startSectionAutoRotation("middle");
      this.startSectionAutoRotation("bottom");
    },
    stopAllSectionRotations() {
      Object.keys(this.sectionRotationTimers).forEach(section => {
        if (this.sectionRotationTimers[section]) {
          clearInterval(this.sectionRotationTimers[section]);
          this.sectionRotationTimers[section] = null;
        }
      });
    },
  },
};
</script>

<style scoped>
/* 右侧卡片内部上中下布局 */
.right-card-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 0;
}

.right-card-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(0, 20, 40, 0.3);
  border: 1px solid rgba(64, 213, 255, 0.2);
  border-radius: 8px;
  padding: 16px;
  min-height: 0;
  overflow: hidden;
}

/* 每个部分的头部 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  flex-shrink: 0;
}

.section-title {
  font-size: 32px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
}

/* 部分内的 Tabs */
.section-tabs {
  display: flex;
  gap: 12px;
}

.section-tab {
  padding: 6px 18px;
  font-size: 24px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 6px;
  user-select: none;
  background: rgba(64, 213, 255, 0.1);
}

.section-tab:hover {
  background: rgba(64, 213, 255, 0.2);
}

.section-tab.active {
  color: #ffffff;
  background: #ff9900;
  font-weight: 600;
  transform: scale(1.05);
}

/* 内容区域 */
.section-content {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 8px 0;
}

.section-content p {
  margin: 8px 0;
  font-size: 26px;
  color: #b1c5ea;
  line-height: 1.5;
}

.section-content h3 {
  margin: 0 0 12px 0;
  font-size: 28px;
  color: #40d5ff;
}

/* 内容淡入淡出动画 - 左右滑动 */
.content-fade-enter-active {
  transition: all 0.5s ease;
}

.content-fade-leave-active {
  transition: all 0.3s ease;
}

.content-fade-enter {
  opacity: 0;
  transform: translateX(30px);
}

.content-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
```

**功能特点：**

- ✅ 三个部分独立的 Tab 切换
- ✅ 每个部分使用不同的自动轮播间隔（5秒、6秒、7秒）
- ✅ 使用 `flex` 布局，每部分高度可配置（flex: 3, 4, 3）
- ✅ 使用 `gap: 20px` 设置部分间距
- ✅ 支持左右滑动的过渡动画
- ✅ 用户手动点击后会重置该部分的轮播计时器
- ✅ 组件销毁时自动清理所有定时器

---

## 五、注意事项

### 5.1 性能优化

- 组件销毁时会自动清理定时器
- 用户手动点击时会重置计时器
- 建议合理设置轮播间隔，避免切换过快

### 5.2 最佳实践

- Card 轮播间隔建议：4-8 秒
- 页面轮播间隔建议：10-15 秒
- 同时启用多个自动轮播时，建议使用不同的间隔时间，避免同步切换

### 5.3 手动控制

用户可以随时手动点击 Tab 进行切换，手动操作后会重置自动轮播计时器。

### 5.4 动态开关
可以通过修改 `autoRotate` 属性动态开启或关闭自动轮播：

```vue
<Card
  :autoRotate="enableAutoRotate"
  :rotateInterval="interval">
</Card>

<script>
export default {
  data() {
    return {
      enableAutoRotate: true, // 可以动态修改此值
      interval: 5000,
    };
  },
};
</script>
```

---

## 六、修改的文件清单

1. **Card.vue** - 添加自动轮播和动画功能
2. **TabNavigation.vue** - 添加页面自动切换和动画功能
3. **MainLayout.vue** - 传递自动轮播属性
4. **TProfile/index.vue** - 完整示例页面（包含右侧卡片内部上中下布局）

---

## 七、动画样式自定义

如需自定义动画效果，可以修改以下 CSS 类：

### 7.1 Card 组件动画

在 [Card.vue](Card.vue:335-439) 中：

```css
/* Tab 切换动画 */
.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: all 0.3s ease;
}

.tab-fade-enter,
.tab-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* 内容切换动画 - 左右滑动 */
.content-fade-enter-active {
  transition: all 0.5s ease;
}

.content-fade-leave-active {
  transition: all 0.3s ease;
}

.content-fade-enter {
  opacity: 0;
  transform: translateX(30px);
}

.content-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
```

### 7.2 TabNavigation 组件动画

在 [TabNavigation.vue](TabNavigation.vue:139-160) 中：

```css
/* Tab 滑动动画 */
.tab-slide-enter-active {
  transition: all 0.5s ease;
}

.tab-slide-leave-active {
  transition: all 0.3s ease;
}

.tab-slide-enter {
  opacity: 0;
  transform: scale(0.8) translateY(-10px);
}

.tab-slide-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(10px);
}

/* 激活状态 */
.tab-item.active {
  color: #b1c5ea;
  transform: scale(1.05);
}
```

### 7.3 自定义动画参数

你可以调整以下参数来自定义动画效果：

#### 过渡时间

```css
transition: all 0.5s ease;  /* 调整为 0.3s, 0.8s 等 */
```

#### 移动距离

```css
transform: translateX(30px);  /* 调整为 20px, 50px 等 */
transform: translateY(20px);  /* 上下移动 */
```

#### 缩放比例

```css
transform: scale(0.9);  /* 调整为 0.8, 1.1 等 */
```

#### 旋转角度

```css
transform: rotate(5deg);  /* 添加旋转效果 */
```

#### 缓动函数

```css
transition: all 0.5s ease;           /* 平滑过渡 */
transition: all 0.5s ease-in;        /* 加速 */
transition: all 0.5s ease-out;       /* 减速 */
transition: all 0.5s ease-in-out;    /* 加速后减速 */
transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);  /* 弹跳效果 */
```

---

## 总结

本文档提供了完整的自动轮播和动画功能实现，包括：

✅ **Card 组件**：支持 Header/Body Tabs 自动轮播和内容动画
✅ **TabNavigation**：支持页面自动切换和导航动画
✅ **卡片内部布局**：支持上中下三部分独立轮播
✅ **动画效果库**：提供 5+ 种常用动画效果
✅ **完整示例**：4 个完整的实现示例

所有功能都已在 [TProfile/index.vue](../TProfile/index.vue) 中完整展示，可以直接复制使用！

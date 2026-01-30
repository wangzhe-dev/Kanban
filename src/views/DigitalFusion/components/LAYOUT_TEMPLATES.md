# 布局模板生成器

本文档提供常用的数字融合大屏布局模板，可快速生成符合需求的页面结构。

## 如何使用

1. 找到符合需求的模板编号
2. 复制对应的完整代码
3. 根据实际需求修改标题、数据源等
4. 调整 flex、间隔、轮播时间等参数
5. 表格建议使用固定表头 + 无缝滚动（见 `AUTO_ROTATE_README.md` 的“表格自动滚动”）

---

## 附：固定表头 + 表体无缝滚动表格（通用）

适用于中/右栏的表格卡片：表头固定，表体使用 `autoScrollMixin` 做无缝轮播滚动。

```vue
<template>
  <Card title="示例表格" :flex="3" column="center" position="middle" :totalCards="3" :bodyPadding="'40px 20px 20px 20px'">
    <div class="df-table-container" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
      <table class="df-table df-table-header">
        <thead>
          <tr>
            <th>列1</th>
            <th>列2</th>
          </tr>
        </thead>
      </table>
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
  </Card>
</template>

<script>
import autoScrollMixin from "@/mixin/autoScrollMixin.js";
export default {
  mixins: [autoScrollMixin],
  computed: {
    scrollData() {
      return [];
    },
  },
};
</script>

<style>
@import "../styles/table.css";
</style>
```

---

## 模板 1: 左2卡片+中3卡片+右3卡片（标准三栏）

**描述**: 左2个卡片(flex 5)，中3个卡片(flex 3)，右3个卡片(flex 3)

**布局**:

- 左栏: 上下2卡片，每个flex 5
- 中栏: 上中下3卡片，每个flex 3
- 右栏: 上中下3卡片，每个flex 3

```vue
<template>
  <div class="container-page">
    <div class="screen" ref="appRef">
      <MainLayout activeTab="YourPage" @tab-click="handleTabClick">
        <!-- Left Column: 2 cards -->
        <template #left-top>
          <Card
            title="左上卡片"
            :flex="5"
            column="left"
            position="top"
            :totalCards="2">
            <div style="padding: 20px;">左上内容</div>
          </Card>
        </template>

        <template #left-bottom>
          <Card
            title="左下卡片"
            :flex="5"
            column="left"
            position="bottom"
            :totalCards="2">
            <div style="padding: 20px;">左下内容</div>
          </Card>
        </template>

        <!-- Center Column: 3 cards -->
        <template #center-top>
          <Card
            title="中上卡片"
            :flex="3"
            column="center"
            position="top"
            :totalCards="3">
            <div style="padding: 20px;">中上内容</div>
          </Card>
        </template>

        <template #center-middle>
          <Card
            title="中中卡片"
            :flex="3"
            column="center"
            position="middle"
            :totalCards="3">
            <div style="padding: 20px;">中中内容</div>
          </Card>
        </template>

        <template #center-bottom>
          <Card
            title="中下卡片"
            :flex="3"
            column="center"
            position="bottom"
            :totalCards="3">
            <div style="padding: 20px;">中下内容</div>
          </Card>
        </template>

        <!-- Right Column: 3 cards -->
        <template #right-top>
          <Card
            title="右上卡片"
            :flex="3"
            column="right"
            position="top"
            :totalCards="3">
            <div style="padding: 20px;">右上内容</div>
          </Card>
        </template>

        <template #right-middle>
          <Card
            title="右中卡片"
            :flex="3"
            column="right"
            position="middle"
            :totalCards="3">
            <div style="padding: 20px;">右中内容</div>
          </Card>
        </template>

        <template #right-bottom>
          <Card
            title="右下卡片"
            :flex="3"
            column="right"
            position="bottom"
            :totalCards="3">
            <div style="padding: 20px;">右下内容</div>
          </Card>
        </template>
      </MainLayout>
    </div>
  </div>
</template>

<script>
import drawMixin from "@/mixin/drawMixin.js";
import Card from "../components/Card.vue";
import MainLayout from "../components/MainLayout.vue";

export default {
  name: "YourPage",
  components: { MainLayout, Card },
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
.container-page {
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
  position: relative;
}

.screen {
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
```

---

## 模板 2: 左2卡片带日期Tab+中3卡片+右3卡片带日期Tab

**描述**: 左2个卡片(flex 5)，上卡片带日期Tab+自动轮播，中3个卡片(flex 3)，右3个卡片(flex 3)，上卡片带日期Tab

**特点**:

- 左上: 日/周/月 Tab，6秒自动轮播
- 右上: 日/周/月 Tab，5秒自动轮播

```vue
<template>
  <div class="container-page">
    <div class="screen" ref="appRef">
      <MainLayout activeTab="YourPage" @tab-click="handleTabClick">
        <!-- Left Column: 2 cards -->
        <template #left-top>
          <Card
            title="左上卡片（日期Tab）"
            :showTimeRange="true"
            :timeRange="timeRanges.leftTop"
            :flex="5"
            column="left"
            position="top"
            :totalCards="2"
            :autoRotate="true"
            :rotateInterval="6000"
            @time-range-change="(range) => handleTimeRangeChange('leftTop', range)">
            <div style="padding: 20px;">
              <p>当前时间维度: {{ timeRanges.leftTop }}</p>
              <div v-if="timeRanges.leftTop === 'day'">日数据内容</div>
              <div v-else-if="timeRanges.leftTop === 'week'">周数据内容</div>
              <div v-else>月数据内容</div>
            </div>
          </Card>
        </template>

        <template #left-bottom>
          <Card
            title="左下卡片"
            :flex="5"
            column="left"
            position="bottom"
            :totalCards="2">
            <div style="padding: 20px;">左下内容</div>
          </Card>
        </template>

        <!-- Center Column: 3 cards -->
        <template #center-top>
          <Card
            title="中上卡片"
            :flex="3"
            column="center"
            position="top"
            :totalCards="3">
            <div style="padding: 20px;">中上内容</div>
          </Card>
        </template>

        <template #center-middle>
          <Card
            title="中中卡片"
            :flex="3"
            column="center"
            position="middle"
            :totalCards="3">
            <div style="padding: 20px;">中中内容</div>
          </Card>
        </template>

        <template #center-bottom>
          <Card
            title="中下卡片"
            :flex="3"
            column="center"
            position="bottom"
            :totalCards="3">
            <div style="padding: 20px;">中下内容</div>
          </Card>
        </template>

        <!-- Right Column: 3 cards -->
        <template #right-top>
          <Card
            title="右上卡片（日期Tab）"
            :showTimeRange="true"
            :timeRange="timeRanges.rightTop"
            :flex="3"
            column="right"
            position="top"
            :totalCards="3"
            :autoRotate="true"
            :rotateInterval="5000"
            @time-range-change="(range) => handleTimeRangeChange('rightTop', range)">
            <div style="padding: 20px;">
              <p>当前时间维度: {{ timeRanges.rightTop }}</p>
              <div v-if="timeRanges.rightTop === 'day'">日数据内容</div>
              <div v-else-if="timeRanges.rightTop === 'week'">周数据内容</div>
              <div v-else>月数据内容</div>
            </div>
          </Card>
        </template>

        <template #right-middle>
          <Card
            title="右中卡片"
            :flex="3"
            column="right"
            position="middle"
            :totalCards="3">
            <div style="padding: 20px;">右中内容</div>
          </Card>
        </template>

        <template #right-bottom>
          <Card
            title="右下卡片"
            :flex="3"
            column="right"
            position="bottom"
            :totalCards="3">
            <div style="padding: 20px;">右下内容</div>
          </Card>
        </template>
      </MainLayout>
    </div>
  </div>
</template>

<script>
import drawMixin from "@/mixin/drawMixin.js";
import Card from "../components/Card.vue";
import MainLayout from "../components/MainLayout.vue";

export default {
  name: "YourPage",
  components: { MainLayout, Card },
  mixins: [drawMixin],
  data() {
    return {
      timeRanges: {
        leftTop: "day",
        rightTop: "month",
      },
    };
  },
  methods: {
    handleTabClick(route) {
      console.log("Tab clicked:", route);
    },
    handleTimeRangeChange(card, range) {
      this.$set(this.timeRanges, card, range);
      console.log(`${card} time range changed to:`, range);
    },
  },
};
</script>

<style scoped>
.container-page {
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
  position: relative;
}

.screen {
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
```

---

## 模板 3: 左2卡片（工位+班组Tab）+中3卡片+右单卡片（内部上中下布局）

**描述**:

- 左: 2卡片，上卡片带工位/班组Tab
- 中: 3卡片标准布局
- 右: 1个大卡片，内部上中下3部分，每部分独立Tab

**特点**:

- 左上: 自定义Tab（工位/班组），7秒轮播
- 右侧: 内部3部分布局，每部分独立5/6/7秒轮播

```vue
<template>
  <div class="container-page">
    <div class="screen" ref="appRef">
      <MainLayout activeTab="YourPage" @tab-click="handleTabClick">
        <!-- Left Column: 2 cards -->
        <template #left-top>
          <Card
            title="左上卡片（工位/班组）"
            :showBodyTabs="true"
            :bodyTabs="workstationTabs"
            :bodyTabValue="bodyTabValues.leftTop"
            :flex="5"
            column="left"
            position="top"
            :totalCards="2"
            :autoRotate="true"
            :rotateInterval="7000"
            @body-tab-change="(tab) => handleBodyTabChange('leftTop', tab)">
            <div style="padding: 20px;">
              <p>当前选择: {{ bodyTabValues.leftTop }}</p>
              <div v-if="bodyTabValues.leftTop === 'workstation'">工位数据内容</div>
              <div v-else>班组数据内容</div>
            </div>
          </Card>
        </template>

        <template #left-bottom>
          <Card
            title="左下卡片"
            :flex="5"
            column="left"
            position="bottom"
            :totalCards="2">
            <div style="padding: 20px;">左下内容</div>
          </Card>
        </template>

        <!-- Center Column: 3 cards -->
        <template #center-top>
          <Card
            title="中上卡片"
            :flex="3"
            column="center"
            position="top"
            :totalCards="3">
            <div style="padding: 20px;">中上内容</div>
          </Card>
        </template>

        <template #center-middle>
          <Card
            title="中中卡片"
            :flex="3"
            column="center"
            position="middle"
            :totalCards="3">
            <div style="padding: 20px;">中中内容</div>
          </Card>
        </template>

        <template #center-bottom>
          <Card
            title="中下卡片"
            :flex="3"
            column="center"
            position="bottom"
            :totalCards="3">
            <div style="padding: 20px;">中下内容</div>
          </Card>
        </template>

        <!-- Right Column: Single Card with Internal Layout -->
        <template #right>
          <Card
            title="右侧单卡片（内部布局）"
            column="right"
            position="single"
            :totalCards="1">
            <!-- 内部上中下三部分布局 -->
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
                    <div v-if="rightSections.top === 'day'">日数据</div>
                    <div v-else-if="rightSections.top === 'week'">周数据</div>
                    <div v-else>月数据</div>
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
                    <div v-if="rightSections.middle === 'day'">日数据</div>
                    <div v-else-if="rightSections.middle === 'week'">周数据</div>
                    <div v-else>月数据</div>
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
                    <div v-if="rightSections.bottom === 'day'">日数据</div>
                    <div v-else-if="rightSections.bottom === 'week'">周数据</div>
                    <div v-else>月数据</div>
                  </div>
                </transition>
              </div>
            </div>
          </Card>
        </template>
      </MainLayout>
    </div>
  </div>
</template>

<script>
import drawMixin from "@/mixin/drawMixin.js";
import Card from "../components/Card.vue";
import MainLayout from "../components/MainLayout.vue";

const timeRangeTabs = [
  { label: "日", key: "day" },
  { label: "周", key: "week" },
  { label: "月", key: "month" },
];

const workstationTabs = [
  { label: "工位", key: "workstation" },
  { label: "班组", key: "team" },
];

export default {
  name: "YourPage",
  components: { MainLayout, Card },
  mixins: [drawMixin],
  data() {
    return {
      timeRangeTabs,
      workstationTabs,
      bodyTabValues: {
        leftTop: "workstation",
      },
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
  methods: {
    handleTabClick(route) {
      console.log("Tab clicked:", route);
    },
    handleBodyTabChange(card, tab) {
      this.$set(this.bodyTabValues, card, tab);
      console.log(`${card} body tab changed to:`, tab);
    },
    handleSectionTabClick(section, tab) {
      this.$set(this.rightSections, section, tab);
      this.startSectionAutoRotation(section);
    },
    startSectionAutoRotation(section) {
      if (this.sectionRotationTimers[section]) {
        clearInterval(this.sectionRotationTimers[section]);
      }

      const intervals = {
        top: 5000,
        middle: 6000,
        bottom: 7000,
      };

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
  mounted() {
    this.startAllSectionRotations();
  },
  beforeDestroy() {
    this.stopAllSectionRotations();
  },
};
</script>

<style scoped>
.container-page {
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
  position: relative;
}

.screen {
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

/* 右侧卡片内部布局 */
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

.section-content {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 8px 0;
}

/* 内容淡入淡出动画 */
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

---

## 模板 4: 左1卡片（内部上下布局）+中2卡片+右3卡片

**描述**:

- 左: 1个大卡片，内部上下2部分布局(flex 5)
- 中: 2卡片(flex 5)
- 右: 3卡片(flex 3)

```vue
<template>
  <div class="container-page">
    <div class="screen" ref="appRef">
      <MainLayout activeTab="YourPage" @tab-click="handleTabClick">
        <!-- Left Column: Single Card with Internal Layout -->
        <template #left>
          <Card
            title="左侧单卡片（内部上下布局）"
            column="left"
            position="single"
            :totalCards="1">
            <div class="left-card-layout">
              <!-- 上部分 -->
              <div class="left-card-section" style="flex: 5;">
                <div class="section-header">
                  <h3 class="section-title">上部数据</h3>
                  <div class="section-tabs">
                    <span
                      v-for="tab in timeRangeTabs"
                      :key="tab.key"
                      class="section-tab"
                      :class="{ active: leftSections.top === tab.key }"
                      @click="handleLeftSectionClick('top', tab.key)">
                      {{ tab.label }}
                    </span>
                  </div>
                </div>
                <transition name="content-fade" mode="out-in">
                  <div :key="leftSections.top" class="section-content">
                    <div v-if="leftSections.top === 'day'">日数据</div>
                    <div v-else-if="leftSections.top === 'week'">周数据</div>
                    <div v-else>月数据</div>
                  </div>
                </transition>
              </div>

              <!-- 下部分 -->
              <div class="left-card-section" style="flex: 5;">
                <div class="section-header">
                  <h3 class="section-title">下部数据</h3>
                  <div class="section-tabs">
                    <span
                      v-for="tab in timeRangeTabs"
                      :key="tab.key"
                      class="section-tab"
                      :class="{ active: leftSections.bottom === tab.key }"
                      @click="handleLeftSectionClick('bottom', tab.key)">
                      {{ tab.label }}
                    </span>
                  </div>
                </div>
                <transition name="content-fade" mode="out-in">
                  <div :key="leftSections.bottom" class="section-content">
                    <div v-if="leftSections.bottom === 'day'">日数据</div>
                    <div v-else-if="leftSections.bottom === 'week'">周数据</div>
                    <div v-else>月数据</div>
                  </div>
                </transition>
              </div>
            </div>
          </Card>
        </template>

        <!-- Center Column: 2 cards -->
        <template #center-top>
          <Card
            title="中上卡片"
            :flex="5"
            column="center"
            position="top"
            :totalCards="2">
            <div style="padding: 20px;">中上内容</div>
          </Card>
        </template>

        <template #center-bottom>
          <Card
            title="中下卡片"
            :flex="5"
            column="center"
            position="bottom"
            :totalCards="2">
            <div style="padding: 20px;">中下内容</div>
          </Card>
        </template>

        <!-- Right Column: 3 cards -->
        <template #right-top>
          <Card
            title="右上卡片"
            :flex="3"
            column="right"
            position="top"
            :totalCards="3">
            <div style="padding: 20px;">右上内容</div>
          </Card>
        </template>

        <template #right-middle>
          <Card
            title="右中卡片"
            :flex="3"
            column="right"
            position="middle"
            :totalCards="3">
            <div style="padding: 20px;">右中内容</div>
          </Card>
        </template>

        <template #right-bottom>
          <Card
            title="右下卡片"
            :flex="3"
            column="right"
            position="bottom"
            :totalCards="3">
            <div style="padding: 20px;">右下内容</div>
          </Card>
        </template>
      </MainLayout>
    </div>
  </div>
</template>

<script>
import drawMixin from "@/mixin/drawMixin.js";
import Card from "../components/Card.vue";
import MainLayout from "../components/MainLayout.vue";

const timeRangeTabs = [
  { label: "日", key: "day" },
  { label: "周", key: "week" },
  { label: "月", key: "month" },
];

export default {
  name: "YourPage",
  components: { MainLayout, Card },
  mixins: [drawMixin],
  data() {
    return {
      timeRangeTabs,
      leftSections: {
        top: "day",
        bottom: "week",
      },
      leftRotationTimers: {
        top: null,
        bottom: null,
      },
    };
  },
  methods: {
    handleTabClick(route) {
      console.log("Tab clicked:", route);
    },
    handleLeftSectionClick(section, tab) {
      this.$set(this.leftSections, section, tab);
      this.startLeftAutoRotation(section);
    },
    startLeftAutoRotation(section) {
      if (this.leftRotationTimers[section]) {
        clearInterval(this.leftRotationTimers[section]);
      }

      const intervals = {
        top: 5000,
        bottom: 6000,
      };

      this.leftRotationTimers[section] = setInterval(() => {
        const currentIndex = this.timeRangeTabs.findIndex(
          tab => tab.key === this.leftSections[section]
        );
        const nextIndex = (currentIndex + 1) % this.timeRangeTabs.length;
        const nextTab = this.timeRangeTabs[nextIndex];
        this.$set(this.leftSections, section, nextTab.key);
      }, intervals[section]);
    },
    startAllLeftRotations() {
      this.startLeftAutoRotation("top");
      this.startLeftAutoRotation("bottom");
    },
    stopAllLeftRotations() {
      Object.keys(this.leftRotationTimers).forEach(section => {
        if (this.leftRotationTimers[section]) {
          clearInterval(this.leftRotationTimers[section]);
          this.leftRotationTimers[section] = null;
        }
      });
    },
  },
  mounted() {
    this.startAllLeftRotations();
  },
  beforeDestroy() {
    this.stopAllLeftRotations();
  },
};
</script>

<style scoped>
.container-page {
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
  position: relative;
}

.screen {
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

/* 左侧卡片内部布局 */
.left-card-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 0;
}

.left-card-section {
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

.section-content {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 8px 0;
}

/* 内容淡入淡出动画 */
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

---

## 模板 5: 全单卡片（左中右各1卡片）

**描述**: 左中右各一个大卡片，适合展示大图表或详细数据

```vue
<template>
  <div class="container-page">
    <div class="screen" ref="appRef">
      <MainLayout activeTab="YourPage" @tab-click="handleTabClick">
        <!-- Left Column: Single Card -->
        <template #left>
          <Card
            title="左侧卡片"
            :showTimeRange="true"
            :timeRange="timeRanges.left"
            column="left"
            position="single"
            :totalCards="1"
            :autoRotate="true"
            :rotateInterval="6000"
            @time-range-change="(range) => handleTimeRangeChange('left', range)">
            <div style="padding: 20px;">
              <p>当前时间维度: {{ timeRanges.left }}</p>
            </div>
          </Card>
        </template>

        <!-- Center Column: Single Card -->
        <template #center>
          <Card
            title="中间卡片"
            column="center"
            position="single"
            :totalCards="1">
            <div style="padding: 20px;">中间内容</div>
          </Card>
        </template>

        <!-- Right Column: Single Card -->
        <template #right>
          <Card
            title="右侧卡片"
            :showTimeRange="true"
            :timeRange="timeRanges.right"
            column="right"
            position="single"
            :totalCards="1"
            :autoRotate="true"
            :rotateInterval="5000"
            @time-range-change="(range) => handleTimeRangeChange('right', range)">
            <div style="padding: 20px;">
              <p>当前时间维度: {{ timeRanges.right }}</p>
            </div>
          </Card>
        </template>
      </MainLayout>
    </div>
  </div>
</template>

<script>
import drawMixin from "@/mixin/drawMixin.js";
import Card from "../components/Card.vue";
import MainLayout from "../components/MainLayout.vue";

export default {
  name: "YourPage",
  components: { MainLayout, Card },
  mixins: [drawMixin],
  data() {
    return {
      timeRanges: {
        left: "day",
        right: "month",
      },
    };
  },
  methods: {
    handleTabClick(route) {
      console.log("Tab clicked:", route);
    },
    handleTimeRangeChange(card, range) {
      this.$set(this.timeRanges, card, range);
      console.log(`${card} time range changed to:`, range);
    },
  },
};
</script>

<style scoped>
.container-page {
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
  position: relative;
}

.screen {
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
```

---

## 模板 6: 左2卡片+中3卡片+右3卡片（中下使用钢板信息表格）

**描述**: 标准三栏布局，中下卡片使用PlateInfoTable组件展示钢板详细信息

**特点**:

- 中下: 使用PlateInfoTable组件，自动滚动显示钢板详细信息
- 固定列宽，彩色列头，自动滚动

```vue
<template>
  <div class="container-page">
    <div class="screen" ref="appRef">
      <MainLayout activeTab="YourPage" @tab-click="handleTabClick">
        <!-- Left Column: 2 cards -->
        <template #left-top>
          <Card
            title="左上卡片"
            :flex="5"
            column="left"
            position="top"
            :totalCards="2">
            <div style="padding: 20px;">左上内容</div>
          </Card>
        </template>

        <template #left-bottom>
          <Card
            title="左下卡片"
            :flex="5"
            column="left"
            position="bottom"
            :totalCards="2">
            <div style="padding: 20px;">左下内容</div>
          </Card>
        </template>

        <!-- Center Column: 3 cards -->
        <template #center-top>
          <Card
            title="中上卡片"
            :flex="3"
            column="center"
            position="top"
            :totalCards="3">
            <div style="padding: 20px;">中上内容</div>
          </Card>
        </template>

        <template #center-middle>
          <Card
            title="中中卡片"
            :flex="3"
            column="center"
            position="middle"
            :totalCards="3">
            <div style="padding: 20px;">中中内容</div>
          </Card>
        </template>

        <template #center-bottom>
          <Card
            title="钢板详细信息"
            :flex="4"
            column="center"
            position="bottom"
            :totalCards="3">
            <!-- 表格部分 - 参考PlateInfoTable模板 -->
            <div class="df-table-container">
              <!-- 固定表头 -->
              <div class="df-table-header">
                <table class="df-table">
                  <colgroup>
                    <col style="width: 200px" />
                    <col style="width: 80px" />
                    <col style="width: 120px" />
                    <col style="width: 120px" />
                    <col style="width: 160px" />
                    <col style="width: 100px" />
                    <col style="width: 100px" />
                    <col style="width: 100px" />
                    <col style="width: 100px" />
                    <col style="width: 260px" />
                    <col style="width: 120px" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>唯一编码</th>
                      <th style="color: rgb(163,224,67)">区域</th>
                      <th style="color: rgb(255,153,0)">库区</th>
                      <th>库位编码</th>
                      <th style="color: rgb(255,217,0)">库位名称</th>
                      <th style="color: rgb(55,217,240)">长度</th>
                      <th style="color: rgb(140,209,125)">宽度</th>
                      <th style="color: rgb(255,190,125)">厚度</th>
                      <th>重量</th>
                      <th>入库时间</th>
                      <th>在库时长</th>
                    </tr>
                  </thead>
                </table>
              </div>
              <!-- 滚动内容区 -->
              <div class="df-table-wrapper">
                <div class="df-scroll-content" :style="{ transform: `translateY(${scrollTop}px)` }">
                  <table class="df-table df-table-body">
                    <colgroup>
                      <col style="width: 200px" />
                      <col style="width: 80px" />
                      <col style="width: 120px" />
                      <col style="width: 120px" />
                      <col style="width: 160px" />
                      <col style="width: 100px" />
                      <col style="width: 100px" />
                      <col style="width: 100px" />
                      <col style="width: 100px" />
                      <col style="width: 260px" />
                      <col style="width: 120px" />
                    </colgroup>
                    <tbody>
                      <tr v-for="(item, index) in scrollData" :key="index">
                        <td>{{ item.uniqueCode }}</td>
                        <td>{{ item.areaName }}</td>
                        <td>{{ item.zoneName }}</td>
                        <td>{{ item.locationCode }}</td>
                        <td>{{ item.locationName }}</td>
                        <td>{{ item.length }}</td>
                        <td>{{ item.width }}</td>
                        <td>{{ item.thickness }}</td>
                        <td>{{ item.weight }}</td>
                        <td>{{ item.inboundTime }}</td>
                        <td>{{ item.storageDuration }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Card>
        </template>

        <!-- Right Column: 3 cards -->
        <template #right-top>
          <Card
            title="右上卡片"
            :flex="3"
            column="right"
            position="top"
            :totalCards="3">
            <div style="padding: 20px;">右上内容</div>
          </Card>
        </template>

        <template #right-middle>
          <Card
            title="右中卡片"
            :flex="3"
            column="right"
            position="middle"
            :totalCards="3">
            <div style="padding: 20px;">右中内容</div>
          </Card>
        </template>

        <template #right-bottom>
          <Card
            title="右下卡片"
            :flex="4"
            column="right"
            position="bottom"
            :totalCards="3">
            <div style="padding: 20px;">右下内容</div>
          </Card>
        </template>
      </MainLayout>
    </div>
  </div>
</template>

<script>
import drawMixin from "@/mixin/drawMixin.js";
import autoScrollMixin from "@/mixin/autoScrollMixin.js";
import Card from "../components/Card.vue";
import MainLayout from "../components/MainLayout.vue";

export default {
  name: "YourPage",
  components: { MainLayout, Card },
  mixins: [drawMixin, autoScrollMixin],
  data() {
    return {
      plateInfoData: [
        {
          uniqueCode: "SP001",
          areaName: "A区",
          zoneName: "1号库",
          locationCode: "A01",
          locationName: "货位A01",
          length: 12000,
          width: 2500,
          thickness: 20,
          weight: 4.71,
          inboundTime: "2024-01-15 10:30:00",
          storageDuration: 15,
        },
        // ... 更多数据
      ],
    };
  },
  computed: {
    scrollData() {
      return this.plateInfoData;
    },
  },
  methods: {
    handleTabClick(route) {
      console.log("Tab clicked:", route);
    },
  },
};
</script>

<style scoped>
.container-page {
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
  position: relative;
}

.screen {
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
```

---

## 表格模板参考

### PlateInfoTable 钢板信息表格模板

**参考文件**: `src/views/DigitalFusion/SmartSteelPlateLibrary/components/PlateInfoTable.vue`

**描述**: 展示钢板详细信息的自动滚动表格模板，需要时复制代码到页面中使用

**使用方式**: 直接复制模板代码到页面中，不作为独立组件引入

**所需 Mixin**: `autoScrollMixin` - 提供自动滚动功能

**数据结构**:

```javascript
{
  uniqueCode: "SP001",      // 唯一编码
  areaName: "A区",          // 区域名称
  zoneName: "1号库",        // 库区名称
  locationCode: "A01",      // 库位编码
  locationName: "货位A01",  // 库位名称
  length: 12000,            // 长度(mm)
  width: 2500,              // 宽度(mm)
  thickness: 20,            // 厚度(mm)
  weight: 4.71,             // 重量(t)
  inboundTime: "2024-01-15 10:30:00",  // 入库时间
  storageDuration: 15       // 在库时长(天)
}
```

**特性**:

- ✓ 自动滚动（使用autoScrollMixin）
- ✓ 固定表头
- ✓ 固定列宽（colgroup）
- ✓ 彩色列头（区域、库区、库位、长宽厚）
- ✓ 双表格结构（表头+表体分离）

**列配置**:

| 列名 | 宽度 | 颜色 | 说明 |
|------|------|------|------|
| 唯一编码 | 200px | - | 钢板唯一标识 |
| 区域 | 80px | rgb(163,224,67) | 绿色 |
| 库区 | 120px | rgb(255,153,0) | 橙色 |
| 库位编码 | 120px | - | - |
| 库位名称 | 160px | rgb(255,217,0) | 黄色 |
| 长度 | 100px | rgb(55,217,240) | 青色 |
| 宽度 | 100px | rgb(140,209,125) | 浅绿 |
| 厚度 | 100px | rgb(255,190,125) | 浅橙 |
| 重量 | 100px | - | - |
| 入库时间 | 260px | - | - |
| 在库时长 | 120px | - | - |

**完整模板代码**:

```vue
<template>
  <div class="df-table-container">
    <!-- 固定表头 -->
    <div class="df-table-header">
      <table class="df-table">
        <colgroup>
          <col style="width: 200px" />
          <col style="width: 80px" />
          <col style="width: 120px" />
          <col style="width: 120px" />
          <col style="width: 160px" />
          <col style="width: 100px" />
          <col style="width: 100px" />
          <col style="width: 100px" />
          <col style="width: 100px" />
          <col style="width: 260px" />
          <col style="width: 120px" />
        </colgroup>
        <thead>
          <tr>
            <th>唯一编码</th>
            <th style="color: rgb(163,224,67)">区域</th>
            <th style="color: rgb(255,153,0)">库区</th>
            <th>库位编码</th>
            <th style="color: rgb(255,217,0)">库位名称</th>
            <th style="color: rgb(55,217,240)">长度</th>
            <th style="color: rgb(140,209,125)">宽度</th>
            <th style="color: rgb(255,190,125)">厚度</th>
            <th>重量</th>
            <th>入库时间</th>
            <th>在库时长</th>
          </tr>
        </thead>
      </table>
    </div>
    <!-- 滚动内容区 -->
    <div class="df-table-wrapper">
      <div class="df-scroll-content" :style="{ transform: `translateY(${scrollTop}px)` }">
        <table class="df-table df-table-body">
          <colgroup>
            <col style="width: 200px" />
            <col style="width: 80px" />
            <col style="width: 120px" />
            <col style="width: 120px" />
            <col style="width: 160px" />
            <col style="width: 100px" />
            <col style="width: 100px" />
            <col style="width: 100px" />
            <col style="width: 100px" />
            <col style="width: 260px" />
            <col style="width: 120px" />
          </colgroup>
          <tbody>
            <tr v-for="(item, index) in scrollData" :key="index">
              <td>{{ item.uniqueCode }}</td>
              <td>{{ item.areaName }}</td>
              <td>{{ item.zoneName }}</td>
              <td>{{ item.locationCode }}</td>
              <td>{{ item.locationName }}</td>
              <td>{{ item.length }}</td>
              <td>{{ item.width }}</td>
              <td>{{ item.thickness }}</td>
              <td>{{ item.weight }}</td>
              <td>{{ item.inboundTime }}</td>
              <td>{{ item.storageDuration }}</td>
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
  data() {
    return {
      plateInfoData: [
        // 你的数据
      ],
    };
  },
  computed: {
    scrollData() {
      return this.plateInfoData;
    },
  },
};
</script>

<style scoped>
@import "@/views/DigitalFusion/styles/table.css";
</style>
```

**样式依赖**:

- 引入: `@/views/DigitalFusion/styles/table.css`
- 使用类: `.df-table-container`, `.df-table`, `.df-table-header`, `.df-table-wrapper`, `.df-scroll-content`, `.df-table-body`

---

## 快速参考表

| 模板 | 左栏 | 中栏 | 右栏 | 特点 |
|------|------|------|------|------|
| 模板1 | 2卡片(flex 5) | 3卡片(flex 3) | 3卡片(flex 3) | 标准三栏，无Tab |
| 模板2 | 2卡片，上卡片带日期Tab | 3卡片(flex 3) | 3卡片，上卡片带日期Tab | 左右两侧自动轮播 |
| 模板3 | 2卡片，上卡片带工位/班组Tab | 3卡片(flex 3) | 1卡片内部上中下布局 | 右侧内部3部分独立轮播 |
| 模板4 | 1卡片内部上下布局 | 2卡片(flex 5) | 3卡片(flex 3) | 左侧内部2部分独立轮播 |
| 模板5 | 1卡片带日期Tab | 1卡片 | 1卡片带日期Tab | 全单卡片，适合大图表 |
| 模板6 | 2卡片(flex 5) | 3卡片，中下使用PlateInfoTable | 3卡片(flex 3/3/4) | 表格组件展示钢板信息 |

---

## 常用配置参数

### Card组件属性

- `title`: 卡片标题
- `flex`: flex值(1-10)
- `column`: 列位置("left"/"center"/"right")
- `position`: 卡片位置("top"/"middle"/"bottom"/"single")
- `totalCards`: 该列总卡片数(1/2/3)
- `showTimeRange`: 显示日期Tab(true/false)
- `timeRange`: 当前日期Tab值("day"/"week"/"month")
- `showBodyTabs`: 显示内容区Tab(true/false)
- `bodyTabs`: 自定义Tab数组
- `bodyTabValue`: 当前内容Tab值
- `autoRotate`: 启用自动轮播(true/false)
- `rotateInterval`: 轮播间隔(毫秒)

### 自定义Tab示例

```javascript
// 工位/班组
const workstationTabs = [
  { label: "工位", key: "workstation" },
  { label: "班组", key: "team" },
];

// 产线/设备
const productionTabs = [
  { label: "产线", key: "line" },
  { label: "设备", key: "device" },
];

// 计划/实际
const planTabs = [
  { label: "计划", key: "plan" },
  { label: "实际", key: "actual" },
];
```

---

## 使用建议

1. **选择合适的模板**: 根据数据展示需求选择卡片数量和布局
2. **调整flex值**: 根据内容重要性调整卡片高度比例
3. **合理设置轮播时间**:
   - 简单数据: 3-5秒
   - 复杂图表: 5-8秒
   - 详细表格: 8-10秒
4. **Tab类型选择**:
   - 时间维度: 使用`showTimeRange`
   - 业务维度: 使用`showBodyTabs` + 自定义tabs
5. **内部布局**: 对于需要多个独立数据展示的场景，使用内部布局而非多个Card

---

需要其他定制化模板，请参考以上示例进行修改组合。

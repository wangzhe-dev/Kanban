<template>
  <div class="stock-layout">
    <div class="rows">
      <div v-for="(row, rowIndex) in layout.rows" :key="rowIndex" class="row-block" :style="rowBlockStyle(row)">
        <div class="row-main">
          <div class="legend" v-if="row.legend">
              <div v-for="(item, idx) in row.legend" :key="idx" class="legend-item"
                :style="{ background: getColor(item.color || item) }">
                <span class="legend-label">{{ item.label || item }}</span>
              </div>
            </div>
          <div class="row-content">
            <template v-if="row.topSegments || row.bottomSegments">
              <div class="row-grid" :style="gridStyle(row.topSegments)" v-if="row.topSegments">
                <div v-for="(segment, segIndex) in row.topSegments" :key="`top-${segIndex}`"
                  class="cell"
                  :style="cellStyle(segment)"
                  @click="handleCellClick(segment, row)">
                  <span v-if="!isTransparent(segment)" class="cell-label">{{ getCellDisplay(segment, row) }}</span>
                </div>
              </div>

              <div class="row-grid" :style="gridStyle(row.bottomSegments)" v-if="row.bottomSegments">
                <div v-for="(segment, segIndex) in row.bottomSegments" :key="`bottom-${segIndex}`"
                  class="cell"
                  :style="cellStyle(segment)"
                  @click="handleCellClick(segment, row)">
                  <span v-if="!isTransparent(segment)" class="cell-label">{{ getCellDisplay(segment, row) }}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SteelPlateStock",
  props: {
    layout: {
      type: Object,
      default: () => ({
        rows: [],
      }),
    },
    plateInfoData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    colorMap() {
      return {
        magenta: "#ff2bc2",
        gold: "#d8a700",
        brightGreen: "#68e058",
        cyan: "#1fd1d1",
        blue: "#3c6fd3",
        orange: "#c55c13",
        green: "#4aa857",
      };
    },
  },
  methods: {
    getColor(key) {
      return this.colorMap[key] || key || "#00d9ff";
    },
    countRows(segments = []) {
      if (!segments || !segments.length) return 0;
      return 1; // 现在每个segment都是1行1列
    },
    rowBlockStyle(row) {
      const topRows = row.topSegments ? 1 : 0;
      const bottomRows = row.bottomSegments ? 1 : 0;
      const totalRows = topRows + bottomRows || 1;
      return {
        flex: totalRows,
        minHeight: 0,
      };
    },
    gridStyle(segments = []) {
      if (!segments || !segments.length) return {};
      const cols = segments.length; // 每个segment占1列
      return {
        "--cols": cols,
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `1fr`,
      };
    },
    isTransparent(segment) {
      return segment.color === 'transparent';
    },
    cellStyle(segment) {
      const color = this.getColor(segment.color);
      const style = {
        background: color,
      };

      // 隐藏透明占位盒子
      if (segment.color === 'transparent') {
        style.visibility = 'hidden';
        style.pointerEvents = 'none';
      }

      return style;
    },
    getCellDisplay(segment, row) {
      if (!segment || segment.color === 'transparent') return '';

      // 如果segment有locationIdPrefix，统计该工位的钢板数量
      if (segment.locationIdPrefix && segment.workstationId) {
        // 根据workstationId生成locationId
        const locationId = segment.workstationId.replace(/-(T|B)-/, '-');

        // 统计该库位的钢板数量
        const count = this.plateInfoData.filter(p => {
          return p.areaName === row.name &&
                 p.zoneName === segment.zoneName &&
                 p.locationId === locationId;
        }).length;

        // 只有当有钢板时才显示数量，否则返回空字符串
        return count > 0 ? count : '';
      }

      return '';
    },
    handleCellClick(segment, row) {
      if (!segment || segment.color === 'transparent') return;

      if (segment.locationIdPrefix && segment.workstationId) {
        const locationId = segment.workstationId.replace(/-(T|B)-/, '-');

        const plates = this.plateInfoData.filter(p => {
          return p.areaName === row.name &&
                 p.zoneName === segment.zoneName &&
                 p.locationId === locationId;
        });

        if (plates.length > 0) {
          console.log(`工位 ${segment.workstationId} (库位 ${locationId}) 的钢板列表:`, plates);
          console.log(`共 ${plates.length} 块钢板`);
          // 可以在这里触发显示详情弹窗等操作
        } else {
          console.log(`工位 ${segment.workstationId} 当前无钢板`);
        }
      }
    },
  },
};
</script>

<style scoped>
.stock-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
}

.row-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1 1 0;
  min-height: 0;
}

.row-main {
  display: flex;
  gap: 10px;
  flex: 1;
  min-height: 0;
  align-items: stretch;
}

.row-side {
  display: flex;
  align-items: flex-end;
  gap: 8px;

}

.row-name {
  display: none;
}

.legend {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  flex-wrap: nowrap;
  height: 200px !important;
  position: absolute;
  left: 30px;
  top: 55px;
  z-index: 10;
}

.legend-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 200px;
  border-radius: 3px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.25);
}

.legend-label {
  font-size: 28px;
  color: #ffffff;
  font-weight: 800;
  letter-spacing: 2px;
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.rows {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
}

.row-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 0;
}

.row-grid {
  display: grid;
  gap: 6px;
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 0;
}

.cell {
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s;
}

.cell:hover {
  transform: scale(1.05);
}

.cell-label {
  font-size: 28px;
  font-weight: bold;
  /* display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  padding: 2px 6px;
  border-radius: 6px; */
  /* background: rgba(0, 0, 0, 0.15);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.35); */
}

@media screen and (max-height: 1080px) {
  .stock-layout {
    gap: 12px;
  }

  .legend-label {
    font-size: 18px;
  }

  .cell {
    font-size: 18px;
  }
}
</style>

<template>
  <div class="drill-table-page">
    <div class="page-header">
      <el-button class="back-btn" type="text" @click="$emit('back')">
        <i class="el-icon-back" />
        返回
      </el-button>
      <div class="page-header-center">
        <div v-if="title" class="page-title">{{ title }}</div>
      </div>
      <div class="header-right">
        <el-button v-if="showRefresh" class="ghost-btn" size="medium" @click="handleRefresh">刷新</el-button>
      </div>
    </div>

    <div class="page-body">
      <div class="panel">
        <div class="panel-top">
          <el-form class="query-form" :model="query" @submit.native.prevent>
            <el-row class="query-row" :gutter="36">
              <template v-if="hasCustomFilters">
                <el-col
                  v-for="f in filters"
                  :key="f.key || f.prop"
                  :span="f.span || 6"
                >
                  <el-form-item :label="f.label">
                    <el-input
                      v-if="f.type === 'input'"
                      v-model="query[f.prop]"
                      :clearable="f.clearable !== false"
                      :placeholder="f.placeholder"
                      @keyup.enter.native="handleSearch"
                    />
                    <el-select
                      v-else-if="f.type === 'select'"
                      v-model="query[f.prop]"
                      :clearable="f.clearable !== false"
                      :placeholder="f.placeholder || '全部'"
                    >
                      <el-option
                        v-for="opt in f.options || []"
                        :key="opt.value"
                        :label="opt.label"
                        :value="opt.value"
                      />
                    </el-select>
                    <el-date-picker
                      v-else-if="f.type === 'date'"
                      v-model="query[f.prop]"
                      type="date"
                      :placeholder="f.placeholder || '选择日期'"
                      :value-format="f.valueFormat || 'yyyy-MM-dd'"
                      :clearable="f.clearable !== false"
                    />
                    <el-date-picker
                      v-else-if="f.type === 'daterange'"
                      v-model="query[f.prop]"
                      type="daterange"
                      unlink-panels
                      range-separator="~"
                      :start-placeholder="f.startPlaceholder || '开始'"
                      :end-placeholder="f.endPlaceholder || '结束'"
                      :value-format="f.valueFormat || 'yyyy-MM-dd'"
                      :clearable="f.clearable !== false"
                    />
                  </el-form-item>
                </el-col>
              </template>
              <template v-else>
                <el-col v-if="enableKeyword" :span="keywordSpan">
                  <el-form-item :label="keywordLabel">
                    <el-input
                      v-model="query.keyword"
                      clearable
                      :placeholder="keywordPlaceholder"
                      @keyup.enter.native="handleSearch"
                    />
                  </el-form-item>
                </el-col>
                <el-col v-if="hasStatusFilter" :span="statusSpan">
                  <el-form-item label="状态">
                    <el-select v-model="query.status" clearable placeholder="全部">
                      <el-option
                        v-for="opt in statusOptions"
                        :key="opt.value"
                        :label="opt.label"
                        :value="opt.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col v-if="enableDateRange" :span="dateSpan">
                  <el-form-item label="时间">
                    <el-date-picker
                      v-model="query.dateRange"
                      type="daterange"
                      unlink-panels
                      range-separator="~"
                      start-placeholder="开始"
                      end-placeholder="结束"
                      value-format="yyyy-MM-dd"
                    />
                  </el-form-item>
                </el-col>
              </template>
              <el-col :span="actionSpan" class="query-actions">
                <el-form-item>
                  <el-button type="primary" @click="handleSearch">查询</el-button>
                  <el-button @click="handleReset">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="panel-table">
          <el-table
            v-loading="loading"
            class="pretty-table"
            :data="pageRows"
            stripe
            border
            height="100%"
          >
            <el-table-column type="index" :label="indexLabel" :width="indexWidth" />
            <el-table-column
              v-for="col in columns"
              :key="col.key || col.prop || col.label"
              :prop="col.prop"
              :label="col.label"
              :width="col.width"
              :min-width="col.minWidth"
              :align="col.align"
              :show-overflow-tooltip="col.showOverflowTooltip !== false"
            >
              <template v-if="col.kind === 'status'" slot-scope="{ row }">
                <span :style="{ color: statusColor(row[col.statusField || statusField], col.statusColorMap) }">
                  {{ statusLabel(row[col.statusField || statusField], col.statusOptions) }}
                </span>
              </template>
              <template v-else-if="typeof col.formatter === 'function'" slot-scope="{ row }">
                {{ col.formatter(row[col.prop], row) }}
              </template>
              <template v-else slot-scope="{ row }">
                {{ row[col.prop] }}
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="panel-pagination">
          <el-pagination
            background
            :total="total"
            :current-page="page"
            :page-size="pageSize"
            :page-sizes="pageSizes"
            layout="total, sizes, ->, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function parseDateToTime(value) {
  if (!value) return null;
  if (value instanceof Date) return value.getTime();
  if (typeof value === "number") return value;
  const str = String(value).trim();
  if (!str) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    return new Date(`${str}T12:00:00`).getTime();
  }
  return new Date(str.replace(" ", "T")).getTime();
}

export default {
  name: "DrillTablePage",
  props: {
    indexLabel: {
      type: String,
      default: "#",
    },
    indexWidth: {
      type: [Number, String],
      default: 90,
    },
    title: {
      type: String,
      default: "",
    },
    columns: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: null,
    },
    buildRows: {
      type: Function,
      default: null,
    },
    buildCount: {
      type: Number,
      default: 100,
    },
    filters: {
      type: Array,
      default: null,
    },
    queryDefaults: {
      type: Object,
      default: () => ({}),
    },
    filterFn: {
      type: Function,
      default: null,
    },
    keywordFields: {
      type: Array,
      default: () => [],
    },
    keywordLabel: {
      type: String,
      default: "关键字",
    },
    keywordPlaceholder: {
      type: String,
      default: "请输入关键字",
    },
    enableKeyword: {
      type: Boolean,
      default: true,
    },
    statusOptions: {
      type: Array,
      default: () => [],
    },
    statusField: {
      type: String,
      default: "status",
    },
    statusColorMap: {
      type: Object,
      default: () => ({}),
    },
    dateField: {
      type: String,
      default: "",
    },
    enableDateRange: {
      type: Boolean,
      default: true,
    },
    showRefresh: {
      type: Boolean,
      default: true,
    },
    defaultPageSize: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100],
    },
    keywordSpan: {
      type: Number,
      default: 7,
    },
    statusSpan: {
      type: Number,
      default: 5,
    },
    dateSpan: {
      type: Number,
      default: 8,
    },
    actionSpan: {
      type: Number,
      default: 4,
    },
  },
  data() {
    const initialQuery = {
      keyword: "",
      status: "",
      dateRange: [],
      ...(this.queryDefaults || {}),
    };

    if (Array.isArray(this.filters)) {
      this.filters.forEach((f) => {
        if (!f || !f.prop) return;
        if (!(f.prop in initialQuery)) {
          initialQuery[f.prop] = f.type === "daterange" ? [] : "";
        }
      });
    }

    return {
      loading: false,
      query: initialQuery,
      _initialQuery: initialQuery,
      page: 1,
      pageSize: this.defaultPageSize,
      allRows: [],
    };
  },
  computed: {
    hasCustomFilters() {
      return Array.isArray(this.filters) && this.filters.length > 0;
    },
    hasStatusFilter() {
      return Array.isArray(this.statusOptions) && this.statusOptions.length > 0;
    },
    filteredRows() {
      if (typeof this.filterFn === "function") {
        return this.allRows.filter((row) => this.filterFn(row, this.query));
      }

      const keyword = (this.query.keyword || "").trim().toLowerCase();
      const status = this.query.status;
      const [start, end] = Array.isArray(this.query.dateRange) ? this.query.dateRange : [];

      const startTime = start ? parseDateToTime(`${start}T00:00:00`) : null;
      const endTime = end ? parseDateToTime(`${end}T23:59:59`) : null;

      const fields = Array.isArray(this.keywordFields) ? this.keywordFields.filter(Boolean) : [];
      const keywordAllFields = fields.length === 0;
      const dateField = this.dateField;
      const statusField = this.statusField;

      return this.allRows.filter((row) => {
        if (this.hasStatusFilter && status && row[statusField] !== status) return false;

        if (keyword) {
          let haystack = "";
          if (keywordAllFields) {
            haystack = Object.keys(row)
              .map((k) => row[k])
              .filter((v) => v != null)
              .join(" ");
          } else {
            haystack = fields.map((k) => row[k]).filter((v) => v != null).join(" ");
          }
          if (!String(haystack).toLowerCase().includes(keyword)) return false;
        }

        if (this.enableDateRange && dateField && (startTime != null || endTime != null)) {
          const t = parseDateToTime(row[dateField]);
          if (t == null) return false;
          if (startTime != null && t < startTime) return false;
          if (endTime != null && t > endTime) return false;
        }

        return true;
      });
    },
    total() {
      return this.filteredRows.length;
    },
    pageRows() {
      const start = (this.page - 1) * this.pageSize;
      return this.filteredRows.slice(start, start + this.pageSize);
    },
  },
  watch: {
    rows: {
      handler(next) {
        if (Array.isArray(next)) {
          this.allRows = next.slice();
          this.ensurePageInRange();
        }
      },
      immediate: true,
    },
  },
  created() {
    if (Array.isArray(this.rows)) {
      this.allRows = this.rows.slice();
    } else if (typeof this.buildRows === "function") {
      this.allRows = this.buildRows(this.buildCount) || [];
    }
  },
  beforeDestroy() {
    window.clearTimeout(this._loadingTimer);
  },
  methods: {
    statusLabel(value, options) {
      const hit = (options || this.statusOptions || []).find((o) => o.value === value);
      return hit ? hit.label : value;
    },
    statusColor(value, colorMap) {
      const map = colorMap || this.statusColorMap;
      if (map && map[value]) return map[value];
      if (value === "done") return "#67c23a";
      if (value === "running") return "#e6a23c";
      if (value === "paused") return "#909399";
      if (value === "new") return "#40d5ff";
      return "#40d5ff";
    },
    handleSearch() {
      this.page = 1;
      this.simulateLoading();
    },
    handleReset() {
      this.query = JSON.parse(JSON.stringify(this._initialQuery));
      this.page = 1;
      this.pageSize = this.defaultPageSize;
      this.simulateLoading();
    },
    handleRefresh() {
      this.$emit("refresh");
      if (typeof this.buildRows === "function") {
        this.allRows = this.buildRows(this.buildCount) || [];
      }
      this.simulateLoading();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.page = 1;
    },
    handleCurrentChange(p) {
      this.page = p;
    },
    ensurePageInRange() {
      const totalPages = Math.max(1, Math.ceil(this.total / this.pageSize));
      if (this.page > totalPages) this.page = totalPages;
    },
    simulateLoading() {
      this.loading = true;
      window.clearTimeout(this._loadingTimer);
      this._loadingTimer = window.setTimeout(() => {
        this.loading = false;
        this.ensurePageInRange();
      }, 260);
    },
  },
};
</script>

<style scoped>
.drill-table-page {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 60px 80px 60px;
  box-sizing: border-box;
  background: linear-gradient(135deg, rgba(8, 20, 40, 0.95) 0%, rgba(4, 12, 24, 0.98) 100%);
}

/* ===== 页面头部 ===== */
.page-header {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 36px;
  padding: 0 20px;
  background: linear-gradient(90deg, rgba(64, 213, 255, 0.08) 0%, transparent 50%, rgba(64, 213, 255, 0.08) 100%);
  border-radius: 16px;
  border: 1px solid rgba(64, 213, 255, 0.15);
  position: relative;
}

.page-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(64, 213, 255, 0.6), transparent);
}

.back-btn {
  color: #40d5ff;
  font-size: 36px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  border-radius: 12px;
}

.back-btn:hover {
  background: rgba(64, 213, 255, 0.15);
  transform: translateX(-4px);
}

.back-btn i {
  font-size: 40px;
}

.page-header-center {
  flex: 1;
  text-align: center;
  min-width: 0;
}

.page-title {
  display: inline-block;
  font-size: 36px;
  font-weight: 700;
  color: rgba(234, 247, 255, 0.95);
  letter-spacing: 2px;
}

.header-right {
  display: flex;
  gap: 16px;
}

.ghost-btn {
  border-radius: 12px;
  border: 1px solid rgba(64, 213, 255, 0.4);
  background: linear-gradient(135deg, rgba(64, 213, 255, 0.12) 0%, rgba(64, 213, 255, 0.05) 100%);
  color: #40d5ff;
  font-size: 28px;
  padding: 14px 32px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.ghost-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(64, 213, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.ghost-btn:hover::before {
  left: 100%;
}

.ghost-btn:hover {
  border-color: rgba(64, 213, 255, 0.7);
  box-shadow: 0 0 30px rgba(64, 213, 255, 0.3);
  transform: translateY(-2px);
}

/* ===== 主体区域 ===== */
.page-body {
  flex: 1;
  min-height: 0;
  display: flex;
}

.panel {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
  border-radius: 24px;
  border: 1px solid rgba(64, 213, 255, 0.2);
  background: linear-gradient(180deg, rgba(16, 32, 56, 0.95) 0%, rgba(8, 20, 40, 0.98) 100%);
  box-shadow:
    0 40px 100px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(64, 213, 255, 0.1),
    inset 0 -1px 0 rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  overflow: hidden;
  position: relative;
}

.panel::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent 0%, #40d5ff 20%, #2b7bff 50%, #40d5ff 80%, transparent 100%);
  opacity: 0.8;
}

/* ===== 查询区域 ===== */
.panel-top {
  padding: 40px 50px 36px;
  display: block;
  background: linear-gradient(180deg, rgba(64, 213, 255, 0.05) 0%, transparent 100%);
  border-bottom: 1px solid rgba(64, 213, 255, 0.12);
  position: relative;
}

.query-form {
  width: 100%;
}

/* ===== 查询栅格布局 ===== */
.query-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

/* ===== 表格区域 ===== */
.panel-table {
  flex: 1;
  min-height: 0;
  padding: 30px 50px;
  position: relative;
}

/* ===== 分页区域 ===== */
.panel-pagination {
  padding: 24px 50px 30px;
  border-top: 1px solid rgba(64, 213, 255, 0.12);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: linear-gradient(180deg, transparent 0%, rgba(64, 213, 255, 0.03) 100%);
}

/* ===== Element UI 表单主题 ===== */
.drill-table-page ::v-deep .query-form .el-form-item {
  margin: 0 !important;
}

.drill-table-page ::v-deep .query-form .el-form-item__content {
  display: flex;
  align-items: center;
  min-height: 60px;
  line-height: 60px;
}

.drill-table-page ::v-deep .el-form-item__label {
  color: rgba(191, 234, 255, 0.85) !important;
  font-size: 28px !important;
  padding-right: 16px !important;
  line-height: 60px !important;
  font-weight: 500;
  height: auto !important;
}

.drill-table-page ::v-deep .query-form .el-input,
.drill-table-page ::v-deep .query-form .el-select {
  width: 100%;
}

.drill-table-page ::v-deep .query-form .el-select .el-input__inner {
  height: 60px !important;
  line-height: 60px !important;
}

.drill-table-page ::v-deep .query-form .el-date-editor--daterange {
  width: 100%;
}

.drill-table-page ::v-deep .el-input__inner {
  height: 60px !important;
  line-height: 60px !important;
  font-size: 28px !important;
  border-radius: 12px !important;
  color: #eaf7ff !important;
  background: rgba(16, 32, 56, 0.8) !important;
  border: 1px solid rgba(64, 213, 255, 0.25) !important;
  transition: all 0.3s ease;
}

.drill-table-page ::v-deep .el-range-input {
  height: 40px !important;
  line-height: 40px !important;
  font-size: 28px !important;
  color: #eaf7ff !important;
  background: transparent !important;
}

.drill-table-page ::v-deep .el-input__inner:hover,
.drill-table-page ::v-deep .el-input__inner:focus {
  border-color: rgba(64, 213, 255, 0.5) !important;
  box-shadow: 0 0 20px rgba(64, 213, 255, 0.15);
}

.drill-table-page ::v-deep .el-input__inner::placeholder {
  color: rgba(191, 234, 255, 0.4) !important;
}

.drill-table-page ::v-deep .el-range-editor.el-input__inner {
  height: 60px !important;
  padding: 0 18px !important;
  display: inline-flex !important;
  align-items: center !important;
}

.drill-table-page ::v-deep .el-date-editor .el-range__icon {
  line-height: 40px !important;
  font-size: 24px !important;
  color: rgba(191, 234, 255, 0.6) !important;
}

.drill-table-page ::v-deep .el-date-editor .el-range__close-icon {
  line-height: 40px !important;
  font-size: 24px !important;
}

.drill-table-page ::v-deep .el-date-editor .el-range-separator {
  color: rgba(191, 234, 255, 0.75) !important;
  font-size: 26px !important;
  line-height: 40px !important;
  height: 40px !important;
}

.drill-table-page ::v-deep .el-input__suffix {
  display: flex;
  align-items: center;
}

.drill-table-page ::v-deep .el-input__icon {
  line-height: 60px !important;
  font-size: 24px !important;
  color: rgba(191, 234, 255, 0.6) !important;
}

.drill-table-page ::v-deep .el-button {
  border-radius: 12px !important;
  font-size: 28px !important;
  padding: 14px 28px !important;
  height: 60px !important;
  line-height: 1 !important;
  transition: all 0.3s ease;
  font-weight: 500;
}

.drill-table-page ::v-deep .el-button--primary {
  background: linear-gradient(135deg, #40d5ff 0%, #2b7bff 100%) !important;
  border: none !important;
  box-shadow: 0 10px 30px rgba(43, 123, 255, 0.35);
}

.drill-table-page ::v-deep .el-button--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(43, 123, 255, 0.45);
}

.drill-table-page ::v-deep .el-button--default {
  background: rgba(255, 255, 255, 0.06) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  color: rgba(234, 247, 255, 0.9) !important;
}

.drill-table-page ::v-deep .el-button--default:hover {
  background: rgba(64, 213, 255, 0.12) !important;
  border-color: rgba(64, 213, 255, 0.3) !important;
}

/* ===== Element UI 表格主题 ===== */
.drill-table-page ::v-deep .el-table {
  background: transparent !important;
  color: #eaf7ff;
  font-size: 28px;
}

.drill-table-page ::v-deep .el-table::before {
  display: none;
}

.drill-table-page ::v-deep .el-table__header-wrapper {
  border-radius: 12px 12px 0 0;
  overflow: hidden;
}

.drill-table-page ::v-deep .el-table th {
  background: linear-gradient(135deg, rgba(64, 213, 255, 0.18) 0%, rgba(43, 123, 255, 0.12) 100%) !important;
  color: #40d5ff !important;
  font-weight: 600;
  font-size: 28px;
  height: 80px !important;
  padding: 0 !important;
  border-bottom: 2px solid rgba(64, 213, 255, 0.3) !important;
  letter-spacing: 1px;
}

.drill-table-page ::v-deep .el-table th > .cell {
  padding: 0 20px !important;
  line-height: 80px !important;
  height: 80px !important;
  display: flex !important;
  align-items: center !important;
}

.drill-table-page ::v-deep .el-table td > .cell {
  padding: 0 20px !important;
  line-height: 1.4 !important;
}

.drill-table-page ::v-deep .el-table tr {
  background: transparent !important;
  transition: all 0.3s ease;
}

.drill-table-page ::v-deep .el-table__body tr:hover > td {
  background: rgba(64, 213, 255, 0.08) !important;
}

.drill-table-page ::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td {
  background: rgba(64, 213, 255, 0.04) !important;
}

.drill-table-page ::v-deep .el-table td {
  height: 70px !important;
  padding: 0 !important;
  border-bottom: 1px solid rgba(64, 213, 255, 0.1) !important;
}

.drill-table-page ::v-deep .el-table th.is-leaf {
  border-bottom: 2px solid rgba(64, 213, 255, 0.3) !important;
}

.drill-table-page ::v-deep .el-table--border,
.drill-table-page ::v-deep .el-table--group {
  border: 1px solid rgba(64, 213, 255, 0.15) !important;
  border-radius: 16px;
  overflow: hidden;
}

.drill-table-page ::v-deep .el-table--border::after,
.drill-table-page ::v-deep .el-table--group::after {
  display: none;
}

.drill-table-page ::v-deep .el-table--border th,
.drill-table-page ::v-deep .el-table--border td {
  border-right: 1px solid rgba(64, 213, 255, 0.1) !important;
}

.drill-table-page ::v-deep .el-table__body-wrapper {
  background: rgba(8, 20, 40, 0.5);
}

/* ===== 表格索引列样式 ===== */
.drill-table-page ::v-deep .el-table td:first-child .cell {
  color: rgba(64, 213, 255, 0.8);
  font-weight: 600;
}

/* ===== 分页样式 ===== */
.drill-table-page ::v-deep .el-pagination {
  font-size: 26px;
  display: flex;
  align-items: center;
  width: 100%;
  white-space: nowrap;
}

.drill-table-page ::v-deep .el-pagination__rightwrapper {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.drill-table-page ::v-deep .el-pagination__total {
  color: rgba(191, 234, 255, 0.8) !important;
  font-weight: 500;
  font-size: 26px !important;
  margin-right: 16px !important;
  height: 50px;
  line-height: 50px;
}

.drill-table-page ::v-deep .el-pagination__jump {
  color: rgba(191, 234, 255, 0.8) !important;
  font-weight: 500;
  font-size: 26px !important;
  margin-left: 16px !important;
  display: flex;
  align-items: center;
}

.drill-table-page ::v-deep .el-pagination__sizes {
  margin: 0 16px !important;
}

.drill-table-page ::v-deep .el-pagination__sizes .el-input {
  width: 140px !important;
}

.drill-table-page ::v-deep .el-pagination__sizes .el-input__inner {
  height: 50px !important;
  line-height: 50px !important;
  font-size: 26px !important;
  border-radius: 10px !important;
  background: rgba(16, 32, 56, 0.8) !important;
  border: 1px solid rgba(64, 213, 255, 0.25) !important;
  color: #eaf7ff !important;
}

.drill-table-page ::v-deep .el-pagination__editor.el-input {
  width: 80px !important;
  margin: 0 8px !important;
}

.drill-table-page ::v-deep .el-pagination__editor.el-input .el-input__inner {
  height: 50px !important;
  line-height: 50px !important;
  font-size: 26px !important;
  border-radius: 10px !important;
  background: rgba(16, 32, 56, 0.8) !important;
  border: 1px solid rgba(64, 213, 255, 0.25) !important;
  color: #eaf7ff !important;
  text-align: center !important;
}

.drill-table-page ::v-deep .el-pagination.is-background .btn-prev,
.drill-table-page ::v-deep .el-pagination.is-background .btn-next {
  background: rgba(16, 32, 56, 0.8) !important;
  border: 1px solid rgba(64, 213, 255, 0.2) !important;
  color: rgba(234, 247, 255, 0.9) !important;
  border-radius: 10px !important;
  min-width: 50px !important;
  height: 50px !important;
  line-height: 50px !important;
  margin: 0 4px !important;
  transition: all 0.3s ease;
}

.drill-table-page ::v-deep .el-pagination.is-background .btn-prev:hover,
.drill-table-page ::v-deep .el-pagination.is-background .btn-next:hover {
  background: rgba(64, 213, 255, 0.15) !important;
  border-color: rgba(64, 213, 255, 0.4) !important;
}

.drill-table-page ::v-deep .el-pagination.is-background .btn-prev:disabled,
.drill-table-page ::v-deep .el-pagination.is-background .btn-next:disabled {
  background: rgba(16, 32, 56, 0.4) !important;
  color: rgba(234, 247, 255, 0.3) !important;
}

.drill-table-page ::v-deep .el-pagination.is-background .el-pager li {
  background: rgba(16, 32, 56, 0.8) !important;
  border: 1px solid rgba(64, 213, 255, 0.2) !important;
  color: rgba(234, 247, 255, 0.9) !important;
  border-radius: 10px !important;
  min-width: 50px !important;
  height: 50px !important;
  line-height: 50px !important;
  font-size: 26px !important;
  margin: 0 4px !important;
  transition: all 0.3s ease;
}

.drill-table-page ::v-deep .el-pagination.is-background .el-pager li:not(.disabled):hover {
  background: rgba(64, 213, 255, 0.15) !important;
  border-color: rgba(64, 213, 255, 0.4) !important;
  transform: translateY(-2px);
}

.drill-table-page ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  background: linear-gradient(135deg, #40d5ff 0%, #2b7bff 100%) !important;
  border-color: transparent !important;
  box-shadow: 0 8px 25px rgba(43, 123, 255, 0.35);
  color: #ffffff !important;
  font-weight: 600;
}

.drill-table-page ::v-deep .el-pagination button {
  font-size: 26px !important;
}

.drill-table-page ::v-deep .el-pagination button i {
  font-size: 22px !important;
}

/* ===== Loading 遮罩 ===== */
.drill-table-page ::v-deep .el-loading-mask {
  background: rgba(8, 20, 40, 0.85);
  backdrop-filter: blur(8px);
}

.drill-table-page ::v-deep .el-loading-spinner .circular {
  width: 60px;
  height: 60px;
}

.drill-table-page ::v-deep .el-loading-spinner .path {
  stroke: #40d5ff;
}

/* ===== 下拉框弹层样式 ===== */
.drill-table-page ::v-deep .el-select-dropdown {
  background: rgba(16, 32, 56, 0.98) !important;
  border: 1px solid rgba(64, 213, 255, 0.25) !important;
  border-radius: 12px !important;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(20px);
}

.drill-table-page ::v-deep .el-select-dropdown__item {
  font-size: 26px !important;
  color: rgba(234, 247, 255, 0.9) !important;
  padding: 12px 20px !important;
  height: auto !important;
  line-height: 1.5 !important;
}

.drill-table-page ::v-deep .el-select-dropdown__item:hover {
  background: rgba(64, 213, 255, 0.12) !important;
}

.drill-table-page ::v-deep .el-select-dropdown__item.selected {
  color: #40d5ff !important;
  font-weight: 600;
}

/* ===== 滚动条样式 ===== */
.drill-table-page ::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.drill-table-page ::v-deep .el-table__body-wrapper::-webkit-scrollbar-track {
  background: rgba(64, 213, 255, 0.05);
  border-radius: 5px;
}

.drill-table-page ::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, rgba(64, 213, 255, 0.3) 0%, rgba(43, 123, 255, 0.3) 100%);
  border-radius: 5px;
}

.drill-table-page ::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, rgba(64, 213, 255, 0.5) 0%, rgba(43, 123, 255, 0.5) 100%);
}
</style>

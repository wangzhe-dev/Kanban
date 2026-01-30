
import Vue from "vue";
import VueRouter from "vue-router";

// 数据融合
import PanelAssembly from "../views/DigitalFusion/PanelAssembly/index.vue";
import PreProcessingLine from "../views/DigitalFusion/PreProcessingLine/index.vue";
import ProfileCutting from "../views/DigitalFusion/ProfileCutting/index.vue";
import SmallAssembly from "../views/DigitalFusion/SmallAssembly/index.vue";
import SmartSteelPlateLibrary from "../views/DigitalFusion/SmartSteelPlateLibrary/index.vue";
import SteelPlateCutting from "../views/DigitalFusion/SteelPlateCutting/index.vue";
import StraightSection from "../views/DigitalFusion/StraightSection/index.vue";
import TProfile from "../views/DigitalFusion/TProfile/index.vue";

// 职能看板
import EnergyManagement from "../views/FunctionalKanban/EnergyManagement/index.vue";
import EquipmentManagement from "../views/FunctionalKanban/EquipmentManagement/index.vue";
import IntelligentControlCenter from "../views/FunctionalKanban/IntelligentControlCenter/index.vue";
import InventoryManagement from "../views/FunctionalKanban/InventoryManagement/index.vue";
import ProductionManagement from "../views/FunctionalKanban/ProductionManagement/index.vue";
import QualityManagement from "../views/FunctionalKanban/QualityManagement/index.vue";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/functional-kanban/inventory-management" },

  // 数据融合
  {
    path: "/digital-fusion/smart-steel-plate-library",
    name: "SmartSteelPlateLibrary",
    meta: { title: "数字融合 - 智能钢板库", keepAlive: false, requireAuth: true },
    component: SmartSteelPlateLibrary,
  },
  {
    path: "/digital-fusion/pre-processing-line",
    name: "PreProcessingLine",
    meta: { title: "数字融合 - 预处理产线", keepAlive: false, requireAuth: true },
    component: PreProcessingLine,
  },
  {
    path: "/digital-fusion/steel-plate-cutting",
    name: "SteelPlateCutting",
    meta: { title: "数字融合 - 钢板下料", keepAlive: false, requireAuth: true },
    component: SteelPlateCutting,
  },
  {
    path: "/digital-fusion/profile-cutting",
    name: "ProfileCutting",
    meta: { title: "数字融合 - 型材下料", keepAlive: false, requireAuth: true },
    component: ProfileCutting,
  },
  {
    path: "/digital-fusion/t-profile",
    name: "TProfile",
    meta: { title: "数字融合 - T型材", keepAlive: false, requireAuth: true },
    component: TProfile,
  },
  {
    path: "/digital-fusion/small-assembly",
    name: "SmallAssembly",
    meta: { title: "数字融合 - 小组立", keepAlive: false, requireAuth: true },
    component: SmallAssembly,
  },
  {
    path: "/digital-fusion/panel-assembly",
    name: "PanelAssembly",
    meta: { title: "数字融合 - 片体拼板", keepAlive: false, requireAuth: true },
    component: PanelAssembly,
  },
  {
    path: "/digital-fusion/straight-section",
    name: "StraightSection",
    meta: { title: "数字融合 - 平直分段", keepAlive: false, requireAuth: true },
    component: StraightSection,
  },

  // 职能看板
  {
    path: "/functional-kanban/production-management",
    name: "ProductionManagement",
    meta: { title: "职能看板 - 生产管理", keepAlive: false, requireAuth: true },
    component: ProductionManagement,
  },
  {
    path: "/functional-kanban/equipment-management",
    name: "EquipmentManagement",
    meta: { title: "职能看板 - 设备管理", keepAlive: false, requireAuth: true },
    component: EquipmentManagement,
  },
  {
    path: "/functional-kanban/quality-management",
    name: "QualityManagement",
    meta: { title: "职能看板 - 质量管理", keepAlive: false, requireAuth: true },
    component: QualityManagement,
  },
  {
    path: "/functional-kanban/energy-management",
    name: "EnergyManagement",
    meta: { title: "职能看板 - 能耗管理", keepAlive: false, requireAuth: true },
    component: EnergyManagement,
  },
  {
    path: "/functional-kanban/inventory-management",
    name: "InventoryManagement",
    meta: { title: "职能看板 - 库存管理", keepAlive: false, requireAuth: true },
    component: InventoryManagement,
  },
  {
    path: "/functional-kanban/intelligent-control-center",
    name: "IntelligentControlCenter",
    meta: { title: "职能看板 - 智控中心", keepAlive: false, requireAuth: true },
    component: IntelligentControlCenter,
  },
];

const router = new VueRouter({ routes });

export default router;

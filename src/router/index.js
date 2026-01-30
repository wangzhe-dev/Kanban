
import Vue from "vue";
import VueRouter from "vue-router";

// 数据融合（路由懒加载）
const SmartSteelPlateLibrary = () =>
  import(/* webpackChunkName: "digital-fusion" */ "../views/DigitalFusion/SmartSteelPlateLibrary/index.vue");
const PreProcessingLine = () =>
  import(/* webpackChunkName: "digital-fusion" */ "../views/DigitalFusion/PreProcessingLine/index.vue");
const SteelPlateCutting = () =>
  import(/* webpackChunkName: "digital-fusion" */ "../views/DigitalFusion/SteelPlateCutting/index.vue");
const ProfileCutting = () =>
  import(/* webpackChunkName: "digital-fusion" */ "../views/DigitalFusion/ProfileCutting/index.vue");
const TProfile = () =>
  import(/* webpackChunkName: "digital-fusion" */ "../views/DigitalFusion/TProfile/index.vue");
const SmallAssembly = () =>
  import(/* webpackChunkName: "digital-fusion" */ "../views/DigitalFusion/SmallAssembly/index.vue");
const PanelAssembly = () =>
  import(/* webpackChunkName: "digital-fusion" */ "../views/DigitalFusion/PanelAssembly/index.vue");
const StraightSection = () =>
  import(/* webpackChunkName: "digital-fusion" */ "../views/DigitalFusion/StraightSection/index.vue");

// 职能看板（路由懒加载）
const ProductionManagement = () =>
  import(/* webpackChunkName: "functional-kanban" */ "../views/FunctionalKanban/ProductionManagement/index.vue");
const EquipmentManagement = () =>
  import(/* webpackChunkName: "functional-kanban" */ "../views/FunctionalKanban/EquipmentManagement/index.vue");
const QualityManagement = () =>
  import(/* webpackChunkName: "functional-kanban" */ "../views/FunctionalKanban/QualityManagement/index.vue");
const EnergyManagement = () =>
  import(/* webpackChunkName: "functional-kanban" */ "../views/FunctionalKanban/EnergyManagement/index.vue");
const InventoryManagement = () =>
  import(/* webpackChunkName: "functional-kanban" */ "../views/FunctionalKanban/InventoryManagement/index.vue");
const IntelligentControlCenter = () =>
  import(/* webpackChunkName: "functional-kanban" */ "../views/FunctionalKanban/IntelligentControlCenter/index.vue");

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

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;

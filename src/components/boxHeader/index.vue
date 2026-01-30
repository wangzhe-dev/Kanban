<!--
 * @Author: zhaijs
 * @Date: 2021-12-23 10:01:46
 * @LastEditTime: 2024-06-25 13:05:09
 * @Description: 盒子标题组件
-->
<template>
  <div class="title" :style="styles">{{title}}</div>
</template>

<script>
export default {
props: {
    title: {
        type: String,
        default: ''
    },
    styles: {
        type: Object,
        default: () => ({})
    }
}
}
</script>

<style lang="scss" scoped>
.title {
    height: 18px;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 700;
    border-left: 4px solid #86bdff;
    padding-left: 12px;
    margin: 12px;
    margin-left: 15px;
    color: #86bdff;
}
</style>

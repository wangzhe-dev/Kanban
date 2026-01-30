<!--
 * @Author: zhaijinsong
 * @Date: 2024-04-11 13:50:55
 * @LastEditors: zhaijinsong
 * @LastEditTime: 2024-06-26 10:51:16
 * @Description: 
-->
<template>
  <el-empty :image="imgUrl" :image-size="200" :style="{height: height}"/>
</template>

<script>
export default {
  props: {
    className: {
      type: String
    },
    text: {
      type: String,
      default: '暂无数据'
    },
    href: {
      type: Object,
      default: () => {
        return {
          path: '',
          beforeText: '',
          hrefText: '',
          afterText: '',
          params: ''
        }
      }
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {

    }
  },
  computed: {
    imgUrl() {
      return require('../../assets/images/empty.jpg')
    }
  },
  created() {

  },
  methods: {
    goToUrl(href) {
      const { path } = href
      this.$router.push({ path })
    }
  }
}
</script>
<style scoped lang="scss">
.el-empty {
  padding: 20px 0!important;
}


.primary-color {
  color: rgba(0, 0, 0, 0.25);
}
::v-deep .el-empty__description {
  p {
    color: #fff;
    font-size: 25px;
  }
}
.info-color {
  cursor: pointer;
  color: #1890ff;
  //text-decoration: underline;
}
</style>

<template>
  <div class="baseHeader">
    <div class="headerTitle">{{ title }}</div>
    <div class="headerSubTitle" v-if="subtitle">{{ subtitle }}</div>
    <div class="showTime">
      <div v-show="show">{{ date | formatDttmmYMD }}</div>
    </div>
  </div>
</template>

<script>
import moment from "moment"
const TITLE = process.env.VUE_APP_TITLE
export default {
  props: {
    title: {
      type: String,
      default: TITLE || "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      date: moment(),
      timer: null,
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.date = moment()
    }, 1000)
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer)
  },
}
</script>

<style lang="scss" scoped>
.baseHeader {
  width: 100%;
  text-align: center;
  flex-shrink: 0;
  .headerTitle {
    font-weight: 900;
    font-size: 40px;
    margin-top: 6px;
    //line-height   : 123%;
    letter-spacing: 4.43605px;
    color: #86bdff;
  }
  .headerSubTitle{
    font-weight: 900;
    font-size: 24px;
    margin-top: 6px;
    //line-height   : 123%;
    letter-spacing: 4.43605px;
    color: #86bdff;
  }
  .showTime {
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    width: 80%;
    margin: 0 auto;
    height: 80px;
    line-height: 80px;
    background: url("../../assets/images/sheaderbg.png") no-repeat center;
    background-size: 100% auto;
    margin-top: -6px;
  }
}
</style>

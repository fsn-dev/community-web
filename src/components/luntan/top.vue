<template>
<div class="top">
    <div class="m" @click="toPage('/luntan/moudle')">
        <img :src="globalImgPath.bankuaitubiao" class="bankuaitubiao" v-if="routePath.indexOf('moudle') != -1">
        <img :src="globalImgPath.bankuaitubiao2" class="bankuaitubiao" v-if="routePath.indexOf('moudle') == -1">
        <span class="txt" :class="{'curText': routePath.indexOf('moudle') != -1}">模块</span>
    </div>
    <div class="m" @click="toPage('/luntan/newest')">
        <img :src="globalImgPath.zuixin3" class="zuixin" v-if="routePath.indexOf('newest') != -1">
        <img :src="globalImgPath.zuixin" class="zuixin" v-if="routePath.indexOf('newest') == -1">
        <span class="txt" :class="{'curText': routePath.indexOf('newest') != -1}">最新</span>
    </div>
    <div class="m" @click="toPage('/luntan/hot')">
        <img :src="globalImgPath.zuixin_2" class="zuixin_1" v-if="routePath.indexOf('hot') != -1">
        <img :src="globalImgPath.zuixin_1" class="zuixin_1" v-if="routePath.indexOf('hot') == -1">
        <span class="txt" :class="{'curText': routePath.indexOf('hot') != -1}">热门</span>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      routePath: ""
    };
  },
  methods: {
    toPage(url) {
      this.$router.push(url);
    }
  },
  mounted() {
    this.routePath = this.$route.path;
  }
};
</script>

<style lang="less" scoped>
.top {
  height: 0.6rem;
  line-height: 0.6rem;
  background: rgba(224, 233, 255, 1);
  font-size: 0.2rem;
  font-weight: 400;
  color: rgba(128, 128, 128, 1);
  padding: 0px 0.2rem;
  .m {
    display: inline-block;
    cursor: pointer;
  }
  .txt {
    margin-left: 0.05rem;
    margin-right: 0.5rem;
  }

  .curText {
    color: rgba(49, 143, 232, 1);
  }

  .bankuaitubiao {
    width: 0.17rem;
    height: 0.17rem;
  }

  .zuixin {
    width: 0.14rem;
    height: 0.18rem;
  }

  .zuixin_1 {
    width: 0.16rem;
    height: 0.18rem;
  }
}
@media only screen and (min-width: 320px) and (max-width: 768px) {
  .top {
    font-size: 0.36rem;
    height: 1rem;
    line-height: 1rem;
  }
}
</style>

<template>
<div class="menu">
    <div class="logo">
        <img :src="globalImgPath.logo_white" @click="toPage('/')">
    </div>
    <div class="list">
        <div class="item">
            <div class="title">
                <img :src="globalImgPath.menu" class="icon">
                <span class="txt">文章管理</span>
                <img :src="globalImgPath.manageSelect" class="arrow">
            </div>
            <div class="group">
                <div class="el" :class="{'curEl': name == 'skillList'}" @click="toPage('/manage/skillList')">文章列表</div>
                <div class="el" :class="{'curEl': name == 'newSkill'}" @click="toPage('/manage/newSkill')">发布文章</div>
            </div>
        </div>
        <div class="item" style="margin-top: 0.5rem;">
            <div class="title">
                <img :src="globalImgPath.menu" class="icon">
                <span class="txt">文档管理</span>
                <img :src="globalImgPath.manageSelect" class="arrow">
            </div>
            <div class="group">
                <div class="el" :class="{'curEl': name == 'docList'}" @click="toPage('/manage/docList')">文档列表</div>
                <div class="el" :class="{'curEl': name == 'newDoc'}" @click="toPage('/manage/newDoc')">发布文档</div>
            </div>
        </div>
        <div class="item" style="margin-top: 0.5rem;">
            <div class="title">
                <img :src="globalImgPath.menu" class="icon">
                <span class="txt">悬赏任务</span>
                <img :src="globalImgPath.manageSelect" class="arrow">
            </div>
            <div class="group">
                <div class="el" :class="{'curEl': name == 'createTask'}" @click="toPage('/manage/createTask')">创建任务</div>
                <div class="el" :class="{'curEl': name == 'taskList' || name == 'issueList'}" @click="toPage('/manage/taskList')">任务列表</div>
                <!-- <div class="el" :class="{'curEl': name == 'issueList'}" @click="toPage('/manage/issueList')">方案列表</div> -->
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    toPage(url) {
      this.$router.push(url);
    }
  },
  created() {
    this.name = this.$route.name;
  }
};
</script>


<style lang="less" scoped>
.menu {
  background: #001529;
  color: #fff;
  width: 2.56rem;
  height: 100vh;
  .logo {
    text-align: center;
    height: 0.64rem;
    line-height: 0.64rem;
    cursor: pointer;
    img {
      width: 1.32rem;
    }
  }
  .list {
    .item {
      color: #fff;
      .title {
        position: relative;
        padding: 0.1rem 0.2rem;
        cursor: pointer;
        .icon {
          width: 0.14rem;
          height: 0.14rem;
        }
        .txt {
          font-size: 0.14rem;
          margin-left: 0.1rem;
        }
        .arrow {
          width: 0.16rem;
          height: 0.16rem;
          position: absolute;
          right: 0.2rem;
          top: 0px;
          bottom: 0px;
          margin: auto;
        }
        &:hover {
          background: #1890ff;
        }
      }
      .group {
        .el {
          cursor: pointer;
          font-size: 0.14rem;
          padding-left: calc(0.14rem + 0.1rem + 0.2rem);
          padding-top: 0.1rem;
          padding-bottom: 0.1rem;
          &:hover {
            background: #75b3ee;
          }
        }
        .curEl {
          background: #1890ff;
        }
      }
    }
  }
}
</style>

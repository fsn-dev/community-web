<template>
	    <div class="left">
            <div class="avatar" @click="toPage('/personal')">
                <img :src="$store.state.headPortrait" v-if="$store.state.headPortrait">
                <div class="txt">{{$store.state.userName}}</div>
            </div>
            <div class="list">
                <div class="item" :class="{'curMenu': routerPath.indexOf('info') != -1}" @click="toPage('/personal/info')">个人资料</div>
                <div class="item" :class="{'curMenu': routerPath.indexOf('topic') != -1}" @click="toPage('/personal/topic')">我的主题</div>
                <div class="item" :class="{'curMenu': routerPath.indexOf('task') != -1}" @click="toPage('/personal/task')">我的任务</div>
            </div>
        </div>
</template>

<script>
export default {
  data() {
    return {
      routerPath: ""
    };
  },
  methods: {
    toPage(url) {
      this.$router.push(url);
    },
    getInfo() {
      this.$http.get("/authentications/info").then(response => {
        if (response.data.code == 0) {
          // this.headPortrait = response.data.data.headPortrait;
          // this.username = response.data.data.username;
        } else {
          this.$Message.error(response.data.message);
        }
      });
    }
  },
  created() {
    this.routerPath = this.$route.path;
    this.$store.state.headPortrait = window.sessionStorage.getItem(
      "headPortrait"
    );
    this.$store.state.userName = window.sessionStorage.getItem("userName");
  }
};
</script>

<style lang="less" scoped>
.left {
  width: 2rem;
  background: #fff;

  .avatar {
    background: #1e85e6;
    width: 100%;
    height: 2rem;
    text-align: center;

    img {
      width: 0.9rem;
      height: 0.9rem;
      border-radius: 100%;
      margin-top: 0.3rem;
    }

    .txt {
      text-align: center;
      font-size: 0.16rem;
      margin-top: 0.2rem;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
  }

  .list {
    background: #fff;
    border-top: 0.2rem solid rgba(250, 250, 250, 1);

    .item {
      text-align: center;
      font-size: 0.16rem;
      padding: 0.2rem;
      font-weight: 400;
      color: rgba(77, 77, 77, 1);
      margin-top: 0.2rem;
      cursor: pointer;
    }
    .curMenu {
      background: #b5cde4;
      color: #1e85e6;
      font-weight: bold;
    }
  }
}
@media only screen and (min-width: 320px) and (max-width: 768px) {
  .left {
    width: 4rem;

    .avatar {
      height: 3rem;
      img {
        width: 1.2rem;
        height: 1.2rem;
      }

      .txt {
        font-size: 0.36rem;
      }
    }

    .list {
      .item {
        font-size: 0.36rem;
      }
    }
  }
}
</style>

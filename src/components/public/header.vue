<template>
<div class="header" :class="{'indexHeader': routerPath == '/'}">
    <div class="panel">
        <img :src="globalImgPath.logo" class="logo"  @click="toPage('/')">
        <div class="menu">
            <span @click="toPage('/')">首页</span>
            <span @click="toPage('/luntan/moudle')" :class="{'curMenu': routerPath.indexOf('luntan') != -1}">论坛</span>
            <span @click="toPage('/reward')" :class="{'curMenu': routerPath.indexOf('reward') != -1}">悬赏任务</span>
            <span @click="toPage('/skill/list')" :class="{'curMenu': routerPath.indexOf('skill') != -1}">技术文章</span>
            <span @click="toPage('/doc/list')" :class="{'curMenu': routerPath.indexOf('doc') != -1}">开发文档</span>
        </div>
        <div class="avatar" v-if="$store.state.loginStatus * 1" @mouseenter="isShowManage = 1" @mouseleave="isShowManage = 0">
            <img :src="$store.state.headPortrait" v-if="$store.state.headPortrait" @click="toPage('/personal')">
            <div class="manage" v-if="isShowManage && state" @click="toPage('/manage/skillList')">后台管理</div>
        </div>
        <div class="login" v-if="!$store.state.loginStatus * 1">
            <span @click="showLogin()">登陆</span>
            <span>|</span>
            <span @click="showRegister()">注册</span>
        </div>
        <div class="lang" @click="exitLogin()" v-if="$store.state.loginStatus * 1">
            <span>退出</span>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      state: false,
      routerPath: "",
      isShowManage: 0
    };
  },
  methods: {
    showLogin() {
      this.$router.push("/login");
    },
    showRegister() {
      this.$router.push("/register");
    },
    exitLogin() {
      this.$http.delete("/authentications").then(response => {
        if (response.data.code == 0) {
          this.$Message.success("退出登录成功");
          window.sessionStorage.setItem(
            "authentication",
            "76fcd84c-818f-4c60-9553-fb91c5969ee9"
          );
          this.$http.defaults.headers.common["authentication"] =
            "76fcd84c-818f-4c60-9553-fb91c5969ee9";
          window.sessionStorage.setItem("headPortrait", "");
          window.sessionStorage.setItem("loginStatus", 0);
          this.$store.state.loginStatus = 0;
          this.$store.state.headPortrait = "";
        } else {
          this.$Message.error(response.data.message);
        }
      });
    },
    toPage(url) {
      this.$router.push(url);
    },
    getButton() {
      this.$http
        .get("/integral/button", {
          params: {
            id: this.id,
            type: 0
          }
        })
        .then(response => {
          if (response.data.code == 0) {
            this.state = response.data.data.state;
          } else {
            this.$Message.error(response.data.message);
          }
        });
    }
  },
  created() {
    this.$store.state.loginStatus =
      window.sessionStorage.getItem("loginStatus") * 1;
    this.$store.state.headPortrait = window.sessionStorage.getItem(
      "headPortrait"
    );
    this.routerPath = this.$route.path;
    this.getButton();
  }
};
</script>

<style lang="less" scoped>
.header {
  box-shadow: 1px 2px 32px 0px rgba(69, 119, 202, 0.2);
  background: #fff;
  position: relative;
  z-index: 10;

  .panel {
    width: 11.95rem;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.11rem;
    line-height: 1.11rem;
    flex: 1 1 auto;

    .logo {
      width: 1.64rem;
      height: 0.42rem;
      cursor: pointer;
    }

    .menu {
      font-size: 0px;
      margin-left: 2rem;

      span {
        font-size: 0.2rem;
        font-weight: 400;
        color: #4d4d4d;
        margin-left: 0.4rem;
        white-space: nowrap;
        cursor: pointer;
        display: inline-block;
      }

      span:nth-child(1) {
        margin-left: 0px;
      }

      .curMenu {
        font-size: 0.2rem;
        font-weight: bold;
        color: rgba(30, 133, 230, 1);
        border-bottom: 2px solid rgba(30, 133, 230, 1);
      }
    }

    .avatar {
      width: 0.4rem;
      margin-left: 0.5rem;
      font-size: 0px;
      cursor: pointer;
      position: relative;

      img {
        height: 0.4rem;
        width: 100%;
        border-radius: 100%;
      }

      .manage {
        background: #fff;
        box-shadow: 1px 2px 32px 0px rgba(21, 99, 224, 0.2);
        text-align: center;
        font-size: 0.16rem;
        color: #212121;
        width: 2rem;
        height: 0.4rem;
        line-height: 0.4rem;
        position: absolute;
        bottom: -0.2rem;
        left: -0.6rem;
        z-index: 99;

        &:hover {
          background: #f5f5f5;
        }
      }
    }

    .login {
      margin-left: 0.1rem;
      color: #4d4d4d;
      font-size: 0px;

      span {
        white-space: nowrap;
        margin-left: 0.1rem;
        font-size: 0.2rem;
        cursor: pointer;
      }

      span:nth-child(1) {
        margin-left: 0px;
      }
    }

    .lang {
      margin-left: 0.3rem;
      font-size: 0.2rem;
      color: #4d4d4d;

      span {
        white-space: nowrap;
        margin-left: 0.1rem;
        cursor: pointer;
      }

      span:nth-child(1) {
        margin-left: 0px;
      }
    }
  }
}

.indexHeader {
  background: transparent;
  box-shadow: none;

  span {
    color: #fff !important;
  }
}

@media only screen and (min-width: 320px) and (max-width: 768px) {
  .header {
    .panel {
      width: 90%;
      height: 1.5rem;
      line-height: 1.5rem;
      .menu {
        margin-left: 4rem;
        span {
          font-size: 0.36rem;
        }
        .curMenu {
          font-size: 0.36rem;
        }
      }
      .login {
        span {
          font-size: 0.36rem;
        }
      }

      .avatar {
        width: 0.6rem;

        img {
          height: 0.6rem;
        }

        .manage {
          font-size: 0.3rem;
        }
      }

      .lang {
        font-size: 0.36rem;
      }
    }
  }
}
</style>

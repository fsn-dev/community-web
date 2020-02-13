<template>
  <div class="login">
    <img :src="globalImgPath.logo" class="logo">
    <div class="panel">
      <div class="info">
        <img :src="globalImgPath.login" class="pic">
      </div>
      <div class="form">
        <div class="content">
          <div class="title">登录</div>
          <div class="control">
            <div class="item">
              <input type="text" placeholder="用户名" class="input" v-model="username"/>
            </div>
            <div class="item">
              <input type="password" placeholder="密码" class="input" v-model="password"/>
            </div>
            <!-- <div class="button" @click="login()">登录</div> -->
            <div class="button" style="background:#ccc;">登录</div>
          </div>
          <div class="other">
            <div class="register" @click="toPage('/register')">免费注册</div>
            <div class="forget" @click="toPage('/forgetPassword')">忘记密码</div>
          </div>
          <div class="link">
            <div class="splice"></div>
            <div class="github" id="github" @click="githubLogin()">
              <img :src="globalImgPath.github" class="icon">
              <div class="txt">GitHub登录</div>
            </div>
            <div class="splice"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      emailCode: null
    };
  },
  methods: {
    toPage(url) {
      this.$router.push(url);
    },
    login() {
      this.$http
        .get("/authentications", {
          params: {
            username: this.username,
            password: this.password
          }
        })
        .then(response => {
          if (response.data.code == 0) {
            window.sessionStorage.setItem(
              "authentication",
              response.data.data.token
            );
            this.$http.defaults.headers.common[
              "authentication"
            ] = sessionStorage.getItem("authentication");
            window.sessionStorage.setItem(
              "headPortrait",
              response.data.data.headPortrait
            );
            window.sessionStorage.setItem("userName", this.username);
            window.sessionStorage.setItem("loginStatus", 1);
            this.$router.go(-1);
          } else {
            this.$Message.error(response.data.message);
          }
        });
    },
    githubLogin() {
      const client_id = "1b537f502b9e647a9f82";
      const authorize_uri = "https://github.com/login/oauth/authorize";
      const redirect_uri = "http://www.yunzhongyan.xyz:8688/oauth/redirect";
      window.location.href = `${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}`;
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.login {
  width: 100vw;
  height: 100vh;
  background: #fafafa;
  position: relative;
  .logo {
    position: absolute;
    width: 1.16rem;
    height: 0.29rem;
    top: 0.31rem;
    left: 0.42rem;
  }
  .panel {
    width: 14.38rem;
    height: 8.17rem;
    background: #fff;
    margin: auto;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0px;
    border-radius: 0.1rem;
    overflow: hidden;
    box-shadow: 0px 0px 57px 0px rgba(64, 136, 255, 0.19);
    .info {
      width: 6.67rem;
      height: 8.17rem;
      .pic {
        width: 6.67rem;
        height: 8.17rem;
      }
    }
    .form {
      width: 7.71rem;
      height: 8.17rem;
      .content {
        width: 5rem;
        margin: auto;
        .title {
          font-size: 0.54rem;
          font-weight: 400;
          color: rgba(30, 133, 230, 1);
          text-align: center;
          margin-top: 1.02rem;
        }
        .control {
          .item {
            .input {
              width: 100%;
              font-size: 0.18rem;
              font-weight: 400;
              color: rgba(179, 179, 179, 1);
              border: 0px;
              outline: none;
              padding: 0.1rem;
              border-bottom: 1px solid rgba(128, 128, 128, 1);
              margin-top: 0.6rem;
            }
          }
          .button {
            width: 100%;
            height: 0.6rem;
            background: rgba(30, 133, 230, 1);
            border-radius: 0.04rem;
            margin: auto;
            font-size: 0.18rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            margin-top: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
            cursor: pointer;
          }
        }
        .other {
          display: flex;
          justify-content: space-between;
          font-size: 0px;
          align-items: center;
          margin-top: 0.4rem;
          .register {
            font-size: 0.2rem;
            font-weight: 400;
            color: rgba(30, 133, 230, 1);
            cursor: pointer;
          }
          .forget {
            font-size: 0.2rem;
            cursor: pointer;
            font-weight: 400;
            color: rgba(155, 155, 155, 1);
          }
        }
        .link {
          display: flex;
          justify-content: space-between;
          font-size: 0px;
          align-items: center;
          margin-top: 0.6rem;
          .splice {
            width: 1.95rem;
            height: 1px;
            background: rgba(128, 128, 128, 1);
          }
          .github {
            text-align: center;
            .icon {
              width: 0.58rem;
              height: 0.57rem;
            }
            .txt {
              font-size: 0.14rem;
              font-weight: 400;
              color: rgba(128, 128, 128, 1);
              margin-top: 0.1rem;
            }
          }
        }
      }
    }
  }
}
</style>

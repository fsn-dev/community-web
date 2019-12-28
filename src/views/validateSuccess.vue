<template>
  <div class="validateEmail">
    <img :src="globalImgPath.logo" class="logo">
    <div class="panel">
    	<img :src="globalImgPath.success" class="wait">
		<div class="title">邮箱验证成功</div>
		<div class="content">
			<span class="txt">欢迎加入！接下来，您可以使用此邮箱登录Fusion开源社区。</span>
		</div>
		<div class="button">
			<div class="btn"  @click="loginRight()">立即登录</div>
			<div class="btn back" @click="toPage('/')">返回首页</div>
		</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mailbox: ""
    };
  },
  methods: {
    toPage(url) {
      this.$router.push(url);
    },
    confirmEmail() {
      this.$http
        .post(
          "/authentications/confirmEmail",
          {
            emailCode: this.emailCode
          },
          { emulateJSON: true }
        )
        .then(response => {
          if (response.data.code == 0) {
            this.$Message.success(response.data.message);
          } else {
            this.$Message.error(response.data.message);
          }
        });
    },
    loginRight() {
      this.$http
        .post(
          "/authentications/confirmEmail/login",
          {
            emailCode: this.emailCode
          },
          { emulateJSON: true }
        )
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
            window.sessionStorage.setItem("loginStatus", 1);
            this.$router.push("/");
          } else {
            this.$Message.error(response.data.message);
          }
        });
    }
  },
  mounted() {
    this.emailCode = this.$route.query.emailCode;
    this.confirmEmail();
  }
};
</script>

<style scoped lang="less">
.validateEmail {
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
    text-align: center;
    width: 7.74rem;
    margin: auto;
    .wait {
      width: 1.33rem;
      height: 1.33rem;
      margin-top: 1.64rem;
    }
    .title {
      font-size: 0.24rem;
      font-weight: bold;
      color: rgba(102, 102, 102, 1);
      margin-top: 0.37rem;
    }
    .content {
      font-size: 0.26rem;
      margin-top: 0.29rem;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    .button {
      font-size: 0px;
      .btn {
        width: 1.54rem;
        height: 0.6rem;
        border-radius: 0.04rem;
        margin: auto;
        font-size: 0.16rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-top: 1rem;
        line-height: 0.6rem;
        text-align: center;
        background: rgba(30, 133, 230, 1);
        cursor: pointer;
        display: inline-block;
      }
      .back {
        border: 1px solid rgba(150, 150, 150, 1);
        border-radius: 0.04rem;
        background: transparent;
        color: rgba(141, 141, 141, 1);
        margin-left: 1rem;
      }
    }
  }
}
</style>

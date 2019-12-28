<template>
  <div class="validateEmail">
    <img :src="globalImgPath.logo" class="logo">
    <div class="panel">
    	<img :src="globalImgPath.wait" class="wait">
		<div class="title">等待邮箱验证...</div>
		<div class="content">
			<span class="txt">我们已经向您的邮箱</span>
			<span class="email">{{mailbox}}</span>
			<span class="txt">发送了一封验证邮件，请通过点击邮件中的链接，如果没有收到邮件，请查看垃圾箱或重新发送验证邮件，在没有完成邮件验证前，您无法进行大部分操作。</span>
		</div>
		<div class="button" v-if="!canSend">重新发送验证邮件&nbsp;&nbsp;&nbsp;&nbsp;({{time}}秒后重试)</div>
		<div class="button canSend" v-if="canSend" @click="reSendEmail()">重新发送验证邮件</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mailbox: "",
      userId: null,
      canSend: 0,
      time: 60,
      type: ""
    };
  },
  methods: {
    reSendEmail() {
      this.canSend = 0;
      this.setTimer();
      if (this.type == "register") {
        this.$http
          .post(
            "/authentications/registerEmail",
            {
              userId: this.userId
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
      } else {
        this.$http
          .post(
            "/authentications/forgotPassword/email",
            {
              mailbox: this.mailbox
            },
            { emulateJSON: true }
          )
          .then(response => {
            if (response.data.code == 0) {
              this.$Message.success(response.data.message);
            } else {
              this.$Message.success(response.data.message);
            }
          });
      }
    },
    setTimer() {
      let timer = setInterval(() => {
        --this.time;
        if (this.time < 1) {
          clearInterval(timer);
          this.canSend = 1;
          this.time = 60;
        }
      }, 1000);
    }
  },
  mounted() {
    this.userId = this.$route.params.userId;
    this.mailbox = this.$route.params.mailbox;
    this.type = this.$route.params.type;
    this.setTimer();
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
      font-size: 0.16rem;
      margin-top: 0.29rem;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      .email {
        color: #1e85e6;
      }
    }
    .button {
      width: 3.18rem;
      height: 0.6rem;
      border-radius: 0.04rem;
      margin: auto;
      font-size: 0.16rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-top: 0.6rem;
      line-height: 0.6rem;
      text-align: center;
      background: #999;
    }
    .canSend {
      background: rgba(30, 133, 230, 1);
      cursor: pointer;
    }
  }
}
</style>

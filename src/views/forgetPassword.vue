<template>
  <div class="forgetPassword">
    <img :src="globalImgPath.logo" class="logo">
    <div class="panel">
      <div class="info">
        <img :src="globalImgPath.forget" class="pic">
      </div>
      <div class="form">
        <div class="content">
          <div class="title">忘记密码</div>
          <div class="control">
            <div class="item">
              <input type="text" placeholder="邮箱" class="input" v-model="mailbox"/>
            </div>
            <div class="button" @click="validateEmail()">发送验证邮件</div>
          </div>
          <div class="other">
            <span class="login" @click="toPage('/')">去登陆</span>
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
      mailbox: ""
    };
  },
  methods: {
    toPage(url) {
      this.$router.push(url);
    },
    validateEmail() {
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
            this.$router.push({
              name: "validateEmail",
              params: {
                mailbox: this.mailbox,
                type: "forgetPassword"
              }
            });
          } else {
            this.$Message.success(response.data.message);
          }
        });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.forgetPassword {
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
          margin-top: 2.07rem;
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
              margin-top: 0.8rem;
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
            margin-top: 1rem;
            line-height: 0.6rem;
            text-align: center;
            cursor: pointer;
          }
        }
        .other {
          text-align: center;
          margin-top: 0.4rem;
          .login {
            cursor: pointer;
            font-size: 0.2rem;
            font-weight: 400;
            color: rgba(30, 133, 230, 1);
            margin: 0px 0.1rem;
          }
        }
      }
    }
  }
}
</style>

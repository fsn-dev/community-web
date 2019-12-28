<template>
  <div class="resetPassword">
    <img :src="globalImgPath.logo" class="logo">
    <div class="panel">
      <div class="form">
		<div class="title">设置新密码</div>
		<div class="control">
		<div class="item">
			<input type="password" placeholder="请输入新密码，6-16个字符" class="input" v-model="password"  @blur="validatePassword()"/>
      <div class="error" v-if="!isPassword">密码格式不正确哦</div>
		</div>
		<div class="item">
			<input type="password" placeholder="请再次输入密码" class="input" v-model="rePassword"  @blur="confirmPassword()"/>
      <div class="error" v-if="!valiPassword">两次密码输入不一致</div>
		</div>
		<div class="button" @click="confirmReset()">确定</div>
		</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emailCode: null,
      password: "",
      rePassword: "",
      isPassword: 1,
      valiPassword: 1
    };
  },
  methods: {
    validatePassword() {
      let len = this.password.length;
      if (len < 6 || len > 16) {
        this.isPassword = 0;
      } else {
        this.isPassword = 1;
      }
    },
    confirmPassword() {
      if (this.rePassword == this.password) {
        this.valiPassword = 1;
      } else {
        this.valiPassword = 0;
      }
    },
    confirmReset() {
      this.validatePassword();
      this.confirmPassword();
      if (this.isPassword && this.valiPassword && this.emailCode) {
        this.$http
          .post(
            "/authentications/forgotPassword",
            {
              emailCode: this.emailCode,
              password: this.password
            },
            { emulateJSON: true }
          )
          .then(response => {
            if (response.data.code == 0) {
              this.$Message.success(response.data.message);
              this.$router.push("/login");
            } else {
              this.$Message.error(response.data.message);
            }
          });
      }
    }
  },
  mounted() {
    this.emailCode = this.$route.query.emailCode;
  }
};
</script>

<style scoped lang="less">
.resetPassword {
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
    width: 7.73rem;
    height: 7.53rem;
    background: #fff;
    margin: auto;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    border-radius: 0.1rem;
    overflow: hidden;
    box-shadow: 0px 0px 57px 0px rgba(64, 136, 255, 0.19);
    .form {
      width: 5rem;
      margin: auto;
      .title {
        font-size: 0.3rem;
        font-weight: 400;
        color: rgba(30, 133, 230, 1);
        text-align: center;
        margin-top: 1.22rem;
      }
      .control {
        .item {
          position: relative;
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
          .error {
            position: absolute;
            right: 0px;
            margin-top: 0.1rem;
            text-align: right;
            font-size: 0.12rem;
            font-weight: 400;
            color: rgba(255, 77, 77, 1);
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
    }
  }
}
</style>

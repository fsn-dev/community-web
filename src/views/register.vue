<template>
<div class="register">
    <img :src="globalImgPath.logo" class="logo">
    <div class="panel">
        <div class="info">
            <img :src="globalImgPath.register" class="pic">
        </div>
        <div class="form">
            <div class="content">
                <div class="title">注册</div>
                <div class="control">
                    <div class="item">
                        <input type="text" placeholder="请输入用户名，后续不可更改" class="input" v-model="username" @blur="validateHasUser()"/>
                    </div>
                    <div class="item">
                        <input type="text" placeholder="请输入常用邮箱" class="input" v-model="mailbox" @blur="validateEmail()"/>
                        <div class="error" v-if="!isEmail">邮箱格式不正确哦</div>
                    </div>
                    <div class="item">
                        <input type="password" placeholder="请输入密码，6-16个字符" class="input" v-model="password"  @blur="validatePassword()"/>
                        <div class="error" v-if="!isPassword">密码格式不正确哦</div>
                    </div>
                    <div class="item">
                        <input type="password" placeholder="请再次输入密码" class="input" v-model="rePassword"  @blur="confirmPassword()"/>
                        <div class="error" v-if="!valiPassword">两次密码输入不一致</div>
                    </div>
                    <div class="button" @click="register()">注册</div>
                </div>
                <div class="other">
                    <span class="txt">已有账号</span>
                    <span class="login" @click="toPage('/login')">登录</span>
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
      mailbox: "",
      password: "",
      rePassword: "",
      isEmail: 1,
      isPassword: 1,
      valiPassword: 1,
      hasUser: 0,
      hasEmail: 0
    };
  },
  methods: {
    toPage(url) {
      this.$router.push(url);
    },
    validateHasUser() {
      this.$http
        .get("/authentications/duplicateCheck", {
          params: {
            value: this.username,
            type: 1 //1：查询用户名是否重复 2：查询邮箱是否注册
          }
        })
        .then(response => {
          if (response.data.code == 0) {
            this.hasUser = 0;
          } else {
            this.$Message.error(response.data.message);
          }
        });
    },
    validateHasEmail() {
      this.$http
        .get("/authentications/duplicateCheck", {
          params: {
            value: this.mailbox,
            type: 2 //1：查询用户名是否重复 2：查询邮箱是否注册
          }
        })
        .then(response => {
          if (response.data.code == 0) {
            this.hasEmail = 0;
          } else {
            this.$Message.error(response.data.message);
          }
        });
    },
    validateFormatEmail() {
      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (reg.test(this.mailbox)) {
        this.isEmail = 1;
      } else {
        this.isEmail = 0;
      }
    },
    validateEmail() {
      this.validateHasEmail();
      this.validateFormatEmail();
    },
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
    register() {
      this.validateEmail();
      this.validatePassword();
      this.confirmPassword();
      this.validateHasUser();
      setTimeout(() => {
        if (
          this.isEmail &&
          this.isPassword &&
          this.valiPassword &&
          !this.hasUser &&
          !this.hasEmail
        ) {
          this.$http
            .post(
              "/authentications",
              {
                username: this.username,
                mailbox: this.mailbox,
                password: this.password
              },
              { emulateJSON: true }
            )
            .then(response => {
              if (response.data.code == 0) {
                this.$router.push({
                  name: "validateEmail",
                  params: {
                    mailbox: this.mailbox,
                    userId: response.data.data.id,
                    type: "register"
                  }
                });
              } else {
                this.$Message.error(response.data.message);
              }
            });
        }
      }, 500);
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.register {
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
          margin-top: 0.4rem;
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
              margin-top: 0.6rem;
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
            margin-top: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
            cursor: pointer;
          }
        }

        .other {
          text-align: center;
          margin-top: 0.4rem;

          .txt {
            font-size: 0.2rem;
            font-weight: 400;
            color: rgba(155, 155, 155, 1);
          }

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

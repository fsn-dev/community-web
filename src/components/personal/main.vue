<template>
<div class="main">
    <header-view></header-view>
    <div class="personal">
        <menu-view></menu-view>
        <div class="right">
            <div class="line">
                <span>当前总积分：</span>
                <span class="num">{{detail.intergral}}</span>
            </div>
            <div class="sign" style="background: #1e85e6" v-if="state" @click="getSignIn()">签到+5</div>
            <div class="sign" style="background:#666666" v-if="!state">你今天已经签过到啦</div>

            <div class="label">如何获取积分？</div>
            <div class="info" v-for="(item,index) in detail.userIntergral2Vos" :key="index">
                <div class="detail">
                    <div class="intr">
                        <div class="el" v-for="(el,elindex) in item.values" :key="elindex">{{el}}</div>
                    </div>
                    <div class="act" v-if="item.type == '去发帖'" @click="toPage('/luntan/moudle')">{{item.type}}</div>
                    <div class="act" v-if="item.type == '去看看'" @click="toPage('/reward')">{{item.type}}</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import headerView from "@/components/public/header";
import menuView from "@/components/personal/menu";
export default {
  components: {
    headerView,
    menuView
  },
  data() {
    return {
      state: false,
      detail: {
        intergral: 0,
        userIntergral2Vos: []
      }
    };
  },
  methods: {
    toPage(url) {
      this.$router.push(url);
    },
    getIntegral() {
      this.$http.get("/integral").then(response => {
        if (response.data.code == 0) {
          this.detail = response.data.data;
        } else {
          this.$Message.error(response.data.message);
        }
      });
    },
    getSignIn() {
      this.$http.get("/integral/signIn").then(response => {
        if (response.data.code == 0) {
          this.state = false;
          this.$Message.success("签到成功");
        } else {
          this.$Message.error(response.data.message);
        }
      });
    },
    getButton() {
      this.$http
        .get("/integral/button", {
          params: {
            id: this.id,
            type: 2
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
    this.getButton();
    this.getIntegral();
  }
};
</script>

<style lang="less" scoped>
.main {
  background: rgba(250, 250, 250, 1);
  min-height: 100vh;

  .personal {
    width: 12rem;
    margin: auto;
    margin-top: 0.2rem;
    display: flex;
    justify-content: space-between;

    .right {
      width: 9.2rem;
      background: #fff;
      padding: 0.2rem;

      .line {
        font-size: 0.16rem;
        font-weight: bold;
        color: rgba(77, 77, 77, 1);

        .num {
          font-size: 0.32rem;
          font-weight: bold;
          color: #1e85e6;
        }
      }

      .sign {
        margin-top: 0.4rem;
        cursor: pointer;
        text-align: center;
        background: rgba(30, 133, 230, 1);
        border-radius: 4px;
        color: #fff;
        padding: 0.08rem 0.2rem;
        display: inline-block;
      }

      .label {
        font-size: 0.2rem;
        margin-top: 1rem;
        font-weight: 400;
        color: rgba(77, 77, 77, 1);
      }

      .info {
        .detail {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid rgba(229, 229, 229, 1);
          border-radius: 0.1rem;
          padding: 0.2rem;
          margin-top: 0.2rem;

          .intr {
            .el {
              font-size: 0.16rem;
              font-weight: 400;
              color: rgba(77, 77, 77, 1);
            }
          }

          .act {
            width: 1.17rem;
            height: 0.41rem;
            background: rgb(194, 221, 247);
            border: 1px solid rgba(229, 229, 229, 1);
            cursor: pointer;
            border-radius: 4px;
            font-size: 0.2rem;
            font-weight: 400;
            line-height: 0.41rem;
            text-align: center;
            color: rgba(30, 133, 230, 1);
          }
        }
      }
    }
  }
}

@media only screen and (min-width: 320px) and (max-width: 768px) {
  .main {
    .personal {
      width: 90%;

      .right {
        width: 12rem;

        .line {
          font-size: 0.36rem;

          .num {
            font-size: 0.48rem;
          }
        }

        .sign {
          font-size: 0.36rem;
        }

        .label {
          font-size: 0.36rem;
        }

        .info {
          .detail {
            .intr {
              .el {
                font-size: 0.3rem;
              }
            }

            .act {
              width: 2.5rem;
              height: 0.6rem;
              font-size: 0.36rem;
              line-height: 0.6rem;
            }
          }
        }
      }
    }
  }
}
</style>

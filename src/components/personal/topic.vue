<template>
<div class="main">
    <header-view></header-view>
    <div class="personal">
        <menu-view></menu-view>
        <div class="right">
            <div class="line">我的主题 </div>
            <div class="list">
                <div class="el" v-for="item in dataList" :key="item.id">
                    <div class="name">{{item.title}}</div>
                    <div class="act">
                        <img :src="globalImgPath.eye" class="eye">
                        <span>{{item.view}}</span>
                        <img :src="globalImgPath.comment" class="eye">
                        <span>{{item.commentCount}}</span>
                        <img :src="globalImgPath.zan2" class="eye">
                        <span>{{item.up}}</span>
                        <span class="time">{{item.modifyTime}}</span>
                    </div>
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
      dataList: []
    };
  },
  methods: {
    getTopicList() {
      this.$http.get("/bbs/user/topicList").then(response => {
        if (response.data.code == 0) {
          this.dataList = response.data.data.content;
        } else {
          this.$Message.error(response.data.message);
        }
      });
    }
  },
  created() {
    this.getTopicList();
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
        font-size: 0.2rem;
        color: rgba(77, 77, 77, 1);
      }

      .list {
        margin-top: 0.2rem;

        .el {
          border: 1px solid rgba(238, 238, 238, 1);
          border-radius: 4px;
          padding: 0.2rem;
          margin-bottom: 0.2rem;

          .name {
            font-size: 0.2rem;
            color: rgba(77, 77, 77, 1);
          }

          .act {
            position: relative;
            margin-top: 0.2rem;

            .eye {
              width: 0.23rem;
            }

            .com {
              width: 0.19rem;
            }

            .zan {
              width: 0.18rem;
            }

            span {
              font-size: 0.14rem;
              font-weight: 400;
              color: rgba(179, 179, 179, 1);
              margin-left: 0.1rem;
              margin-right: 0.3rem;
            }

            .time {
              position: absolute;
              right: 0rem;
              color: rgba(77, 77, 77, 1);
            }
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
        }

        .list {
          .el {
            .name {
              font-size: 0.36rem;
            }

            .act {
              .eye {
                width: 0.4rem;
              }

              .com {
                width: 0.38rem;
              }

              .zan {
                width: 0.35rem;
              }

              span {
                font-size: 0.3rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>

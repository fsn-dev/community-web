<template>
<div class="main">
    <header-view></header-view>
    <div class="personal">
    <menu-view></menu-view>
        <div class="right">
            <div class="line">我的任务</div>
            <div class="table">
              <table>
                <thead>
                  <tr>
                    <th>标题</th>
                    <th>奖金</th>
                    <th>任务状态</th>
                    <th>报名状态</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,i) in dataList" :key="i">
                    <td>
                      <div class="title">{{item.title}}</div>
                      <div class="baoming">{{item.registration}}</div>
                    </td>
                    <td>
                      <span class="num">{{item.bonus}}</span>
                      <span class="txt">FSN</span>
                      <span class="mark">最高</span>
                    </td>
                    <td>
                      <div class="status" :style="{'color': item.checkEnrollmentStatusColor}">{{item.checkEnrollmentStatus}}</div>
                    </td>
                    <td>
                      <div class="status" :style="{'color': item.taskStatusColor}">{{item.taskStatus}}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
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
    getUserList() {
      this.$http.get("/task/userList").then(response => {
        if (response.data.code == 0) {
          this.dataList = response.data.data.content;
        } else {
          this.$Message.error(response.data.message);
        }
      });
    }
  },
  created() {
    this.getUserList();
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

      .table {
        margin-top: 0.2rem;
        table {
          border: 0px;
          width: 100%;
          border-collapse: separate;
          border-spacing: 0px 10px;
          thead {
            th {
              font-size: 0.2rem;
              font-weight: 400;
              color: rgba(97, 86, 86, 1);
              border: 0px;
            }
          }
          tbody {
            padding: 0.2rem 0rem;
            td {
              border: 0px;
              text-align: center;
              border-top: 1px solid rgba(238, 238, 238, 1);
              border-bottom: 1px solid rgba(238, 238, 238, 1);
            }

            tr > td:first-child {
              text-align: left;
              border-left: 1px solid rgba(238, 238, 238, 1);
            }

            tr > td:last-child {
              border-right: 1px solid rgba(238, 238, 238, 1);
            }

            .title {
              font-size: 0.2rem;
              font-weight: 400;
              color: rgba(101, 101, 101, 1);
            }
            .baoming {
              font-size: 0.16rem;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              margin-top: 0.1rem;
            }
            .num {
              color: #1e85e6;
              font-size: 0.3rem;
            }
            .txt {
              color: #656565;
              font-size: 0.2rem;
              margin-left: 0.1rem;
            }
            .mark {
              color: #fff;
              background: rgba(30, 133, 230, 1);
              border-radius: 4px;
              font-size: 0.14rem;
              padding: 3px 5px;
              margin-left: 0.1rem;
            }
            .status {
              font-size: 0.2rem;
              font-weight: 400;
              color: rgba(30, 133, 230, 1);
              margin-top: 0.05rem;
              line-height: 36px;
            }
            .shenhe {
              color: #ffa737;
            }
            .ing {
              color: #1e85e6;
            }
            .finish {
              color: #e61e1e;
            }
            .passed {
              color: #999999;
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

        .table {
          table {
            max-width: 90%;
            table-layout: fixed;
            thead {
              th {
                font-size: 0.36rem;
              }
            }
            tbody {
              td {
              }
              .title {
                font-size: 0.3rem;
              }
              .baoming {
                font-size: 0.3rem;
              }
              .num {
                font-size: 0.4rem;
              }
              .txt {
                font-size: 0.36rem;
              }
              .mark {
                font-size: 0.3rem;
              }
              .status {
                font-size: 0.36rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>

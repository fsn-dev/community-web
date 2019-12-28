<template>
<div class="main">
    <header-view></header-view>
    <div class="reward">
        <div class="top">
            <img :src="globalImgPath.pic" class="pic">
            <div class="txt">
                <div class="title">为每一个通行证找到价值</div>
            </div>
        </div>
        <div class="label">
            <img :src="globalImgPath.line" class="line">
            <span class="name">热门赏金任务</span>
            <img :src="globalImgPath.line2" class="line">
        </div>
        <div class="flex">
            <div class="item" v-for="(item,i) in dataList" :key="i" @click="toDetail(item.id)">
                <div class="title">{{item.title}}</div>
                <div class="info">
                    <div class="left">
                        <div class="creater">创建人 {{item.creater}}</div>
                        <div class="number">{{item.participant}}人参与</div>
                    </div>
                    <div class="price"><span>最高</span><span class="bonus">{{item.bonus}} </span><span> 积分</span></div>
                </div>

            </div>
        </div>
        <div class="label">
            <img :src="globalImgPath.line" class="line">
            <span class="name">赏金任务墙</span>
            <img :src="globalImgPath.line2" class="line">
        </div>
        <div class="panel">
            <div class="statue">
                <div class="el" :class="{'selectEl': statue == 0}" @click="clickStatus(-1)">已公开</div>
                <div class="el" :class="{'selectEl': statue == 1}" @click="clickStatus(1)">进行中</div>
                <div class="el" :class="{'selectEl': statue == 2}" @click="clickStatus(2)">已完成</div>
            </div>
            <div class="table">
                <div class="sort">
                    <div class="sortItem" @click="sortDeadline()">
                        <span>按时间排序</span>
                        <img :src="globalImgPath.sort" v-if="sortBy != 'deadline'">
                        <img :src="globalImgPath.sort1" v-if="sortBy == 'deadline' && order == 'asc'">
                        <img :src="globalImgPath.sort2" v-if="sortBy == 'deadline' && order == 'desc'">
                    </div>
                    <div class="sortItem" @click="sortParticipant()">
                        <span>按参与人数排序</span>
                        <img :src="globalImgPath.sort" v-if="sortBy != 'participant'">
                        <img :src="globalImgPath.sort1" v-if="sortBy == 'participant' && order == 'asc'">
                        <img :src="globalImgPath.sort2" v-if="sortBy == 'participant' && order == 'desc'">
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th style="text-align:left;">标题</th>
                            <th>奖金</th>
                            <th>状态</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,i) in taskList" :key="i">
                            <td>
                                <div class="title">{{item.title}}</div>
                            </td>
                            <td>
                                <span class="num">{{item.bonus}}</span>
                                <span class="txt">积分</span>
                            </td>
                            <td>
                                <div class="status">{{item.statusInformation}}</div>
                            </td>
                            <td>
                                <div class="act" @click="toDetail(item.id)">立即查看</div>
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
export default {
  components: {
    headerView
  },
  data() {
    return {
      dataList: [],
      taskList: [],
      statue: 0,
      order: "desc",
      sortBy: "deadline"
    };
  },
  methods: {
    toCreat() {
      this.$router.push("/manage/createTask");
    },
    toDetail(id) {
      this.$router.push({
        path: "/reward/detail",
        query: {
          id: id
        }
      });
    },
    getHoot() {
      this.$http.get("/task/hoot").then(response => {
        if (response.data.code == 0) {
          this.dataList = response.data.data;
        } else {
          this.$Message.error(response.data.message);
        }
      });
    },
    clickStatus(i) {
      this.statue = i;
      this.getTask();
    },
    sortDeadline() {
      this.sortBy = "deadline";
      if (this.order == "asc") {
        this.order = "desc";
      } else {
        this.order = "asc";
      }
      this.getTask();
    },
    sortParticipant() {
      this.sortBy = "participant";
      if (this.order == "asc") {
        this.order = "desc";
      } else {
        this.order = "asc";
      }
      this.getTask();
    },
    getTask() {
      this.$http
        .get("/task/page", {
          params: {
            type: this.statue, //-1:已公开 1:进行中 2:已完成
            order: this.order, // 倒序：desc,正序:asc
            sortBy: this.sortBy // 按时间：deadline,按人数：participant
          }
        })
        .then(response => {
          if (response.data.code == 0) {
            this.taskList = response.data.data.content;
          } else {
            this.$Message.error(response.data.message);
          }
        });
    }
  },
  created() {
    this.getHoot();
    this.getTask();
  }
};
</script>

<style lang="less" scoped>
.main {
  background: rgba(250, 250, 250, 1);
  min-height: 100vh;

  .reward {
    .top {
      position: relative;

      .pic {
        width: 100%;
      }

      .txt {
        position: absolute;
        top: 1rem;
        text-align: center;
        width: 100%;

        .title {
          font-size: 0.53rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }

        .btn {
          font-size: 0.2rem;
          font-weight: bold;
          color: rgba(30, 133, 230, 1);
          width: 1.7rem;
          height: 0.56rem;
          line-height: 0.56rem;
          text-align: center;
          background: rgba(255, 255, 255, 1);
          border-radius: 8px;
          margin: auto;
          margin-top: 0.6rem;
          cursor: pointer;
        }
      }
    }

    .label {
      text-align: center;
      margin-top: 1rem;

      .line {
        width: 1.5rem;
      }

      .name {
        font-size: 0.26rem;
        font-weight: bold;
        color: rgba(30, 133, 230, 1);
        margin: 0rem 0.2rem;
      }
    }

    .flex {
      justify-content: space-between;
      display: flex;
      width: 12rem;
      margin: auto;
      margin-top: 0.4rem;

      .item {
        width: 3.6rem;
        height: 2.2rem;
        color: #fff;
        cursor: pointer;
        padding: 0.2rem;
        background: linear-gradient(
          -90deg,
          rgba(30, 133, 230, 1),
          rgba(30, 185, 230, 1)
        );
        border-radius: 0.08rem;
        position: relative;

        .title {
          font-size: 0.2rem;
        }

        .info {
          justify-content: space-between;
          display: flex;
          align-items: flex-end;
          position: absolute;
          bottom: 0.2rem;
          width: calc(100% - 0.4rem);

          .left {
            .creater {
              font-size: 0.14rem;
            }

            .number {
              font-size: 0.14rem;
              margin-top: 0.1rem;
            }
          }

          .price {
            font-size: 0rem;

            span {
              color: #ffd42a;
              font-size: 0.16rem;
            }

            .bonus {
              font-size: 0.24rem;
              margin-left: 0.1rem;
            }
          }
        }
      }
    }

    .panel {
      width: 12rem;
      margin: auto;

      .statue {
        display: flex;
        justify-content: space-around;
        margin-top: 0.4rem;

        .el {
          width: 3.8rem;
          height: 0.7rem;
          background: transparent;
          border-radius: 8px;
          font-size: 0.26rem;
          font-weight: bold;
          text-align: center;
          line-height: 0.7rem;
          color: rgba(30, 133, 230, 1);
          border: 1px solid rgba(201, 224, 245);
          cursor: pointer;
        }

        .selectEl {
          background: rgb(201, 224, 245);
          color: rgba(30, 133, 230, 1);
          font-weight: bold;
        }
      }

      .table {
        background: #fff;
        padding: 0.2rem;
        border-radius: 4px;
        margin-top: 0.5rem;

        .sort {
          display: flex;
          justify-content: flex-start;
          border-bottom: 1px solid #b5d5f2;
          padding-bottom: 0.2rem;

          .sortItem {
            margin-right: 0.8rem;
            cursor: pointer;

            span {
              font-size: 0.16rem;
            }

            img {
              width: 0.18rem;
              margin-left: 0.03rem;
            }
          }

          .curItem {
            color: #1e85e6;
          }
        }

        table {
          border: 0px;
          width: 100%;
          border-collapse: collapse;
          margin-top: 0.5rem;

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
              padding: 0.2rem 0rem;
              border-top: 1px solid rgba(238, 238, 238, 1);
            }

            tr > td:first-child {
              text-align: left;
            }

            .title {
              font-size: 0.2rem;
              font-weight: 400;
              color: rgba(101, 101, 101, 1);
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

            .act {
              width: 1rem;
              height: 0.4rem;
              line-height: 0.4rem;
              text-align: center;
              background: rgba(181, 213, 242, 1);
              border-radius: 4px;
              font-size: 0.16rem;
              font-weight: 400;
              color: rgba(30, 133, 230, 1);
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 320px) and (max-width: 768px) {
  .main {
    .reward {
      .label {
        .line {
          width: 3rem;
        }

        .name {
          font-size: 0.48rem;
        }
      }

      .flex {
        width: 90%;

        .item {
          width: 5rem;
          height: 3rem;

          .title {
            font-size: 0.36rem;
          }

          .info {
            .left {
              .creater {
                font-size: 0.3rem;
              }

              .number {
                font-size: 0.3rem;
              }
            }

            .price {
              span {
                font-size: 0.3rem;
              }

              .bonus {
                font-size: 0.4rem;
              }
            }
          }
        }
      }

      .panel {
        width: 90%;

        .statue {
          .el {
            width: 3.8rem;
            height: 1rem;
            font-size: 0.4rem;
            line-height: 1rem;
          }
        }

        .table {
          .sort {
            .sortItem {
              span {
                font-size: 0.36rem;
              }

              img {
                width: 0.4rem;
              }
            }
          }

          table {
            thead {
              th {
                font-size: 0.36rem;
                font-weight: 400;
                color: rgba(97, 86, 86, 1);
                border: 0px;
              }
            }

            tbody {
              .title {
                font-size: 0.36rem;
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

              .act {
                width: 2rem;
                height: 1rem;
                line-height: 1rem;
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

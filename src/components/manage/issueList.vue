<template>
<div class="manage">
    <menu-view></menu-view>
    <div class="createTask">
        <div class="top">
            <img :src="globalImgPath.avatar" class="avatar">
            <span class="txt">天选之子</span>
        </div>
        <div class="name"><span @click="toPage()">任务列表</span> / 方案列表</div>
        <div class="content">
            <div class="panel">
                <div class="area">任务内容</div>
                <div class="title">
                    <span class="txt">标题：</span>
                    <span>{{detail.title}}</span>
                </div>
                <div class="title">
                    <span class="txt">赏金：</span>
                    <span>{{detail.bonus}}</span>
                </div>
                <div class="title">
                    <span class="txt">方案：</span>
                    <span>{{detail.scheme}}</span>
                </div>
                <div class="title">
                    <span class="txt">发布时间：</span>
                    <span>{{detail.creatTime}}</span>
                </div>
                <div class="title">
                    <span class="txt">状态：</span>
                    <span class="txt">{{detail.taskStatus}}</span>
                </div>
            </div>
            <div class="panel">
                <div class="area">方案列表</div>
                <div class="table">
                    <table>
                        <thead>
                            <tr>
                                <th>报名者</th>
                                <th>报名者邮箱</th>
                                <th>
                                      <span>报名时间</span>
                                    <img :src="globalImgPath.sort1" v-if="order == 'asc'" @click="sortData('desc')">
                                    <img :src="globalImgPath.sort2" v-if="order == 'desc'" @click="sortData('asc')">
                                </th>
                                <th>任务状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in dataList" :key="index">
                                <td>{{item.userName}}</td>
                                <td>{{item.email}}</td>
                                <td>{{item.time}}</td>
                                <td :style="{'color': item.checkEnrollmentStatusColor}">{{item.checkEnrollmentStatus}}</td>
                                <td>
                                    <span class="act" @click="getEdit(item.id)">查看方案</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="page">
                    <Page :total="total" :current="page" :page-size="pageSize" size="small" @on-change="changePage" />
                </div>
            </div>
        </div>
        <div class="edit" v-if="isMask">
            <div class="mask" @click="isMask = 0"></div>
            <div class="panel">
                <div class="name">方案审核</div>
                <div class="con">方案描述: {{personDetail.scheme}}</div>
                <div class="status">当前状态: <span :style="{'color': personDetail.taskStatusColor}">{{personDetail.taskStatus}}</span></div>
                <div class="radio">
                    <RadioGroup v-model="personDetail.taskStatusId">
                        <Radio :label="item.id" v-for="(item,index) in personDetail.rewardTaskStates" :key="index">
                            <span class="rs">{{item.name}}</span>
                        </Radio>
                    </RadioGroup>
                </div>
                <div class="btns">
                    <div class="cancle" @click="isMask = 0">取消</div>
                    <div class="confrim" @click="confirmStatus()">确定</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import menuView from "@/components/manage/menu";
export default {
  components: {
    menuView
  },
  data() {
    return {
      dataList: [],
      pageSize: 3,
      page: 1,
      total: 0,
      order: "desc",
      isMask: 0,
      id: "",
      detail: {
        bonus: "",
        creatTime: "",
        scheme: "",
        taskStatus: "",
        title: ""
      },
      personId: "",
      personDetail: {
        rewardTaskStates: [],
        scheme: "",
        taskStatus: "",
        taskStatusColor: "",
        taskStatusId: ""
      }
    };
  },
  methods: {
    toPage() {
      this.$router.push({ name: "taskList" });
    },
    getTaskDetail() {
      this.$http.get("/task/list/taskDetail?id=" + this.id).then(response => {
        if (response.data.code == 0) {
          this.detail = response.data.data;
        } else {
          this.$Message.error(response.data.message);
        }
      });
    },
    getProposals() {
      this.$http
        .get("/task/list/proposals", {
          params: {
            id: this.id,
            order: this.order,
            sortBy: "time",
            pageSize: this.pageSize,
            page: this.page - 1
          }
        })
        .then(response => {
          if (response.data.code == 0) {
            this.total = response.data.data.totalElements;
            this.dataList = response.data.data.content;
          } else {
            this.$Message.error(response.data.message);
          }
        });
    },
    sortData(order) {
      this.page = 1;
      this.order = order;
      this.getProposals();
    },
    getEdit(id) {
      this.personId = id;
      this.$http
        .get("/task/list/proposals/edit", {
          params: {
            id: this.personId
          }
        })
        .then(response => {
          if (response.data.code == 0) {
            this.personDetail = response.data.data;
            this.isMask = 1;
          } else {
            this.$Message.error(response.data.message);
          }
        });
    },
    confirmStatus() {
      this.$http
        .post(
          "/task/list/proposals/edit?id=" +
            this.personId +
            "&state=" +
            this.personDetail.taskStatusId
        )
        .then(response => {
          if (response.data.code == 0) {
            this.isMask = 0;
            this.$Message.success("审核成功");
            this.getProposals();
          } else {
            this.$Message.error(response.data.message);
          }
        });
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.getTaskDetail();
    this.getProposals();
  }
};
</script>

<style lang="less" scoped>
.manage {
  display: flex;
  justify-content: space-between;

  .createTask {
    width: calc(100% - 2.56rem);

    .top {
      height: 0.64rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 8px 0px rgba(165, 165, 165, 0.18);
      text-align: right;
      line-height: 0.64rem;
      padding-right: 0.2rem;

      .avatar {
        width: 0.24rem;
        height: 0.24rem;
      }

      .txt {
        font-size: 0.14rem;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        opacity: 0.65;
        margin-left: 0.2rem;
      }
    }

    .name {
      font-size: 0.2rem;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      opacity: 0.85;
      padding: 0.2rem;
      span {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }

    .content {
      padding: 0.2rem;
      background: #f0f2f5;

      .panel {
        padding: 0.2rem;
        background: #fff;
        position: relative;

        .area {
          margin-bottom: 0.2rem;
          font-size: 0.2rem;
        }

        .title {
          padding-bottom: 0.2rem;

          .txt {
            font-size: 0.14rem;
            font-weight: 400;
            color: rgba(77, 77, 77, 1);
            opacity: 0.85;
            margin-left: 0.1rem;
            display: inline-block;
          }
        }

        .table {
          table {
            width: 100%;
            border: 0px;
            border-collapse: collapse;

            thead {
              th {
                background: #fafafa;
                color: #4d4d4d;
                font-size: 0.14rem;
                padding: 0.16rem;
                border: 0px;
                img {
                  width: 0.2rem;
                  cursor: pointer;
                }
              }
            }

            tbody {
              td {
                color: #4d4d4d;
                font-size: 0.14rem;
                border: 0px;
                background: #fff;
                border-top: 1px solid #e8e8e8;
                text-align: center;
                padding: 0.1rem;

                .act {
                  color: #1890ff;
                  margin: 0px 0.2rem;
                  cursor: pointer;

                  &:hover {
                    text-decoration: underline;
                  }
                }
              }
            }
          }
        }

        .page {
          text-align: right;
        }
      }
    }

    .edit {
      .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 99;
        background: #000;
        opacity: 0.3;
        top: 0px;
        left: 0px;
      }

      .panel {
        position: absolute;
        width: 4rem;
        height: 3rem;
        z-index: 100;
        background: #fff;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        margin: auto;
        text-align: left;
        padding: 0rem 0.2rem;

        .name {
          font-size: 0.2rme;
          color: #000;
          font-weight: bold;
          text-align: center;
        }

        .title {
          margin-bottom: 0.2rem;
        }

        .con {
          margin-bottom: 0.2rem;
        }

        .radio {
          margin-top: 0.2rem;
        }

        .btns {
          display: flex;
          justify-content: space-around;
          margin-top: 0.4rem;

          .cancle {
            color: #666;
            border: 1px solid #666;
            width: 0.8rem;
            height: 0.4rem;
            line-height: 0.4rem;
            text-align: center;
            border-radius: 0.04rem;
            cursor: pointer;
          }

          .confrim {
            color: #fff;
            background: #357aec;
            width: 0.8rem;
            height: 0.4rem;
            line-height: 0.4rem;
            text-align: center;
            border-radius: 0.04rem;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>

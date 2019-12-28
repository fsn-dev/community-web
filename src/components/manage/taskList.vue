<template>
<div class="manage">
    <menu-view></menu-view>
    <div class="createTask">
        <div class="top">
            <img :src="globalImgPath.avatar" class="avatar">
            <span class="txt">天选之子</span>
        </div>
        <div class="name">赏金任务列表</div>
        <div class="content">
            <div class="panel">
                <div class="action">
                    <span class="btn">发布任务</span>
                    <Select class="status" v-model="state" @on-change="changeState">
                        <Option value="-2">全部</Option>
                        <Option v-for="(item,index) in stateList" :value="item.id" :key="index">{{item.name}}</Option>
                    </Select>
                </div>
                <div class="table">
                    <table>
                        <thead>
                            <tr>
                                <th>标题</th>
                                <th>
                                    <span>发布时间</span>
                                    <img :src="globalImgPath.sort1" v-if="order == 'asc'" @click="sortData('desc')">
                                    <img :src="globalImgPath.sort2" v-if="order == 'desc'" @click="sortData('asc')">
                                </th>
                                <th>奖励</th>
                                <th>任务状态</th>
                                <th>是否推荐</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in dataList" :key="index">
                                <td>{{item.title}}</td>
                                <td>{{item.creatTime}}</td>
                                <td>{{item.bonus}}</td>
                                <td :style="{'color': item.taskStatusColor}">{{item.taskStatus}}</td>
                                <td> <i-switch v-model="item.hot" @on-change="changeHot($event,item)" ></i-switch></td>
                                <td>
                                    <span class="act" @click="getEdit(item.id)">编辑状态</span>
                                    <span class="act" @click="toPage(item.id)">查看方案</span>
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
                <div class="name">编辑状态</div>
                <div class="title">当前状态：报名中</div>
                <div class="radio">
                    <RadioGroup v-model="taskStatusId">
                        <Radio :label="item.id" style="width: 100%" v-for="(item,index) in rewardTaskStates" :key="index">
                            <span class="rs">{{item.name}}</span>
                        </Radio>
                    </RadioGroup>
                </div>
                <div class="btns">
                    <div class="cancle" @click="isMask = 0">取消</div>
                    <div class="confrim" @click="changeStatus()">确定</div>
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
      stateList: [],
      pageSize: 10,
      page: 1,
      total: 0,
      state: "-2",
      order: "desc",
      isMask: 0,
      rewardTaskStates: [],
      id: "",
      taskStatusId: ""
    };
  },
  methods: {
    getStates() {
      this.$http.get("/task/list/states").then(response => {
        if (response.data.code == 0) {
          this.stateList = response.data.data;
        } else {
          this.$Message.error(response.data.message);
        }
      });
    },
    getTaskList() {
      let state = this.state;
      if (this.state == "-2") {
        state = null;
      }
      this.$http
        .get("/task/list", {
          params: {
            state: state,
            order: this.order,
            sortBy: "time",
            page: this.page - 1,
            pageSize: this.pageSize
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
      this.getTaskList();
    },
    changePage(page) {
      this.page = page;
      this.getTaskList();
    },
    changeState() {
      this.page = 1;
      this.getTaskList();
    },
    getEdit(id) {
      this.id = id;
      this.$http
        .get("/task/list/edit", {
          params: {
            id: id
          }
        })
        .then(response => {
          if (response.data.code == 0) {
            this.isMask = 1;
            this.rewardTaskStates = response.data.data.rewardTaskStates;
            this.taskStatusId = response.data.data.taskStatusId;
          } else {
            this.$Message.error(response.data.message);
          }
        });
    },
    changeStatus() {
      this.$http
        .post("/task/list/edit?id=" + this.id + "&state=" + this.taskStatusId)
        .then(response => {
          if (response.data.code == 0) {
            this.isMask = 0;
            this.$Message.success("修改成功");
            this.getTaskList();
          } else {
            this.$Message.error(response.data.message);
          }
        });
    },
    toPage(id) {
      this.$router.push({
        name: "issueList",
        query: {
          id: id
        }
      });
    },
    changeHot(e, item) {
      this.$http
        .post("/task/list/hot?id=" + item.id + "&hot=" + e * 1)
        .then(response => {
          if (response.data.code == 0) {
            this.$Message.success("修改成功");
            this.getTaskList();
          } else {
            this.$Message.error(response.data.message);
            this.getTaskList();
          }
        });
    }
  },
  created() {
    this.getStates();
    this.getTaskList();
  }
};
</script>

<style lang="less" scoped>
.manage {
  display: flex;
  justify-content: space-between;

  .createTask {
    width: calc(100% - 2.56rem);
    position: relative;

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
    }

    .content {
      padding: 0.2rem;
      background: #f0f2f5;

      .panel {
        background: #fff;
        padding: 0.2rem;

        .action {
          .btn {
            display: inline-block;
            width: 1.5rem;
            height: 0.4rem;
            line-height: 0.4rem;
            text-align: center;
            color: #fff;
            background: #1890ff;
            font-size: 0.14rem;
            border-radius: 0.04rem;
          }

          .status {
            margin-left: 0.2rem;
            display: inline-block;
            width: 1.5rem;
            height: 0.4rem;
            line-height: 0.4rem;
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
        height: 4.2rem;
        z-index: 100;
        background: #fff;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        margin: auto;
        text-align: center;

        .name {
          font-size: 0.2rme;
          color: #000;
          font-weight: bold;
        }

        .title {
          margin-bottom: 0.2rem;
        }

        .radio {
          line-height: 0.5rem;
        }

        .btns {
          display: flex;
          justify-content: space-around;
          margin-top: 0.2rem;

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

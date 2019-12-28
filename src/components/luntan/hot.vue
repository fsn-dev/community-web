<template>
<div class="luntan">
    <header-view></header-view>
    <div class="content">
        <top-view></top-view>
        <div class="action">
            <div class="publish" @click="showEditor()">
                <img :src="globalImgPath.publish">
                <span>发布主题</span>
            </div>
            <div class="all">
              <Select v-model="tagComboboxId" @on-change="getTopicList">
                <Option :value="-1">全部板块</Option>
                <Option v-for="(item,index) in tagCombobox" :key="index" :value="item.id">{{item.title}}</Option>
              </Select>
            </div>
        </div>
        <div class="list">
            <div class="item" v-for="(item,index) in articleList" :key="index">
                <div class="panel">
                    <div class="name">
                        <img :src="item.topicIcon" class="tagIcon">
                        <div class="title">
                            <div class="txt" @click="toDetail(item.id)">{{item.title}}</div>
                            <div class="time">
                                <img :src="item.tagIcon" class="tagIcon">
                                <span class="info">{{item.tagName}}</span>
                                <span class="info">·</span>
                                <span class="info">{{item.modifyTime}}</span>
                                <span class="info">·</span>
                                <span class="info">{{item.userName}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="act">
                        <div class="el">
                            <div class="num">{{item.up}}</div>
                            <div class="remark">点赞</div>
                        </div>
                        <div class="el">
                            <div class="num">{{item.commentCount}}</div>
                            <div class="remark">回复</div>
                        </div>
                        <div class="el">
                            <div class="num">{{item.view}}</div>
                            <div class="remark">浏览</div>
                        </div>
                    </div>
                </div>
                <div class="newest" v-if="item.topicCommentVo">
                    <img :src="item.topicCommentVo.icon" class="pic">
                    <div class="user">
                        <div class="username">
                            <span class="txt">{{item.topicCommentVo.userName}}</span>
                            <span class="time">{{item.topicCommentVo.time}}</span>
                        </div>
                        <div class="comment">{{item.topicCommentVo.content}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="editor" v-if="isShowEditor">
				<img :src="globalImgPath.back2" class="back2" @click="toPublish()">
        <div class="search">
          <div class="name">
              <span>主题</span>
              <input type="text" placeholder="请输入主题名" v-model="newTopic.title">
          </div>
          <div class="action">
            <div class="category">
              <Select v-model="newTopic.tagId">
                <Option :value="-1" style="display:none;">请选择分类</Option>
                <Option v-for="(item,index) in tagCombobox" :key="index" :value="item.id">{{item.title}}</Option>
              </Select>
            </div>
            <div class="btn" @click="postNew()">发布</div>
            <div class="btn cancle" @click="hideEditor()">取消</div>
          </div>
        </div>
        <div class="area">
          <navBar />
          <section>
            <inputer />
            <outputer />
          </section>
        </div>
    </div>
</div>
</template>

<script>
import headerView from "@/components/public/header";
import topView from "@/components/luntan/top";
import navBar from "@/components/markdown/navBar.vue";
import inputer from "@/components/markdown/inputer.vue";
import outputer from "@/components/markdown/outputer.vue";

export default {
  components: {
    headerView,
    topView,
    navBar,
    inputer,
    outputer
  },
  data() {
    return {
      articleList: [],
      tagCombobox: [],
      tagComboboxId: -1,
      newTopic: {
        title: "",
        tagId: -1
      }
    };
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
    isShowEditor() {
      return this.$store.state.isShowEditor;
    }
  },
  methods: {
    toPublish() {
      this.$store.commit("FULLSCREEN");
      this.$router.push("/luntan/publish");
    },
    getTopicList() {
      let tagComboboxId = null;
      if (this.tagComboboxId != -1) {
        tagComboboxId = this.tagComboboxId;
      }
      this.$http
        .get("/bbs/topicList", {
          params: {
            tagId: tagComboboxId,
            pageType: 2
          }
        })
        .then(response => {
          if (response.data.code == 0) {
            this.articleList = response.data.data.topicVos.content;
          } else {
            this.$Message.error(response.data.message);
          }
        });
    },
    showEditor() {
      let isLogin = this.$store.state.loginStatus;
      if (isLogin) {
        this.$store.state.articleList[0].content = "";
        this.$store.state.isShowEditor = true;
      } else {
        this.$Message.error("请先登陆");
      }
    },
    hideEditor() {
      this.$store.state.isShowEditor = false;
    },
    getTagCombobox() {
      this.$http.get("/bbs/tagCombobox").then(response => {
        if (response.data.code == 0) {
          this.tagCombobox = response.data.data;
        } else {
          this.$Message.error(response.data.message);
        }
      });
    },
    postNew() {
      let flag = true;
      if (!this.newTopic.title) {
        this.$Message.error("请输入标题");
        flag = false;
      } else if (!this.$store.getters.articleMd) {
        this.$Message.error("请输入主题内容");
        flag = false;
      } else if (this.newTopic.tagId == -1) {
        this.$Message.error("请选择索要发布的分类板块");
        flag = false;
      }
      if (flag) {
        this.$http
          .post(
            "/bbs/topic",
            {
              title: this.newTopic.title,
              content: this.$store.getters.articleMd,
              contentMD: this.$store.getters.articleRaw,
              tagId: this.newTopic.tagId
            },
            { emulateJSON: true }
          )
          .then(response => {
            if (response.data.code == 0) {
              this.$Message.success(response.data.message);
              this.hideEditor();
              this.toDetail(response.data.data.id);
            } else {
              this.$Message.error(response.data.message);
            }
          });
      }
    },
    toDetail(id) {
      this.$router.push({
        path: "/luntan/topic/detail",
        query: { topicId: id }
      });
    }
  },
  created() {
    // this.$store.state.isShowEditor = false;
    this.getTopicList();
    this.getTagCombobox();
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.luntan {
  background: rgba(250, 250, 250, 1);
  min-height: 100vh;

  .content {
    width: 11.95rem;
    margin: auto;
    margin-top: 0.5rem;

    .action {
      text-align: right;
      font-size: 0px;
      vertical-align: middle;
      margin: 0.4rem 0rem 0.2rem;

      .publish {
        display: inline-block;
        width: 1.16rem;
        height: 32px;
        line-height: 32px;
        background: #3371ff;
        color: #fff;
        text-align: center;
        border-radius: 0.04rem;
        margin-right: 0.4rem;
        cursor: pointer;
        img {
          width: 0.15rem;
        }

        span {
          font-size: 0.14rem;
          font-weight: 400;
          margin-left: 0.1rem;
          color: rgba(255, 255, 255, 1);
        }
      }

      .all {
        display: inline-block;
        width: 2rem;
      }
    }

    .list {
      padding-bottom: 0.2rem;

      .item {
        background: #fff;
        border-bottom: 1px solid rgba(242, 242, 242, 1);
        cursor: pointer;
        .panel {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0px;
          padding: 0.2rem;

          .name {
            .tagIcon {
              width: 0.68rem;
              height: 0.68rem;
            }

            .title {
              margin-left: 0.2rem;
              display: inline-block;
            }

            .txt {
              font-size: 0.26rem;
              font-weight: 400;
              color: rgba(51, 113, 255, 1);
              &:hover {
                text-decoration: underline;
              }
            }

            .time {
              font-size: 0px;
              margin-top: 0.1rem;

              .tagIcon {
                width: 0.36rem;
                height: 0.36rem;
              }

              .info {
                font-size: 0.16rem;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
                margin-left: 0.2rem;
              }
            }
          }

          .act {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0px;

            .el {
              font-size: 0px;
              display: inline-block;
              text-align: center;
              margin-left: 0.5rem;

              .num {
                font-size: 0.2rem;
                font-weight: 400;
                color: rgba(77, 77, 77, 1);
              }

              .remark {
                margin-top: 0.1rem;
                font-size: 0.14rem;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
              }
            }
          }
        }

        .newest {
          padding: 0.2rem;
          padding-left: calc(0.2rem + 0.68rem + 0.2rem);
          display: flex;
          justify-content: flex-start;
          align-items: top;
          font-size: 0px;
          border-top: 1px solid rgba(242, 242, 242, 1);

          .pic {
            width: 0.36rem;
            height: 0.36rem;
            border-radius: 100%;
          }

          .user {
            font-size: 0.14rem;
            font-weight: 400;
            color: rgba(77, 77, 77, 1);
            margin-left: 0.2rem;

            .username {
              height: 0.36rem;
              line-height: 0.36rem;

              .time {
                margin-left: 0.2rem;
              }
            }

            .comment {
              margin-top: 0.1rem;
              width: 6.64rem;
              max-height: 0.6rem;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }

      .item:nth-last-child(1) {
        border-bottom: 0px;
      }
    }
  }

  .editor {
    width: 100%;
    height: 4.5rem;
    position: fixed;
    z-index: 9;
    bottom: 0px;
    left: 0px;
    padding: 0.4rem 0.8rem;
    background: #fff;
    box-shadow: -3px -4px 8px 0px rgba(165, 165, 165, 0.18);
    .back2 {
      position: absolute;
      top: -0.15rem;
      left: 0.3rem;
      width: 0.3rem;
      height: 0.3rem;
    }
    .search {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0px;
      .name {
        span {
          font-size: 0.14rem;
          font-weight: 400;
          color: rgba(77, 77, 77, 1);
        }

        input {
          width: 4.6rem;
          height: 0.4rem;
          line-height: 0.4rem;
          border: 1px solid rgba(238, 238, 238, 1);
          border-radius: 0.04rem;
          outline: none;
          font-size: 0.14rem;
          font-weight: 400;
          color: rgba(77, 77, 77, 1);
          margin-left: 0.2rem;
          text-indent: 0.15rem;
        }
      }
      .action {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0px;
        .category {
          width: 2rem;
        }
        .guide {
          width: 1.5rem;
          margin-left: 0.8rem;
        }
        .btn {
          width: 1.1rem;
          height: 0.4rem;
          font-size: 0.14rem;
          text-align: center;
          line-height: 0.4rem;
          font-weight: 400;
          background: rgba(51, 113, 255, 1);
          color: #fff;
          margin-left: 0.5rem;
          border-radius: 4px;
          cursor: pointer;
        }
        .cancle {
          background: #fff;
          color: rgba(51, 113, 255, 1);
          border: 1px solid rgba(51, 113, 255, 1);
          margin-left: 0.2rem;
          border-radius: 4px;
        }
      }
    }

    .area {
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      height: 2.5rem;
    }
  }
}
@media only screen and (min-width: 320px) and (max-width: 768px) {
  .luntan {
    .content {
      width: 90%;
      .action {
        .publish {
          width: 2.5rem;
          height: 16px;
          line-height: 16px;
          img {
            width: 0.3rem;
          }
          span {
            font-size: 0.36rem;
          }
        }
        .all {
          width: 4rem;
        }
      }
      .list {
        padding-bottom: 0.4rem;
        .item {
          padding: 0.3rem 0rem;
          .panel {
            .name {
              .txt {
                font-size: 0.36rem;
              }
              .time {
                .info {
                  font-size: 0.3rem;
                }
              }
            }
            .act {
              .el {
                .num {
                  font-size: 0.36rem;
                }
                .remark {
                  font-size: 0.3rem;
                }
              }
            }
          }

          .newest {
            .user {
              font-size: 0.3rem;
            }
          }
        }
      }
    }
  }
}
</style>


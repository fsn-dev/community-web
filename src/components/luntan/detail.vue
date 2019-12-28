<template>
<div class="topicDetail">
    <header-view></header-view>
    <div class="content">
        <top-view></top-view>
        <div class="category">
            <span class="tagName" @click="toSignleMoudle(article.tagId)">{{article.tagName}}</span>
            <span class="sp">/</span>
            <span class="title">{{article.title}}</span>
        </div>
        <div class="detail">
            <div class="tagName">{{article.title}}</div>
            <div class="user">
                <img :src="article.userIcon" class="userIcon">
                <div class="name">
                    <div class="userName">{{article.userName}}</div>
                    <div class="modifyTime">{{article.modifyTime}}</div>
                </div>
            </div>
            <div v-html="article.content" class="article"></div>
        </div>
        <div class="mark">
          <div class="left">
            <div class="el">
              <span class="tl">回复</span>
              <span class="num">{{article.commentCount}}</span>
            </div>
            <div class="el">
              <span class="tl">浏览</span>
              <span class="num">{{article.view}}</span>
            </div>
            <div class="el">
              <span class="tl">点赞</span>
              <img :src="globalImgPath.zan" class="zan" v-if="article.upSelf">
              <img :src="globalImgPath.zan2" class="zan" v-if="!article.upSelf" @click="getVote()">
              <span class="num">{{article.up}}</span>
            </div>
          </div>
          <div class="right" @click="showComment(null,article.userName,'','reply')">回复</div>
        </div>
        <div class="comment">
          <div class="item" v-for="(item,index) in commentList" :key="index">
            <div class="user">
              <img :src="item[0].userIcon" class="userIcon">
              <div class="name">
                  <div class="userName">{{item[0].userName}}</div>
                  <div class="modifyTime">{{item[0].time}}</div>
              </div>
            </div>
            <div class="text">{{item[0].content}}</div>
            <div class="action">
              <span class="edit" @click="showComment(item[0].id,item[0].userName,item[0].content,'edit')" v-if="item[0].edit">编辑</span>
              <span class="recall" @click="showComment(item[0].id,item[0].userName,'','reply')" v-if="item[0].reply">回复</span>
            </div>
            <div class="sonComment" v-if="item.length > 1">
              <div class="el" v-for="(el,i) in item" :key="i" v-if="i != 0">
                <div class="user">
                  <img :src="el.userIcon" class="userIcon">
                  <div class="userName">{{el.userName}}：@{{el.replyToUserName}}&nbsp;&nbsp;&nbsp;&nbsp;{{el.content}}</div>
                  <div class="modifyTime">
                      <span class="time">发布于{{el.time}}</span>
                      <span class="recall" @click="showComment(el.id,el.userName,el.content,'edit')" v-if="el.edit">编辑</span>
                      <span class="recall" @click="showComment(el.id,el.userName,'','reply')" v-if="el.reply">回复</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="addComment" v-if="isShowComment">
          <div class="title">
            <div class="topic"><span class="author">回复@{{curReplyer}}：</span> “{{article.title}}”</div>
            <div class="action">
              <span class="cancle" @click="hideComment()">取消</span>
              <span class="recall" @click="postComment()" v-if="curMode == 'reply'">回复</span>
              <span class="recall" @click="putComment()" v-if="curMode == 'edit'">修改</span>
            </div>
          </div>
          <div class="area">
              <textarea v-model="addCommentObj.content"></textarea>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import headerView from "@/components/public/header";
import topView from "@/components/luntan/top";

export default {
  components: {
    headerView,
    topView
  },
  data() {
    return {
      article: {},
      isShowComment: 0,
      addCommentObj: {
        commentId: null,
        content: ""
      },
      curMode: "add",
      commentList: [],
      curReplyer: ""
    };
  },
  methods: {
    toSignleMoudle(id) {
      this.$router.push({
        path: "/luntan/moudle/single",
        query: { tagId: id }
      });
    },

    getTopic() {
      this.$http
        .get("/bbs/topic", {
          params: {
            topicId: this.$route.query.topicId
          }
        })
        .then(response => {
          if (response.data.code == 0) {
            this.article = response.data.data;
          } else {
            this.$Message.error(response.data.message);
          }
        });
    },
    getComments() {
      this.$http
        .get("/bbs/comments", {
          params: {
            topicId: this.$route.query.topicId
          }
        })
        .then(response => {
          if (response.data.code == 0) {
            this.commentList = response.data.data.content;
          } else {
            this.$Message.error(response.data.message);
          }
        });
    },
    hideComment() {
      this.isShowComment = 0;
    },
    showComment(commentId, userName, content, mode) {
      let isLogin = this.$store.state.loginStatus;
      if (isLogin) {
        this.curMode = mode;
        this.addCommentObj.commentId = commentId;
        if (content) {
          this.addCommentObj.content = content;
        } else {
          this.addCommentObj.content = "";
        }
        this.curReplyer = userName;
        this.isShowComment = 1;
      } else {
        this.$Message.error("请先登陆");
      }
    },
    postComment() {
      if (!this.addCommentObj.content) {
        this.$Message.error("请先输入评论");
      } else {
        this.$http
          .post(
            "/bbs/comment",
            {
              commentId: this.addCommentObj.commentId,
              content: this.addCommentObj.content,
              topicId: this.$route.query.topicId
            },
            { emulateJSON: true }
          )
          .then(response => {
            if (response.data.code == 0) {
              this.$Message.success(response.data.message);
              this.isShowComment = 0;
              this.getComments();
            } else {
              this.$Message.error(response.data.message);
            }
          });
      }
    },
    putComment() {
      if (!this.addCommentObj.content) {
        this.$Message.error("请先输入评论");
      } else {
        this.$http
          .put(
            "/bbs/comment",
            {
              commentId: this.addCommentObj.commentId,
              content: this.addCommentObj.content
            },
            { emulateJSON: true }
          )
          .then(response => {
            if (response.data.code == 0) {
              this.$Message.success(response.data.message);
              this.isShowComment = 0;
              this.getComments();
            } else {
              this.$Message.error(response.data.message);
            }
          });
      }
    },
    getVote() {
      this.$http
        .get("/bbs/vote", {
          params: {
            topicId: this.$route.query.topicId
          }
        })
        .then(response => {
          if (response.data.code == 0) {
            this.$Message.success(response.data.message);
            this.getTopic();
          } else {
            this.$Message.error(response.data.message);
          }
        });
    }
  },
  created() {
    this.getTopic();
    this.getComments();
  },
  mounted() {}
};
</script>

<style lang="less">
.topicDetail {
  background: rgba(250, 250, 250, 1);
  min-height: 100vh;
  .content {
    width: 11.95rem;
    margin: auto;
    margin-top: 0.5rem;
    background: #fff;
    .category {
      margin: 0.2rem;
      font-size: 0.2rem;
      .tagName {
        color: #2186e6;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      .sp {
        color: #808080;
        margin: 0rem 0.1rem;
      }
      .title {
        color: #808080;
      }
    }
    .detail {
      background: #fff;
      padding: 0.2rem 0.4rem;

      .tagName {
        font-size: 0.3rem;
        font-weight: 400;
        color: rgba(51, 113, 255, 1);
      }
      .user {
        margin-top: 0.2rem;
        .userIcon {
          width: 0.68rem;
          height: 0.68rem;
          border-radius: 100%;
        }
        .name {
          display: inline-block;
          margin-left: 0.2rem;
          .userName {
            font-size: 0.2rem;
            font-weight: 400;
            color: rgba(51, 113, 255, 1);
          }
          .modifyTime {
            font-size: 0.14rem;
            font-weight: 400;
            color: rgba(166, 166, 166, 1);
            margin-top: 0.06rem;
          }
        }
      }
      .article {
        margin-top: 0.4rem;
        margin-bottom: 0.2rem;
        ol,
        ul {
          display: block;
          list-style-type: disc;
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
          padding-inline-start: 40px;
        }
        p,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        li,
        code,
        a {
          line-height: 0.4rem;
        }
        p {
          img {
            margin: 0.2rem 0rem;
            width: 100%;
          }
        }
        pre {
          margin: 0.2rem 0rem;
        }
      }
    }
    .mark {
      display: flex;
      justify-content: space-between;
      padding-top: 0.2rem;
      padding-bottom: 0.5rem;
      padding-left: 0.4rem;
      padding-right: 0.4rem;
      border-top: 1px solid rgba(242, 242, 242, 1);
      border-bottom: 0.04rem solid rgba(242, 242, 242, 1);
      background: #fff;
      .left {
        .el {
          display: inline-block;
          font-size: 0.14rem;
          font-weight: 400;
          color: rgba(77, 77, 77, 1);
          margin-right: 0.8rem;
          .zan {
            margin-left: 0.4rem;
          }
          .num {
            margin-left: 0.2rem;
          }
        }
      }
      .right {
        width: 1.1rem;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        background: rgba(51, 113, 255, 1);
        border-radius: 4px;
        font-size: 0.14rem;
        font-weight: 400;
        cursor: pointer;
        color: rgba(255, 255, 255, 1);
      }
    }
    .comment {
      padding: 0.2rem 0.4rem;
      .user {
        margin-top: 0.2rem;
        .userIcon {
          width: 0.68rem;
          height: 0.68rem;
          border-radius: 100%;
        }
        .name {
          display: inline-block;
          margin-left: 0.2rem;
          .userName {
            font-size: 0.2rem;
            font-weight: 400;
            color: rgba(51, 113, 255, 1);
          }
          .modifyTime {
            font-size: 0.14rem;
            font-weight: 400;
            color: rgba(166, 166, 166, 1);
            margin-top: 0.06rem;
          }
        }
      }
      .text {
        font-size: 0.14rem;
        font-weight: 400;
        color: rgba(77, 77, 77, 1);
        line-height: 21px;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
        padding-left: 0.88rem;
      }
      .action {
        text-align: right;
        span {
          font-size: 0.14rem;
          font-weight: 400;
          text-decoration: underline;
          color: rgba(51, 113, 255, 1);
          cursor: pointer;
        }
        .recall {
          margin-left: 0.4rem;
        }
      }
      .sonComment {
        margin-left: 1.2rem;
        margin-top: 0.2rem;
        margin-bottom: 0.4rem;
        background: #f2f2f2;
        padding: 0.1rem 0.2rem;
        font-size: 0px;
        .el {
          margin-top: 0.15rem;
        }
        .el:first-child {
          margin-top: 0px;
        }
        .user {
          margin-top: 0px;
        }
        .userIcon {
          width: 0.36rem;
          height: 0.36rem;
        }
        .userName {
          color: #4d4d4d;
          display: inline-block;
          font-size: 0.14rem;
          margin-left: 0.2rem;
        }
        .modifyTime {
          color: #999999;
          font-size: 0.14rem;
          margin-left: 0.56rem;
          margin-top: 0.05rem;
          .recall {
            font-size: 0.14rem;
            font-weight: 400;
            text-decoration: underline;
            color: rgba(51, 113, 255, 1);
            margin-left: 0.5rem;
            cursor: pointer;
          }
        }
      }
    }
    .addComment {
      position: fixed;
      bottom: 0px;
      left: 0px;
      width: 100%;
      padding: 0.2rem 0.4rem;
      box-sizing: border-box;
      background: #fff;
      box-shadow: -3px -4px 8px 0px rgba(165, 165, 165, 0.18);
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .topic {
          font-size: 0.2rem;
          font-weight: 400;
          color: rgba(77, 77, 77, 1);
          .author {
            color: rgba(128, 128, 128, 1);
          }
        }
        .action {
          span {
            display: inline-block;
            width: 1.1rem;
            line-height: 0.4rem;
            text-align: center;
            height: 0.4rem;
            border: 1px solid rgba(51, 113, 255, 1);
            border-radius: 0.04rem;
            cursor: pointer;
          }
          .cancle {
            font-size: 0.14rem;
            font-weight: 400;
            color: rgba(51, 113, 255, 1);
          }
          .recall {
            margin-left: 0.2rem;
            background: rgba(51, 113, 255, 1);
            color: #fff;
          }
        }
      }
      .area {
        margin-top: 0.2rem;
        position: relative;

        textarea {
          width: 100%;
          height: 2.2rem;
          resize: none;
          border: 1px solid rgba(238, 238, 238, 1);
          outline: none;
          padding: 0.2rem;
          font-size: 0.14rem;
          font-weight: 400;
          color: #444;
          line-height: 0.3rem;
        }
      }
    }
  }
}
@media only screen and (min-width: 320px) and (max-width: 768px) {
  .topicDetail {
    .content {
      width: 90%;
      .category {
        font-size: 0.36rem;
      }
      .detail {
        .tagName {
          font-size: 0.48rem;
        }
        .user {
          .userIcon {
            width: 1rem;
            height: 1rem;
          }
          .name {
            .userName {
              font-size: 0.36rem;
            }
            .modifyTime {
              font-size: 0.3rem;
            }
          }
        }
        .article {
          margin-top: 0.8rem;
          margin-bottom: 0.4rem;
          p,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          li,
          code,
          a {
            line-height: 1.2rem;
          }
          p {
            img {
              margin: 0.5rem 0rem;
            }
          }
          pre {
            margin: 0.5rem 0rem;
            font-size: 0.4rem;
          }
        }
      }
    }
  }
}
</style>
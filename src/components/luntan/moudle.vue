<template>
<div class="luntan">
  <header-view></header-view>
	<div class="content">
    <top-view></top-view>
		<div class="list">
			<div class="item" v-for="(item,index) in dataList" :key="index">
        <div class="module"  @click="toSingle(item.id)">
          <div class="name">
            <img :src="item.icon" v-if="item.tagTopicVo" class="img">
            <div class="info">
              <div class="title">{{item.title}}</div>
              <div class="description">{{item.description}}</div>
            </div>
          </div>
          <div class="act">
            <div class="el">
              <div class="num">{{item.topicCount}}</div>
              <div class="remark">主题</div>
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
        <div class="none" v-if="!item.tagTopicVo">没有新主题</div>
        <div class="newest" v-if="item.tagTopicVo"  @click="toDetail(item.tagTopicVo.id)">
          <img :src="item.tagTopicVo.icon" v-if="item.tagTopicVo.icon" class="pic">
          <div class="user">
            <div class="username">
              <span class="txt">{{item.tagTopicVo.userName}}</span>
              <span class="time">{{item.tagTopicVo.modifyTime}}</span>
            </div>
            <div class="comment" v-html="item.tagTopicVo.title"></div>
          </div>
        </div>
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
      dataList: []
    };
  },
  methods: {
    toSingle(id) {
      this.$router.push({
        path: "/luntan/moudle/single",
        query: { tagId: id }
      });
    },
    toDetail(id) {
      this.$router.push({
        path: "/luntan/topic/detail",
        query: { topicId: id }
      });
    },
    getTagCombobox() {
      this.$http.get("/bbs/tagList").then(response => {
        if (response.data.code == 0) {
          this.dataList = response.data.data;
        } else {
          this.$Message.error(response.data.message);
        }
      });
    }
  },
  created() {
    this.getTagCombobox();
  }
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
    .list {
      padding-bottom: 0.2rem;
      .item {
        background: #fff;
        margin-top: 0.2rem;
        .module {
          padding: 0.2rem;
          border-bottom: 1px solid rgba(242, 242, 242, 1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0px;
          cursor: pointer;
          &:hover {
            background: #efefef;
          }
          .name {
            .img {
              width: 0.68rem;
              height: 0.68rem;
            }
            .info {
              margin-left: 0.3rem;
              font-size: 0px;
              display: inline-block;
              .title {
                font-size: 0.26rem;
                font-weight: 400;
                color: rgba(77, 77, 77, 1);
              }
              .description {
                margin-top: 0.1rem;
                font-size: 0.16rem;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
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
        .none {
          font-size: 0.14rem;
          font-weight: 400;
          color: rgba(77, 77, 77, 1);
          padding: 0.2rem;
          padding-left: calc(
            0.2rem + 0.68rem + 0.2rem + 0.36rem + 0.2rem + 0.1rem
          );
        }
        .newest {
          padding: 0.2rem;
          padding-left: calc(0.2rem + 0.68rem + 0.2rem + 0.1rem);
          display: flex;
          justify-content: flex-start;
          align-items: top;
          font-size: 0px;
          cursor: pointer;
          &:hover {
            background: #efefef;
          }
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
              max-height: 40px;
              line-height: 20px;
              overflow: hidden;
              position: relative;
              padding-right: 0.2rem;
              &::after {
                content: "...";
                position: absolute;
                top: 20px;
                right: 0rem;
                color: rgba(77, 77, 77, 1);
              }
            }
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 320px) and (max-width: 768px) {
  .luntan {
    .content {
      width: 90%;
      .list {
        .item {
          margin-top: 0.4rem;
          .module {
            .name {
              .info {
                .title {
                  font-size: 0.36rem;
                }
                .description {
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
          .none {
            font-size: 0.3rem;
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

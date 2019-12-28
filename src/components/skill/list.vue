<template>
<div class="skillList">
    <header-view></header-view>
    <div class="list">
        <div class="item" v-for="(item,index) in dataList" :key="index" @click="toDetail(item.id)">
            <img :src="item.thumbPath" v-if="item.thumbPath" class="pic" />
            <div class="text">
                <div class="title">{{item.articleTitle}}</div>
                <div class="info" v-html='item.articleContiner'></div>
                <div class="label">
                    <span v-for="el in item.keyWord" :key="el">{{el}}</span>
                </div>
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
      dataList: []
    };
  },
  methods: {
    toDetail(id) {
      this.$router.push({
        path: "/skill/detail",
        query: {
          id: id
        }
      });
    },
    getArticleList() {
      this.$http.get("/article/articleList").then(response => {
        if (response.data.code == 0) {
          this.dataList = response.data.data.content;
        } else {
          this.$Message.error(response.data.message);
        }
      });
    }
  },
  created() {
    this.getArticleList();
  }
};
</script>

<style lang="less" >
.skillList {
  background: rgba(250, 250, 250, 1);
  min-height: 100vh;

  .list {
    width: 12rem;
    margin: auto;
    padding-bottom: 0.2rem;

    .item {
      padding: 0.2rem;
      width: 100%;
      border-radius: 4px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      margin-top: 0.2rem;
      cursor: pointer;
      &:hover {
        background: #f5f5f5;
      }

      .pic {
        width: 2.1rem;
        height: 2.1rem;
      }

      .text {
        margin-left: 0.2rem;
        width: calc(100% - 2.1rem - 0.2rem);

        .title {
          font-size: 0.3rem;
          font-weight: bold;
          color: rgba(77, 77, 77, 1);
        }

        .info {
          font-size: 0.16rem;
          color: rgba(128, 128, 128, 1);
          margin-top: 0.2rem;
          height: 0.6rem;
          line-height: 0.3rem;
          padding-right: 0.2rem;
          overflow: hidden;
          position: relative;
          &:after {
            position: absolute;
            bottom: 0px;
            right: 0.1rem;
            content: "...";
            color: rgba(128, 128, 128, 1);
            font-size: 0.16rem;
          }
          * {
            font-size: 0.16rem !important;
            color: rgba(128, 128, 128, 1);
            font-weight: normal !important;
            font-style: normal !important;
          }
        }

        .label {
          margin-top: 0.3rem;

          span {
            font-size: 0.16rem;
            border: 1px solid rgba(30, 133, 230, 1);
            font-weight: 400;
            border-radius: 4px;
            padding: 0.05rem 0.1rem;
            color: rgba(30, 133, 230, 1);
            margin-right: 0.2rem;
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 320px) and (max-width: 768px) {
  .skillList {
    .list {
      width: 90%;

      .item {
        padding: 0.4rem;
        .pic {
          width: 2.1rem;
          height: 2.1rem;
        }

        .text {
          .title {
            font-size: 0.4rem;
          }

          .info {
            font-size: 0.36rem;
            height: 0.6rem;
            line-height: 0.6rem;
            &:after {
              font-size: 0.3rem;
            }
            * {
              font-size: 0.3rem !important;
              max-width: 100%;
            }
          }

          .label {
            span {
              font-size: 0.3rem;
            }
          }
        }
      }
    }
  }
}
</style>

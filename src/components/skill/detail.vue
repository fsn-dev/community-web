<template>
<div class="skill">
    <header-view></header-view>
    <div class="top">
      <span class="txt" @click="toList()">技术文章</span>
      <span class="sp">/</span>
      <span class="title">{{detail.articleTitle}}</span>
    </div>
    <div class="content">
        <div class="articleTitle">{{detail.articleTitle}}</div>
        <div class="info">
            <div class="author">{{detail.author}}</div>
            <div class="time">{{detail.time}}</div>
        </div>
        <div class="articleContiner" v-html="detail.articleContiner"></div>
    </div>
    <div class="other">
      <div class="prev" @click="getCurDetail(lastArticle.id)" v-if="lastArticle.show">
        <div class="text">上一篇：</div>
        <div class="title">{{lastArticle.articleTitle}}</div>
      </div>
       <div class="next"  @click="getCurDetail(nextArticle.id)" v-if="nextArticle.show">
        <div class="text">下一篇：</div>
        <div class="title">{{nextArticle.articleTitle}}</div>
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
      detail: {
        articleContiner: "",
        articleContinerMD: "",
        articleTitle: "",
        author: "",
        thumbPath: "",
        time: "",
        keyWord: []
      },
      lastArticle: {
        id: "",
        articleTitle: ""
      },
      nextArticle: {
        id: "",
        articleTitle: ""
      }
    };
  },
  methods: {
    toList() {
      this.$router.push("/skill/list");
    },
    getById() {
      this.$http
        .get("/article/byId", {
          params: {
            id: this.$route.query.id
          }
        })
        .then(response => {
          if (response.data.code == 0) {
            this.detail = response.data.data.detail;
            this.lastArticle = response.data.data.lastArticle;
            this.nextArticle = response.data.data.nextArticle;
          } else {
            this.$Message.error(response.data.message);
          }
        });
    },
    getCurDetail(id) {
      this.$router.push({
        query: {
          id: id
        }
      });
      this.$route.query.id = id;
      this.getById();
    }
  },
  created() {
    this.getById();
  }
};
</script>

<style lang="less" scoped>
.skill {
  background: rgba(250, 250, 250, 1);
  min-height: 100vh;
  position: relative;
  .top {
    font-size: 0.14rem;
    width: 12rem;
    margin: auto;
    margin-top: 0.2rem;
    .txt {
      color: #1e85e6;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    .sp {
      margin: 0rem 0.1rem;
    }
    .title {
      color: #808080;
    }
  }
  .content {
    width: 12rem;
    background: #fff;
    padding: 0.2rem 0.5rem;
    margin: 0.2rem auto;
    box-sizing: border-box;
    font-size: 0.14rem;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);

    .articleTitle {
      font-size: 0.36rem;
      font-weight: bold;
      color: rgba(77, 77, 77, 1);
      margin: 0.2rem;
      text-align: center;
    }
    .info {
      display: flex;
      justify-content: space-between;
      margin: 0.4rem 0rem;
    }
    .articleContiner {
      line-height: 0.4rem;
      p {
        img {
          width: 100%;
        }
      }
    }
  }

  .other {
    position: absolute;
    left: 0.2rem;
    top: 1.8rem;
    .prev,
    .next {
      background: #fff;
      width: 3rem;
      margin-bottom: 0.5rem;
      padding: 0.2rem;
      font-size: 0.14rem;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      cursor: pointer;
      &:hover {
        background: #f5f5f5;
      }
      .text {
        margin-bottom: 0.1rem;
      }
    }
  }
}
@media only screen and (min-width: 320px) and (max-width: 768px) {
  .skill {
    .top {
      font-size: 0.4rem;
      width: 90%;
    }
    .content {
      width: 80%;
      font-size: 0.4rem;
      float: right;

      .articleTitle {
        font-size: 0.48rem;
      }
      .articleContiner {
        line-height: 0.8rem;
      }
    }

    .other {
      top: 4rem;
      .prev,
      .next {
        font-size: 0.36rem;
      }
    }
  }
}
</style>

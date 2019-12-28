<template>
<div class="main">
    <header-view></header-view>
    <div class="title" @click="toList()">赏金任务列表</div>
    <div class="reward">
        <img :src="globalImgPath.finish" class="finish" v-if="detail.state * 1 == 2">
        <div class="name">{{detail.title}}</div>
        <div class="info">
            <span>状态：{{detail.statusInformation}}</span>
            <span style="margin-left:1rem;">{{detail.time}}</span>
        </div>
        <div class="price">
            <span>赏金任务:</span>
            <span class="num">{{detail.bonus}}</span>
            <span>最高</span>
            <span>FSN</span>
        </div>
        <div class="des">方案:</div>
        <div class="con">{{detail.scheme}}</div>
        <div class="file">附件：（点击附件下载）</div>
        <div class="files">
          <div class="el" v-for="(item,i) in detail.accessorys" :key="i" @click="download(item.url)">
            <a :download="item.name" :href="item.url">
              <img :src="globalImgPath.doc" v-if="getFileType(item.type) == 'word'">
              <img :src="globalImgPath.img" v-if="getFileType(item.type) == 'image'">
              <img :src="globalImgPath.pdf" v-if="getFileType(item.type) == 'pdf'">
              <img :src="globalImgPath.xls" v-if="getFileType(item.type) == 'excel'">
              <img :src="globalImgPath.txt" v-if="getFileType(item.type) == 'other'">
              <div class="filename">{{item.name}}.{{item.type}}</div>
            </a>
          </div>
        </div>
        <div class="act" @click="sign()" v-if="state">立即报名</div>
        <div style="clear:both;"></div>
        <div class="person">参与人</div>
        <div class="join">
            <div class="el" v-for="(item,i) in detail.participants" :key="i">
                <img :src="item.headPortrait" v-if="item.headPortrait">
                <span>{{item.username}}</span>
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
      detail: {
        state: false,
        accessory: [],
        participants: []
      }
    };
  },
  methods: {
    toList() {
      this.$router.push("/reward");
    },
    sign() {
      this.$router.push({
        path: "/reward/sign",
        query: {
          id: this.id,
          title: this.detail.title
        }
      });
    },
    getTask() {
      this.$http
        .get("/task", {
          params: {
            id: this.id
          }
        })
        .then(response => {
          if (response.data.code == 0) {
            this.detail = response.data.data;
          } else {
            this.$Message.error(response.data.message);
          }
        });
    },
    getFileType(type) {
      let typeTxt = "other";
      switch (type) {
        case "doc":
        case "docx":
          typeTxt = "word";
          break;
        case "xls":
        case "xlsx":
          typeTxt = "excel";
          break;
        case "pdf":
          typeTxt = "pdf";
          break;
        case "png":
        case "jpg":
        case "jpeg":
          typeTxt = "image";
          break;
      }
      return typeTxt;
    },
    download(url) {
      window.location.href = url;
    },
    getButton() {
      this.$http
        .get("/integral/button", {
          params: {
            id: this.id,
            type: 1
          }
        })
        .then(response => {
          if (response.data.code == 0) {
            this.state = response.data.data.state;
          } else {
            this.$Message.error(response.data.message);
          }
        });
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.getButton();
    this.getTask();
  }
};
</script>

<style lang="less" scoped>
.main {
  background: rgba(250, 250, 250, 1);
  min-height: 100vh;

  .title {
    font-size: 0.2rem;
    font-weight: 400;
    color: rgba(30, 133, 230, 1);
    width: 12rem;
    margin: auto;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .reward {
    width: 12rem;
    margin: auto;
    background: #fff;
    padding: 0.2rem;
    position: relative;

    .finish {
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
      width: 1.3rem;
    }

    .name {
      font-size: 0.26rem;
      font-weight: 400;
      color: rgba(30, 133, 230, 1);
    }

    .info {
      font-size: 0.16rem;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin-top: 0.2rem;
    }

    .price {
      margin-top: 0.5rem;
      font-size: 0.2rem;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);

      .num {
        color: #666666;
        font-size: 0.26rem;
        font-weight: bold;
      }

      span {
        margin-right: 0.1rem;
      }
    }

    .mark,
    .con {
      margin-top: 0.2rem;
      font-size: 0.16rem;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }

    .des {
      margin-top: 0.5rem;
      font-size: 0.2rem;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }

    .file {
      margin-top: 0.5rem;
      font-size: 0.2rem;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }

    .files {
      margin-top: 0.2rem;
      display: flex;
      justify-content: flex-start;
      .el {
        margin: 0rem 0.2rem;
        text-align: center;
        cursor: pointer;
        a {
          padding: 0.2rem;
          display: block;
          background: #efefef;
          border-radius: 0.1rem;
          img {
            width: 0.6rem;
          }
          .filename {
            margin-top: 0.1rem;
            color: #666666;
          }
        }
      }
    }

    .act {
      width: 1.8rem;
      height: 0.64rem;
      line-height: 0.64rem;
      text-align: center;
      font-size: 0.2rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      background: rgba(30, 133, 230, 1);
      border-radius: 4px;
      margin-top: 0.2rem;
      cursor: pointer;
      float: right;
    }

    .person {
      margin-top: 0.5rem;
      font-size: 0.2rem;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      font-weight: bold;
    }

    .join {
      margin-top: 0.2rem;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .el {
        margin: 0.1rem;
        width: 1.3rem;
        height: 1.7rem;
        background: rgba(238, 238, 238, 1);
        border: 1px solid rgba(238, 238, 238, 1);
        border-radius: 4px;
        text-align: center;
        img {
          width: 0.68rem;
          height: 0.68rem;
          border-radius: 100%;
          margin: auto;
          display: block;
          margin-top: 0.2rem;
        }
        span {
          font-size: 0.2rem;
          margin-top: 0.2rem;
          display: block;
          text-align: center;
          font-weight: 400;
          color: rgba(77, 77, 77, 1);
        }
      }
    }
  }
}
@media only screen and (min-width: 320px) and (max-width: 768px) {
  .main {
    .title {
      font-size: 0.36rem;
      width: 90%;
    }

    .reward {
      width: 90%;

      .name {
        font-size: 0.4rem;
      }

      .info {
        font-size: 0.3rem;
      }

      .price {
        font-size: 0.36rem;

        .num {
          font-size: 0.4rem;
        }
      }

      .mark,
      .con {
        font-size: 0.3rem;
      }

      .des {
        font-size: 0.36rem;
      }

      .file {
        font-size: 0.36rem;
      }

      .files {
        .el {
          margin: 0rem 0.2rem;
          text-align: center;
          cursor: pointer;
          a {
            img {
              width: 0.8rem;
            }
            .filename {
              font-size: 0.3rem;
            }
          }
        }
      }

      .act {
        font-size: 0.36rem;
        width: 3rem;
        height: 0.64rem;
        line-height: 0.64rem;
      }

      .person {
        font-size: 0.36rem;
      }

      .join {
        .el {
          width: 1.6rem;
          height: 2rem;
          img {
            width: 0.9rem;
            height: 0.9rem;
          }
          span {
            font-size: 0.36rem;
          }
        }
      }
    }
  }
}
</style>

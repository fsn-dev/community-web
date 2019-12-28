<template>
<div class="skill">
    <header-view></header-view>
    <div class="list">
        <div class="item" v-for="(item,index) in dataList" :key="index" @click="toDetail(item.id)">
            <div class="text">
                <div class="title">{{item.title}}</div>
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
        path: "/doc/detail",
        query: {
          id: id
        }
      });
    },
    getDocumentList() {
      this.$http.get("/document/list").then(response => {
        if (response.data.code == 0) {
          this.dataList = response.data.data[0].list;
        } else {
          this.$Message.error(response.data.message);
        }
      });
    }
  },
  created() {
    this.getDocumentList();
  }
};
</script>

<style lang="less" scoped>
.skill {
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
          font-weight: 400;
          color: rgba(128, 128, 128, 1);
          margin-top: 0.2rem;
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
  .skill {
    .list {
      width: 90%;
      .item {
        padding: 0.4rem;
        margin-top: 0.6rem;

        &:hover {
          background: #f5f5f5;
        }

        .text {
          .title {
            font-size: 0.4rem;
          }

          .info {
            font-size: 0.3rem;
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

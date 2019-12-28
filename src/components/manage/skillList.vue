<template>
<div class="manage">
    <menu-view></menu-view>
    <div class="skiiList">
        <div class="top">
            <img :src="globalImgPath.avatar" class="avatar">
            <span class="txt">天选之子</span>
        </div>
        <div class="name">文章列表</div>
        <div class="content">
            <div class="table">
            		<div class="btn" @click="toPage('/manage/newSkill')">发布文章</div>
                <table>
                    <thead>
                        <tr>
                            <th>标题</th>
                            <th>创建时间</th>
                            <th>作者</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in dataList" :key="item.id">
                            <td>{{item.articleTitle}}</td>
                            <td>{{item.time}}</td>
                            <td>{{item.author}}</td>
                            <td>
                                <span class="edit" @click="toEdit(item.id)">编辑</span>
                                <span class="delete" @click="deleteArticle(item.id)">删除</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
             <div class="page">
                <Page :total="total" :current="page" :page-size="pageSize" size="small"  @on-change="changePage"/>
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
      total: 0,
      page: 1,
      pageSize: 10
    };
  },
  methods: {
    toPage(url) {
      this.$router.push(url);
    },
    toEdit(id) {
      this.$router.push({
        path: "/manage/editSkill",
        query: {
          id: id
        }
      });
    },
    getArticleListBack() {
      this.$http
        .get("/article/articleListBack", {
          params: {
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
    changePage(page) {
      this.page = page;
      this.getArticleListBack();
    },
    deleteArticle(id) {
      this.$http
        .delete("/article", {
          params: {
            id: id
          }
        })
        .then(response => {
          if (response.data.code == 0) {
            this.$Message.success(response.data.data);
            this.page = 1;
            this.getArticleListBack();
          } else {
            this.$Message.error(response.data.message);
          }
        });
    }
  },
  created() {
    this.getArticleListBack();
  }
};
</script>

<style lang="less" scoped>
.manage {
  display: flex;
  justify-content: space-between;
  font-size: 0px;

  .skiiList {
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
    }

    .content {
      padding: 0.2rem;
      background: #f0f2f5;

      .table {
        padding: 0.2rem;
        background: #fff;
        .btn {
          width: 0.9rem;
          height: 0.32rem;
          background: rgba(24, 144, 255, 1);
          border-radius: 0.04rem;
          font-size: 0.14rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          text-align: center;
          line-height: 0.32rem;
          cursor: pointer;
        }
        table {
          width: 100%;
          margin-top: 0.2rem;
          border-collapse: collapse;
          border: 0px;
          thead {
            tr {
              th {
                background: rgba(250, 250, 250, 1);
                font-size: 0.14rem;
                font-weight: 400;
                color: rgba(0, 0, 0, 1);
                border: 1px solid rgba(232, 232, 232, 1);
                opacity: 0.85;
                border-left: 0px;
                border-right: 0px;
                padding: 0.1rem;
                text-align: left;
              }
            }
          }

          tbody {
            tr {
              td {
                font-size: 0.14rem;
                font-weight: 400;
                color: rgba(1, 1, 1, 1);
                opacity: 0.65;
                border: 1px solid rgba(232, 232, 232, 1);
                padding: 0.1rem;
                border-left: 0px;
                border-right: 0px;
                span {
                  color: rgba(24, 144, 255, 1);
                  cursor: pointer;
                  &:hover {
                    text-decoration: underline;
                  }
                }
                .delete {
                  margin-left: 0.2rem;
                }
              }
            }
          }
        }
      }

      .page {
        margin-top: 0.2rem;
        text-align: right;
      }
    }
  }
}
</style>

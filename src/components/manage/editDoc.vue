<template>
<div class="manage">
    <menu-view></menu-view>
    <div class="skiiList">
        <div class="top">
            <img :src="globalImgPath.avatar" class="avatar">
            <span class="txt">天选之子</span>
        </div>
        <div class="name">编辑文档</div>
        <div class="content">
            <div class="panel">
                <div class="action">
                    <span class="modify" @click="modifyDoc()">修改</span>
                    <span class="cancle" @click="cancleData()">取消</span>
                </div>
                <div class="title">
                    <span class="require">*</span>
                    <span class="txt">标题</span>
                    <input type="text" placeholder="请输入文章标题，5-30个汉字之间" v-model="editObj.title" />
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
		<Modal
        v-model="cancleModel"
        title="取消"
		ok-text="是"
		cancel-text="否"
        @on-ok="confirmCancle"
        @on-cancel="cancleModel = false">
        <p>确认取消修改？</p>
    </Modal>
    </div>
</div>
</template>

<script>
import menuView from "@/components/manage/menu";
import navBar from "@/components/markdown/navBar.vue";
import inputer from "@/components/markdown/inputer.vue";
import outputer from "@/components/markdown/outputer.vue";
export default {
  components: {
    menuView,
    navBar,
    inputer,
    outputer
  },
  data() {
    return {
      editObj: {
        id: null,
        title: ""
      },
      cancleModel: false
    };
  },
  methods: {
    trrigerInput() {
      document.getElementById("picture").click();
    },
    changePic(e) {
      let file = e.srcElement.files[0];
      let formdata = new FormData();
      formdata.append("file", file);
      this.$http.post("/file/photo", formdata).then(response => {
        if (response.data.code == 0) {
          this.editObj.thumbPath = response.data.data;
        } else {
          this.$Message.error(response.data.message);
        }
      });
    },
    modifyDoc() {
      let flag = true;
      if (!this.editObj.title) {
        this.$Message.error("请输入标题");
        flag = false;
      } else if (!this.$store.getters.articleMd) {
        this.$Message.error("请输入内容");
        flag = false;
      }
      if (flag) {
        this.$http
          .post(
            "/document",
            {
              id: this.$route.query.id,
              title: this.editObj.title,
              contentHTML: this.$store.getters.articleMd,
              contentMD: this.$store.getters.articleRaw
            },
            {
              emulateJSON: true
            }
          )
          .then(response => {
            if (response.data.code == 0) {
              this.$Message.success(response.data.message);
            } else {
              this.$Message.error(response.data.message);
            }
          });
      }
    },
    getByIdBack() {
      this.$http
        .get("/document/byId", {
          params: {
            id: this.$route.query.id
          }
        })
        .then(response => {
          if (response.data.code == 0) {
            this.editObj = response.data.data;
            this.$store.state.articleList[0].content =
              response.data.data.contentMD;
          } else {
            this.$Message.error(response.data.message);
          }
        });
    },
    cancleData() {
      this.cancleModel = true;
    },
    confirmCancle() {
      this.getByIdBack();
      this.cancleModel = false;
    }
  },
  created() {
    this.getByIdBack();
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

      .panel {
        padding: 0.2rem;
        padding-bottom: 1rem;
        background: #fff;
        position: relative;

        .action {
          position: absolute;
          right: 0.2rem;
          top: 0.2rem;

          cursor: pointer;

          .modify {
            background: rgba(24, 144, 255, 1);
            width: 0.8rem;
            height: 0.32rem;
            line-height: 0.32rem;
            text-align: center;
            border-radius: 4px;
            font-size: 0.14rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            display: inline-block;
          }

          .cancle {
            background: rgb(227, 228, 230);
            width: 0.8rem;
            display: inline-block;
            height: 0.32rem;
            line-height: 0.32rem;
            text-align: center;
            border-radius: 4px;
            font-size: 0.14rem;
            font-weight: 400;
            color: rgb(134, 134, 134);
            margin-left: 0.2rem;
          }
        }

        .title,
        .author {
          padding-bottom: 0.2rem;
          font-size: 0px;

          .require {
            color: #f5222d;
            font-size: 0.14rem;
          }

          .txt {
            font-size: 0.14rem;
            font-weight: 400;
            color: rgba(77, 77, 77, 1);
            opacity: 0.85;
            margin-left: 0.1rem;
            display: inline-block;
            width: 0.6rem;
          }

          .image {
            width: 0.84rem;
            height: 0.84rem;
            margin-left: 0.1rem;
          }

          input {
            font-weight: 400;
            font-size: 0.14rem;
            color: rgba(0, 0, 0, 1);
            opacity: 0.45;
            width: 4.1rem;
            height: 0.32rem;
            margin-left: 0.1rem;
            border: 1px solid rgba(217, 217, 217, 1);
            border-radius: 0.04rem;
            line-height: 0.32rem;
            text-indent: 0.15rem;
            outline: none;
          }
        }

        .area {
          height: calc(100vh - 3.5rem);
        }
      }
    }
  }
}
</style>

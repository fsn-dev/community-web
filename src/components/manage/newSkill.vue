<template>
<div class="manage">
    <menu-view></menu-view>
    <div class="skiiList">
        <div class="top">
            <img :src="globalImgPath.avatar" class="avatar">
            <span class="txt">天选之子</span>
        </div>
        <div class="name">发布文章</div>
        <div class="content">
            <div class="panel">
                <div class="action" @click="postArticle()">发布</div>
                <div class="title">
                    <span class="require">*</span>
                    <span class="txt">标题</span>
                    <input type="text" placeholder="请输入文章标题，5-30个汉字之间"  v-model="newObj.articleTitle"/>
                </div>
                <div class="author">
                    <span class="require">*</span>
                    <span class="txt">作者</span>
                    <input type="text" placeholder="请输入文章作者" v-model="newObj.author"/>
                </div>
                <div class="author">
                    <span class="require">*</span>
                    <span class="txt">关键字</span>
                    <input type="text" placeholder="请输入关键字 多个用，分割" v-model="newObj.keyWord"/>
                </div>
                <div class="author">
                    <span class="require">*</span>
                    <span class="txt">图片</span>
                    <img :src="newObj.thumbPath"  v-if="newObj.thumbPath" class="image" @click="trrigerInput()">
                    <img :src="globalImgPath.image" v-if="!newObj.thumbPath" class="image" @click="trrigerInput()">
                    <input type="file" id="picture" @change="changePic" style="visibility: hidden;"/>
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
      newObj: {
        id: null,
        articleTitle: "",
        author: "",
        keyWord: "",
        thumbPath: null
      }
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
          this.newObj.thumbPath = response.data.data;
        } else {
          this.$Message.error(response.data.message);
        }
      });
    },
    postArticle() {
      let flag = true;
      if (!this.newObj.articleTitle) {
        this.$Message.error("请输入标题");
        flag = false;
      } else if (!this.newObj.author) {
        this.$Message.error("请输入作者");
        flag = false;
      } else if (!this.newObj.keyWord) {
        this.$Message.error("请输入关键字");
        flag = false;
      } else if (!this.newObj.thumbPath) {
        this.$Message.error("请选择图片");
        flag = false;
      } else if (!this.$store.getters.articleMd) {
        this.$Message.error("请输入内容");
        flag = false;
      }
      if (flag) {
        this.$http
          .post(
            "/article",
            {
              id: this.newObj.id,
              articleTitle: this.newObj.articleTitle,
              author: this.newObj.author,
              keyWord: this.newObj.keyWord,
              thumbPath: this.newObj.thumbPath,
              articleContiner: this.$store.getters.articleMd,
              articleContinerMD: this.$store.getters.articleRaw
            },
            {
              emulateJSON: true
            }
          )
          .then(response => {
            if (response.data.code == 0) {
              this.$Message.success(response.data.message);
              this.$router.push("/manage/skillList");
            } else {
              this.$Message.error(response.data.message);
            }
          });
      }
    }
  },
  created() {
    this.$store.state.articleList[0].content = "";
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
          width: 0.8rem;
          height: 0.32rem;
          line-height: 0.32rem;
          text-align: center;
          background: rgba(24, 144, 255, 1);
          border-radius: 4px;
          font-size: 0.14rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          cursor: pointer;
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
          height: calc(100vh - 5.6rem);
        }
      }
    }
  }
}
</style>

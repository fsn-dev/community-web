<template>
<div class="luntan publish">
    <header-view></header-view>
   <div class="editor">
        <img :src="globalImgPath.l_back" class="back2" @click="toBack()">
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
import navBar from "@/components/markdown/navBar.vue";
import inputer from "@/components/markdown/inputer.vue";
import outputer from "@/components/markdown/outputer.vue";

export default {
  components: {
    headerView,
    navBar,
    inputer,
    outputer
  },
  data() {
    return {
      tagCombobox: [],
      newTopic: {
        title: "",
        tagId: -1
      }
    };
  },
  methods: {
    toBack() {
      this.$router.go(-1);
      this.$store.commit("FULLSCREEN");
    },
    hideEditor() {
      this.$router.go(-1);
      this.$store.commit("FULLSCREEN");
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
    }
  },
  created() {
    this.getTagCombobox();
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.luntan {
  background: #fff;
  min-height: 100vh;
  .header {
    background: #fff;
  }
  .editor {
    width: 100%;
    height: calc(100vh - 1.1rem);
    padding: 0.4rem 0.8rem;
    background: #fff;
    box-shadow: -3px -4px 8px 0px rgba(165, 165, 165, 0.18);
    position: relative;
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
    .editor {
      .back2 {
        top: -0.5rem;
        left: 0.3rem;
        width: 1rem;
        height: 1rem;
      }
      .search {
        margin-top: 0.8rem;
        .name {
          span {
            font-size: 0.3rem;
          }

          input {
            width: 5rem;
            height: 0.8rem;
            line-height: 0.8rem;
            font-size: 0.36rem;
          }
        }
        .action {
          .category {
            width: 4rem;
          }
          .btn {
            width: 2rem;
            height: 0.8rem;
            font-size: 0.36rem;
            line-height: 0.8rem;
          }
        }
      }

      .area {
        padding-top: 0.8rem;
        padding-bottom: 0.2rem;
        height: 9rem;
      }
    }
  }
}
</style>


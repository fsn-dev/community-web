<template>
<div class="main">
    <header-view></header-view>
    <div class="title" @click="toDetail()">赏金任务列表 / {{title}}</div>
    <div class="reward">
        <div class="label">提交方案</div>
        <div class="des">
            <span class="require">*</span>
            <span class="txt">方案</span>
            <textarea placeholder="输入联系方式（微信+手机号+邮箱）描述你的计划或者方案(请仔细填写，直接影响中标结果)" v-model="scheme"></textarea>
        </div>
        <div class="file" @click="triggerInput()">+ 附件</div>
        <input type="file" id="file" @change="selectFile" style="display:none">
        <div class="fileName">
            <span v-for="(item,i) in accessoryTxt" :key="i">{{item}}</span>
        </div>
        <div class="act" @click="postProposal()">提交</div>

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
      id: "",
      title: "",
      scheme: "",
      accessory: [],
      accessoryTxt: []
    };
  },
  methods: {
    toDetail() {
      this.$router.push({
        path: "/reward/detail",
        query: {
          id: this.id
        }
      });
    },
    postProposal() {
      this.$http
        .post(
          "/task/proposal",
          {
            rewardTaskId: this.id,
            scheme: this.scheme,
            accessory: this.accessory.join(",")
          },
          {
            emulateJSON: true
          }
        )
        .then(response => {
          if (response.data.code == 0) {
            this.$Message.success("报名成功");
            this.toDetail();
          } else {
            this.$Message.error(response.data.message);
          }
        });
    },

    triggerInput() {
      document.getElementById("file").click();
    },
    selectFile(e) {
      this.postFile(e.target.files[0]);
    },

    postFile(file) {
      let formData = new FormData();
      formData.append("file", file);
      this.$http.post("/file/photo", formData).then(response => {
        if (response.data.code == 0) {
          this.accessory.push(response.data.data);
          this.accessoryTxt.push(file.name);
        } else {
          this.$Message.error(response.data.message);
        }
      });
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.title = this.$route.query.title;
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

    .label {
      font-size: 0.26rem;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }

    .des {
      padding-bottom: 0.3rem;
      font-size: 0px;
      margin-top: 0.5rem;

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

      textarea {
        width: 8.5rem;
        padding: 0.2rem;
        height: 2rem;
        resize: none;
        vertical-align: top;
        margin-left: 0.1rem;
        border: 1px solid rgba(217, 217, 217, 1);
        border-radius: 0.04rem;
        bottom: 1px solid #d9d9d9;
        outline: none;
        font-weight: 400;
        font-size: 0.14rem;
        color: #666;
      }

      .image {
        width: 0.84rem;
        height: 0.84rem;
        margin-left: 0.1rem;
      }

      input {
        font-weight: 400;
        font-size: 0.14rem;
        color: #666;
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

    .file {
      font-size: 0.14rem;
      font-weight: 400;
      color: rgba(30, 133, 230, 1);
      padding-left: 1rem;
      cursor: pointer;
    }

    .fileName {
      padding-left: 1rem;
      margin-top: 0.2rem;
      span {
        margin: 0rem 0.2rem;
      }
    }

    .time {
      margin-top: 0.3rem;
      .txt {
        font-size: 0.14rem;
        font-weight: 400;
        color: rgba(77, 77, 77, 1);
        opacity: 0.85;
        margin-left: 0.1rem;
        display: inline-block;
      }
    }

    .act {
      width: 0.8rem;
      height: 0.32rem;
      line-height: 0.32rem;
      text-align: center;
      color: #fff;
      font-size: 0.14rem;
      margin: auto;
      margin-top: 0.4rem;
      background: rgba(24, 144, 255, 1);
      border-radius: 4px;
      cursor: pointer;
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
      .label {
        font-size: 0.4rem;
      }

      .des {
        .require {
          font-size: 0.3rem;
        }

        .txt {
          font-size: 0.36rem;
          width: 1rem;
        }

        textarea {
          width: 12rem;
          height: 6rem;
          font-size: 0.3rem;
        }

        .image {
          width: 1.5rem;
          height: 1.5rem;
        }

        input {
          font-size: 0.3rem;
          width: 5rem;
          height: 0.6rem;
          line-height: 0.6rem;
        }
      }

      .file {
        font-size: 0.3rem;
      }

      .fileName {
        span {
          margin: 0rem 0.2rem;
          font-size: 0.3rem;
        }
      }

      .time {
        .txt {
          font-size: 0.3rem;
        }
      }

      .act {
        width: 1.5rem;
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.3rem;
      }
    }
  }
}
</style>

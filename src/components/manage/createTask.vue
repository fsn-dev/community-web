<template>
<div class="manage">
    <menu-view></menu-view>
    <div class="createTask">
        <div class="top">
            <img :src="globalImgPath.avatar" class="avatar">
            <span class="txt">天选之子</span>
        </div>
        <div class="name">创建赏金任务</div>
        <div class="content">
            <div class="panel">
                <div class="title">
                    <span class="require">*</span>
                    <span class="txt">标题</span>
                    <input type="text" placeholder="请输入任务标题" v-model="title" />
                </div>
                <div class="title">
                    <span class="require">*</span>
                    <span class="txt">赏金</span>
                    <input type="text" placeholder="请描述你要给这次任务设置的奖金" v-model="bonus" />
                </div>
                <div class="title">
                    <span class="require">*</span>
                    <span class="txt">方案</span>
                    <textarea placeholder="描述您的方案" v-model="scheme"></textarea>
                </div>
                <div class="file" @click="triggerInput()">+ 附件</div>
                <input type="file" id="file" @change="selectFile" style="display:none">
                <div class="fileName">
                    <span v-for="(item,i) in accessoryTxt" :key="i">{{item}}</span>
                </div>
                <div class="time">
                    <span class="txt">报名截止时间</span>
                    <DatePicker v-model="deadline" type="date" style="width: 200px;margin-left: 0.2rem;"></DatePicker>
                </div>
                <div class="act" @click="postTask()">提交</div>
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
      title: "",
      bonus: "",
      scheme: "",
      accessory: [],
      accessoryTxt: [],
      deadline: ""
    };
  },
  methods: {
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
    },
    postTask() {
      this.$http
        .post(
          "/task",
          {
            title: this.title,
            bonus: this.bonus,
            scheme: this.scheme,
            accessory: this.accessory.join(","),
            deadline: this.deadline
          },
          {
            emulateJSON: true
          }
        )
        .then(response => {
          if (response.data.code == 0) {
            this.$Message.success("发布成功");
          } else {
            this.$Message.error(response.data.message);
          }
        });
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
.manage {
  display: flex;
  justify-content: space-between;

  .createTask {
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
          padding-bottom: 0.3rem;
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

          textarea {
            width: 8.5rem;
            height: 2rem;
            resize: none;
            vertical-align: top;
            margin-left: 0.1rem;
            border: 1px solid rgba(217, 217, 217, 1);
            border-radius: 0.04rem;
            bottom: 1px solid #d9d9d9;
            outline: none;
            font-weight: 400;
            text-indent: 0.15rem;
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
  }
}
</style>

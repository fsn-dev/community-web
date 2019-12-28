<template>
<div class="main">
    <header-view></header-view>
    <div class="personal">
        <menu-view></menu-view>
        <div class="right">
            <div class="line">
                <span>昵称：</span>
                <input type="text" class="name" v-model="username">
            </div>
            <div class="line">
                <span>头像：</span>
                <img :src="$store.state.headPortrait" v-if="$store.state.headPortrait" @click="triggerInput()">
                <input type="file" id="file" @change="selectPhoto" style="display:none;">
            </div>
            <div class="act" @click="postInfo()">保存更改</div>
        </div>
    </div>
</div>
</template>

<script>
import headerView from "@/components/public/header";
import menuView from "@/components/personal/menu";

export default {
  components: {
    headerView,
    menuView
  },
  data() {
    return {
      username: "",
      headPortrait: ""
    };
  },
  methods: {
    triggerInput() {
      document.getElementById("file").click();
    },
    selectPhoto(e) {
      this.postPhoto(e.target.files[0]);
    },
    postPhoto(file) {
      let formData = new FormData();
      formData.append("file", file);
      this.$http.post("/file/photo", formData).then(response => {
        if (response.data.code == 0) {
          this.headPortrait = response.data.data;
          window.sessionStorage.setItem("headPortrait", this.headPortrait);
          this.$store.state.headPortrait = window.sessionStorage.getItem(
            "headPortrait"
          );
        } else {
          this.$Message.error(response.data.message);
        }
      });
    },
    postInfo() {
      if (this.username) {
        this.$http
          .post(
            "/authentications/info",
            {
              headPortrait: this.headPortrait,
              username: this.username
            },
            {
              emulateJSON: true
            }
          )
          .then(response => {
            if (response.data.code == 0) {
              this.$Message.success("修改成功");
              window.sessionStorage.setItem("userName", this.username);
              this.$store.state.userName = window.sessionStorage.getItem(
                "userName"
              );
            } else {
              this.$Message.error(response.data.message);
            }
          });
      } else {
        this.$Message.error("请输入昵称");
      }
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
.main {
  background: rgba(250, 250, 250, 1);
  min-height: 100vh;

  .personal {
    width: 12rem;
    margin: auto;
    margin-top: 0.2rem;
    display: flex;
    justify-content: space-between;
    .right {
      width: 9.2rem;
      background: #fff;
      padding: 0.2rem;

      .line {
        font-size: 0.16rem;
        font-weight: bold;
        color: rgba(77, 77, 77, 1);

        .name {
          width: 4rem;
          height: 0.32rem;
          line-height: 0.32rem;
          border: 1px solid rgba(238, 238, 238, 1);
          border-radius: 4px;
        }

        img {
          width: 1rem;
          height: 1rem;
          margin-top: 1rem;
        }
      }

      .act {
        width: 1rem;
        height: 0.42rem;
        line-height: 0.42rem;
        text-align: center;
        color: #fff;
        font-size: 0.16rem;
        margin: auto;
        margin-top: 1rem;
        background: rgba(30, 133, 230, 1);
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
}
@media only screen and (min-width: 320px) and (max-width: 768px) {
  .main {
    .personal {
      width: 90%;
      .right {
        width: 12rem;

        .line {
          font-size: 0.3rem;

          .name {
            width: 4rem;
            height: 0.6rem;
            line-height: 0.6rem;
          }
        }

        .act {
          width: 2rem;
          height: 0.6rem;
          line-height: 0.6rem;
          font-size: 0.36rem;
        }
      }
    }
  }
}
</style>

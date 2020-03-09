<template>
<div class="main">
    <header-view></header-view>
    <div class="slide first">
        <img :src="globalImgPath.banner" class="banner">
        <div class="link">
            <span @click="github()">GITHUB</span>
            <span @click="toDoc()">开发文档</span>
        </div>
    </div>
    <div class="slide second">
        <div class="title">Fusion：去中心化金融应用的最佳平台</div>
        <div class="info">
            <img :src="globalImgPath.img2" class="img2">
            <div class="text">
                <div class="item">
                    <div class="name">互操作性解决方案</div>
                    <div class="remark">Fusion的尖端DCRM技术确保了Fusion是加密货币领域中连接最紧密的生态系统。</div>
                </div>
                <div class="item">
                    <div class="name">API库</div>
                    <div class="remark">构建在Fusion之上很容易，因为它拥有丰富的本地api集，消除了对复杂智能契约编程的依赖。</div>
                </div>
                <div class="item">
                    <div class="name">时间价值货币化</div>
                    <div class="remark">通过结合Fusion独特的功能，用户可以很容易地从他们的数字资产中提取时间价值。</div>
                </div>
                <div class="item">
                    <div class="name">代币化金融工具</div>
                    <div class="remark">Fusion以其革命性的时间锁定功能，使得在区块链上重新创建基于时间的金融交易变得非常简单。</div>
                </div>
            </div>
        </div>
    </div>
    <div class="slide third">
        <div class="bg"></div>
        <div class="title">Fusion：创新技术</div>
        <div class="content">
            <div class="item">
                <img :src="globalImgPath.img3_1" class="pic pic1">
                <div class="info">
                    <div class="name">MPC</div>
                    <div class="remark">第二代多方安全计算针对无可信第三方情况下，安全地进行多方协同计算</div>
                </div>
            </div>
            <div class="item">
                <div class="info">
                    <div class="name">DCRM</div>
                    <div class="remark">分布式控制权管理将个人或组织手中的数字资产控制权移交为由非中心化的区块链管理</div>
                </div>
                <img :src="globalImgPath.img3_2" class="pic pic2">
            </div>
            <div class="item">
                <img :src="globalImgPath.img3_3" class="pic pic3">
                <div class="info">
                    <div class="name">TimeLock</div>
                    <div class="remark">时间锁实现数字资产使用权与所有权分离</div>
                </div>
            </div>
        </div>
    </div>
    <div class="slide fourth">
        <div class="title">成为Fusion开发者</div>
        <div class="tool">
            <div class="item">
                <img :src="globalImgPath.img4_1" class="img">
                <div class="txt">核心开发者</div>
            </div>
            <div class="item">
                <img :src="globalImgPath.img4_2" class="img">
                <div class="txt">工具开发者</div>
            </div>
            <div class="item">
                <img :src="globalImgPath.img4_3" class="img">
                <div class="txt">DAPP 开发者</div>
            </div>
            <div class="item">
                <img :src="globalImgPath.img4_4" class="img">
                <div class="txt">安全漏洞奖励</div>
            </div>
            <div class="item">
                <img :src="globalImgPath.img4_5" class="img">
                <div class="txt">开放性任务</div>
            </div>
            <div class="item">
                <img :src="globalImgPath.img4_6" class="img">
                <div class="txt">更多想法</div>
                <div class="remark">欢迎把您的设想发送到 dev@fusion.org</div>
            </div>
        </div>
    </div>
    <div class="footer">
        <img :src="globalImgPath.logo_white" class="logo">
        <div class="col">
            <div class="line line1">文档</div>
            <div class="line"><a target="_blank" href="https://github.com/FUSIONFoundation/Documentation">白皮书</a></div>
            <div class="line"><a target="_blank" href="https://github.com/FUSIONFoundation/Documentation">黄皮书</a></div>
            <div class="line"><a target="_blank" href="https://github.com/fsn-dev/fsn-rpc-api/blob/master/fsn-rpc-api.md">JSON-RPC</a></div>
            <div class="line"><a target="_blank" href="https://fusionapi.readthedocs.io/">API手册</a></div>
            <div class="line"><a target="_blank" href="https://fusionnetworks.zendesk.com/hc/en-us/categories/360001967614-Staking-On-Fusion-MainNet">Staking挖矿</a></div>
        </div>
        <div class="col">
            <div class="line line1">工具</div>
            <div class="line"><a target="_blank" href="https://www.myfusionwallet.com/">在线钱包</a></div>
            <div class="line"><a target="_blank" href="https://blocks.fusionnetwork.io/">区块浏览器</a></div>
            <div class="line"><a target="_blank" href="https://node.fusionnetwork.io/">节点监视器</a></div>
        </div>
        <div class="col">
            <div class="line line1">开发</div>
            <div class="line"><a target="_blank" href="https://github.com/FUSIONFoundation/efsn">Github源码</a></div>
            <div class="line"><a target="_blank" href="https://github.com/fsn-dev/dcrm-sdk">DCRM-SDK</a></div>
            <div class="line"><a target="_blank" href="https://api.fusionnetwork.io/">在线API</a></div>
            <div class="line"><a target="_blank" href="https://www.fusion.org/developers/bug-bounty">漏洞奖励</a></div>
            <div class="line"><a target="_blank" href="https://fsn.dev/faucet/">测试币水龙头</a></div>
        </div>
        <div class="col">
            <div class="line line1">社区链接</div>
            <div class="line"><a target="_blank" href="https://github.com/FUSIONFoundation">Github</a></div>
            <div class="line"><a target="_blank" href="https://twitter.com/FUSIONProtocol">Twitter</a></div>
            <div class="line"><a target="_blank" href="https://t.me/FsnDevCommunity">Telegram</a></div>
            <div class="line"><a target="_blank" href="https://medium.com/@fusionprotocol">Medium</a></div>
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
    return {};
  },
  methods: {
    github() {
      window.open("https://github.com/fsn-dev");
    },
    toDoc() {
      this.$router.push("/doc/list");
    },
    showLogin() {
      this.$router.push("/login");
    },
    showRegister() {
      this.$router.push("/register");
    },
    exitLogin() {
      this.$http.delete("/authentications").then(response => {
        if (response.data.code == 0) {
          this.$Message.success("退出登录成功");
          window.sessionStorage.setItem(
            "authentication",
            "76fcd84c-818f-4c60-9553-fb91c5969ee9"
          );
          this.$http.defaults.headers.common["authentication"] =
            "76fcd84c-818f-4c60-9553-fb91c5969ee9";
          window.sessionStorage.setItem("headPortrait", "");
          window.sessionStorage.setItem("loginStatus", 0);
        } else {
          this.$Message.error(response.data.message);
        }
      });
    },
    toPage(url) {
      this.$router.push("/" + url);
    }
  },
  created() {
    this.$store.state.loginStatus =
      window.sessionStorage.getItem("loginStatus") * 1;
    this.$store.state.headPortrait = window.sessionStorage.getItem(
      "headPortrait"
    );
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.main {
  .slide {
    .title {
      color: #333333;
      font-size: 0.42rem;
      text-align: center;
      font-weight: bold;
    }
  }

  .first {
    position: relative;
    width: 19.2rem;
    height: 8.54rem;
    margin-top: -1.11rem;

    .banner {
      position: relative;
      width: 19.2rem;
      height: 8.54rem;
      z-index: -1;
    }

    .link {
      position: absolute;
      top: 5.25rem;
      left: 3.6rem;
      font-size: 0px;
      z-index: 9;

      span {
        display: inline-block;
        width: 1.43rem;
        height: 0.6rem;
        line-height: 0.6rem;
        border-radius: 0.06rem;
        color: #fff;
        font-size: 0.2rem;
        cursor: pointer;
        background: linear-gradient(
          180deg,
          rgba(30, 199, 230, 1),
          rgba(30, 230, 223, 1)
        );
        text-align: center;
        margin-left: 0.96rem;
      }

      span:nth-child(1) {
        margin-left: 0px;
      }
    }
  }

  .second {
    position: relative;
    margin-top: 0.7rem;
    height: calc(6rem + 1.5rem + 0.44rem);

    .info {
      position: relative;
      margin-top: 1.5rem;

      .img2 {
        width: 7.56rem;
        position: absolute;
        top: 0px;
        left: 2.98rem;
      }

      .text {
        position: absolute;
        top: 0px;
        right: 3.7rem;

        .item {
          margin-top: 0.6rem;

          .name {
            color: #333;
            font-size: 0.2rem;
            font-weight: bold;
          }

          .remark {
            color: #666;
            font-size: 0.16rem;
            width: 4.86rem;
            margin-top: 0.2rem;
          }
        }

        .item:nth-child(1) {
          margin-top: 0px;
        }
      }
    }
  }

  .third {
    position: relative;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;

    .bg {
      background: rgba(30, 133, 230, 1);
      opacity: 0.1;
      height: 100%;
      width: 100%;
      z-index: -1;
      position: absolute;
      left: 0px;
      top: 0px;
    }

    .content {
      padding: 0px 3.6rem;

      .item {
        margin-top: 1.85rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0px;

        .pic1 {
          width: 4.11;
          height: 2.6rem;
        }

        .pic2 {
          width: 4.22;
          height: 2.66rem;
        }

        .pic3 {
          width: 4.18;
          height: 2.8rem;
        }

        .info {
          .name {
            font-size: 0.3rem;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
          }

          .remark {
            width: 5.13rem;
            font-size: 0.2rem;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
        }
      }
    }
  }

  .fourth {
    margin-top: 1rem;

    .contact {
      width: 1.8rem;
      height: 0.6rem;
      background: rgba(30, 200, 230, 1);
      border-radius: 0.06rem;
      margin: auto;
      font-size: 0.2rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      line-height: 0.6rem;
      margin-top: 0.4rem;
    }

    .tool {
      margin-left: 3.16rem;
      margin-right: 3.16rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      .item {
        text-align: center;
        width: 33.33%;
        margin-top: 1.29rem;

        .img {
          width: 1.05rem;
          height: 1.21rem;
        }

        .txt {
          margin-top: 0.4rem;
          font-size: 0.26rem;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }

        .remark {
          font-size: 0.14rem;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
  }

  .footer {
    padding: 0.57rem 3.63rem 1.93rem 4.5rem;
    background: #1e85e6;
    display: flex;
    justify-content: space-between;
    font-size: 0px;
    box-sizing: border-box;
    margin-top: 1rem;

    .logo {
      margin-right: 2rem;
      width: 1.13rem;
      height: 0.29rem;
    }

    .col {
      .line {
        font-size: 0.16rem;
        color: #fff;
        margin-bottom: 0.2rem;
        white-space: nowrap;
        a {
          color: inherit;
          text-decoration: none;
          cursor: pointer;
        }
      }

      .line1 {
        margin-bottom: 0.5rem;
        font-weight: bold;
        font-size: 0.18rem;
      }
    }
  }
}

@media only screen and (min-width: 320px) and (max-width: 768px) {
  .main {
    .first {
      margin-top: -1.5rem;
      .link {
        span {
          width: 2rem;
          margin-left: 0.3rem;
          font-size: 0.3rem;
        }
      }
    }
    .second {
      height: 11rem;

      .info {
        .img2 {
          width: 10rem;
          left: 0rem;
        }

        .text {
          .item {
            margin-top: 0.2rem;
            .name {
              font-size: 0.36rem;
            }
            .remark {
              font-size: 0.3rem;
              margin-top: 0.1rem;
            }
          }
        }
      }
    }
    .third {
      .content {
        .item {
          .info {
            .name {
              font-size: 0.36rem;
            }
            .remark {
              font-size: 0.3rem;
            }
          }
        }
      }
    }

    .footer {
      .logo {
        margin-right: 0.5rem;
        width: 2rem;
        height: 0.5rem;
      }
      .col {
        .line1 {
          font-size: 0.36rem;
        }
        .line {
          a {
            font-size: 0.3rem;
          }
        }
      }
    }
  }
}
</style>

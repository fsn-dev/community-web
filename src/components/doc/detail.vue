<template>
<div class="docDetail">
    <header-view></header-view>
    <div class="info">
      <span class="txt" @click="toList()">开发文档</span>
      <span class="sp">/</span>
      <span class="title">{{detail.title}}</span>
    </div>
    <div class="content">
        <div class="tree">
            <div class="nav" id="nav"></div>
        </div>
        <div class="doc">
            <div class="articleTitle">{{detail.title}}</div>
            <div class="articleContiner" v-html="detail.contentHTML"></div>
        </div>
    </div>
</div>
</template>

<script>
import headerView from "@/components/public/header";
import { setTimeout } from "timers";
let $;
export default {
  components: {
    headerView
  },
  data() {
    return {
      detail: {
        title: "",
        contentHTML: "",
        contentMD: ""
      }
    };
  },
  methods: {
    toList() {
      this.$router.push("/doc/list");
    },
    getById() {
      this.$http
        .get("/document/byId", {
          params: {
            id: this.$route.query.id
          }
        })
        .then(response => {
          if (response.data.code == 0) {
            this.detail = response.data.data;
            setTimeout(() => {
              this.getNav();
            }, 0);
          } else {
            this.$Message.error(response.data.message);
          }
        });
    },
    getNav() {
      let h1s = $(".articleContiner").find("h1");
      let h2s = $(".articleContiner").find("h2");
      let h3s = $(".articleContiner").find("h3");
      let h4s = $(".articleContiner").find("h4");
      let h5s = $(".articleContiner").find("h5");
      let h6s = $(".articleContiner").find("h6");

      let headCounts = [
        h1s.length,
        h2s.length,
        h3s.length,
        h4s.length,
        h5s.length,
        h6s.length
      ];
      let vH1Tag = null;
      let vH2Tag = null;
      let vH3Tag = null;
      let vH4Tag = null;
      let vH5Tag = null;
      let vH6Tag = null;
      for (let i = 0; i < headCounts.length; i++) {
        if (headCounts[i] > 0) {
          if (vH1Tag == null) {
            vH1Tag = "h" + (i + 1);
          } else if (vH2Tag == null) {
            vH2Tag = "h" + (i + 1);
          } else if (vH3Tag == null) {
            vH3Tag = "h" + (i + 1);
          } else if (vH4Tag == null) {
            vH4Tag = "h" + (i + 1);
          } else if (vH5Tag == null) {
            vH5Tag = "h" + (i + 1);
          } else if (vH6Tag == null) {
            vH6Tag = "h" + (i + 1);
            break;
          }
        }
      }
      if (vH1Tag == null) {
        return;
      }

      $("#nav").append(
        '<div class="BlogAnchor">' +
          '<div class="AnchorContent" id="AnchorContent"> </div>' +
          "</div>"
      );

      let vH1Index = 0;
      let vH2Index = 0;
      let vH3Index = 0;
      let vH4Index = 0;
      let vH5Index = 0;
      let vH6Index = 0;
      $(".articleContiner")
        .find(
          vH1Tag +
            (vH2Tag != null ? "," + vH2Tag : "") +
            (vH3Tag != null ? "," + vH3Tag : "") +
            (vH4Tag != null ? "," + vH4Tag : "") +
            (vH5Tag != null ? "," + vH5Tag : "") +
            (vH6Tag != null ? "," + vH6Tag : "")
        )
        .each((i, item) => {
          let id = "";
          let name = "";
          let tag = $(item)
            .get(0)
            .tagName.toLowerCase();
          let className = "";
          if (tag == vH1Tag) {
            id = name = ++vH1Index;
            name = id;
            vH2Index = 0;
            className = "item_h1";
          } else if (tag == vH2Tag) {
            id = vH1Index + "_" + ++vH2Index;
            name = vH1Index + "." + vH2Index;
            vH3Index = 0;
            className = "item_h2";
          } else if (tag == vH3Tag) {
            id = vH1Index + "_" + vH2Index + "_" + ++vH3Index;
            name = vH1Index + "." + vH2Index + "." + vH3Index;
            vH4Index = 0;
            className = "item_h3";
          } else if (tag == vH4Tag) {
            id = vH1Index + "_" + vH2Index + "_" + vH3Index + "_" + ++vH4Index;
            name = vH1Index + "." + vH2Index + "." + vH3Index + "." + vH4Index;
            vH5Index = 0;
            className = "item_h4";
          } else if (tag == vH5Tag) {
            id =
              vH1Index +
              "_" +
              vH2Index +
              "_" +
              vH3Index +
              "_" +
              vH4Index +
              "_" +
              ++vH5Index;
            name =
              vH1Index +
              "." +
              vH2Index +
              "." +
              vH3Index +
              "." +
              vH4Index +
              "." +
              vH5Index;
            vH6Index = 0;
            className = "item_h5";
          } else if (tag == vH6Tag) {
            id =
              vH1Index +
              "_" +
              vH2Index +
              "_" +
              vH3Index +
              "_" +
              vH4Index +
              "_" +
              vH5Index +
              "_" +
              ++vH6Index;
            name =
              vH1Index +
              "." +
              vH2Index +
              "." +
              vH3Index +
              "." +
              vH4Index +
              "." +
              vH5Index +
              "." +
              vH6Index;
            className = "item_h6";
          }
          $(item).attr("id", "wow" + id);
          $(item).addClass("wow_head");
          let originText = $(item).text();
          $(item).text(name + ". " + originText);

          // let arrow = "";
          // if (className == "item_h6") {
          //   arrow = "<span class='arrow'>▶</span>";
          //   // arrow = "<span class='arrow'>▼</span>";
          // }
          let temp = "<li>";
          // temp += arrow;
          temp += "<a class='nav_item ";
          temp += className;
          temp += "  anchor-link' onclick='return false;' href='#' link='#wow";
          temp += id;
          temp += "'>";
          temp += originText;
          temp += "</a>";
          temp += "</li>";
          $("#AnchorContent").append(temp);
        });

      $(".anchor-link").click(e => {
        $(".doc").animate(
          {
            scrollTop: 0
          },
          0
        );
        let top =
          $(e.target.attributes["link"].value).offset().top -
          (200 * window.screen.width) / 1920;
        $(".doc").animate(
          {
            scrollTop: top
          },
          50
        );
      });
    }
  },
  created() {
    $ = this.$;
    this.getById();
  }
};
</script>


<style lang="less">
.docDetail {
  background: rgba(250, 250, 250, 1);
  height: 100vh;
  position: relative;

  .info {
    font-size: 0.14rem;
    padding-left: calc(3.5rem + 0.4rem);
    padding-top: 0.2rem;
    .txt {
      color: #1e85e6;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    .sp {
      margin: 0rem 0.1rem;
    }
    .title {
      color: #808080;
    }
  }

  .content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0.2rem;
    .tree {
      width: 3.5rem;
      background: #fff;
      height: calc(100vh - 1.11rem - 1rem);
      overflow: auto;
      .nav {
        text-align: left;
        .BlogAnchor {
          .AnchorContent {
            li {
              font-size: 0rem;
              list-style: none;
              position: relative;
            }

            a {
              width: 100%;
              display: inline-block;
              text-decoration: none;
              padding: 0.1rem 0.4rem;
              font-size: 0.16rem;
              font-weight: 400;
              color: rgba(128, 128, 128, 1);
            }
            .arrow {
              font-size: 0.2rem;
              color: rgba(128, 128, 128, 1);
              position: absolute;
              left: 0.1rem;
              top: 0.1rem;
              cursor: pointer;
            }
            a.item_h1 {
              padding-left: 0.4rem;
              font-size: 0.2rem;
            }
            a.item_h2 {
              padding-left: 0.6rem;
              font-size: 0.19rem;
            }
            a.item_h3 {
              font-size: 0.18rem;
              padding-left: 0.8rem;
            }
            a.item_h4 {
              padding-left: 1rem;
              font-size: 0.17rem;
            }
            a.item_h5 {
              font-size: 0.16rem;
              padding-left: 1.2rem;
            }
            a.item_h6 {
              font-size: 0.15rem;
              padding-left: 1.4rem;
            }

            a:hover {
              background: rgba(30, 133, 230, 0.3);
              color: #1e85e6;
            }
          }
        }
      }
    }
    .doc {
      width: calc(100% - 3.5rem);
      background: #fff;
      padding: 0.2rem 0.5rem;
      box-sizing: border-box;
      font-size: 0.14rem;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      height: calc(100vh - 1.11rem - 1rem);
      overflow: auto;
      margin-left: 0.2rem;
      .articleTitle {
        font-size: 0.36rem;
        font-weight: bold;
        color: rgba(77, 77, 77, 1);
        margin: 0.2rem;
        text-align: center;
      }
      p {
        line-height: 0.4rem;
        img {
          width: 100%;
        }
      }
      em {
        font-style: italic;
      }
    }
  }
}
@media only screen and (min-width: 320px) and (max-width: 768px) {
  .docDetail {
    .info {
      font-size: 0.3rem;
      .title {
        color: #808080;
      }
    }

    .content {
      .tree {
        width: 3.5rem;
        .nav {
          .BlogAnchor {
            .AnchorContent {
              a {
                font-size: 0.3rem;
              }
              .arrow {
                font-size: 0.36rem;
              }
              a.item_h1 {
                font-size: 0.4rem;
              }
              a.item_h2 {
                font-size: 0.38rem;
              }
              a.item_h3 {
                font-size: 0.36rem;
              }
              a.item_h4 {
                font-size: 0.32rem;
              }
              a.item_h5 {
                font-size: 0.16rem;
              }
              a.item_h6 {
                font-size: 0.15rem;
                padding-left: 1.4rem;
              }

              a:hover {
                background: rgba(30, 133, 230, 0.3);
                color: #1e85e6;
              }
            }
          }
        }
      }
      .doc {
        font-size: 0.3rem;
        .articleTitle {
          font-size: 0.4rem;
        }
        p,
        li {
          line-height: 0.8rem;
        }
        pre {
          margin: 0.5rem 0rem;
          font-size: 0.4rem;
        }
      }
    }
  }
}
</style>

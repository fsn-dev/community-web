(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7702bbca"],{1324:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"luntan"},[a("header-view"),a("div",{staticClass:"content"},[a("top-view"),a("div",{staticClass:"action"},[a("div",{staticClass:"publish",on:{click:function(s){return t.showEditor()}}},[a("img",{attrs:{src:t.globalImgPath.publish}}),a("span",[t._v("发布主题")])]),a("div",{staticClass:"all"},[a("Select",{on:{"on-change":t.getTopicList},model:{value:t.tagComboboxId,callback:function(s){t.tagComboboxId=s},expression:"tagComboboxId"}},[a("Option",{attrs:{value:-1}},[t._v("全部板块")]),t._l(t.tagCombobox,(function(s,e){return a("Option",{key:e,attrs:{value:s.id}},[t._v(t._s(s.title))])}))],2)],1)]),a("div",{staticClass:"list"},t._l(t.articleList,(function(s,e){return a("div",{key:e,staticClass:"item"},[a("div",{staticClass:"panel"},[a("div",{staticClass:"name"},[a("img",{staticClass:"tagIcon",attrs:{src:s.topicIcon}}),a("div",{staticClass:"title"},[a("div",{staticClass:"txt",on:{click:function(a){return t.toDetail(s.id)}}},[t._v(t._s(s.title))]),a("div",{staticClass:"time"},[a("img",{staticClass:"tagIcon",attrs:{src:s.tagIcon}}),a("span",{staticClass:"info"},[t._v(t._s(s.tagName))]),a("span",{staticClass:"info"},[t._v("·")]),a("span",{staticClass:"info"},[t._v(t._s(s.modifyTime))]),a("span",{staticClass:"info"},[t._v("·")]),a("span",{staticClass:"info"},[t._v(t._s(s.userName))])])])]),a("div",{staticClass:"act"},[a("div",{staticClass:"el"},[a("div",{staticClass:"num"},[t._v(t._s(s.up))]),a("div",{staticClass:"remark"},[t._v("点赞")])]),a("div",{staticClass:"el"},[a("div",{staticClass:"num"},[t._v(t._s(s.commentCount))]),a("div",{staticClass:"remark"},[t._v("回复")])]),a("div",{staticClass:"el"},[a("div",{staticClass:"num"},[t._v(t._s(s.view))]),a("div",{staticClass:"remark"},[t._v("浏览")])])])]),s.topicCommentVo?a("div",{staticClass:"newest"},[a("img",{staticClass:"pic",attrs:{src:s.topicCommentVo.icon}}),a("div",{staticClass:"user"},[a("div",{staticClass:"username"},[a("span",{staticClass:"txt"},[t._v(t._s(s.topicCommentVo.userName))]),a("span",{staticClass:"time"},[t._v(t._s(s.topicCommentVo.time))])]),a("div",{staticClass:"comment"},[t._v(t._s(s.topicCommentVo.content))])])]):t._e()])})),0)],1),t.isShowEditor?a("div",{staticClass:"editor"},[a("img",{staticClass:"back2",attrs:{src:t.globalImgPath.back2},on:{click:function(s){return t.toPublish()}}}),a("div",{staticClass:"search"},[a("div",{staticClass:"name"},[a("span",[t._v("主题")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.newTopic.title,expression:"newTopic.title"}],attrs:{type:"text",placeholder:"请输入主题名"},domProps:{value:t.newTopic.title},on:{input:function(s){s.target.composing||t.$set(t.newTopic,"title",s.target.value)}}})]),a("div",{staticClass:"action"},[a("div",{staticClass:"category"},[a("Select",{model:{value:t.newTopic.tagId,callback:function(s){t.$set(t.newTopic,"tagId",s)},expression:"newTopic.tagId"}},[a("Option",{staticStyle:{display:"none"},attrs:{value:-1}},[t._v("请选择分类")]),t._l(t.tagCombobox,(function(s,e){return a("Option",{key:e,attrs:{value:s.id}},[t._v(t._s(s.title))])}))],2)],1),a("div",{staticClass:"btn",on:{click:function(s){return t.postNew()}}},[t._v("发布")]),a("div",{staticClass:"btn cancle",on:{click:function(s){return t.hideEditor()}}},[t._v("取消")])])]),a("div",{staticClass:"area"},[a("navBar"),a("section",[a("inputer"),a("outputer")],1)],1)]):t._e()],1)},i=[],o=a("aa63"),n=a("900a"),c=a("9dca"),r=a("a28e"),u=a("0be4"),l={components:{headerView:o["a"],topView:n["a"],navBar:c["a"],inputer:r["a"],outputer:u["a"]},data:function(){return{articleList:[],tagCombobox:[],tagComboboxId:-1,newTopic:{title:"",tagId:-1}}},computed:{theme:function(){return this.$store.state.theme},isShowEditor:function(){return this.$store.state.isShowEditor}},methods:{toPublish:function(){this.$store.commit("FULLSCREEN"),this.$router.push("/luntan/publish")},getTopicList:function(){var t=this,s=null;-1!=this.tagComboboxId&&(s=this.tagComboboxId),this.$http.get("/bbs/topicList",{params:{tagId:s,pageType:1}}).then((function(s){0==s.data.code?t.articleList=s.data.data.topicVos.content:t.$Message.error(s.data.message)}))},showEditor:function(){var t=this.$store.state.loginStatus;t?(this.$store.state.articleList[0].content="",this.$store.state.isShowEditor=!0):this.$Message.error("请先登陆")},hideEditor:function(){this.$store.state.isShowEditor=!1},getTagCombobox:function(){var t=this;this.$http.get("/bbs/tagCombobox").then((function(s){0==s.data.code?t.tagCombobox=s.data.data:t.$Message.error(s.data.message)}))},postNew:function(){var t=this,s=!0;this.newTopic.title?this.$store.getters.articleMd?-1==this.newTopic.tagId&&(this.$Message.error("请选择索要发布的分类板块"),s=!1):(this.$Message.error("请输入主题内容"),s=!1):(this.$Message.error("请输入标题"),s=!1),s&&this.$http.post("/bbs/topic",{title:this.newTopic.title,content:this.$store.getters.articleMd,contentMD:this.$store.getters.articleRaw,tagId:this.newTopic.tagId},{emulateJSON:!0}).then((function(s){0==s.data.code?(t.$Message.success(s.data.message),t.hideEditor(),t.toDetail(s.data.data.id)):t.$Message.error(s.data.message)}))},toDetail:function(t){this.$router.push({path:"/luntan/topic/detail",query:{topicId:t}})}},created:function(){this.getTopicList(),this.getTagCombobox()},mounted:function(){}},d=l,h=(a("c82d"),a("2877")),g=Object(h["a"])(d,e,i,!1,null,"275d3447",null);s["default"]=g.exports},"33df":function(t,s,a){"use strict";var e=a("7060"),i=a.n(e);i.a},7060:function(t,s,a){},"7da4":function(t,s,a){"use strict";var e=a("eabd"),i=a.n(e);i.a},"7f3c":function(t,s,a){},"900a":function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"top"},[a("div",{staticClass:"m",on:{click:function(s){return t.toPage("/luntan/moudle")}}},[-1!=t.routePath.indexOf("moudle")?a("img",{staticClass:"bankuaitubiao",attrs:{src:t.globalImgPath.bankuaitubiao}}):t._e(),-1==t.routePath.indexOf("moudle")?a("img",{staticClass:"bankuaitubiao",attrs:{src:t.globalImgPath.bankuaitubiao2}}):t._e(),a("span",{staticClass:"txt",class:{curText:-1!=t.routePath.indexOf("moudle")}},[t._v("模块")])]),a("div",{staticClass:"m",on:{click:function(s){return t.toPage("/luntan/newest")}}},[-1!=t.routePath.indexOf("newest")?a("img",{staticClass:"zuixin",attrs:{src:t.globalImgPath.zuixin3}}):t._e(),-1==t.routePath.indexOf("newest")?a("img",{staticClass:"zuixin",attrs:{src:t.globalImgPath.zuixin}}):t._e(),a("span",{staticClass:"txt",class:{curText:-1!=t.routePath.indexOf("newest")}},[t._v("最新")])]),a("div",{staticClass:"m",on:{click:function(s){return t.toPage("/luntan/hot")}}},[-1!=t.routePath.indexOf("hot")?a("img",{staticClass:"zuixin_1",attrs:{src:t.globalImgPath.zuixin_2}}):t._e(),-1==t.routePath.indexOf("hot")?a("img",{staticClass:"zuixin_1",attrs:{src:t.globalImgPath.zuixin_1}}):t._e(),a("span",{staticClass:"txt",class:{curText:-1!=t.routePath.indexOf("hot")}},[t._v("热门")])])])},i=[],o={data:function(){return{routePath:""}},methods:{toPage:function(t){this.$router.push(t)}},mounted:function(){this.routePath=this.$route.path}},n=o,c=(a("7da4"),a("2877")),r=Object(c["a"])(n,e,i,!1,null,"25bdce05",null);s["a"]=r.exports},aa63:function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"header",class:{indexHeader:"/"==t.routerPath}},[a("div",{staticClass:"panel"},[a("img",{staticClass:"logo",attrs:{src:t.globalImgPath.logo},on:{click:function(s){return t.toPage("/")}}}),a("div",{staticClass:"menu"},[a("span",{on:{click:function(s){return t.toPage("/")}}},[t._v("首页")]),a("span",{class:{curMenu:-1!=t.routerPath.indexOf("luntan")},on:{click:function(s){return t.toPage("/luntan/moudle")}}},[t._v("论坛")]),a("span",{class:{curMenu:-1!=t.routerPath.indexOf("reward")},on:{click:function(s){return t.toPage("/reward")}}},[t._v("悬赏任务")]),a("span",{class:{curMenu:-1!=t.routerPath.indexOf("skill")},on:{click:function(s){return t.toPage("/skill/list")}}},[t._v("技术文章")]),a("span",{class:{curMenu:-1!=t.routerPath.indexOf("doc")},on:{click:function(s){return t.toPage("/doc/list")}}},[t._v("开发文档")])]),1*t.$store.state.loginStatus?a("div",{staticClass:"avatar",on:{mouseenter:function(s){t.isShowManage=1},mouseleave:function(s){t.isShowManage=0}}},[t.$store.state.headPortrait?a("img",{attrs:{src:t.$store.state.headPortrait},on:{click:function(s){return t.toPage("/personal")}}}):t._e(),t.isShowManage&&t.state?a("div",{staticClass:"manage",on:{click:function(s){return t.toPage("/manage/skillList")}}},[t._v("后台管理")]):t._e()]):t._e(),1*!t.$store.state.loginStatus?a("div",{staticClass:"login"},[a("span",{on:{click:function(s){return t.showLogin()}}},[t._v("登陆")]),a("span",[t._v("|")]),a("span",{staticStyle:{color:"#999"}},[t._v("注册")])]):t._e(),1*t.$store.state.loginStatus?a("div",{staticClass:"lang",on:{click:function(s){return t.exitLogin()}}},[a("span",[t._v("退出")])]):t._e()])])},i=[],o={data:function(){return{state:!1,routerPath:"",isShowManage:0}},methods:{showLogin:function(){this.$router.push("/login")},showRegister:function(){this.$router.push("/register")},exitLogin:function(){var t=this;this.$http.delete("/authentications").then((function(s){0==s.data.code?(t.$Message.success("退出登录成功"),window.sessionStorage.setItem("authentication","76fcd84c-818f-4c60-9553-fb91c5969ee9"),t.$http.defaults.headers.common["authentication"]="76fcd84c-818f-4c60-9553-fb91c5969ee9",window.sessionStorage.setItem("headPortrait",""),window.sessionStorage.setItem("loginStatus",0),t.$store.state.loginStatus=0,t.$store.state.headPortrait=""):t.$Message.error(s.data.message)}))},toPage:function(t){this.$router.push(t)},getButton:function(){var t=this;this.$http.get("/integral/button",{params:{id:this.id,type:0}}).then((function(s){0==s.data.code?t.state=s.data.data.state:t.$Message.error(s.data.message)}))}},created:function(){this.$store.state.loginStatus=1*window.sessionStorage.getItem("loginStatus"),this.$store.state.headPortrait=window.sessionStorage.getItem("headPortrait"),this.routerPath=this.$route.path,this.getButton()}},n=o,c=(a("33df"),a("2877")),r=Object(c["a"])(n,e,i,!1,null,"0a2cc150",null);s["a"]=r.exports},c82d:function(t,s,a){"use strict";var e=a("7f3c"),i=a.n(e);i.a},eabd:function(t,s,a){}}]);
//# sourceMappingURL=chunk-7702bbca.f3d66165.js.map
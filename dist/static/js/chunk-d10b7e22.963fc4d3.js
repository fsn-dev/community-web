(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d10b7e22"],{"269f":function(t,e,a){"use strict";var s=a("cda1"),n=a.n(s);n.a},"3a85":function(t,e,a){},"5a9e":function(t,e,a){"use strict";var s=a("eebc"),n=a.n(s);n.a},"84c8":function(t,e,a){"use strict";var s=a("3a85"),n=a.n(s);n.a},a7f4:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"left"},[a("div",{staticClass:"avatar",on:{click:function(e){return t.toPage("/personal")}}},[t.$store.state.headPortrait?a("img",{attrs:{src:t.$store.state.headPortrait}}):t._e(),a("div",{staticClass:"txt"},[t._v(t._s(t.$store.state.userName))])]),a("div",{staticClass:"list"},[a("div",{staticClass:"item",class:{curMenu:-1!=t.routerPath.indexOf("info")},on:{click:function(e){return t.toPage("/personal/info")}}},[t._v("个人资料")]),a("div",{staticClass:"item",class:{curMenu:-1!=t.routerPath.indexOf("topic")},on:{click:function(e){return t.toPage("/personal/topic")}}},[t._v("我的主题")]),a("div",{staticClass:"item",class:{curMenu:-1!=t.routerPath.indexOf("task")},on:{click:function(e){return t.toPage("/personal/task")}}},[t._v("我的任务")])])])},n=[],i={data:function(){return{routerPath:""}},methods:{toPage:function(t){this.$router.push(t)},getInfo:function(){var t=this;this.$http.get("/authentications/info").then((function(e){0==e.data.code||t.$Message.error(e.data.message)}))}},created:function(){this.routerPath=this.$route.path,this.$store.state.headPortrait=window.sessionStorage.getItem("headPortrait"),this.$store.state.userName=window.sessionStorage.getItem("userName")}},o=i,r=(a("84c8"),a("2877")),c=Object(r["a"])(o,s,n,!1,null,"53c6d032",null);e["a"]=c.exports},aa63:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"header",class:{indexHeader:"/"==t.routerPath}},[a("div",{staticClass:"panel"},[a("img",{staticClass:"logo",attrs:{src:t.globalImgPath.logo},on:{click:function(e){return t.toPage("/")}}}),a("div",{staticClass:"menu"},[a("span",{on:{click:function(e){return t.toPage("/")}}},[t._v("首页")]),a("span",{class:{curMenu:-1!=t.routerPath.indexOf("luntan")},on:{click:function(e){return t.toPage("/luntan/moudle")}}},[t._v("论坛")]),a("span",{class:{curMenu:-1!=t.routerPath.indexOf("reward")},on:{click:function(e){return t.toPage("/reward")}}},[t._v("悬赏任务")]),a("span",{class:{curMenu:-1!=t.routerPath.indexOf("skill")},on:{click:function(e){return t.toPage("/skill/list")}}},[t._v("技术文章")]),a("span",{class:{curMenu:-1!=t.routerPath.indexOf("doc")},on:{click:function(e){return t.toPage("/doc/list")}}},[t._v("开发文档")])]),1*t.$store.state.loginStatus?a("div",{staticClass:"avatar",on:{mouseenter:function(e){t.isShowManage=1},mouseleave:function(e){t.isShowManage=0}}},[t.$store.state.headPortrait?a("img",{attrs:{src:t.$store.state.headPortrait},on:{click:function(e){return t.toPage("/personal")}}}):t._e(),t.isShowManage&&t.state?a("div",{staticClass:"manage",on:{click:function(e){return t.toPage("/manage/skillList")}}},[t._v("后台管理")]):t._e()]):t._e(),1*!t.$store.state.loginStatus?a("div",{staticClass:"login"},[a("span",{on:{click:function(e){return t.showLogin()}}},[t._v("登陆")]),a("span",[t._v("|")]),a("span",{staticStyle:{color:"#ccc !important"}},[t._v("注册")])]):t._e(),1*t.$store.state.loginStatus?a("div",{staticClass:"lang",on:{click:function(e){return t.exitLogin()}}},[a("span",[t._v("退出")])]):t._e()])])},n=[],i={data:function(){return{state:!1,routerPath:"",isShowManage:0}},methods:{showLogin:function(){this.$router.push("/login")},showRegister:function(){this.$router.push("/register")},exitLogin:function(){var t=this;this.$http.delete("/authentications").then((function(e){0==e.data.code?(t.$Message.success("退出登录成功"),window.sessionStorage.setItem("authentication","76fcd84c-818f-4c60-9553-fb91c5969ee9"),t.$http.defaults.headers.common["authentication"]="76fcd84c-818f-4c60-9553-fb91c5969ee9",window.sessionStorage.setItem("headPortrait",""),window.sessionStorage.setItem("loginStatus",0),t.$store.state.loginStatus=0,t.$store.state.headPortrait=""):t.$Message.error(e.data.message)}))},toPage:function(t){this.$router.push(t)},getButton:function(){var t=this;this.$http.get("/integral/button",{params:{id:this.id,type:0}}).then((function(e){0==e.data.code?t.state=e.data.data.state:t.$Message.error(e.data.message)}))}},created:function(){this.$store.state.loginStatus=1*window.sessionStorage.getItem("loginStatus"),this.$store.state.headPortrait=window.sessionStorage.getItem("headPortrait"),this.routerPath=this.$route.path,this.getButton()}},o=i,r=(a("269f"),a("2877")),c=Object(r["a"])(o,s,n,!1,null,"523f120a",null);e["a"]=c.exports},c7ea:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main"},[a("header-view"),a("div",{staticClass:"personal"},[a("menu-view"),a("div",{staticClass:"right"},[a("div",{staticClass:"line"},[a("span",[t._v("昵称：")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"name",attrs:{type:"text"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}})]),a("div",{staticClass:"line"},[a("span",[t._v("头像：")]),t.$store.state.headPortrait?a("img",{attrs:{src:t.$store.state.headPortrait},on:{click:function(e){return t.triggerInput()}}}):t._e(),a("input",{staticStyle:{display:"none"},attrs:{type:"file",id:"file"},on:{change:t.selectPhoto}})]),a("div",{staticClass:"act",on:{click:function(e){return t.postInfo()}}},[t._v("保存更改")])])],1)],1)},n=[],i=a("aa63"),o=a("a7f4"),r={components:{headerView:i["a"],menuView:o["a"]},data:function(){return{username:"",headPortrait:""}},methods:{triggerInput:function(){document.getElementById("file").click()},selectPhoto:function(t){this.postPhoto(t.target.files[0])},postPhoto:function(t){var e=this,a=new FormData;a.append("file",t),this.$http.post("/file/photo",a).then((function(t){0==t.data.code?(e.headPortrait=t.data.data,window.sessionStorage.setItem("headPortrait",e.headPortrait),e.$store.state.headPortrait=window.sessionStorage.getItem("headPortrait")):e.$Message.error(t.data.message)}))},postInfo:function(){var t=this;this.username?this.$http.post("/authentications/info",{headPortrait:this.headPortrait,username:this.username},{emulateJSON:!0}).then((function(e){0==e.data.code?(t.$Message.success("修改成功"),window.sessionStorage.setItem("userName",t.username),t.$store.state.userName=window.sessionStorage.getItem("userName")):t.$Message.error(e.data.message)})):this.$Message.error("请输入昵称")}},created:function(){}},c=r,u=(a("5a9e"),a("2877")),l=Object(u["a"])(c,s,n,!1,null,"046c3746",null);e["default"]=l.exports},cda1:function(t,e,a){},eebc:function(t,e,a){}}]);
//# sourceMappingURL=chunk-d10b7e22.963fc4d3.js.map
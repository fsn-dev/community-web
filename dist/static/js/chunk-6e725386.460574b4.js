(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e725386"],{"2b85":function(t,e,s){},3573:function(t,e,s){},"5a8a":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"main"},[s("header-view"),s("div",{staticClass:"personal"},[s("menu-view"),s("div",{staticClass:"right"},[s("div",{staticClass:"line"},[t._v("我的任务")]),s("div",{staticClass:"table"},[s("table",[t._m(0),s("tbody",t._l(t.dataList,(function(e,a){return s("tr",{key:a},[s("td",[s("div",{staticClass:"title"},[t._v(t._s(e.title))]),s("div",{staticClass:"baoming"},[t._v(t._s(e.registration))])]),s("td",[s("span",{staticClass:"num"},[t._v(t._s(e.bonus))]),s("span",{staticClass:"txt"},[t._v("FSN")]),s("span",{staticClass:"mark"},[t._v("最高")])]),s("td",[s("div",{staticClass:"status",style:{color:e.checkEnrollmentStatusColor}},[t._v(t._s(e.checkEnrollmentStatus))])]),s("td",[s("div",{staticClass:"status",style:{color:e.taskStatusColor}},[t._v(t._s(e.taskStatus))])])])})),0)])])])],1)],1)},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",[t._v("标题")]),s("th",[t._v("奖金")]),s("th",[t._v("任务状态")]),s("th",[t._v("报名状态")])])])}],i=s("aa63"),o=s("a7f4"),r={components:{headerView:i["a"],menuView:o["a"]},data:function(){return{dataList:[]}},methods:{getUserList:function(){var t=this;this.$http.get("/task/userList").then((function(e){0==e.data.code?t.dataList=e.data.data.content:t.$Message.error(e.data.message)}))}},created:function(){this.getUserList()}},c=r,u=(s("7d16"),s("2877")),l=Object(u["a"])(c,a,n,!1,null,"121152b4",null);e["default"]=l.exports},"622e":function(t,e,s){"use strict";var a=s("2b85"),n=s.n(a);n.a},"75ea":function(t,e,s){},"7d16":function(t,e,s){"use strict";var a=s("3573"),n=s.n(a);n.a},a7f4:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"left"},[s("div",{staticClass:"avatar",on:{click:function(e){return t.toPage("/personal")}}},[t.$store.state.headPortrait?s("img",{attrs:{src:t.$store.state.headPortrait}}):t._e(),s("div",{staticClass:"txt"},[t._v(t._s(t.$store.state.userName))])]),s("div",{staticClass:"list"},[s("div",{staticClass:"item",class:{curMenu:-1!=t.routerPath.indexOf("info")},on:{click:function(e){return t.toPage("/personal/info")}}},[t._v("个人资料")]),s("div",{staticClass:"item",class:{curMenu:-1!=t.routerPath.indexOf("topic")},on:{click:function(e){return t.toPage("/personal/topic")}}},[t._v("我的主题")]),s("div",{staticClass:"item",class:{curMenu:-1!=t.routerPath.indexOf("task")},on:{click:function(e){return t.toPage("/personal/task")}}},[t._v("我的任务")])])])},n=[],i={data:function(){return{routerPath:""}},methods:{toPage:function(t){this.$router.push(t)},getInfo:function(){var t=this;this.$http.get("/authentications/info").then((function(e){0==e.data.code||t.$Message.error(e.data.message)}))}},created:function(){this.routerPath=this.$route.path,this.$store.state.headPortrait=window.sessionStorage.getItem("headPortrait"),this.$store.state.userName=window.sessionStorage.getItem("userName")}},o=i,r=(s("fab3"),s("2877")),c=Object(r["a"])(o,a,n,!1,null,"6cc04035",null);e["a"]=c.exports},aa63:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header",class:{indexHeader:"/"==t.routerPath}},[s("div",{staticClass:"panel"},[s("img",{staticClass:"logo",attrs:{src:t.globalImgPath.logo},on:{click:function(e){return t.toPage("/")}}}),s("div",{staticClass:"menu"},[s("span",{on:{click:function(e){return t.toPage("/")}}},[t._v("首页")]),s("span",{class:{curMenu:-1!=t.routerPath.indexOf("luntan")},on:{click:function(e){return t.toPage("/luntan/moudle")}}},[t._v("论坛")]),s("span",{class:{curMenu:-1!=t.routerPath.indexOf("reward")},on:{click:function(e){return t.toPage("/reward")}}},[t._v("悬赏任务")]),s("span",{class:{curMenu:-1!=t.routerPath.indexOf("skill")},on:{click:function(e){return t.toPage("/skill/list")}}},[t._v("技术文章")]),s("span",{class:{curMenu:-1!=t.routerPath.indexOf("doc")},on:{click:function(e){return t.toPage("/doc/list")}}},[t._v("开发文档")])]),1*t.$store.state.loginStatus?s("div",{staticClass:"avatar",on:{mouseenter:function(e){t.isShowManage=1},mouseleave:function(e){t.isShowManage=0}}},[t.$store.state.headPortrait?s("img",{attrs:{src:t.$store.state.headPortrait},on:{click:function(e){return t.toPage("/personal")}}}):t._e(),t.isShowManage&&t.state?s("div",{staticClass:"manage",on:{click:function(e){return t.toPage("/manage/skillList")}}},[t._v("后台管理")]):t._e()]):t._e(),1*!t.$store.state.loginStatus?s("div",{staticClass:"login"},[s("span",{on:{click:function(e){return t.showLogin()}}},[t._v("登陆")]),s("span",[t._v("|")]),s("span",{on:{click:function(e){return t.showRegister()}}},[t._v("注册")])]):t._e(),1*t.$store.state.loginStatus?s("div",{staticClass:"lang",on:{click:function(e){return t.exitLogin()}}},[s("span",[t._v("退出")])]):t._e()])])},n=[],i={data:function(){return{state:!1,routerPath:"",isShowManage:0}},methods:{showLogin:function(){this.$router.push("/login")},showRegister:function(){this.$router.push("/register")},exitLogin:function(){var t=this;this.$http.delete("/authentications").then((function(e){0==e.data.code?(t.$Message.success("退出登录成功"),window.sessionStorage.setItem("authentication","76fcd84c-818f-4c60-9553-fb91c5969ee9"),t.$http.defaults.headers.common["authentication"]="76fcd84c-818f-4c60-9553-fb91c5969ee9",window.sessionStorage.setItem("headPortrait",""),window.sessionStorage.setItem("loginStatus",0),t.$store.state.loginStatus=0,t.$store.state.headPortrait=""):t.$Message.error(e.data.message)}))},toPage:function(t){this.$router.push(t)},getButton:function(){var t=this;this.$http.get("/integral/button",{params:{id:this.id,type:0}}).then((function(e){0==e.data.code?t.state=e.data.data.state:t.$Message.error(e.data.message)}))}},created:function(){this.$store.state.loginStatus=1*window.sessionStorage.getItem("loginStatus"),this.$store.state.headPortrait=window.sessionStorage.getItem("headPortrait"),this.routerPath=this.$route.path,this.getButton()}},o=i,r=(s("622e"),s("2877")),c=Object(r["a"])(o,a,n,!1,null,"5e9e8fe4",null);e["a"]=c.exports},fab3:function(t,e,s){"use strict";var a=s("75ea"),n=s.n(a);n.a}}]);
//# sourceMappingURL=chunk-6e725386.460574b4.js.map
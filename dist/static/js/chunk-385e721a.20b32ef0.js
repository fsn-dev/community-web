(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-385e721a"],{"19ee":function(t,a,s){"use strict";var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"menu"},[s("div",{staticClass:"logo"},[s("img",{attrs:{src:t.globalImgPath.logo_white},on:{click:function(a){return t.toPage("/")}}})]),s("div",{staticClass:"list"},[s("div",{staticClass:"item"},[s("div",{staticClass:"title"},[s("img",{staticClass:"icon",attrs:{src:t.globalImgPath.menu}}),s("span",{staticClass:"txt"},[t._v("文章管理")]),s("img",{staticClass:"arrow",attrs:{src:t.globalImgPath.manageSelect}})]),s("div",{staticClass:"group"},[s("div",{staticClass:"el",class:{curEl:"skillList"==t.name},on:{click:function(a){return t.toPage("/manage/skillList")}}},[t._v("文章列表")]),s("div",{staticClass:"el",class:{curEl:"newSkill"==t.name},on:{click:function(a){return t.toPage("/manage/newSkill")}}},[t._v("发布文章")])])]),s("div",{staticClass:"item",staticStyle:{"margin-top":"0.5rem"}},[s("div",{staticClass:"title"},[s("img",{staticClass:"icon",attrs:{src:t.globalImgPath.menu}}),s("span",{staticClass:"txt"},[t._v("文档管理")]),s("img",{staticClass:"arrow",attrs:{src:t.globalImgPath.manageSelect}})]),s("div",{staticClass:"group"},[s("div",{staticClass:"el",class:{curEl:"docList"==t.name},on:{click:function(a){return t.toPage("/manage/docList")}}},[t._v("文档列表")]),s("div",{staticClass:"el",class:{curEl:"newDoc"==t.name},on:{click:function(a){return t.toPage("/manage/newDoc")}}},[t._v("发布文档")])])]),s("div",{staticClass:"item",staticStyle:{"margin-top":"0.5rem"}},[s("div",{staticClass:"title"},[s("img",{staticClass:"icon",attrs:{src:t.globalImgPath.menu}}),s("span",{staticClass:"txt"},[t._v("悬赏任务")]),s("img",{staticClass:"arrow",attrs:{src:t.globalImgPath.manageSelect}})]),s("div",{staticClass:"group"},[s("div",{staticClass:"el",class:{curEl:"createTask"==t.name},on:{click:function(a){return t.toPage("/manage/createTask")}}},[t._v("创建任务")]),s("div",{staticClass:"el",class:{curEl:"taskList"==t.name||"issueList"==t.name},on:{click:function(a){return t.toPage("/manage/taskList")}}},[t._v("任务列表")])])])])])},i=[],n={data:function(){return{name:""}},methods:{toPage:function(t){this.$router.push(t)}},created:function(){this.name=this.$route.name}},c=n,l=(s("6f58"),s("2877")),o=Object(l["a"])(c,e,i,!1,null,"b972d192",null);a["a"]=o.exports},5253:function(t,a,s){"use strict";var e=s("991f"),i=s.n(e);i.a},"52aa":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"manage"},[s("menu-view"),s("div",{staticClass:"createTask"},[s("div",{staticClass:"top"},[s("img",{staticClass:"avatar",attrs:{src:t.globalImgPath.avatar}}),s("span",{staticClass:"txt"},[t._v("天选之子")])]),s("div",{staticClass:"name"},[t._v("赏金任务列表")]),s("div",{staticClass:"content"},[s("div",{staticClass:"panel"},[s("div",{staticClass:"action"},[s("span",{staticClass:"btn"},[t._v("发布任务")]),s("Select",{staticClass:"status",on:{"on-change":t.changeState},model:{value:t.state,callback:function(a){t.state=a},expression:"state"}},[s("Option",{attrs:{value:"-2"}},[t._v("全部")]),t._l(t.stateList,(function(a,e){return s("Option",{key:e,attrs:{value:a.id}},[t._v(t._s(a.name))])}))],2)],1),s("div",{staticClass:"table"},[s("table",[s("thead",[s("tr",[s("th",[t._v("标题")]),s("th",[s("span",[t._v("发布时间")]),"asc"==t.order?s("img",{attrs:{src:t.globalImgPath.sort1},on:{click:function(a){return t.sortData("desc")}}}):t._e(),"desc"==t.order?s("img",{attrs:{src:t.globalImgPath.sort2},on:{click:function(a){return t.sortData("asc")}}}):t._e()]),s("th",[t._v("奖励")]),s("th",[t._v("任务状态")]),s("th",[t._v("是否推荐")]),s("th",[t._v("操作")])])]),s("tbody",t._l(t.dataList,(function(a,e){return s("tr",{key:e},[s("td",[t._v(t._s(a.title))]),s("td",[t._v(t._s(a.creatTime))]),s("td",[t._v(t._s(a.bonus))]),s("td",{style:{color:a.taskStatusColor}},[t._v(t._s(a.taskStatus))]),s("td",[s("i-switch",{on:{"on-change":function(s){return t.changeHot(s,a)}},model:{value:a.hot,callback:function(s){t.$set(a,"hot",s)},expression:"item.hot"}})],1),s("td",[s("span",{staticClass:"act",on:{click:function(s){return t.getEdit(a.id)}}},[t._v("编辑状态")]),s("span",{staticClass:"act",on:{click:function(s){return t.toPage(a.id)}}},[t._v("查看方案")])])])})),0)])]),s("div",{staticClass:"page"},[s("Page",{attrs:{total:t.total,current:t.page,"page-size":t.pageSize,size:"small"},on:{"on-change":t.changePage}})],1)])]),t.isMask?s("div",{staticClass:"edit"},[s("div",{staticClass:"mask",on:{click:function(a){t.isMask=0}}}),s("div",{staticClass:"panel"},[s("div",{staticClass:"name"},[t._v("编辑状态")]),s("div",{staticClass:"title"},[t._v("当前状态：报名中")]),s("div",{staticClass:"radio"},[s("RadioGroup",{model:{value:t.taskStatusId,callback:function(a){t.taskStatusId=a},expression:"taskStatusId"}},t._l(t.rewardTaskStates,(function(a,e){return s("Radio",{key:e,staticStyle:{width:"100%"},attrs:{label:a.id}},[s("span",{staticClass:"rs"},[t._v(t._s(a.name))])])})),1)],1),s("div",{staticClass:"btns"},[s("div",{staticClass:"cancle",on:{click:function(a){t.isMask=0}}},[t._v("取消")]),s("div",{staticClass:"confrim",on:{click:function(a){return t.changeStatus()}}},[t._v("确定")])])])]):t._e()])],1)},i=[],n=s("19ee"),c={components:{menuView:n["a"]},data:function(){return{dataList:[],stateList:[],pageSize:10,page:1,total:0,state:"-2",order:"desc",isMask:0,rewardTaskStates:[],id:"",taskStatusId:""}},methods:{getStates:function(){var t=this;this.$http.get("/task/list/states").then((function(a){0==a.data.code?t.stateList=a.data.data:t.$Message.error(a.data.message)}))},getTaskList:function(){var t=this,a=this.state;"-2"==this.state&&(a=null),this.$http.get("/task/list",{params:{state:a,order:this.order,sortBy:"time",page:this.page-1,pageSize:this.pageSize}}).then((function(a){0==a.data.code?(t.total=a.data.data.totalElements,t.dataList=a.data.data.content):t.$Message.error(a.data.message)}))},sortData:function(t){this.page=1,this.order=t,this.getTaskList()},changePage:function(t){this.page=t,this.getTaskList()},changeState:function(){this.page=1,this.getTaskList()},getEdit:function(t){var a=this;this.id=t,this.$http.get("/task/list/edit",{params:{id:t}}).then((function(t){0==t.data.code?(a.isMask=1,a.rewardTaskStates=t.data.data.rewardTaskStates,a.taskStatusId=t.data.data.taskStatusId):a.$Message.error(t.data.message)}))},changeStatus:function(){var t=this;this.$http.post("/task/list/edit?id="+this.id+"&state="+this.taskStatusId).then((function(a){0==a.data.code?(t.isMask=0,t.$Message.success("修改成功"),t.getTaskList()):t.$Message.error(a.data.message)}))},toPage:function(t){this.$router.push({name:"issueList",query:{id:t}})},changeHot:function(t,a){var s=this;this.$http.post("/task/list/hot?id="+a.id+"&hot="+1*t).then((function(t){0==t.data.code?(s.$Message.success("修改成功"),s.getTaskList()):(s.$Message.error(t.data.message),s.getTaskList())}))}},created:function(){this.getStates(),this.getTaskList()}},l=c,o=(s("5253"),s("2877")),r=Object(o["a"])(l,e,i,!1,null,"6a89ff3a",null);a["default"]=r.exports},"6f58":function(t,a,s){"use strict";var e=s("7f2d"),i=s.n(e);i.a},"7f2d":function(t,a,s){},"991f":function(t,a,s){}}]);
//# sourceMappingURL=chunk-385e721a.20b32ef0.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-796b2232"],{"03ac":function(t,a,s){},"19ee":function(t,a,s){"use strict";var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"menu"},[s("div",{staticClass:"logo"},[s("img",{attrs:{src:t.globalImgPath.logo_white},on:{click:function(a){return t.toPage("/")}}})]),s("div",{staticClass:"list"},[s("div",{staticClass:"item"},[s("div",{staticClass:"title"},[s("img",{staticClass:"icon",attrs:{src:t.globalImgPath.menu}}),s("span",{staticClass:"txt"},[t._v("文章管理")]),s("img",{staticClass:"arrow",attrs:{src:t.globalImgPath.manageSelect}})]),s("div",{staticClass:"group"},[s("div",{staticClass:"el",class:{curEl:"skillList"==t.name},on:{click:function(a){return t.toPage("/manage/skillList")}}},[t._v("文章列表")]),s("div",{staticClass:"el",class:{curEl:"newSkill"==t.name},on:{click:function(a){return t.toPage("/manage/newSkill")}}},[t._v("发布文章")])])]),s("div",{staticClass:"item",staticStyle:{"margin-top":"0.5rem"}},[s("div",{staticClass:"title"},[s("img",{staticClass:"icon",attrs:{src:t.globalImgPath.menu}}),s("span",{staticClass:"txt"},[t._v("文档管理")]),s("img",{staticClass:"arrow",attrs:{src:t.globalImgPath.manageSelect}})]),s("div",{staticClass:"group"},[s("div",{staticClass:"el",class:{curEl:"docList"==t.name},on:{click:function(a){return t.toPage("/manage/docList")}}},[t._v("文档列表")]),s("div",{staticClass:"el",class:{curEl:"newDoc"==t.name},on:{click:function(a){return t.toPage("/manage/newDoc")}}},[t._v("发布文档")])])]),s("div",{staticClass:"item",staticStyle:{"margin-top":"0.5rem"}},[s("div",{staticClass:"title"},[s("img",{staticClass:"icon",attrs:{src:t.globalImgPath.menu}}),s("span",{staticClass:"txt"},[t._v("悬赏任务")]),s("img",{staticClass:"arrow",attrs:{src:t.globalImgPath.manageSelect}})]),s("div",{staticClass:"group"},[s("div",{staticClass:"el",class:{curEl:"createTask"==t.name},on:{click:function(a){return t.toPage("/manage/createTask")}}},[t._v("创建任务")]),s("div",{staticClass:"el",class:{curEl:"taskList"==t.name||"issueList"==t.name},on:{click:function(a){return t.toPage("/manage/taskList")}}},[t._v("任务列表")])])])])])},i=[],c={data:function(){return{name:""}},methods:{toPage:function(t){this.$router.push(t)}},created:function(){this.name=this.$route.name}},n=c,l=(s("6f58"),s("2877")),r=Object(l["a"])(n,e,i,!1,null,"b972d192",null);a["a"]=r.exports},"21c3":function(t,a,s){"use strict";var e=s("03ac"),i=s.n(e);i.a},"6f58":function(t,a,s){"use strict";var e=s("7f2d"),i=s.n(e);i.a},"7f2d":function(t,a,s){},b97f:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"manage"},[s("menu-view"),s("div",{staticClass:"skiiList"},[s("div",{staticClass:"top"},[s("img",{staticClass:"avatar",attrs:{src:t.globalImgPath.avatar}}),s("span",{staticClass:"txt"},[t._v("天选之子")])]),s("div",{staticClass:"name"},[t._v("文章列表")]),s("div",{staticClass:"content"},[s("div",{staticClass:"table"},[s("div",{staticClass:"btn",on:{click:function(a){return t.toPage("/manage/newSkill")}}},[t._v("发布文章")]),s("table",[t._m(0),s("tbody",t._l(t.dataList,(function(a){return s("tr",{key:a.id},[s("td",[t._v(t._s(a.articleTitle))]),s("td",[t._v(t._s(a.time))]),s("td",[t._v(t._s(a.author))]),s("td",[s("span",{staticClass:"edit",on:{click:function(s){return t.toEdit(a.id)}}},[t._v("编辑")]),s("span",{staticClass:"delete",on:{click:function(s){return t.deleteArticle(a.id)}}},[t._v("删除")])])])})),0)])]),s("div",{staticClass:"page"},[s("Page",{attrs:{total:t.total,current:t.page,"page-size":t.pageSize,size:"small"},on:{"on-change":t.changePage}})],1)])])],1)},i=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("thead",[s("tr",[s("th",[t._v("标题")]),s("th",[t._v("创建时间")]),s("th",[t._v("作者")]),s("th",[t._v("操作")])])])}],c=s("19ee"),n={components:{menuView:c["a"]},data:function(){return{dataList:[],total:0,page:1,pageSize:10}},methods:{toPage:function(t){this.$router.push(t)},toEdit:function(t){this.$router.push({path:"/manage/editSkill",query:{id:t}})},getArticleListBack:function(){var t=this;this.$http.get("/article/articleListBack",{params:{pageSize:this.pageSize,page:this.page-1}}).then((function(a){0==a.data.code?(t.total=a.data.data.totalElements,t.dataList=a.data.data.content):t.$Message.error(a.data.message)}))},changePage:function(t){this.page=t,this.getArticleListBack()},deleteArticle:function(t){var a=this;this.$http.delete("/article",{params:{id:t}}).then((function(t){0==t.data.code?(a.$Message.success(t.data.data),a.page=1,a.getArticleListBack()):a.$Message.error(t.data.message)}))}},created:function(){this.getArticleListBack()}},l=n,r=(s("21c3"),s("2877")),o=Object(r["a"])(l,e,i,!1,null,"494a6790",null);a["default"]=o.exports}}]);
//# sourceMappingURL=chunk-796b2232.e5e4d3d5.js.map
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f336c792"],{"19ee":function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"menu"},[e("div",{staticClass:"logo"},[e("img",{attrs:{src:t.globalImgPath.logo_white},on:{click:function(a){return t.toPage("/")}}})]),e("div",{staticClass:"list"},[e("div",{staticClass:"item"},[e("div",{staticClass:"title"},[e("img",{staticClass:"icon",attrs:{src:t.globalImgPath.menu}}),e("span",{staticClass:"txt"},[t._v("文章管理")]),e("img",{staticClass:"arrow",attrs:{src:t.globalImgPath.manageSelect}})]),e("div",{staticClass:"group"},[e("div",{staticClass:"el",class:{curEl:"skillList"==t.name},on:{click:function(a){return t.toPage("/manage/skillList")}}},[t._v("文章列表")]),e("div",{staticClass:"el",class:{curEl:"newSkill"==t.name},on:{click:function(a){return t.toPage("/manage/newSkill")}}},[t._v("发布文章")])])]),e("div",{staticClass:"item",staticStyle:{"margin-top":"0.5rem"}},[e("div",{staticClass:"title"},[e("img",{staticClass:"icon",attrs:{src:t.globalImgPath.menu}}),e("span",{staticClass:"txt"},[t._v("文档管理")]),e("img",{staticClass:"arrow",attrs:{src:t.globalImgPath.manageSelect}})]),e("div",{staticClass:"group"},[e("div",{staticClass:"el",class:{curEl:"docList"==t.name},on:{click:function(a){return t.toPage("/manage/docList")}}},[t._v("文档列表")]),e("div",{staticClass:"el",class:{curEl:"newDoc"==t.name},on:{click:function(a){return t.toPage("/manage/newDoc")}}},[t._v("发布文档")])])]),e("div",{staticClass:"item",staticStyle:{"margin-top":"0.5rem"}},[e("div",{staticClass:"title"},[e("img",{staticClass:"icon",attrs:{src:t.globalImgPath.menu}}),e("span",{staticClass:"txt"},[t._v("悬赏任务")]),e("img",{staticClass:"arrow",attrs:{src:t.globalImgPath.manageSelect}})]),e("div",{staticClass:"group"},[e("div",{staticClass:"el",class:{curEl:"createTask"==t.name},on:{click:function(a){return t.toPage("/manage/createTask")}}},[t._v("创建任务")]),e("div",{staticClass:"el",class:{curEl:"taskList"==t.name||"issueList"==t.name},on:{click:function(a){return t.toPage("/manage/taskList")}}},[t._v("任务列表")])])])])])},i=[],n={data:function(){return{name:""}},methods:{toPage:function(t){this.$router.push(t)}},created:function(){this.name=this.$route.name}},r=n,c=(e("6f58"),e("2877")),l=Object(c["a"])(r,s,i,!1,null,"b972d192",null);a["a"]=l.exports},"5d70":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"manage"},[e("menu-view"),e("div",{staticClass:"skiiList"},[e("div",{staticClass:"top"},[e("img",{staticClass:"avatar",attrs:{src:t.globalImgPath.avatar}}),e("span",{staticClass:"txt"},[t._v("天选之子")])]),e("div",{staticClass:"name"},[t._v("发布文章")]),e("div",{staticClass:"content"},[e("div",{staticClass:"panel"},[e("div",{staticClass:"action",on:{click:function(a){return t.postArticle()}}},[t._v("发布")]),e("div",{staticClass:"title"},[e("span",{staticClass:"require"},[t._v("*")]),e("span",{staticClass:"txt"},[t._v("标题")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.newObj.articleTitle,expression:"newObj.articleTitle"}],attrs:{type:"text",placeholder:"请输入文章标题，5-30个汉字之间"},domProps:{value:t.newObj.articleTitle},on:{input:function(a){a.target.composing||t.$set(t.newObj,"articleTitle",a.target.value)}}})]),e("div",{staticClass:"author"},[e("span",{staticClass:"require"},[t._v("*")]),e("span",{staticClass:"txt"},[t._v("作者")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.newObj.author,expression:"newObj.author"}],attrs:{type:"text",placeholder:"请输入文章作者"},domProps:{value:t.newObj.author},on:{input:function(a){a.target.composing||t.$set(t.newObj,"author",a.target.value)}}})]),e("div",{staticClass:"author"},[e("span",{staticClass:"require"},[t._v("*")]),e("span",{staticClass:"txt"},[t._v("关键字")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.newObj.keyWord,expression:"newObj.keyWord"}],attrs:{type:"text",placeholder:"请输入关键字 多个用，分割"},domProps:{value:t.newObj.keyWord},on:{input:function(a){a.target.composing||t.$set(t.newObj,"keyWord",a.target.value)}}})]),e("div",{staticClass:"author"},[e("span",{staticClass:"require"},[t._v("*")]),e("span",{staticClass:"txt"},[t._v("图片")]),t.newObj.thumbPath?e("img",{staticClass:"image",attrs:{src:t.newObj.thumbPath},on:{click:function(a){return t.trrigerInput()}}}):t._e(),t.newObj.thumbPath?t._e():e("img",{staticClass:"image",attrs:{src:t.globalImgPath.image},on:{click:function(a){return t.trrigerInput()}}}),e("input",{staticStyle:{visibility:"hidden"},attrs:{type:"file",id:"picture"},on:{change:t.changePic}})]),e("div",{staticClass:"area"},[e("navBar"),e("section",[e("inputer"),e("outputer")],1)],1)])])])],1)},i=[],n=e("19ee"),r=e("9dca"),c=e("a28e"),l=e("0be4"),o={components:{menuView:n["a"],navBar:r["a"],inputer:c["a"],outputer:l["a"]},data:function(){return{newObj:{id:null,articleTitle:"",author:"",keyWord:"",thumbPath:null}}},methods:{trrigerInput:function(){document.getElementById("picture").click()},changePic:function(t){var a=this,e=t.srcElement.files[0],s=new FormData;s.append("file",e),this.$http.post("/file/photo",s).then((function(t){0==t.data.code?a.newObj.thumbPath=t.data.data:a.$Message.error(t.data.message)}))},postArticle:function(){var t=this,a=!0;this.newObj.articleTitle?this.newObj.author?this.newObj.keyWord?this.newObj.thumbPath?this.$store.getters.articleMd||(this.$Message.error("请输入内容"),a=!1):(this.$Message.error("请选择图片"),a=!1):(this.$Message.error("请输入关键字"),a=!1):(this.$Message.error("请输入作者"),a=!1):(this.$Message.error("请输入标题"),a=!1),a&&this.$http.post("/article",{id:this.newObj.id,articleTitle:this.newObj.articleTitle,author:this.newObj.author,keyWord:this.newObj.keyWord,thumbPath:this.newObj.thumbPath,articleContiner:this.$store.getters.articleMd,articleContinerMD:this.$store.getters.articleRaw},{emulateJSON:!0}).then((function(a){0==a.data.code?(t.$Message.success(a.data.message),t.$router.push("/manage/skillList")):t.$Message.error(a.data.message)}))}},created:function(){this.$store.state.articleList[0].content=""}},u=o,m=(e("8693"),e("2877")),d=Object(m["a"])(u,s,i,!1,null,"cb2b7c7a",null);a["default"]=d.exports},"6f58":function(t,a,e){"use strict";var s=e("7f2d"),i=e.n(s);i.a},"7f2d":function(t,a,e){},8693:function(t,a,e){"use strict";var s=e("ece1"),i=e.n(s);i.a},ece1:function(t,a,e){}}]);
//# sourceMappingURL=chunk-f336c792.8c90c3d7.js.map
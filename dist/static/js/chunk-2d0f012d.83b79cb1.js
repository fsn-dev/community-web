(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0f012d"],{"9b8f":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t._v("正在跳转...")])},o=[],s={data:function(){return{code:""}},methods:{githubConfirm:function(){var t=this;this.$http.get("/authentications/github",{params:{code:this.code}}).then((function(e){0==e.data.code?(window.sessionStorage.setItem("authentication",e.data.data.token),t.$http.defaults.headers.common["authentication"]=sessionStorage.getItem("authentication"),window.sessionStorage.setItem("headPortrait",e.data.data.headPortrait),window.sessionStorage.setItem("loginStatus",1),t.$router.push("/")):t.$Message.success(e.data.message)}))}},mounted:function(){this.code=this.$route.query.code,this.githubConfirm()}},i=s,u=a("2877"),d=Object(u["a"])(i,n,o,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2d0f012d.83b79cb1.js.map
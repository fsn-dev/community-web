(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2a82409f"],{"31c8":function(t,a,s){},"409e":function(t,a,s){"use strict";s.r(a);var i=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"forgetPassword"},[s("img",{staticClass:"logo",attrs:{src:t.globalImgPath.logo}}),s("div",{staticClass:"panel"},[s("div",{staticClass:"info"},[s("img",{staticClass:"pic",attrs:{src:t.globalImgPath.forget}})]),s("div",{staticClass:"form"},[s("div",{staticClass:"content"},[s("div",{staticClass:"title"},[t._v("忘记密码")]),s("div",{staticClass:"control"},[s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.mailbox,expression:"mailbox"}],staticClass:"input",attrs:{type:"text",placeholder:"邮箱"},domProps:{value:t.mailbox},on:{input:function(a){a.target.composing||(t.mailbox=a.target.value)}}})]),s("div",{staticClass:"button",on:{click:function(a){return t.validateEmail()}}},[t._v("发送验证邮件")])]),s("div",{staticClass:"other"},[s("span",{staticClass:"login",on:{click:function(a){return t.toPage("/")}}},[t._v("去登陆")])])])])])])},o=[],e={data:function(){return{mailbox:""}},methods:{toPage:function(t){this.$router.push(t)},validateEmail:function(){var t=this;this.$http.post("/authentications/forgotPassword/email",{mailbox:this.mailbox},{emulateJSON:!0}).then((function(a){0==a.data.code?t.$router.push({name:"validateEmail",params:{mailbox:t.mailbox,type:"forgetPassword"}}):t.$Message.success(a.data.message)}))}},mounted:function(){}},n=e,l=(s("f09d"),s("2877")),c=Object(l["a"])(n,i,o,!1,null,"6db0b2b6",null);a["default"]=c.exports},f09d:function(t,a,s){"use strict";var i=s("31c8"),o=s.n(i);o.a}}]);
//# sourceMappingURL=chunk-2a82409f.ea4430de.js.map
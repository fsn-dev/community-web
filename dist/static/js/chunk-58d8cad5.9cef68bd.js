(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-58d8cad5"],{3032:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"validateEmail"},[a("img",{staticClass:"logo",attrs:{src:t.globalImgPath.logo}}),a("div",{staticClass:"panel"},[a("img",{staticClass:"wait",attrs:{src:t.globalImgPath.wait}}),a("div",{staticClass:"title"},[t._v("等待邮箱验证...")]),a("div",{staticClass:"content"},[a("span",{staticClass:"txt"},[t._v("我们已经向您的邮箱")]),a("span",{staticClass:"email"},[t._v(t._s(t.mailbox))]),a("span",{staticClass:"txt"},[t._v("发送了一封验证邮件，请通过点击邮件中的链接，如果没有收到邮件，请查看垃圾箱或重新发送验证邮件，在没有完成邮件验证前，您无法进行大部分操作。")])]),t.canSend?t._e():a("div",{staticClass:"button"},[t._v("重新发送验证邮件    ("+t._s(t.time)+"秒后重试)")]),t.canSend?a("div",{staticClass:"button canSend",on:{click:function(s){return t.reSendEmail()}}},[t._v("重新发送验证邮件")]):t._e()])])},i=[],n={data:function(){return{mailbox:"",userId:null,canSend:0,time:60,type:""}},methods:{reSendEmail:function(){var t=this;this.canSend=0,this.setTimer(),"register"==this.type?this.$http.post("/authentications/registerEmail",{userId:this.userId},{emulateJSON:!0}).then((function(s){0==s.data.code?t.$Message.success(s.data.message):t.$Message.error(s.data.message)})):this.$http.post("/authentications/forgotPassword/email",{mailbox:this.mailbox},{emulateJSON:!0}).then((function(s){s.data.code,t.$Message.success(s.data.message)}))},setTimer:function(){var t=this,s=setInterval((function(){--t.time,t.time<1&&(clearInterval(s),t.canSend=1,t.time=60)}),1e3)}},mounted:function(){this.userId=this.$route.params.userId,this.mailbox=this.$route.params.mailbox,this.type=this.$route.params.type,this.setTimer()}},c=n,o=(a("fd8c"),a("2877")),r=Object(o["a"])(c,e,i,!1,null,"d1686372",null);s["default"]=r.exports},8290:function(t,s,a){},fd8c:function(t,s,a){"use strict";var e=a("8290"),i=a.n(e);i.a}}]);
//# sourceMappingURL=chunk-58d8cad5.9cef68bd.js.map
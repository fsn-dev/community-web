import Vue from "vue";
import App from "./App.vue";
import "@babel/polyfill";
import router from "./router";

Vue.config.productionTip = false;

import jQuery from "jquery";
Vue.prototype.$ = jQuery;

import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";
Vue.use(vuescroll, {
  ops: {
    rail: {
      gutterOfSide: 0
    },
    bar: {
      background: "#1EC7E6"
    }
  }
});

import iView from "iview";
import "iview/dist/styles/iview.css";
Vue.use(iView);

import axios from "axios";
import qs from "qs";
axios.defaults.baseURL = "/fsn";
axios.defaults.headers.post["Content-Type"] = "application/json";
Vue.prototype.$http = axios;
Vue.prototype.qs = qs;

if (sessionStorage.getItem("authentication")) {
  axios.defaults.headers.common["authentication"] = sessionStorage.getItem(
    "authentication"
  );
} else {
  axios.defaults.headers.common["authentication"] =
    "76fcd84c-818f-4c60-9553-fb91c5969ee9";
}

import "@/assets/less/base.less";
import "@/assets/less/markdown.less";
import "@/assets/js/imgsPath.js";
import store from "../vuex/store.js";

new Vue({
  router,
  store,
  jQuery,
  render: h => h(App)
}).$mount("#app");

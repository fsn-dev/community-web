import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("./views/main.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/login.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/register.vue")
    },
    {
      path: "/forgetPassword",
      name: "forgetPassword",
      component: () => import("./views/forgetPassword.vue")
    },
    {
      path: "/validateEmail",
      name: "validateEmail",
      component: () => import("./views/validateEmail.vue")
    },
    {
      path: "/validateSuccess",
      name: "validateSuccess",
      component: () => import("./views/validateSuccess.vue"),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/resetPassword",
      name: "resetPassword",
      component: () => import("./views/resetPassword.vue")
    },
    {
      path: "/oauth/redirect",
      name: "redirect",
      component: () => import("./views/redirect.vue")
    },
    {
      path: "/luntan/moudle",
      name: "moudle",
      component: () => import("./components/luntan/moudle.vue")
    },
    {
      path: "/luntan/moudle/single",
      name: "singleTagTopic",
      component: () => import("./components/luntan/singleTagTopic.vue")
    },
    {
      path: "/luntan/newest",
      name: "newest",
      component: () => import("./components/luntan/newest.vue")
    },
    {
      path: "/luntan/hot",
      name: "hot",
      component: () => import("./components/luntan/hot.vue")
    },
    {
      path: "/luntan/publish",
      name: "publish",
      component: () => import("./components/luntan/publish.vue")
    },
    {
      path: "/luntan/topic/detail",
      name: "detail",
      component: () => import("./components/luntan/detail.vue")
    },
    {
      path: "/skill/list",
      name: "list",
      component: () => import("./components/skill/list.vue")
    },
    {
      path: "/skill/detail",
      name: "skilldetail",
      component: () => import("./components/skill/detail.vue")
    },
    {
      path: "/doc/list",
      name: "docList",
      component: () => import("./components/doc/list.vue")
    },
    {
      path: "/doc/detail",
      name: "docDetail",
      component: () => import("./components/doc/detail.vue")
    },
    {
      path: "/manage/skillList",
      name: "skillList",
      component: () => import("./components/manage/skillList.vue")
    },
    {
      path: "/manage/newSkill",
      name: "newSkill",
      component: () => import("./components/manage/newSkill.vue")
    },
    {
      path: "/manage/editSkill",
      name: "editSkill",
      component: () => import("./components/manage/editSkill.vue")
    },
    {
      path: "/manage/docList",
      name: "manageDocList",
      component: () => import("./components/manage/docList.vue")
    },
    {
      path: "/manage/newDoc",
      name: "newDoc",
      component: () => import("./components/manage/newDoc.vue")
    },
    {
      path: "/manage/editDoc",
      name: "editDoc",
      component: () => import("./components/manage/editDoc.vue")
    },
    {
      path: "/manage/createTask",
      name: "createTask",
      component: () => import("./components/manage/createTask.vue")
    },
    {
      path: "/manage/taskList",
      name: "taskList",
      component: () => import("./components/manage/taskList.vue")
    },
    {
      path: "/manage/issueList",
      name: "issueList",
      component: () => import("./components/manage/issueList.vue")
    },
    {
      path: "/personal",
      name: "personal",
      component: () => import("./components/personal/main.vue")
    },
    {
      path: "/personal/info",
      name: "personalInfo",
      component: () => import("./components/personal/info.vue")
    },
    {
      path: "/personal/topic",
      name: "personalTopic",
      component: () => import("./components/personal/topic.vue")
    },
    {
      path: "/personal/task",
      name: "personalTask",
      component: () => import("./components/personal/task.vue")
    },
    {
      path: "/reward",
      name: "reward",
      component: () => import("./components/reward/main.vue")
    },
    {
      path: "/reward/detail",
      name: "rewardDetail",
      component: () => import("./components/reward/detail.vue")
    },
    {
      path: "/reward/sign",
      name: "rewardSign",
      component: () => import("./components/reward/sign.vue")
    }
  ]
});

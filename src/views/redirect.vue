<template>
	<div>正在跳转...</div>
</template>

<script>
export default {
  data() {
    return {
      code: ""
    };
  },
  methods: {
    githubConfirm() {
      this.$http
        .get("/authentications/github", {
          params: {
            code: this.code
          }
        })
        .then(response => {
          if (response.data.code == 0) {
            window.sessionStorage.setItem(
              "authentication",
              response.data.data.token
            );
            this.$http.defaults.headers.common[
              "authentication"
            ] = sessionStorage.getItem("authentication");
            window.sessionStorage.setItem(
              "headPortrait",
              response.data.data.headPortrait
            );
            window.sessionStorage.setItem("loginStatus", 1);
            this.$router.push("/");
          } else {
            this.$Message.success(response.data.message);
          }
        });
    }
  },
  mounted() {
    this.code = this.$route.query.code;
    this.githubConfirm();
  }
};
</script>

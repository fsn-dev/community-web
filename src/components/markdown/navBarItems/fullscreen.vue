<template>
	<li class="navbar-item">
		<button title="Fullscreen" @click='showFullscreen' :class="{'active': fullscreen}">
			<i class="fa fa-arrows-alt"></i>
		</button>
	</li>
</template>

<script>
export default {
  computed: {
    fullscreen() {
      return this.$store.state.fullscreen;
    }
  },
  methods: {
    showFullscreen() {
      if (this.$store.state.fullscreen) {
        this.$router.go(-1);
      } else {
        this.$router.push("/luntan/publish");
      }
      this.$store.commit("FULLSCREEN");
    }
  }
};
</script>
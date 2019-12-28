<template>
	<div class="outputer" v-html='ripeTxt' :class="[fullscreen ? 'fullscreen' : '',preview ? 'preview' : 'fuullpage', theme]"></div>
</template>

<script>
export default {
  data() {
    return {
      scrollTrigger: false
    };
  },
  computed: {
    ripeTxt() {
      console.log(this.$store.getters.articleMd);
      return this.$store.getters.articleMd;
    },
    fullscreen() {
      return this.$store.state.fullscreen;
    },
    preview() {
      return this.$store.state.preview;
    },
    theme() {
      return this.$store.state.theme;
    }
  }
};
</script>

<style lang="less">
.outputer {
  transition: all ease 0.5s;
  box-sizing: border-box;
  height: 100%;
  width: 50%;
  padding: 15px;
  resize: none;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 18px;
  white-space: normal;
  overflow-y: scroll;
  word-wrap: break-word;
  background: rgba(250, 250, 250, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  color: #616161;
  margin-left: 10px;
  img {
    max-width: 100%;
    margin: 0 auto;
    display: block;
  }
  .emoji {
    height: 1em;
    display: inline;
  }
}

div.outputer.fuullpage {
  display: none;
}

div.outputer.preview {
  width: 50%;
  max-width: 1200px;
}

// theme-day
.outputer.theme-day {
  background: rgba(250, 250, 250, 1);
  border: 1px solid rgba(238, 238, 238, 1);
  color: #616161;
}
</style>
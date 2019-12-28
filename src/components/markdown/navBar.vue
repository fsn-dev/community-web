<template>
	<nav :class="['nav', 'navbar', theme]">
		<ul class="navbar-item-container">
			<bold/>
			<italic/>
			<list/>
			<strikethrough/>
			<my-link/>
			<my-image/>
			<emoji/>
			<fullscreen/>
      <preview/>
		</ul>
	</nav>
</template>

<script>
import Bold from "./navBarItems/bold.vue";
import Italic from "./navBarItems/italic.vue";
import List from "./navBarItems/list.vue";
import Strikethrough from "./navBarItems/strikethrough.vue";
import MyLink from "./navBarItems/link.vue";
import MyImage from "./navBarItems/image.vue";
import Emoji from "./navBarItems/emoji.vue";
import Fullscreen from "./navBarItems/fullscreen.vue";
import Preview from "./navBarItems/preview.vue";

export default {
  computed: {
    theme() {
      return this.$store.state.theme;
    }
  },
  components: {
    Bold,
    Italic,
    List,
    Strikethrough,
    MyLink,
    MyImage,
    Fullscreen,
    Emoji,
    Preview
  }
};
</script>

<style lang="less">
nav.navbar {
  box-sizing: border-box;
  height: 45px;
  z-index: 20;
  ul.navbar-item-container {
    height: 45px;
    min-width: 1000px;
    padding: 0;
    margin: 0;
    list-style: none;
    li.navbar-item {
      height: 45px;
      float: left;
      button {
        height: 45px;
        width: 45px;
        border: none;
        background: none;
        outline: none;
        transition: all ease 0.3s;
        &.active {
          background: #eeeeee;
        }
        .fa {
          color: #4d4d4d;
          font-size: 0.18rem;
        }
      }
    }
    li.navbar-item {
      padding-left: 5px;
      padding-right: 5px;
      button {
        cursor: pointer;
        &.active {
          background: #eeeeee;
        }
        .fa {
          color: #4d4d4d;
          font-size: 0.18rem;
        }
      }
    }
  }
}

nav.navbar.theme-day {
  ul.navbar-item-container {
    color: #fff;
    li.navbar-item {
      padding-left: 5px;
      padding-right: 5px;
      button {
        &.active {
          background: #eeeeee;
        }
        .fa {
          color: #4d4d4d;
          font-size: 0.18rem;
        }
      }
    }
  }
}
</style>
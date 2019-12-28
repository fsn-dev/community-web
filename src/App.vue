<template>
<div id="app" class="router">
    <vue-scroll>
      <router-view></router-view>
    </vue-scroll>
</div>
</template>

<style lang="less" scoped>
.router {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
</style>

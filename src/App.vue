<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    window.addEventListener("touchmove", e => {
      e.defaultPrevented();
      e.stopPropagation();
    });
  },
  created() {
    var getScale = function() {
      var screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      var p = screenWidth / 750;
      p = p > 1 ? 1 : p < 0.427 ? 0.427 : p;
      return p;
    };
    var createFontSize = function() {
      var p = getScale();
      document.getElementsByTagName("html")[0].style.fontSize = 100 * p + "px";
    };
    createFontSize();
    window.addEventListener("resize", createFontSize);
  }
};
</script>

<style lang="less">
#app {
  position: absolute;
  left: 50%;
  height: 100%;
  width: 7.5rem;
  margin-left: -3.75rem;
  top: 0;
  overflow: hidden;
}
</style>

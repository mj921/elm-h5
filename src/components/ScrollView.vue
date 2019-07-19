<template>
  <div class="elm-scroll-view">
    <div
      class="elm-scroll-top"
      :style="{ height: topHeight + 'rem' }"
      v-show="topHeight > 0"
    >
      <slot name="top"></slot>
    </div>
    <div
      class="elm-scroll-content"
      :style="{ height: `calc(100% - ${topHeight + bottomHeight}rem)` }"
    >
      <slot></slot>
    </div>
    <div
      class="elm-scroll-bottom"
      :style="{ height: bottomHeight + 'rem' }"
      v-show="bottomHeight > 0"
    >
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ElmScrollView",
  props: {
    topHeight: {
      type: Number,
      default: 0
    },
    bottomHeight: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.elm-scroll-view {
  position: absolute;
  width: 100%;
  height: 100%;
  .elm-scroll-content {
    overflow: auto;
    position: relative;
  }
}
</style>

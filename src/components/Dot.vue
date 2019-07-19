<template>
  <div class="elm-dot">
    <slot></slot>
    <div class="dot" v-show="zeroShow || num > 0">
      {{ maxNum === 0 ? num : num > maxNum ? maxNum + "+" : num }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ElmDot",
  props: {
    num: {
      type: Number,
      default: 0
    },
    zeroShow: {
      type: Boolean,
      default: false
    },
    maxNum: {
      type: Number,
      default: 99
    }
  }
};
</script>

<style lang="less" scoped>
.elm-dot {
  position: relative;
  height: auto;
  .dot {
    position: absolute;
    top: -0.18rem;
    right: -0.18rem;
    width: 0.36rem;
    height: 0.36rem;
    background-color: @Red;
    border-radius: 50%;
    color: @White;
    line-height: 0.36rem;
    font-size: 0.2rem;
    text-align: center;
  }
}
</style>

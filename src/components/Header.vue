<template>
  <div
    class="elm-header"
    :style="{ backgroundColor: bgColor, color: textColor }"
  >
    <div class="left" v-if="backShow" @click="back">
      <elm-icon type="left" />
    </div>
    <div class="title">{{ title }}</div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import ColorConfig from "../configs/ColorConfig";
export default {
  name: "ElmHeader",
  props: {
    title: {
      type: String,
      default: ""
    },
    bgColor: {
      type: String,
      default: ColorConfig.Blue
    },
    textColor: {
      type: String,
      default: ColorConfig.TitleWhite
    },
    backShow: {
      type: Boolean,
      default: true
    },
    backUrl: {
      type: String,
      default: ""
    },
    backFun: Function
  },
  data() {
    return {
      ColorConfig
    };
  },
  methods: {
    back() {
      if (this.backFun) {
        this.backFun();
      } else if (this.backUrl) {
        this.$router.push(this.backUrl);
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.elm-header {
  position: relative;
  height: 0.9rem;
  line-height: 0.9rem;
  font-size: 0.3rem;
  .left {
    position: absolute;
    left: 0.4rem;
    top: 0;
    height: 100%;
    font-size: 0.48rem;
    .elm-icon {
      vertical-align: top;
      margin-top: 0.21rem;
    }
  }
  .right {
    position: absolute;
    right: 0.4rem;
    top: 0;
  }
  .title {
    text-align: center;
    font-size: 0.34rem;
  }
}
</style>

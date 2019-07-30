<template>
  <div class="elm-swipe-cell" :style="{ marginLeft: moveX + 'rem' }">
    <div
      class="swipe-left"
      v-if="$slots.left"
      :style="{ width: leftWidth + 'rem' }"
    >
      <slot name="left"></slot>
    </div>
    <slot></slot>
    <div
      class="swipe-right"
      v-if="$slots.right"
      :style="{ width: rightWidth + 'rem' }"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ElmSwipeCell",
  props: {
    leftWidth: {
      type: Number,
      default: 0
    },
    rightWidth: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      status: "center",
      x: 0,
      moveX: 0,
      p: 1
    };
  },
  methods: {
    touchStart(e) {
      if (this.status !== "center") {
        e.stopPropagation();
      }
      this.x = e.changedTouches[0].clientX;
    },
    touchMove(e) {
      if (this.status !== "center") {
        e.stopPropagation();
      }
      let moveX = (e.changedTouches[0].clientX - this.x) / 100 / this.p;
      switch (this.status) {
        case "center":
          if (moveX > 0) {
            if (moveX > this.leftWidth) {
              moveX = this.leftWidth;
            }
          }
          if (moveX < 0) {
            if (-moveX > this.rightWidth) {
              moveX = -this.rightWidth;
            }
          }
          break;
        case "right":
          if (moveX > 0) {
            if (moveX > this.leftWidth + this.rightWidth) {
              moveX = this.leftWidth;
            } else {
              moveX = moveX - this.rightWidth;
            }
          } else if (moveX < 0) {
            moveX = -this.rightWidth;
          }
          break;
        case "left":
          if (moveX < 0) {
            if (-moveX > this.leftWidth + this.rightWidth) {
              moveX = -this.rightWidth;
            } else {
              moveX = this.leftWidth - moveX;
            }
          } else if (moveX > 0) {
            moveX = this.leftWidth;
          }
          break;
      }
      this.moveX = moveX;
    },
    touchEnd(e) {
      if (this.status !== "center") {
        e.stopPropagation();
      }
      let moveX = (e.changedTouches[0].clientX - this.x) / 100 / this.p;
      switch (this.status) {
        case "center":
          if (moveX > 0) {
            moveX = this.leftWidth;
            this.status = "left";
          }
          if (moveX < 0) {
            moveX = -this.rightWidth;
            this.status = "right";
          }
          break;
        case "right":
          if (moveX > 0) {
            if (moveX > this.rightWidth) {
              moveX = this.leftWidth;
              this.status = "left";
            } else {
              moveX = 0;
              this.status = "center";
            }
          } else if (moveX < 0) {
            moveX = -this.rightWidth;
          } else {
            moveX = this.moveX;
          }
          break;
        case "left":
          if (moveX < 0) {
            if (-moveX > this.leftWidth) {
              moveX = -this.rightWidth;
              this.status = "right";
            } else {
              moveX = 0;
              this.status = "center";
            }
          } else if (moveX > 0) {
            moveX = this.leftWidth;
          } else {
            moveX = this.moveX;
          }
          break;
      }
      this.moveX = moveX;
    },
    windowTouch() {
      this.status = "center";
      this.moveX = 0;
    }
  },
  mounted() {
    var screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const p = screenWidth / 750;
    this.p = p > 1 ? 1 : p < 0.427 ? 0.427 : p;
    this.$el.addEventListener("touchstart", this.touchStart);
    this.$el.addEventListener("touchmove", this.touchMove);
    this.$el.addEventListener("touchend", this.touchEnd);
    window.addEventListener("touchstart", this.windowTouch);
  },
  beforeDestroy() {
    this.$el.removeEventListener("touchstart", this.touchStart);
    this.$el.removeEventListener("touchmove", this.touchMove);
    this.$el.removeEventListener("touchend", this.touchEnd);
    window.removeEventListener("touchstart", this.windowTouch);
  }
};
</script>

<style lang="less" scoped>
.elm-swipe-cell {
  position: relative;
  display: inline-block;
  .swipe-right {
    position: absolute;
    left: 100%;
    top: 0;
  }
}
</style>

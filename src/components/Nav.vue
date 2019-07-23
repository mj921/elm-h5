<template>
  <div class="elm-nav">
    <dl :class="{ current: currIndex === 0 }" @click="$router.push('/')">
      <elm-icon type="elm" />
      <p>外卖</p>
    </dl>
    <dl :class="{ current: currIndex === 1 }">
      <elm-icon type="order" />
      <p>订单</p>
    </dl>
    <dl :class="{ current: currIndex === 2 }" @click="myClick">
      <elm-icon type="my" />
      <p>我的</p>
    </dl>
  </div>
</template>

<script>
export default {
  name: "ElmNav",
  props: {
    currIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  methods: {
    myClick() {
      if (localStorage.getItem("token")) {
        this.$router.push("/my-account");
      } else {
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.elm-nav {
  position: relative;
  height: 1rem;
  background-color: @White;
  z-index: 1;
  box-sizing: border-box;
  padding-top: 0.08em;
  box-shadow: 0 0 0.3rem 0 rgba(0, 0, 0, 0.1);
  dl {
    float: left;
    width: 2.5rem;
    text-align: center;
    font-size: 0.24rem;
    .elm-icon {
      font-size: 0.44rem;
      color: @SecondaryText;
    }
    &.current {
      color: @Blue;
      .elm-icon {
        color: @Blue;
      }
    }
    p {
      line-height: 0.48rem;
    }
  }
}
</style>

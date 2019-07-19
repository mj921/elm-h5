<template>
  <div class="elm-message">{{ message }}</div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less" scoped>
.elm-message {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  padding: @BaseSize / 2 @BaseSize;
  border-radius: 0.1rem;
  line-height: 0.42rem;
  font-size: 0.32rem;
  background-color: @Title;
  color: @TitleWhite;
  min-width: 6rem;
  text-align: center;
}
</style>

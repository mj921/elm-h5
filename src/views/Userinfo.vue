<template>
  <elm-scroll-view :topHeight="0.9" :bottomHeight="1">
    <template v-slot:top>
      <elm-header :backShow="false" title="" :bgColor="White" />
      <div></div>
    </template>
    <template v-slot:bottom>
      <elm-nav :currIndex="2" />
    </template>
  </elm-scroll-view>
</template>

<script>
import ColorConfig from "../configs/ColorConfig";
export default {
  data() {
    return {
      White: ColorConfig.White
    };
  }
};
</script>

<style></style>

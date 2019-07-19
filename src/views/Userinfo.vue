<template>
  <div>
    <elm-header :backShow="false" title="" :bgColor="White" />
  </div>
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

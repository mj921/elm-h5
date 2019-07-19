<template>
  <svg class="elm-icon" version="1.1" @click="clickHandle($event)">
    <use :xlink:href="`#icon-${type}`" />
  </svg>
</template>

<script>
export default {
  name: "ElmIcon",
  props: {
    type: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      xml: null
    };
  },
  methods: {
    clickHandle(e) {
      this.$emit("click", e);
    }
  }
};
</script>

<style scoped>
.elm-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  font-size: inherit;
}
</style>

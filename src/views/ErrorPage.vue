<template>
  <div>{{ type }}</div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "404"
    }
  }
};
</script>

<style></style>

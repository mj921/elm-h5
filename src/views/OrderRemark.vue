<template>
  <elm-scroll-view class="elm-order-remark">
    <elm-header title="订单备注">
      <template v-slot:right>
        <span @click="finish">完成</span>
      </template>
    </elm-header>
    <textarea
      cols="20"
      rows="4"
      placeholder="填写额外对给商家和骑手小哥的备注信息"
      maxlength="50"
      v-model="remark"
    ></textarea>
    <div class="length-limit">{{ remark.length }} / 50</div>
  </elm-scroll-view>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    const remark = this.$store.state.order.order.remark || "";
    return {
      remark
    };
  },
  methods: {
    ...mapMutations("order", {
      updateRemark: "UPDATE_REMARK"
    }),
    finish() {
      this.updateRemark(this.remark);
      this.$router.push("/dish-order");
    }
  }
};
</script>

<style lang="less" scoped>
.elm-order-remark {
  background-color: @White;
  textarea {
    width: 7.5rem - @BaseSize * 4;
    padding: @BaseSize;
    display: block;
    margin: @BaseSize auto;
    border: none;
    background-color: @Background;
    font-size: 0.24rem;
    line-height: 0.32rem;
    color: @PrimaryText;
    outline: none;
    letter-spacing: 0.1em;
    &::placeholder {
      color: @SecondaryText;
    }
  }
  .length-limit {
    position: absolute;
    right: @BaseSize * 3;
    top: 1.86rem + @BaseSize * 2;
    font-size: 0.24rem;
    color: @PrimaryText;
  }
}
</style>

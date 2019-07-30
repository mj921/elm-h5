<template>
  <elm-scroll-view :topHeight="0.9" class="elm-dish-order">
    <template v-slot:top>
      <elm-header backUrl="/order/list" />
    </template>
    <div class="bg"></div>
    <div class="order-content">
      <div class="order-address">
        <dl class="address-info" @click="$router.push('/address/select')">
          <dt>{{ order.address }}</dt>
          <p>{{ order.username }} {{ order.phone }}</p>
        </dl>
      </div>
      <div class="order-dishs">
        <dt>{{ order.merchant.name }}</dt>
        <dl v-for="dish in order.dishs" :key="dish.id">
          <img :src="dish.img" :alt="dish.name" />
          <span class="dish-name">{{ dish.name }}</span>
          <span>x{{ dish.num }}</span>
          <span class="dish-price"
            >￥<b>{{ dish.price * dish.num }}</b></span
          >
        </dl>
        <dl class="sum-price">
          小计 ￥<b>{{ totalPrice }}</b>
        </dl>
      </div>
      <div class="order-remark">
        <dl
          class="remark-item clearfloat"
          @click="$router.push('/order/remark')"
        >
          <label for="">订单备注</label>
          <div class="right">
            <span class="remark-item-value">
              {{ order.remark }}
            </span>
            <elm-icon type="right" />
          </div>
        </dl>
      </div>
    </div>
  </elm-scroll-view>
</template>

<script>
import { getOrderApi } from "../apis/orderApi";
export default {
  data() {
    return {
      order: {}
    };
  },
  computed: {
    totalPrice() {
      let sum = 0;
      this.order &&
        this.order.dishs &&
        this.order.dishs.forEach(item => {
          sum += item.num * item.price;
        });
      return sum;
    }
  },
  methods: {
    getOrderInfo() {
      getOrderApi(this.$route.params.id).then(res => {
        this.order = res.data;
      });
    }
  },
  created() {
    this.getOrderInfo();
  }
};
</script>

<style lang="less" scoped>
@order-box-space: 0.18rem;
@order-line-padding: 0.32rem;
.elm-dish-order {
  background-color: @Background;
  .bg {
    width: 7.5rem;
    position: absolute;
    top: 0;
    height: 2.4rem;
    background: linear-gradient(@Blue, transparent);
    z-index: 0;
  }
  .order-content {
    position: relative;
    z-index: 1;
  }
  .order-address {
    background-color: @White;
    margin: @order-box-space auto;
    width: 7.5rem - @order-box-space * 2;
    padding: 0 @order-line-padding;
    box-sizing: border-box;
    dl.address-info {
      position: relative;
      border-bottom: 1px solid @Border;
      padding: 0.32rem 0;
      color: @BlueHover;
      span {
        font-size: 0.4rem;
        line-height: 0.5rem;
      }
      dt {
        margin-bottom: 0.2rem;
        line-height: 0.5rem;
        font-size: 0.38rem;
        color: @Title;
      }
      p {
        line-height: 1em;
        font-size: 0.24rem;
        color: @SecondaryText;
      }
      .elm-icon {
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -0.2rem;
        font-size: 0.4rem;
        float: right;
        color: @PrimaryText;
      }
    }
  }
  .order-dishs {
    padding: 0 @order-line-padding;
    background-color: @White;
    width: 7.5rem - @order-box-space * 2;
    margin: 0 auto;
    box-sizing: border-box;
    dt {
      line-height: 1rem;
      font-size: 0.3rem;
      color: @Title;
      border-bottom: 1px solid @Border;
      box-sizing: border-box;
    }
    dl {
      padding: @BaseSize 0;
      font-size: 0.24rem;
      height: 0.7rem;
      line-height: 0.7rem;
      color: @PrimaryText;
      img {
        float: left;
        margin-right: @BaseSize;
        width: 0.7rem;
        height: 0.7rem;
        box-sizing: border-box;
        border: 1px solid @Divider;
        border-radius: 0.05rem;
      }
      span {
        float: left;
        width: 1rem;
        text-align: right;
        &.dish-name {
          width: 4.8rem - @BaseSize - @order-line-padding * 2 - @order-box-space *
            2;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: left;
        }
        &.dish-price b {
          font-size: 0.26rem;
          color: @Title;
        }
      }
      &.sum-price {
        padding: 0;
        line-height: 1rem;
        font-size: 0.24rem;
        height: 1rem;
        text-align: right;
        border-top: 1px solid @Border;
        b {
          font-size: 0.32rem;
        }
      }
    }
  }
  .order-remark {
    padding: 0 @order-line-padding;
    background-color: @White;
    width: 7.5rem - @order-box-space * 2;
    margin: @order-box-space auto;
    box-sizing: border-box;
    .remark-item {
      padding: 0.3rem 0;
      font-size: 0.28rem;
      line-height: 0.4rem;
      border-bottom: 1px solid @Border;
      overflow: hidden;
      label {
        float: left;
        color: @Title;
      }
      .right {
        float: right;
        .remark-item-value {
          display: inline-block;
          max-width: 4.5rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: @SecondaryText;
          font-size: 0.24rem;
        }
        .elm-icon {
          font-size: 0.4rem;
          color: @PrimaryText;
        }
      }
    }
  }
  .order-bottom {
    position: relative;
    padding-left: @order-line-padding;
    background-color: @PrimaryText;
    height: 1rem;
    color: @White;
    font-size: 0.4rem;
    line-height: 1rem;
    button {
      float: right;
      border: none;
      width: 2.2rem;
      height: 1rem;
      outline: none;
      text-align: center;
      line-height: 1rem;
      font-size: 0.3rem;
      background-color: @Green;
      color: @White;
      &:active {
        background-color: @GreenClick;
      }
    }
  }
  .remark-dialog {
    position: absolute;
    z-index: 999;
    top: 100%;
    transition: top 0.5s;
    .remark-dialog-show {
      top: 0;
    }
  }
}
</style>

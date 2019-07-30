<template>
  <elm-scroll-view :topHeight="0.9" :bottomHeight="1" class="elm-order-list">
    <template v-slot:top>
      <elm-header
        :back-show="false"
        title="订单"
        :bgColor="ColorConfig.White"
        :textColor="ColorConfig.Title"
      >
        <template v-slot:right>
          <elm-icon typ="search" />
        </template>
      </elm-header>
    </template>
    <div class="order-list">
      <dl
        v-for="order in orderList"
        :key="order.id"
        @click="$router.push(`/order/detail/${order.id}`)"
      >
        <img
          :src="order.merchantLogo"
          :alt="order.merchantName"
          @click.stop="$router.push(`/merchant-detail/${order.merchantId}`)"
        />
        <div class="order-info">
          <div class="order-left">
            <dt
              @click.stop="$router.push(`/merchant-detail/${order.merchantId}`)"
            >
              <label>{{ order.merchantName }}</label>
              <elm-icon type="right" />
            </dt>
            <div class="order-time">{{ order.addtimeStr }}</div>
            <p>{{ order.dishs[0].name }} 等{{ order.dishs.length }}件商品</p>
          </div>
          <div class="order-right">
            <div class="order-status">{{ order.statusStr }}</div>
            <div class="order-price">￥{{ order.price }}</div>
          </div>
        </div>
      </dl>
    </div>
    <template v-slot:bottom>
      <elm-nav :tabindex="1" />
    </template>
  </elm-scroll-view>
</template>

<script>
import ColorConfig from "../configs/ColorConfig";
import { getOrdersApi } from "../apis/orderApi";
export default {
  data() {
    return {
      ColorConfig,
      orderList: []
    };
  },
  methods: {
    getOrders() {
      getOrdersApi().then(res => {
        this.orderList = res.data.list;
      });
    }
  },
  created() {
    this.getOrders();
  }
};
</script>

<style lang="less" scoped>
.elm-order-list {
  .order-list {
    dl {
      overflow: hidden;
      padding-right: @BaseSize;
      img {
        float: left;
        margin: 0 @BaseSize;
        width: 0.7rem;
        height: 0.7rem;
      }
      .order-info {
        float: left;
        width: 6.8rem - @BaseSize * 3;
        border-bottom: 1px solid @Border;
        padding-bottom: 0.5rem;
        .order-left {
          float: left;
          width: 4.3rem;
          dt {
            height: 0.5rem;
            label {
              float: left;
              max-width: 3.8rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size: 0.3rem;
              color: @Title;
              line-height: 0.5rem;
            }
            .elm-icon {
              margin-top: 0.1rem;
              margin-left: 0.1rem;
              font-size: 0.3rem;
              color: @PrimaryText;
            }
          }
          .order-time {
            font-size: 0.18rem;
            color: @SecondaryText;
            line-height: 1em;
          }
          p {
            margin-top: 0.4rem;
            font-size: 0.24rem;
            color: @PrimaryText;
            line-height: 1em;
          }
        }
        .order-right {
          float: right;
          width: 1.7rem;
          font-size: 0.24rem;
          text-align: right;
          .order-status {
            margin-bottom: 0.58rem;
            color: @PrimaryText;
            line-height: 0.5rem;
          }
          .order-price {
            color: @Title;
            line-height: 1em;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="elm-merchant-detail">
    <img class="bg-logo" :src="merchantInfo.logo" alt="logo" />
    <elm-scroll-view :topHeight="0.9" :bottomHeight="1">
      <template v-slot:top>
        <elm-header
          bgColor="transparent"
          :textColor="ColorConfig.Title"
          backUrl="/"
        />
      </template>
      <div class="merchant-info">
        <img class="logo" :src="merchantInfo.logo" alt="logo" />
        <dt>{{ merchantInfo.name }}</dt>
        <div class="merchant-evaluate">
          评分{{
            merchantInfo.score === "" ? "暂无评分" : merchantInfo.score
          }}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;月售{{
            merchantInfo.monthSale
          }}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;商家配送约{{
            merchantInfo.distributionTime
          }}分钟
        </div>
      </div>
      <div class="merchant-tabs">
        <dl :class="{ 'curr-tab': tabIndex === 0 }" @click="tabChange(0)">
          点餐
        </dl>
        <dl :class="{ 'curr-tab': tabIndex === 1 }" @click="tabChange(1)">
          评价
        </dl>
        <dl :class="{ 'curr-tab': tabIndex === 2 }" @click="tabChange(2)">
          商家
        </dl>
        <div
          class="curr-line"
          :style="{ left: 2.5 * tabIndex + 0.95 + 'rem' }"
        ></div>
      </div>
      <div class="tab-panels">
        <div class="dish-list" v-show="tabIndex === 0">
          <div class="dish-types">
            <dl
              v-for="item in types"
              :key="item"
              :class="{ 'curr-type': currType === item }"
            >
              {{ item }}
            </dl>
          </div>
          <div class="dishs">
            <template v-for="item in dishList">
              <dt :key="'dish' + item">{{ item.type }}</dt>
              <dl v-for="dish in item.dishs" :key="dish.id">
                <img :src="dish.img" :alt="dish.name" />
                <div class="dish-info">
                  <div class="dish-name">{{ dish.name }}</div>
                  <p>{{ dish.introduce }}</p>
                  <p>月售{{ dish.monthSale }}</p>
                  <div class="dish-price">￥{{ dish.price }}</div>
                  <div class="dish-add">
                    <elm-icon
                      v-if="shopCar.find(jtem => jtem.id === dish.id)"
                      class="reduce-icon"
                      type="reduce"
                      @click="reduceDish(dish)"
                    />
                    <span v-if="shopCar.find(jtem => jtem.id === dish.id)">
                      {{ dish.num }}
                    </span>
                    <elm-icon
                      class="add-icon"
                      type="add-fill"
                      @click="addDish(dish)"
                    />
                  </div>
                </div>
              </dl>
            </template>
          </div>
        </div>
      </div>
      <template v-slot:bottom>
        <div class="merchant-bottom">
          <elm-dot
            class="shop-car"
            :class="{ 'shop-car-fill': shopCar.length > 0 }"
            :num="totalNum"
          >
            <elm-icon type="waimai" />
          </elm-dot>
          <span>{{ totalPrice > 0 ? `￥${totalPrice}` : "" }}</span>
          <button
            :class="{
              'can-click': totalPrice >= merchantInfo.startDistributionFee
            }"
            @click="addOrder"
          >
            {{
              totalPrice >= merchantInfo.startDistributionFee
                ? "去下单"
                : `￥${merchantInfo.startDistributionFee}起送`
            }}
          </button>
        </div>
      </template>
    </elm-scroll-view>
  </div>
</template>

<script>
import ColorConfig from "../configs/ColorConfig";
import { getMerchantApi, getTypesApi } from "../apis/merchantApi";
import { getDishAllApi } from "../apis/dishApi";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      ColorConfig,
      merchantInfo: {},
      tabIndex: 0,
      types: [],
      currType: "",
      dishList: [],
      shopCar: []
    };
  },
  methods: {
    ...mapMutations("order", {
      updateMerchant: "UPDATE_MERCHANT",
      updateDishs: "UPDATE_DISHS"
    }),
    getMerchantInfo() {
      getMerchantApi(this.$route.params.id).then(res => {
        this.merchantInfo = res.data;
        this.updateMerchant(this.merchantInfo);
      });
    },
    tabChange(index) {
      this.tabIndex = index;
    },
    getTypes() {
      getTypesApi(this.$route.params.id).then(res => {
        this.types = res.data;
        this.currType = (res.data && res.data.length > 0 && res.data[0]) || "";
        this.getDishs(this.currType);
      });
    },
    getDishs(type) {
      getDishAllApi({
        merchantId: this.$route.params.id,
        type
      }).then(res => {
        this.dishList.push({
          type,
          dishs: res.data
        });
      });
    },
    addDish(dish) {
      const d = this.shopCar.find(item => item.id === dish.id);
      if (d) {
        d.num++;
      } else {
        dish.num = 1;
        this.shopCar.push(dish);
      }
      this.shopCar = [...this.shopCar];
      this.updateDishs(this.shopCar);
    },
    reduceDish(dish) {
      const d = this.shopCar.find(item => item.id === dish.id);
      d.num--;
      if (d.num === 0) {
        const i = this.shopCar.indexOf(d);
        this.shopCar.splice(i, 1);
      }
      this.shopCar = [...this.shopCar];
      this.updateDishs(this.shopCar);
    },
    addOrder() {
      this.$router.push("/dish-order");
    }
  },
  computed: {
    totalPrice() {
      let sum = 0;
      this.shopCar.forEach(item => {
        sum += item.num * item.price;
      });
      return sum;
    },
    totalNum() {
      let num = 0;
      this.shopCar.forEach(item => {
        num += item.num;
      });
      return num;
    }
  },
  created() {
    this.getMerchantInfo();
    this.getTypes();
  }
};
</script>

<style lang="less" scoped>
.elm-merchant-detail {
  .bg-logo {
    position: absolute;
    top: -3rem;
    width: 7.5rem;
    filter: blur(0.7rem);
  }
  .merchant-info {
    position: relative;
    margin-top: 1.2rem;
    background-color: @White;
    padding: 0.65rem 0 0.4rem;
    .logo {
      position: absolute;
      display: block;
      width: 1.5rem;
      left: 3rem;
      top: -1.2rem;
      background-color: @White;
    }
    dt {
      margin-bottom: 0.3rem;
      text-align: center;
      font-size: 0.4rem;
      font-weight: bold;
      line-height: 1em;
      color: @Title;
    }
    .merchant-evaluate {
      margin-bottom: 0.2rem;
      font-size: 0.2rem;
      line-height: 1em;
      color: @SecondaryText;
      text-align: center;
    }
  }
  .merchant-tabs {
    padding: 0.2rem 0;
    border-bottom: 1px solid @Border;
    font-size: 0.26rem;
    line-height: 0.26rem;
    color: @PrimaryText;
    position: relative;
    height: 0.26rem;
    background-color: @White;
    dl {
      width: 2.5rem;
      float: left;
      text-align: center;
      &.curr-tab {
        color: @Title;
        font-weight: bold;
      }
    }
    .curr-line {
      position: absolute;
      bottom: 0;
      width: 0.6rem;
      height: 0.06rem;
      background-color: @Blue;
      transition: left 0.2s linear;
    }
  }
  .tab-panels {
    height: calc(100% - 2.56rem);
    .dish-list {
      height: 100%;
      .dish-types {
        float: left;
        width: 1.6rem;
        background-color: @Background;
        dl {
          padding: @BaseSize;
          font-size: 0.26rem;
          line-height: 0.32rem;
          color: @PrimaryText;
          &.curr-type {
            color: @Title;
            background-color: @White;
            font-weight: bold;
          }
        }
      }
      .dishs {
        float: right;
        width: 5.9rem - @BaseSize;
        dt {
          padding: @BaseSize;
          font-size: 0.26rem;
          line-height: 0.32rem;
          color: @PrimaryText;
        }
        dl {
          padding-right: @BaseSize;
          margin-bottom: @BaseSize;
          overflow: hidden;
          img {
            width: 1.9rem;
            height: 1.9rem;
            float: left;
          }
          .dish-info {
            float: right;
            width: 4rem - @BaseSize * 3;
            .dish-name {
              font-size: 0.28rem;
              font-weight: bold;
              color: @Title;
            }
            p {
              line-height: 0.34rem;
              font-size: 0.2rem;
              color: @SecondaryText;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .dish-price {
              color: @Red;
              font-size: 0.3rem;
            }
            .dish-add {
              float: right;
              font-size: 0.44rem;
              .reduce-icon {
                color: @Blue;
              }
              span {
                margin: 0 @BaseSize;
                display: inline-block;
                font-size: 0.32rem;
                line-height: 0.44rem;
                color: @PrimaryText;
              }
              .add-icon {
                color: @Blue;
              }
            }
          }
        }
      }
    }
  }
  .merchant-bottom {
    position: relative;
    background-color: @PrimaryText;
    height: 1rem;
    .shop-car {
      left: @BaseSize * 2;
      top: -0.4rem;
      position: absolute;
      color: @SecondaryTextWhite;
      font-size: 1rem;
      height: 1rem;
      line-height: 1rem;
      &.shop-car-fill {
        color: #a2d5ff;
      }
    }
    span {
      margin-left: 1.8rem;
      font-size: 0.36rem;
      line-height: 1rem;
      color: @White;
    }
    button {
      float: right;
      border: none;
      background-color: @SecondaryText;
      width: 2.2rem;
      height: 1rem;
      outline: none;
      text-align: center;
      line-height: 1rem;
      color: @PrimaryTextWhite;
      font-size: 0.3rem;
      &.can-click {
        background-color: @Green;
        color: @White;
        &:active {
          background-color: @GreenClick;
        }
      }
    }
  }
}
</style>

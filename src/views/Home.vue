<template>
  <elm-scroll-view
    :topHeight="0.9"
    :bottomHeight="searchFlag ? 0 : 1"
    class="elm-home"
  >
    <template v-slot:top>
      <form class="home-search" :class="{ 'search-status': searchFlag }">
        <div class="search-box" v-show="!searchFlag" @click="searchClick"></div>
        <input
          ref="searchIpt"
          v-model="searchText"
          v-show="searchFlag"
          placeholder="输入商家"
          @input="searchInput"
        />
        <span class="search-cancel" v-show="searchFlag" @click="searchCancel">
          取消
        </span>
        <elm-icon
          class="search-icon"
          type="search"
          :class="{ 'search-status': searchFlag }"
        />
      </form>
    </template>
    <div v-show="!searchFlag" class="merchant-list">
      <dl
        v-for="item in merchantList"
        :key="item.id"
        @click="$router.push(`/merchant-detail/${item.id}`)"
      >
        <img :src="item.logo" alt="logo" />
        <div class="merchant-info">
          <dt>{{ item.name }}</dt>
          <div class="merchant-evaluate">
            <span class="merchant-score">
              <elm-icon type="star" />
              <span :class="{ 'merchant-score-null': item.score === '' }">
                {{ item.score === "" ? "暂无评分" : item.score }}
              </span>
            </span>
            <span class="merchant-sale">月售{{ item.monthSale }}</span>
          </div>
          <div class="merchant-fee">
            <span>
              起送￥{{ item.startDistributionFee }} 配送￥{{
                item.distributionFee
              }}
            </span>
            <span>{{ item.distributionTimeStr }} {{ item.distanceStr }}</span>
          </div>
        </div>
      </dl>
    </div>
    <div v-show="searchFlag" class="search-list">
      <dl v-for="item in searchList" :key="item.id">
        <img :src="item.logo" alt="logo" />
        <div class="search-info">
          <dt>{{ item.name }}</dt>
          <span>评分 {{ item.score }}</span>
          <span>配送￥{{ item.distributionFee }}</span>
          <span>{{ item.distanceStr }}</span>
        </div>
      </dl>
    </div>
    <template v-slot:bottom>
      <elm-nav />
    </template>
  </elm-scroll-view>
</template>

<script>
import { searchMerchantsApi } from "../apis/merchantApi";
import { MerchantStatus } from "../enums";
export default {
  data() {
    return {
      searchFlag: false,
      searchText: "",
      searchSto: null,
      searchList: [],
      merchantList: [],
      pageSize: 10,
      current: 1
    };
  },
  methods: {
    searchClick() {
      this.searchFlag = true;
      this.$nextTick(() => {
        this.$refs.searchIpt.focus();
      });
    },
    searchCancel() {
      this.searchFlag = false;
      this.searchText = "";
      this.searchList = [];
    },
    searchInput() {
      clearTimeout(this.searchSto);
      if (this.searchText === "") {
        this.searchList = [];
      } else {
        this.searchSto = setTimeout(() => {
          searchMerchantsApi({
            name: this.searchText,
            current: 1,
            pageSize: 5,
            status: [MerchantStatus.Open, MerchantStatus.Rest].join(",")
          }).then(res => {
            this.searchList = res.data.list;
          });
        }, 300);
      }
    },
    getMerchants() {
      searchMerchantsApi({
        current: this.current,
        pageSize: this.pageSize,
        status: [MerchantStatus.Open, MerchantStatus.Rest].join(",")
      }).then(res => {
        this.merchantList = res.data.list;
      });
    }
  },
  created() {
    this.getMerchants();
  }
};
</script>
<style lang="less" scoped>
.elm-home {
  .home-search {
    position: relative;
    height: 0.9rem;
    background-color: @Title;
    box-sizing: border-box;
    padding: 0.11rem @BaseSize;
    &.search-status {
      background-color: @White;
    }
    .search-box {
      vertical-align: top;
      display: inline-block;
      height: 0.66rem;
      width: 7.5rem - @BaseSize * 2;
      background-color: @White;
      border-radius: 0.33rem;
      text-align: center;
      font-size: 0.48rem;
      color: @SecondaryText;
    }
    input {
      vertical-align: top;
      border: none;
      height: 0.66rem;
      width: 7.5rem - @BaseSize * 2 - 0.7rem;
      background-color: @Background;
      border-radius: 0.33rem;
      padding: 0 @BaseSize 0 @BaseSize * 3;
      box-sizing: border-box;
      outline: none;
    }
    .search-cancel {
      float: right;
      font-size: 0.28rem;
      color: @Blue;
      line-height: 0.7rem;
    }
    .search-icon {
      left: 3.75rem - 0.24rem;
      top: 0.2rem;
      position: absolute;
      font-size: 0.48rem;
      color: @SecondaryText;
      &.search-status {
        left: 0.4rem;
      }
    }
  }
  .search-list {
    padding-left: @BaseSize;
    dl {
      padding: @BaseSize 0;
      border-bottom: 1px solid @Border;
      height: 0.75rem;
      img {
        width: 0.5rem;
        margin-right: @BaseSize;
        float: left;
        border: 1px solid @Divider;
        border-radius: 0.05rem;
      }
      .search-info {
        dt {
          font-weight: bold;
          margin-bottom: 0.11rem;
          font-size: 0.28rem;
          line-height: 0.36rem;
          color: @PrimaryText;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        span {
          margin-right: @BaseSize / 2;
          font-size: 0.22rem;
          line-height: 0.28rem;
          color: @SecondaryText;
        }
      }
    }
  }
  .merchant-list {
    padding-left: @BaseSize;
    dl {
      padding: @BaseSize @BaseSize @BaseSize 0;
      border-bottom: 1px solid @Border;
      height: 1.6rem;
      img {
        width: 1.6rem;
        margin-right: @BaseSize;
        float: left;
        border: 1px solid @Divider;
        border-radius: 0.1rem;
      }
      .merchant-info {
        dt {
          font-weight: bold;
          margin-bottom: 0.2rem;
          font-size: 0.34rem;
          line-height: 1.6em;
          color: @Title;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .merchant-evaluate {
          margin-bottom: 0.2rem;
          font-size: 0.24rem;
          line-height: 1em;
          color: @SecondaryText;
          .merchant-score {
            color: @Orange;
            .merchant-score-null {
              color: @Disable;
            }
          }
        }
        .merchant-fee {
          font-size: 0.24rem;
          line-height: 1em;
          color: @SecondaryText;
          span:last-child {
            float: right;
          }
        }
      }
    }
  }
}
</style>

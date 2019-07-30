<template>
  <elm-scroll-view :topHeight="0.9" :bottomHeight="1" class="elm-account">
    <template v-slot:top>
      <elm-header :backShow="false" title="" :bgColor="White" />
    </template>
    <div class="account">
      <div class="account-text">
        <h1>{{ userinfo.username }}</h1>
        <p>再忙也要记得吃饭呦~</p>
      </div>
      <img :src="userinfo.img" :alt="userinfo.username" />
    </div>
    <dl class="account-item clearfloat">
      <label for="">我的收藏</label>
      <div class="right">
        <elm-icon type="right" />
      </div>
    </dl>
    <dl class="account-item clearfloat" @click="$router.push('/address/list')">
      <label for="">我的地址</label>
      <div class="right">
        <elm-icon type="right" />
      </div>
    </dl>
    <dl class="account-item clearfloat">
      <label for="">设置</label>
      <div class="right">
        <elm-icon type="right" />
      </div>
    </dl>
    <template v-slot:bottom>
      <elm-nav :currIndex="2" />
    </template>
  </elm-scroll-view>
</template>

<script>
import ColorConfig from "../configs/ColorConfig";
import { getUserinfoApi } from "../apis/userApi";
export default {
  data() {
    return {
      White: ColorConfig.White,
      userinfo: {}
    };
  },
  methods: {
    getUserinfo() {
      getUserinfoApi().then(res => {
        this.userinfo = res.data;
      });
    }
  },
  created() {
    this.getUserinfo();
  }
};
</script>

<style lang="less" scoped>
.elm-account {
  .account {
    margin-bottom: 0.5rem;
    height: 1.6rem;
    padding: 0 @BaseSize * 2;
    .account-text {
      float: left;
      width: 5.9rem - @BaseSize * 4;
      h1 {
        font-size: 0.6rem;
        line-height: 1em;
        margin-bottom: @BaseSize;
        color: @Title;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: normal;
      }
      p {
        font-size: 0.26rem;
        line-height: 0.48rem;
        color: @SecondaryText;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    img {
      float: right;
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 50%;
    }
  }
  .account-item {
    padding: 0.35rem @BaseSize * 2;
    font-size: 0.32rem;
    line-height: 0.4rem;
    border-bottom: 1px solid @Border;
    overflow: hidden;
    label {
      float: left;
      color: @Title;
      .elm-icon {
        color: @Blue;
      }
    }
    .right {
      float: right;
      .elm-icon {
        font-size: 0.4rem;
        color: @PrimaryText;
      }
    }
  }
}
</style>

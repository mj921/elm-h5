<template>
  <elm-scroll-view :topHeight="0.9" :bottomHeight="1" class="elm-account">
    <template v-slot:top>
      <elm-header :backShow="false" title="" :bgColor="White" />
    </template>
    <div class="userinfo">
      <div class="userinfo-text">
        <h1>{{ userinfo.username }}</h1>
        <p>再忙也要记得吃饭呦~</p>
      </div>
      <img :src="userinfo.img" :alt="userinfo.username" />
    </div>
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
  .userinfo {
    margin-bottom: 0.5rem;
    height: 1.6rem;
    padding: 0 @BaseSize * 2;
    .userinfo-text {
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
}
</style>

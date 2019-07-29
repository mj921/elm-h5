<template>
  <div class="elm-address-list">
    <elm-header title="收货地址">
      <template v-slot:right>
        <span @click="$router.push('/address/add')">新增地址</span>
      </template>
    </elm-header>
    <div class="address-list">
      <elm-swipe-cell
        v-for="address in addressList"
        :right-width="1.5"
        :key="address.id"
      >
        <dl>
          <dt>{{ address.position }}</dt>
          <div class="address-info">{{ address.address }}</div>
          <div class="user-info">
            {{ address.username }}&nbsp;&nbsp;&nbsp;{{ address.phone }}
          </div>
          <elm-icon type="edit" />
        </dl>
        <template v-slot:right>
          <button class="del-btn">删除</button>
        </template>
      </elm-swipe-cell>
    </div>
  </div>
</template>

<script>
import { getAddressListApi } from "../../apis/addressApi";
export default {
  data() {
    return {
      addressList: []
    };
  },
  methods: {
    getAddressList() {
      getAddressListApi().then(res => {
        this.addressList = res.data;
      });
    }
  },
  created() {
    this.getAddressList();
  }
};
</script>

<style lang="less" scoped>
.elm-address-list {
  .address-list {
    padding-left: @BaseSize * 2;
    dl {
      position: relative;
      padding: 0.15rem 0;
      border-bottom: 1px solid @Border;
      width: 7.5rem - @BaseSize * 2;
      dt {
        color: @Title;
        font-size: 0.32rem;
        line-height: 0.56rem;
      }
      .address-info {
        color: @PrimaryText;
        font-size: 0.3rem;
        line-height: 0.46rem;
      }
      .user-info {
        color: @SecondaryText;
        font-size: 0.28rem;
        line-height: 0.46rem;
      }
      .elm-icon {
        position: absolute;
        right: @BaseSize;
        top: 50%;
        margin-top: -0.25rem;
        font-size: 0.48rem;
        color: @SecondaryText;
      }
    }
    .del-btn {
      width: 1.5rem;
      background-color: @Red;
      color: @White;
      text-align: center;
      line-height: 1.8rem;
      font-size: 0.32rem;
      border: none;
      outline: none;
    }
  }
}
</style>

<template>
  <div class="elm-address-add">
    <elm-header title="新增地址" />
    <div class="elm-address-form">
      <div class="elm-address-item elm-address-username">
        <label for="">联系人</label>
        <div class="elm-address-item-content">
          <input
            type="text"
            v-model="form.username"
            maxlength="6"
            placeholder="姓名"
          />
          <div class="elm-address-username-tags">
            <dl
              :class="{ curr: form.usernameTag === '先生' }"
              @click="form.usernameTag = '先生'"
            >
              先生
            </dl>
            <dl
              :class="{ curr: form.usernameTag === '女士' }"
              @click="form.usernameTag = '女士'"
            >
              女士
            </dl>
          </div>
        </div>
      </div>
      <div class="elm-address-item">
        <label for="">电话</label>
        <div class="elm-address-item-content">
          <input type="text" v-model="form.phone" placeholder="手机号码" />
        </div>
      </div>
      <div class="elm-address-item">
        <label for="">地址</label>
        <div class="elm-address-item-content">
          <input
            type="text"
            readonly
            v-model="form.position"
            placeholder="选择收货地址"
            @click="selectPosition"
          />
          <elm-icon type="right" />
        </div>
      </div>
      <div class="elm-address-item">
        <label for="">门牌号</label>
        <div class="elm-address-item-content">
          <input
            type="text"
            v-model="form.address"
            placeholder="例：7楼921室"
          />
        </div>
      </div>
    </div>
    <button @click="saveAddress">确定</button>
    <transition name="fade">
      <elm-position-select
        class="position-select"
        :style="{
          top: visible ? '0.9rem' : '100%'
        }"
        @select="selectHandle"
      />
    </transition>
  </div>
</template>

<script>
import ElmPositionSelect from "../../components/address/PositionSelect.vue";
import { validPhone } from "../../utils/validators";
import { addAddressApi } from "../../apis/addressApi";
export default {
  data: function() {
    return {
      form: {
        username: "",
        usernameTag: "",
        phone: "",
        position: "",
        longitude: "",
        latitude: "",
        address: ""
      },
      visible: false
    };
  },
  methods: {
    selectPosition() {
      this.visible = true;
    },
    selectHandle(position) {
      this.form.position = position.name;
      this.form.latitude = position.location.lat;
      this.form.longitude = position.location.lng;
      this.visible = false;
    },
    saveAddress() {
      if (this.form.username === "") {
        this.$message("请输入联系人姓名");
      } else if (this.form.phone === "") {
        this.$message("请输入联系电话");
      } else if (!validPhone(this.form.phone)) {
        this.$message("联系电话格式不正确");
      } else if (this.form.position === "") {
        this.$message("请选择地址");
      } else {
        addAddressApi({
          username:
            this.form.username +
            (this.form.usernameTag ? `（${this.form.usernameTag}）` : ""),
          phone: this.form.phone,
          position: this.form.position,
          latitude: this.form.latitude + "",
          longitude: this.form.longitude + "",
          address: this.form.address
        }).then(() => {
          this.$message("添加成功");
        });
      }
    }
  },
  components: {
    ElmPositionSelect
  }
};
</script>

<style lang="less" scoped>
.elm-address-add {
  background-color: @Background;
  .elm-address-form {
    margin-top: @BaseSize;
    padding-left: @BaseSize;
    background-color: @White;
    .elm-address-item {
      padding: @BaseSize @BaseSize @BaseSize 0;
      border-bottom: 1px solid @Border;
      font-size: 0.3rem;
      line-height: 1em;
      overflow: hidden;
      &.elm-address-username {
        padding-right: 0;
        .elm-address-item-content {
          input {
            border-bottom: 1px solid @Border;
            padding-bottom: @BaseSize;
            padding-right: @BaseSize;
          }
          .elm-address-username-tags {
            margin-top: @BaseSize;
            overflow: hidden;
            dl {
              display: inline-block;
              padding: 0 1.5 * @BaseSize;
              font-size: 0.26rem;
              line-height: 0.56rem;
              color: @SecondaryText;
              border: 1px solid @Border;
              border-radius: 0.08rem;
              &:not(:last-child) {
                margin-right: @BaseSize;
              }
              &.curr {
                border-color: @Blue;
                color: @Blue;
              }
            }
          }
        }
      }
      label {
        width: 1.4rem;
        float: left;
        color: @Title;
        vertical-align: top;
        font-weight: bold;
      }
      .elm-address-item-content {
        float: right;
        position: relative;
        input {
          width: 7.5 - 3 * @BaseSize - 1.4rem;
          border: none;
          height: 0.3rem;
          outline: none;
          color: @PrimaryText;
          padding-right: @BaseSize;
          vertical-align: top;
          &::placeholder {
            color: @Disable;
          }
        }
        .elm-icon {
          position: absolute;
          right: 0;
        }
      }
    }
  }
  .position-select {
    transition: top 0.5s;
    z-index: 999;
  }
  button {
    width: 7.5rem - @BaseSize * 2;
    display: block;
    margin: @BaseSize * 2 auto 0;
    border-radius: 0.05rem;
    border: none;
    text-align: center;
    background-color: @Blue;
    color: @White;
    font-size: 0.3rem;
    line-height: 0.98rem;
    z-index: 0;
  }
}
</style>

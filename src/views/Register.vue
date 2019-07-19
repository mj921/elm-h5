<template>
  <div class="elm-register">
    <elm-header title="注册"></elm-header>
    <div class="register-form">
      <dl>
        <input
          type="text"
          v-model="registerForm.phone"
          placeholder="手机号"
          maxlength="11"
        />
      </dl>
      <dl>
        <input
          type="password"
          v-model="registerForm.password"
          placeholder="密码"
          maxlength="16"
          v-show="!showPassword"
        />
        <input
          type="text"
          v-model="registerForm.password"
          placeholder="密码"
          maxlength="16"
          v-show="showPassword"
        />
        <elm-icon
          class="password-icon"
          :class="{ 'eye-password': !showPassword }"
          :type="showPassword ? 'eye-invisible' : 'eye'"
          @click="showPassword = !showPassword"
        />
      </dl>
    </div>
    <button class="register-btn" @click="register">注册</button>
  </div>
</template>

<script>
import { validPhone, validPassword } from "../utils/validators";
import { registerApi } from "../apis/userApi";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      showPassword: false,
      registerForm: {
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions("user", ["login"]),
    register() {
      if (!validPhone(this.registerForm.phone)) {
        this.$message("手机号码格式不正确");
      } else if (!validPassword(this.registerForm.password)) {
        this.$message("密码格式不正确");
      } else {
        registerApi(this.registerForm).then(res => {
          this.$message("注册成功");
          this.login(res.data);
          this.$router.push("/");
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.elm-register {
  position: relative;
  background-color: @Background;
  min-height: 100%;
  .register-form {
    margin-top: @BaseSize;
    background-color: @White;
    border-top: 1px solid @Border;
    border-bottom: 1px solid @Border;
    padding-left: @BaseSize * 2;
    dl {
      position: relative;
      height: 0.87rem;
      &:not(:last-child) {
        border-bottom: 1px solid @Border;
      }
      input {
        vertical-align: top;
        border: none;
        padding: 0.14rem @BaseSize * 2 0.13rem 0;
        line-height: 0.6rem;
        font-size: 0.3rem;
        color: @Black;
        width: 100%;
        outline: none;
        box-sizing: border-box;
      }
      .password-icon {
        position: absolute;
        right: @BaseSize;
        color: @PrimaryText;
        font-size: 0.5rem;
        top: 0.19rem;
        &.eye-password {
          color: @Blue;
        }
      }
    }
  }
  .register-btn {
    display: block;
    border: none;
    outline: none;
    background-color: @Blue;
    border-radius: 0.1rem;
    height: 0.9rem;
    line-height: 0.9rem;
    color: @White;
    text-align: center;
    margin: @BaseSize * 2 auto 0;
    font-size: 0.3rem;
    width: 7.5rem - @BaseSize * 4;
  }
}
</style>

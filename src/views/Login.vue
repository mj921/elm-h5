<template>
  <div class="elm-login">
    <elm-header title="登录"></elm-header>
    <div class="login-form">
      <dl>
        <input
          type="text"
          v-model="loginForm.phone"
          placeholder="手机号"
          maxlength="11"
        />
      </dl>
      <dl>
        <input
          type="password"
          v-model="loginForm.password"
          placeholder="密码"
          maxlength="16"
        />
      </dl>
    </div>
    <button class="login-btn" @click="loginFn">登录</button>
  </div>
</template>

<script>
import { validPhone } from "../utils/validators";
import { loginApi } from "../apis/userApi";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loginForm: {
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions("user", ["login"]),
    loginFn() {
      if (!validPhone(this.loginForm.phone)) {
        this.$message("手机号码格式不正确");
      } else {
        loginApi(this.loginForm).then(res => {
          this.$message("登录成功");
          this.login(res.data);
          this.$router.push("/");
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.elm-login {
  position: relative;
  background-color: @Background;
  min-height: 100%;
  .login-form {
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
  .login-btn {
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

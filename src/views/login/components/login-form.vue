<template>
  <div class="login-container">
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      class="login-form"
    >
      <div class="login-title">
        <h2>欢迎登录</h2>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password"
          :key="passwordType"
          :type="passwordType"
          v-model="loginForm.password"
          placeholder="请输入密码"
        ></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye-close' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          @click="handleLogin('loginForm')"
          >登 录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/**
 * @description: 登录组件
 * @author: lct
 * @date: 2020/7/8 9:18
 */
export default {
  name: "login-form",
  data() {
    return {
      loginForm: {
        username: "lxxx", // qhzx01
        password: "123456", // 123456
      },
      loginRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          {
            required: true,
            message: "密码不能少于6位",
            min: 6,
            trigger: "blur",
          },
        ],
      },
      passwordType: "password",
      loading: false,
    };
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      let key = window.event.keyCode;
      if (key == 13) {
        this.handleLogin("loginForm");
      }
    });
  },
  methods: {
    /**
     * 密码显隐
     */
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    /**
     * 登录
     */
    handleLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push("/");
              this.loading = false;
            //   window.location.reload();
            })
            .catch(() => {
              this.loading = false;
            });
          // setTimeout(() => {
          //   this.$router.push('/')
          //   this.loading = false
          // }, 500)
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 440px;
  height: 360px;
  padding: 20px 50px;
  border-radius: 6px;

  .login-title {
  }

  .login-form {
    .svg-container {
      position: absolute;
      top: 14px;
      left: 15px;
      z-index: 999;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }
    .show-pwd {
      position: absolute;
      top: 14px;
      right: 25px;
      font-size: 16px;
      color: $font-color-base;
      cursor: pointer;
      user-select: none;
    }
  }

  ::v-deep {
    .el-form-item {
      padding-right: 0;
      margin: 30px 0;
      color: #454545;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 2px;

      &__content {
        min-height: 32px;
        line-height: 32px;
      }

      &__error {
        position: absolute;
        top: 100%;
        left: 18px;
        font-size: $font-size-small;
        line-height: 18px;
        color: $font-color-red;
      }
    }

    .el-input {
      box-sizing: border-box;

      input {
        height: 58px;
        padding-left: 45px;
        font-size: $font-size-medium;
        line-height: 58px;
        color: $font-color-grey;
        background: #f6f4fc;
        border: 0;
        caret-color: $font-color-grey;
      }
    }

    .el-button {
      width: 100%;
      height: 50px;
      margin-top: 5px;
      border: 0;
    }
  }
}
</style>

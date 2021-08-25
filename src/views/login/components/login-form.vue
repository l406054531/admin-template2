<template>
  <div class="login-form">
    <div class="my-img">
      <img src="@/assets/img/user.png"
           alt="">
    </div>
    <el-form ref="loginForm"
             :model="loginForm"
             :rules="loginRules">
      <el-form-item prop="loginName">
        <el-input v-model="loginForm.username"
                  placeholder="用户名">
          <i slot="prefix"
             class="iconfont icon-yonghu"></i>
        </el-input>
      </el-form-item>

      <el-form-item prop="loginPwd">
        <el-input v-model="loginForm.password"
                  placeholder="密码"
                  show-password
                  @keyup.enter.native="handleLogin('loginForm')">
          <i slot="prefix"
             class="iconfont icon-mima"></i>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button :loading="loading"
                   @click="handleLogin('loginForm')">登 录</el-button>

      </el-form-item>
    </el-form>

  </div>
</template>

<script>

export default {
  name: "login-form",
  data () {
    return {
      loginForm: {
        username: "lxx",
        password: "lxia00521...",
      },
      loginRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            // min: 6,
            trigger: "blur",
          },
        ],
      },
      passwordType: "password",
      loading: false,
      SlideVerifyShow: false
    };
  },
  mounted () {
    const isDev = process.env.NODE_ENV === 'development'
    this.loginForm = isDev ? { username: "lxx", password: "lxia00521..." } : { username: "test", password: "123456" }
  },
  methods: {
    /**
     * 密码显隐
     */
    showPwd () {
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
    handleLogin (formName) {
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
$btnColot: #a2d1f5; //#90caf9  #bbdefb  #a2d1f5
.login-form {
  width: 350px;
  position: absolute;
  left: 40%;
  top: 10%;
  z-index: 3;
  padding: 20px;
  //   border: 1px solid red;
  //   border-radius: 5px;
  .my-img {
    width: 100px;
    margin: 0 auto;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .el-form {
    padding-top: 20px;
    ::v-deep {
      .el-input__inner {
        color: #fff;
        border-radius: 30px;
        height: 45px;
        padding: 0 15px 0 38px;
        border: 0;
        background: rgba(255, 127, 80, 0.9);
        &::-webkit-input-placeholder {
          //placeholder颜色
          color: rgba(255, 255, 255, 0.8);
        }
      }
      .el-input__clear {
        color: #fff;
      }
      .el-button {
        width: 100%;
        height: 45px;
        color: #fff;
        border-radius: 30px;
        border: 0;
        background: rgba(255, 127, 80, 0.9);
        //   &:hover {
        //     color: #000;
        //   }
      }
      .el-input__prefix {
        /**输入框图标 */
        padding-top: 4px;
        padding-left: 10px;
        color: #fff;
      }
      .el-link.el-link--default {
        color: #fff;
        margin-left: 5px;
        //   &:hover {
        //     color: #000;
        //   }
      }
    }
  }
}
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

<template>
  <div class="login-container">
    <div class="header">
      <logo></logo>
    </div>
    <div class="container">
      <div class="inner-box">
        <div class="box-img">
          <div class="earth"></div>
          <div class="circle"></div>
        </div>
        <div class="box-login">
          <div class="login">
            <login-form></login-form>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <copyright></copyright>
    </div>
  </div>
</template>

<script>
  /**
   * @description: 登录页
   * @author: lct
   * @date: 2020/7/8 13:04
   */
  import { Logo, Copyright } from '../../layouts';

  export default {
    name: 'Login',
    components: {
      LoginForm: () => import('./components/login-form'),
      Logo,
      Copyright
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;

    .header {
      width: 100%;
      height: $header-height;
      padding-left: 30px;
      background: $base-color-body;
      box-shadow: 0 0 2px 12px rgba(0, 0, 0, 0.3);
    }

    .container {
      flex: 1;
      min-height: 660px;
      background: url('~@/assets/login_images/box-bg.jpg') center center/cover no-repeat;
      overflow: hidden;

      .inner-box {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        position: relative;

        .box-img {
          position: absolute;
          left: 400px;
          top: 120px;
          height: 460px;
          width: 460px;

          .earth {
            position: absolute;
            display: inline-block;
            height: 654px;
            width: 646px;
            background: url('~@/assets/login_images/box-earth.png') center center/contain no-repeat;
            top: -125px;
            left: -135px;
            z-index: 3;
          }

          .circle {
            position: absolute;
            display: inline-block;
            height: 726px;
            width: 726px;
            background: url('~@/assets/login_images/box-circle2.png') center center/contain no-repeat;
            top: -131px;
            left: -133px;
            z-index: 2;
            animation: circleAnimation 3s linear infinite;
          }
        }

        .box-login {
          position: absolute;
          right: 280px;
          top: 180px;
          z-index: 4;
        }
      }
    }

    .footer {
      width: 100%;
    }

    @keyframes circleAnimation {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(1turn);
      }
    }
  }
</style>

<template>
  <div class="login-container">
    <img src="../../assets/login_images/bg.jpg"
         alt=""
         class="bg-img">
    <div class="login">
      <login-form></login-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {
    LoginForm: () => import('./components/login-form')
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
  .bg-img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .header {
    width: 100%;
    height: 40px;
    padding-left: 30px;
    background: #ddd;
    box-shadow: 0 0 2px 12px rgba(0, 0, 0, 0.3);
  }
}
</style>

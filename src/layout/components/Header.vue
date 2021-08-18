<template>
  <div class="header">
    <div class="left-title">
      <!-- <i class="el-icon-eleme"></i> -->
      <img src="../../assets/logo.png"
           alt=""
           class="logo">
      <h4> {{title}}</h4>
    </div>
    <div class="right-menu">
      <el-dropdown class="avatar-container"
                   trigger="click">
        <div class="avatar-wrapper">
          <div class="user-avatar">
            <i class="el-icon-user"></i>
          </div>
          <span class="user-name">{{name}}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown"
                          class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;"
                  @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { title } from '@/config'
import { getUserInfo } from "@/utils/cache"
export default {
  name: 'Header',
  data() {
    return {
      title
    }
  },
  computed: {
    // ...mapGetters([
    //   'name'
    // ])
    name() {
      return JSON.parse(getUserInfo()).nickname
    }
  },
  methods: {
    async logout() {
      sessionStorage.clear();
      this.$router.push(`/login`)
      window.location.reload()
    }
  },
}
</script>

<style lang="scss" scoped>
$color: rgb(115, 118, 225);
.header {
  //   background-color: #242f42;
  background: url("../../assets/img/header.jpg");
  color: #fff;
  font-size: 22px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left-title {
    color: $color;
    margin-left: 50px;
    .logo {
      width: 30px;
      float: left;
    }
    h4 {
      float: left;
      padding: 5px 0 0 10px;
    }
  }
  .right-menu {
    float: right;
    margin-right: 10px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        user-select: none;

        .user-avatar {
          width: 36px;
          height: 36px;
          color: #000;
          background: #fff;
          border-radius: 50%;
          font-size: 22px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .user-name {
          margin: 0 5px 0 8px;
          color: $color;
        }
        .el-icon-caret-bottom {
          color: $color;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
        }
      }
    }
  }
}
</style>

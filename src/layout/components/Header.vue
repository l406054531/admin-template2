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
      <el-dropdown @command="command"
                   size="small"
                   class="avatar-container"
                   trigger="click">
        <div class="avatar-wrapper">
          <div class="user-avatar">
            <img :src="userImg"
                 style="width:100%;height:100%;"
                 alt="">
          </div>
          <span class="user-name">{{name}}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown"
                          class="user-dropdown">
          <template v-for="(item, index) in dropdowns">
            <el-dropdown-item :key="index"
                              :command="item.value"
                              :disabled="item.disabled"
                              divided>
              {{item.label}}
            </el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 弹出框 -->
    <el-dialog title="密码修改"
               :visible.sync="dialogFormVisible"
               :close-on-click-modal="false"
               width="500px"
               class="dialogClass"
               :before-close="handleCloseDialog">
      <!-- 表单 -->
      <my-form ref="myform"
               labelWidth="100px"
               :rules="rules"
               :formModel="dialogFormModel"
               :dialogFormElement="dialogFormElement"></my-form>
      <!--弹出框按钮 -->
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="handleCloseDialog">取 消</el-button>
        <el-button type="primary"
                   @click="handleDialogSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 上传头像组件 -->
    <el-upload class="upload-demo"
               style="display:none"
               action=""
               accept=".bmp,.jpg,.png,.jpeg"
               :auto-upload="false"
               :on-change="uploadUserImg">
      <el-button size="small"
                 ref="uploadBtnRef"
                 type="primary">点击上传</el-button>
    </el-upload>
    <!-- 修改头像组件 -->
    <el-upload class="upload-demo"
               style="display:none"
               action=""
               accept=".bmp,.jpg,.png,.jpeg"
               :auto-upload="false"
               :on-change="updateUserImg">
      <el-button size="small"
                 ref="updateBtnRef"
                 type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import { title } from '@/config'
import { getUserInfo } from "@/utils/cache"
import { updatePassword } from '@/api/user';
import { uploadUserImg, updateUserImg } from '@/api/upload';
import { cosUrl } from '@/config';
export default {
  name: 'Header',
  data () {
    const confirmassword = (rule, value, callback) => {
      console.log(value);
      if (value === '' || value == undefined) {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.dialogFormModel.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      title,
      dropdowns: [
        {
          label: '首页',
          value: 'shouye'
        },
        {
          label: '修改密码',
          value: 'updatePassword'
        },
        {
          label: '上传头像',
          value: 'uploadImg',
          disabled: null,
        },
        {
          label: '修改头像',
          value: 'updateImg'
        },
        {
          label: '退出登录',
          value: 'logout'
        },
      ],
      dialogFormVisible: false,
      rules: {
        password: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        confirmassword: [{ required: true, validator: confirmassword, trigger: 'blur' }],
      },
      dialogFormModel: {},
      dialogFormElement: [
        { label: '旧密码', prop: 'password', type: 'input', showPassword: true },
        { label: '新密码', prop: 'newPassword', type: 'input', showPassword: true },
        { label: '确认新密码', prop: 'confirmassword', type: 'input', showPassword: true },
      ],
      userImg: '',
    }
  },
  computed: {
    name () {
      return JSON.parse(getUserInfo()).nickname
    },
    userInfo () {
      return JSON.parse(getUserInfo())
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.dropdowns[2].disabled = this.userInfo.imgName === "" ? false : true
      this.userImg = this.userInfo.imgName === "" ? cosUrl + 'user.png' : cosUrl + this.userInfo.imgName
    },
    async logout () {
      sessionStorage.clear();
      this.$router.push(`/login`)
      window.location.reload()
    },
    command (v) {
      if (v == 'shouye') {
        this.$router.push("/home")
      }
      else if (v == "updatePassword") {
        this.dialogFormVisible = true
      }
      else if (v == "uploadImg") {
        this.$refs.uploadBtnRef.$el.click()
      }
      else if (v == "updateImg") {
        this.$refs.updateBtnRef.$el.click()
      }
      else if (v == "logout") {
        this.logout()
      }
    },
    /**弹出框取消按钮*/
    handleCloseDialog () {
      this.dialogFormVisible = false;
      this.register()
    },
    /**弹出框确认按钮*/
    handleDialogSubmit () {
      let flag = this.$refs["myform"].validateForm();
      if (flag) {
        this.updatePassword()
      } else {
        return false;
      }
    },
    /**重置表单 */
    register (flag = true) {
      this.dialogFormModel = {}
      this.dialogFormElement.forEach((item) => {
        this.$set(this.dialogFormModel, item.prop, "");
      });
      if (flag) {
        this.$refs['myform'].$refs['myform'].resetFields();
      }
    },
    /**修改密码 */
    updatePassword () {
      const { idUser } = this.userInfo
      let putData = {
        idUser: idUser,
        password: this.dialogFormModel.password,
        newPassword: this.dialogFormModel.newPassword
      }
      updatePassword(putData).then(response => {
        if (response.statusCode == 200) {
          this.$message({
            type: 'success',
            message: response.message
          })
          this.handleCloseDialog()
        } else {
          this.$message({
            type: 'warning',
            message: response.message
          })
        }
      })
    },
    /**上传头像 */
    uploadUserImg ({ raw }) {
      const form = this.newFormData(raw)
      uploadUserImg(form).then(response => {
        if (response.statusCode == 200) {
          this.$message({
            type: 'success',
            message: '上传成功'
          })
        } else {
          this.$message({
            type: 'danger',
            message: '上传失败'
          })
        }
      })
    },
    /**修改头像 */
    updateUserImg ({ raw }) {
      const form = this.newFormData(raw)
      updateUserImg(form).then(response => {
        if (response.statusCode == 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        } else {
          this.$message({
            type: 'danger',
            message: '修改失败'
          })
        }
      })
    },
    /**创建文件流 */
    newFormData (file) {
      const { idUser } = this.userInfo
      let form = new FormData();
      form.append("file", file)
      form.append("path", 'userImg')
      form.append("idUser", idUser)
      return form
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
          // background: #fff;
          border-radius: 50%;
          font-size: 22px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            border-radius: 50%;
          }
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

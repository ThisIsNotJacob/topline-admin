<template>
  <el-card>
    <div slot="header">
      <span>账户设置</span>
    </div>
    <el-row>
      <el-col :span="8">
        <el-form>
          <el-form-item label="用户名">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体简介">
            <el-input v-model="userInfo.intro"></el-input>
          </el-form-item>
          <el-form-item label="头条号ID">
            <el-input disabled :value="userInfo.id && userInfo.id.toString()"></el-input>
          </el-form-item>
          <el-form-item label="绑定手机">
            <el-input disabled :value="userInfo.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleUpdate">保存更新</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :offset="2" :span="4">
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
          :show-file-list="false"
          :http-request="handleSend">
          <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
  </el-card>

</template>

<script>
export default {
  name: 'AccountSetting',
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.loadingAccount()
  },
  methods: {
    loadingAccount() {
      this.$http({
        method: 'GET',
        url: '/user/profile'
      }).then(data => {
        this.userInfo = data
      }).catch(err => {
        console.log(err)
        this.$message.error('加载用户信息失败')
      })
    },
    handleUpdate() {
      this.$http({
        method: 'PATCH',
        url: '/user/profile',
        data: {
          name: this.userInfo.name,
          intro: this.userInfo.intro,
          email: this.userInfo.email
        }
      }).then(data => {
        this.$store.commit('changeUser', data)
        this.$message({
          type: 'success',
          message: '成功更新用户信息'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('更新用户信息失败')
      })
    },
    handleAvatarSuccess() {},
    beforeAvatarUpload() {},
    handleSend(uploadConfig) {
      const formData = new FormData()
      formData.append('photo', uploadConfig.file)
      this.$http({
        method: 'PATCH',
        url: '/user/photo',
        data: formData
      }).then(data => {
        this.userInfo.photo = data.photo
        this.$store.commit('changeUser', this.userInfo)
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('上传失败')
      })
    }
  }
}
</script>

<style lang='less' scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

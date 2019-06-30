<template>
  <el-row>
    <el-col :span="14">
      <div class="grid-content bg-purple">头条后台管理系统</div>
    </el-col>
    <el-col :span="10" :offset="2">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img width="30" :src="userinfo.photo">
          {{ userinfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>账户设置</el-dropdown-item>
          <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      userinfo: {}
    }
  },
  created() {
    this.userinfo = JSON.parse(window.localStorage.getItem('user_info'))
  },
  methods: {
    handleLogout() {
      console.log(123)
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user_info')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        this.$router.push({
          name: 'login'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
.el-header {
  line-height: 60px;
}
.el-col {
  height: 60px;
  line-height: 60px;
}
.el-dropdown {
  height: 60px;
  line-height: 60px;
  float: right;
  cursor: pointer;

}
img {
  border-radius: 50%;
  vertical-align: middle;
}
.el-col-10 {
  margin: 0;
  padding: 0;
}
</style>

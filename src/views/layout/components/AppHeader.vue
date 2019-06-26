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
          <el-dropdown-item>退出</el-dropdown-item>
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

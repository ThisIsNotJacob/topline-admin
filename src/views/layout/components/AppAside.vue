<template>
    <el-menu
    class="el-menu"
    default-active="2"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router>
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span>内容管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/publish">发布文章</el-menu-item>
        <el-menu-item index="/article">内容列表</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/comment">
      <i class="el-icon-place"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="el-icon-picture"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/account">
      <i class="el-icon-user-solid"></i>
      <span slot="title">账户信息</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  data() {
    return {}
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang='less' scoped>
.el-menu {
  height: 100%;
}
</style>

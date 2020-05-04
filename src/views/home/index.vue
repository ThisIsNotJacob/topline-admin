<template>
  <div>
    <el-dropdown :hide-on-click="false" trigger="click">
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><el-checkbox v-model="checked1">选项一</el-checkbox><el-tree v-if="checked1" :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree></el-dropdown-item>
        <el-dropdown-item><el-checkbox v-model="checked2">选项二</el-checkbox></el-dropdown-item>
        <el-dropdown-item><el-checkbox v-model="checked3">备选项</el-checkbox></el-dropdown-item>
        <el-dropdown-item disabled><el-checkbox v-model="checked4">备选项</el-checkbox></el-dropdown-item>
        <el-dropdown-item divided><el-checkbox v-model="checked5">备选项</el-checkbox></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'AppHome',
  data() {
    return {
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>

<style lang='less' scoped>
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
.el-icon-arrow-down {
  font-size: 12px;
}
</style>

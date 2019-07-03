<template>
  <el-card class="image-card">
    <div slot="header">
      <span>素材管理</span>
    </div>
    <div class="action">
      <el-radio-group v-model="active">
        <el-radio-button label="全部" @click.native="loadingImages(false)"></el-radio-button>
        <el-radio-button label="收藏" @click.native="loadingImages(true)"></el-radio-button>
      </el-radio-group>
      <el-upload
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="{ Authorization: `Bearer ${$store.state.user.token}` }"
        name="image"
        :show-file-list="false"
        :on-success="handleUplaodSuccess"
        >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <el-row :gutter="20">
      <el-col :span="4" v-for="item in images" :key="item.id">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.url" class="image" style="width: 144px;height: 88px">
          <div style="padding: 10px; display: flex; justify-content: center;">
            <el-button
              type="primary"
              :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
              circle
              plain
              @click="handleCollect(item)"
            ></el-button>
            <el-button
              type="primary"
              icon="el-icon-delete"
              circle
              plain
              @click="handleDelete(item)"
            ></el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'ImageList',
  data() {
    return {
      active: '全部',
      images: []
    }
  },
  created() {
    this.loadingImages()
  },
  methods: {
    loadingImages(collect = false) {
      this.$http({
        method: 'GET',
        url: '/user/images',
        params: {
          collect
        }
      }).then(data => {
        this.images = data.results
      })
    },
    handleCollect(item) {
      const collect = !item.is_collected
      this.$http({
        method: 'PUT',
        url: `/user/images/${item.id}`,
        data: {
          collect
        }
      }).then(data => {
        item.is_collected = collect
        this.$message({
          type: 'success',
          message: `${collect ? '图片' : '取消'}收藏成功`
        })
      }).catch(err => {
        console.log(err)
        this.$message.error(`${collect ? '图片' : '取消'}收藏失败`)
      })
    },
    handleDelete(item) {
      this.$http({
        method: 'DELETE',
        url: `/user/images/${item.id}`
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.loadingImages()
      }).catch(err => {
        console.log(err)
        this.$message.error('删除失败')
      })
    },
    handleUplaodSuccess() {
      this.loadingImages(false)
    }
  }
}
</script>

<style lang='less' scoped>
.image-card {
  .action {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }
}
</style>

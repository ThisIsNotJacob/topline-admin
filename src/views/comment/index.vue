<template>
  <el-card>
    <div slot="header">
      <span>评论管理</span>
    </div>
    <el-table :data="articles">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="评论粉丝数"></el-table-column>
      <el-table-column label="允许评论">
        <template slot-scope="scope">
          <el-switch
            :disabled="scope.row.changeStatusLoading"
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleChangeStatus(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'ArticleComments',
  data() {
    return {
      articles: []
    }
  },
  created() {
    this.loadingComment()
  },
  methods: {
    loadingComment() {
      this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(data => {
        data.results.forEach(item => {
          item.changeStatusLoading = false
        })
        this.articles = data.results
      })
    },
    handleChangeStatus(item) {
      item.changeStatusLoading = true
      this.$http({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: item.id.toString()
        },
        data: {
          allow_comment: item.comment_status
        }
      }).then(data => {
        this.$message({
          type: 'success',
          message: `评论状态已变更为${item.comment_status ? '允许' : '关闭'}`
        })
        item.changeStatusLoading = false
      }).catch(err => {
        item.changeStatusLoading = false
        item.comment_status = !item.comment_status
        console.log(err)
        this.message.error('更改状态失败')
      })
    }
  }
}
</script>

<style lang='less' scoped>

</style>

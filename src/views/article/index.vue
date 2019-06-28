<template>
  <div>
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <span>筛选条件</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio
            v-for="item in statuslist"
            :label="item.label"
            :key="item.label"
            >
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择频道">
            <el-option
            v-for="item in channels"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="form.value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="list-card">
      <div slot="header" class="clearfix">
        <span>共找到<span>{{totalcount}}</span>条符合条件的内容</span>
      </div>
      <el-table
        :data="articles"
        style="width: 100%"
        class="list-table"
        v-loading="articleloading"
        >
        <el-table-column
          prop="cover.images[0]"
          label="封面"
          width="60">
          <template slot-scope="scope">
            <img :src="scope.row.cover.images[0]" width="30">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布日期"
          width="180">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-tag :type="statuslist[scope.row.status].type">{{statuslist[scope.row.status].label}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="success" plain>修改</el-button>
            <el-button type="danger" plain @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleGetpage"
        :disabled="articleloading"
        :total="totalcount">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Articlelist',
  data() {
    return {
      articles: [],
      form: {
        region: '',
        resource: '',
        value1: ''
      },
      statuslist: [
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: '',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }
      ],
      channels: [],
      totalcount: 0,
      articleloading: false,
      page: 1
    }
  },
  created() {
    this.loadarticles()
    this.handleGetChannels()
  },
  methods: {
    loadarticles(page = 1) {
      this.articleloading = true
      this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          page,
          per_page: 10
        }
      }).then(data => {
        this.articleloading = false
        this.articles = data.results
        this.totalcount = data.total_count
      })
    },
    onSubmit() {
      console.log('submit!')
    },
    handleGetpage(page) {
      this.page = page
      this.loadarticles(page)
    },
    handleDelete(item) {
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          method: 'DELETE',
          url: `/articles/${item.id}`
        }).then(data => {
          // console.log(data)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadarticles(this.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleGetChannels() {
      this.$http({
        method: 'GET',
        url: '/channels'
      }).then(data => {
        this.channels = data.channels
      })
    }
  }
}
</script>

<style lang='less' scoped>
.filter-card {
  margin-bottom: 20px;
}
.list-table {
  margin-bottom: 30px;
}
</style>

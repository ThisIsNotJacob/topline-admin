<template>
  <el-card class="publish-card">
    <div slot="header" class="header">
      <span>发布文章</span>
      <div>
        <el-button type="success" @click="handlepublish(false)" :loading="publishLoading">{{isEdit ? '更新' : '发布'}}</el-button>
        <el-button type="primary" @click="handlepublish(true)" :loading="publishLoading">存入草稿</el-button>
      </div>
    </div>
    <el-form v-loading="isEdit && editloading">
      <el-form-item>
        <el-input type="text" v-model="articleForm.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item>
        <quill-editor v-model="articleForm.content"
          ref="myQuillEditor"
          :options="editorOption">
        </quill-editor>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="articleForm.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <article-channel v-model="articleForm.channel_id"></article-channel>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import ArticleChannel from '@/components/article-channel'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'AppPublish',
  data() {
    return {
      articleForm: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      },
      editorOption: {},
      editloading: false,
      publishLoading: false
    }
  },
  components: {
    ArticleChannel,
    quillEditor
  },
  created() {
    this.isEdit && this.loadingArticle()
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    },
    isEdit() {
      return this.$route.name === 'publish-edit'
    },
    articleid() {
      return this.$route.params.id
    }
  },
  mounted() {
    console.log('this is current quill instance object', this.editor)
  },
  methods: {
    handlepublish(draft) {
      this.publishLoading = true
      if (this.isEdit) {
        this.sendEdit(draft).then(() => {
          this.publishLoading = false
          this.$router.push({
            name: 'article-list'
          })
        })
      } else {
        this.sendPublish(draft).then(() => {
          this.publishLoading = false
          this.$router.push({
            name: 'article-list'
          })
        })
      }
    },
    sendEdit(draft) {
      return this.$http({
        method: 'PUT',
        url: `/articles/${this.articleid}`,
        data: this.articleForm,
        params: {
          draft
        }
      }).then(data => {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('更新失败')
      })
    },
    sendPublish(draft) {
      return this.$http({
        method: 'POST',
        url: '/articles',
        data: this.articleForm,
        params: {
          draft
        }
      }).then(data => {
        this.$message({
          type: 'success',
          message: '发布成功'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('发布失败')
      })
    },
    loadingArticle() {
      this.editloading = true
      this.$http({
        method: 'GET',
        url: `/articles/${this.articleid}`
      }).then(data => {
        this.editloading = false
        this.articleForm = data
      }).catch(err => {
        console.log(err)
        this.$message.error('加载文章详情失败')
      })
    }
  }
}
</script>

<style lang='less' scoped>
.publish-card {
  min-height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

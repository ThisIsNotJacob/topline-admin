<template>
  <el-select :value='value' @change="handleChannels">
    <el-option
      v-for="item in channels"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'ArticleChannel',
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  created() {
    this.loadingChannels()
  },
  data() {
    return {
      channels: []
    }
  },
  methods: {
    handleChannels(val) {
      this.$emit('input', val)
    },
    loadingChannels() {
      this.$http({
        method: 'GET',
        url: '/channels'
      }).then(data => {
        this.channels = data.channels
      }).catch(err => {
        console.log(err)
        this.$message.error('加载频道列表失败')
      })
    }
  }
}
</script>

<style lang='less' scoped>

</style>

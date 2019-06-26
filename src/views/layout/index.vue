<template>
    <div>
      <AppHeader/>
      <AppAside/>
    </div>
</template>

<script>
import AppHeader from './components/AppHeader'
import AppAside from './components/AppAside'
export default {
  name: 'AppLayout',
  data() {
    return {}
  },
  components: {
    AppHeader,
    AppAside
  }
}
</script>

<style lang='less' scoped>

</style>

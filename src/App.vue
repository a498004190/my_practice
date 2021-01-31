<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide'
  export default {
    mounted () {
      this.$store.dispatch('getAddress', {latitude: this.latitude, longitude: this.longitude})
      this.$store.dispatch('getUserinfo')
    },
    components: { FooterGuide }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.app
  width 100%
  height 100%
  background #f5f5f5
  position relative
</style>

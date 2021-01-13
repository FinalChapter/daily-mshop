<template>
  <div id="app">
    <Footer v-show="isShow" :key="isRouterchange"></Footer>
    <router-view/>
  </div>
</template>
<script>
import Footer from "@/components/Nav/Footer"
export default {
  components: { Footer },
  computed:{
    isShow(){
      return this.$store.state.global.isFooterShow
    },
    isRouterchange(){
     return this.$route.path==undefined? this.$route:this.$route.path
    }
  },
}

</script>

<style>

</style>

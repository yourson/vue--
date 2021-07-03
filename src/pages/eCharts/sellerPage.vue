<template>
    <div class="sellerPage">
        <!--对于/sellerpage 这条路径显示出来的在这个组件中，-->
      <!--通过子组件注册的方式，要显示seller这个组件-->
      <seller></seller>
    </div>
</template>

<script>
import Seller from '@/components/seller'
export default {
  name: "seller-page",
  components: {
    seller: Seller
  },
  data() {
      return {}
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
  .sellerPage {
    width: 100%;
    height: 100%;
  }
</style>

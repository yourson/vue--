<template>
  <div class="stockPage">
    <stock></stock>
  </div>
</template>

<script>
import Stock from '@/components/stock'
export default {
  name: '',
  components: {
    stock: Stock
  }
}
</script>

<style scoped>
  .stockPage {
    height: 100%;
    width: 100%;
  }
</style>
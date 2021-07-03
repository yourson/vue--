<template>
    <div class="trendPage">
      <trend></trend>
    </div>
</template>

<script>
  import Trend from '@/components/trend'
  export default {
    name: "trend-page",
    components: {
      trend: Trend
    },
    data() {
        return {}
    },
    methods: {},
  }
</script>

<style scoped>
  .trendPage {
    width: 100%;
    height: 100%;
  }
</style>

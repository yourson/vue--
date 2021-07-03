<template>
    <div class="mapPage">
      <map-echart></map-echart>
    </div>
</template>

<script>
  import mapEchart from '@/components/map'
  export default {
    name: "mapPage",
    data() {
      return {}
    },
    components: {
      mapEchart
    }
  }
</script>

<style lang="scss" scoped>
  .mapPage {
    width: 100%;
    height: 100%;
  }
</style>

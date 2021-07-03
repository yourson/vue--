<template>
  <div class="rankPage">
    <rank></rank>
  </div>
</template>

<script>
import Rank from '@/components/rank';
export default {
  name: '',
  data () {
    return {}
  },
  components: {
    rank: Rank
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
  .rankPage {
    width: 100%;
    height: 100%;
  }
</style>
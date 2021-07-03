<template>
    <div class="home">
        <Header></Header>
        <div class="home-content">
          <sideMenu></sideMenu>
          <div class="content-box" :class="{'collapse': collapse}">
            <tags></tags>
            <div class="content">
              <router-view></router-view>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/header'
//import data from '@/assets/js/data';
import sideMenu from '@/components/sideMenu'
import tags from '@/components/tags'

import { mapState,mapMutations } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {
      aaa: 1
    }
  },
  components: {
    Header,
    sideMenu,
    tags
  },
  computed: {
    ...mapState({
      collapse: "collapse",
      tagList: "tagList",
    })
  },
  methods: {
    ...mapMutations(['delTab'])
  },
}
</script>

<style lang="scss" scoped>
/* 收缩菜单页面移动 */
.home-content {
  height: calc(100% - 70px);
  width: 100%;
  .content-box {
    /* 这样可以占满整个右边页面 */
    position: absolute;
    left: 250px;
    right: 0;
    top: 70px;
    bottom: 0;
    transition:left .3s ease-in-out;
    -moz-transition:left .3s ease-in-out; /* Firefox 4 */
    -webkit-transition:left .3s ease-in-out; /* Safari and Chrome */
    -o-transition:left .3s ease-in-out; /* Opera */
    background: #f0f0f0;
    .content {
      position: relative;
      padding: 10px;
      height: calc(100% - 40px);
      overflow-y: scroll;
      box-sizing: border-box;
    }
  }
  .collapse {
    left: 65px;
   }
}
</style>

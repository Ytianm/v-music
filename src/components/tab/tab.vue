<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    name:'Tab'
  }
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"
  .tab
    display:flex
    height: 46px
    line-height:46px
    font-size:$font-size-medium
    box-sizing: border-box
    border-bottom:1px solid #ccc 
    background:#fff
    .tab-item
      flex:1
      text-align: center
      .tab-link
        color:$color-text
        padding:5px
      &.router-link-active
        .tab-link
          color:$color-theme
          border-bottom:2px solid $color-theme
    
</style>
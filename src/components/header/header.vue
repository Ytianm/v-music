<template>
  <div class="header">
    <div class="logo"></div>
    <h1 class="text">听听音乐</h1>
    <router-link tag="div" class="mine" to="/user">
     <i class="fa fa-user-circle fa-2x icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

  .header
    position: relative
    height: 60px
    line-height:60px
    padding-left: 10px
    color: #fff
    background:$color-theme
    font-size: 0
    .logo
      display: inline-block
      margin-top: 15px
      width: 30px
      height: 30px
      margin-right: 9px
      bg-image('logo-w',30px,30px)
    .text
      display: inline-block
      line-height:40px
      vertical-align:top
      margin-top: 10px
      letter-spacing: 2px
      font-weight:500
      font-size: $font-size-large-x
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 17px
        font-size: 26px
        color: #fff
</style>
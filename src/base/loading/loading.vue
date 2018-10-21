<template>
  <div class="loading">
    <div class="loading-con">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="loading-text">
      <p>{{text}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name:'Loading',
    props:{
      text:{
        type:String,
        default:'正在玩命加载...'
      }
    }
  }
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable'

.loading
  .loading-con
    ul
      width: 120px;
      margin: 0 auto
      display: flex
      justify-content: center
      li 
        flex: 0 0 5px
        list-style: none;
        height: 10px
        background: $color-theme
        margin: 0 4px
        animation: loading .8s infinite
        &:nth-of-type(1)
          animation-delay: 0s
        &:nth-of-type(2) 
          animation-delay: .2s
        &:nth-of-type(3) 
          animation-delay: .4s
        &:nth-of-type(4) 
          animation-delay: .6s
        &:nth-of-type(5) 
          animation-delay: .8s
  .loading-text
    clear: both
    p
    text-align:center
    line-height: 20px
    padding: 5px 0
    color:$color-text-d
    font-size:$font-size-medium

  @keyframes loading 
    0% 
      transform: scaleY(1)
      transform-origin:bottom
    50% 
      transform: scaleY(2.5)
      transform-origin:bottom
    100% 
      transform: scaleY(1)
      transform-origin:bottom

</style>
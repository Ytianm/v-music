<template>
  <div>
    <div class="full-player">
      <div class="top">
        <i class="fa fa-angle-down down"></i>
        <h1 class="songname">告白气球</h1>
        <h2 class="singername">周杰伦</h2>
      </div>
      <div class="middle">
        <div class="cd">
          <div class="cd-img">
            <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000003y8dsH2wBHlo.jpg?max_age=2592000" alt="">
          </div>
        </div>
        <div class="lric">
          <p>歌词歌词</p>
        </div>
      </div>
      <div class="bottom">
        <div class="progress">
          <span>0:00</span>
          <meter max="100" min="0" value="50"></meter>
          <span>4:30</span>
        </div>
        <ul class="control-btn">
          <li class="fa fa-random play-mode"></li>
          <li class="fa fa-backward backward"></li>
          <li class="fa fa-play-circle-o play"></li>
          <li class="fa fa-forward forward"></li>
          <li class="fa fa-heart collection"></li>
        </ul>
      </div>
    </div>
    <div class="mini-player"></div>
  </div>
</template>

<script>
  export default {
    name:'Player'
    
  }
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable'

.full-player
  position:fixed
  top:0
  width:100%
  bottom:0
  background:#222
  color:#fff
  .top
    .down
      width:40px
      height:40px
      line-height:40px
      text-align:center
      font-size:35px
    .songname
      position:absolute
      top:0
      width:100%
      height 40px
      line-height:40px
      text-align:center
      font-size:18px
    .singername
      position:absolute
      top:40px
      width:100%
      line-height:20px
      text-align:center
      font-size:14px
  .middle
    position:fixed
    width:100%
    top:80px
    .cd
      width:100%
      height:0
      padding-top:80%
      position:relative
      .cd-img
        position:absolute
        top:0
        width:80%
        left:10%
        height:100%
        border-radius:100%
        overflow:hidden
        border:10px solid rgba(100,100,100,.5)
        box-sizing:border-box
        img 
          width:100%
          height:100%
    .lric
      margin:30px auto 0
      p
        height:30px
        line-height:30px
        text-align:center
        font-size:14px
        color:#ccc
  .bottom
    position:fixed
    width:100%
    bottom:40px
    .progress
      width:80%
      height:30px
      margin:0 auto 
      background:blue
    .control-btn
      display:flex
      height:50px
      li
        flex:1
        height:50px
        line-height:50px
        text-align:center
        font-size:25px
        color:$color-theme

</style>
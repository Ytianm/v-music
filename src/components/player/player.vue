<template>
  <div v-if="playList.length>0">
    <!-- 全屏播放器 -->
    <transition name="fullScreen">
      <div class="full-player" v-show="fullScreen">
        <div class="bg-img" :style="bgImg" ref="bg"></div>
        <div class="top">
          <div class="down" @click="hideFullSccreen">
            <i class="fa fa-angle-down"></i>
          </div>
          <h1 class="songname">{{currentSong.songname}}</h1>
          <h2 class="singername">{{currentSong.singername}}</h2>
        </div>
        <div class="middle">
          <div class="cd" ref="cd">
            <div class="cd-img">
              <img :src="currentSong.albumimg">
            </div>
          </div>
          <div class="lric">
            <p>歌词歌词</p>
          </div>
        </div>
        <div class="bottom">
          <!-- <div class="progress">
            <span>{{playedTime|timeFormat}}</span>
            <meter :max="currentSong.interval" min="0" :value="playedTime"></meter>
            <span>{{currentSong.interval|timeFormat}}</span>
          </div> -->
          <!-- 进度条 -->
          <div class="progress" ref="progress">
            <div class="played-time">{{playedTime|timeFormat}}</div>
            <div class="progress-bar" ref="progressBar">
              <div class="tab" ref="tab"></div>
              <div class="color" ref="color"></div>
            </div>
            <div class="interval">{{currentSong.interval|timeFormat}}</div>
          </div>
          <ul class="control-btn">
            <li class="iconfont play-mode">&#xe61f;</li>
            <li class="iconfont backward" @click="backward">&#xe607;</li>
            <li @click="play">
              <i class="iconfont play" v-if="!playing">&#xe62e;</i>
              <i class="iconfont play" v-else>&#xe6df;</i>
            </li>
            <li class="iconfont forward" @click="forward">&#xe604;</li>
            <li class="iconfont collection">&#xe649;</li>
          </ul>
        </div>
      </div>
    </transition>
    <!-- mini播放器 -->
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="showFullSccreen">
        <div class="mini-bg"></div>
        <div class="mini-cd-img" ref="minicd">
          <img :src="currentSong.albumimg" alt="">
        </div>
        <div class="mini-song-info">
          <h1 class="mini-songname">{{currentSong.songname}}</h1>
          <h2 class="mini-singername">{{currentSong.singername}}</h2>
        </div>
        <div class="mini-play-control" @click.stop="play">
          <i class="iconfont mini-play" v-if="!playing">&#xe62e;</i>
          <i class="iconfont mini-play" v-else>&#xe6df;</i>
        </div>
        <div class="mini-play-list">
          <i class="iconfont list">&#xe622;</i>
        </div>
      </div>
    </transition>
    <!-- 音乐 -->
    <div>
      <audio :src="currentSong.songurl" ref="audio"></audio>
    </div>
  </div>
  
</template>

<script>
import Vue from 'vue'
import {mapGetters} from 'vuex'
import {mapMutations} from 'vuex'
import {addClass,removeClass,timeFormat} from 'common/js/dom'

  export default {
    name:'Player',
    data(){
      return {
        playedTime:0,
        musicEnd:false
      }
    },
    computed:{
      //状态
      ...mapGetters(['playList','currentIndex','currentSong','fullScreen','playing']),

      //CD背景图片
      bgImg(){
        return `background-image:url(${this.currentSong.albumimg})`
      }
    },
    created() {
      this.startAng = 0;
    },
    watch:{
      //歌曲改变时触发：1.点击歌曲列表，2.点击上下一首
      currentSong(){
        // console.log('切换歌曲时执行')
        if(this.ani){
          cancelAnimationFrame(this.ani);
        }
        setTimeout(()=>{
          let audio = this.$refs.audio;
          this.startAng = 0;  //CD旋转初始角度重置

          this.play();

          //背景渐显
          this.bgFadeIn();

        },20)        
      },

      //监听音乐播放结束
      musicEnd(){
        if(this.ani){
          console.log('musicend');
          cancelAnimationFrame(this.ani);
          this.setPlayState(false);
        }
      }

    },
    methods:{
      //mutations映射
      ...mapMutations({
        setFullScreen:'SET_FULLSCREEN',
        setPlayState:'SET_PLAY_STATE',
        setCurrentIndex:'SET_CURRENTINDEX',
      }),

      //隐藏全屏播放，显示mini播放
      hideFullSccreen(){
        this.setFullScreen(false);
      },

      //显示全屏播放，隐藏mini播放
      showFullSccreen(){
        this.setFullScreen(true);   
      },

      //播放控制
      play(){
        let audio = this.$refs.audio;

        if(audio!=null){
          //播放
          if(audio.paused){
            audio.play();
            this.initRotateCD();   
            this.setPlayState(true);

            //播放进度   
            this.initProgress();
            this.playProgress();
          }
          //暂停
          else{
            audio.pause();
            cancelAnimationFrame(this.ani);
            this.setPlayState(false);

            clearInterval(this.playTimer);
          }
        }
      },

      //cd旋转
      initRotateCD(){
        setTimeout(()=>{
          this.ani = requestAnimationFrame(this.rotate);         
        },20)      
      },

      //上一首
      backward(){
        this.bgFadeIn()
        this.setPlayState(true);  //如果当前是暂停，切换到上一首时需要把播放状态设置成true
        let index = this.currentIndex-1;
        if(index===-1){
          index = this.playList.length-1;
        }
        this.setCurrentIndex(index);
      },

      //下一首
      forward(){
        this.bgFadeIn();
        this.setPlayState(true);
        let index = this.currentIndex+1;
        if(index===(this.playList.length)){
          index = 0;
        }
        this.setCurrentIndex(index);
      },

      //cd旋转动画
      rotate(){         
        let cd = this.$refs.cd;
        let minicd = this.$refs.minicd;  

        if(this.startAng===360){
          this.startAng = 0;
        }
        cd.style.transform = `rotateZ(${this.startAng}deg)`;
        minicd.style.transform = `rotateZ(${this.startAng}deg)`;
        this.startAng += .3;
      
        this.ani = requestAnimationFrame(this.rotate);
      },

      //背景渐显动画     
      bgFadeIn(){
        this.$refs.bg.style.transition = '';
        this.$refs.bg.style.transition = '.3s all ease';
        this.$refs.bg.style.opacity = '1';
      },

      //播放进度显示
      playProgress(){
        clearInterval(this.playTimer);
        this.playTimer = setInterval(()=>{
          this.playedTime = parseInt(this.$refs.audio.currentTime); //同步已播放时间显示

          //进度条已播放显示
          let proportion = this.playedTime / this.currentSong.interval;
          let scale = (this.$refs.progressBar.clientWidth-this.$refs.tab.clientWidth)/this.$refs.progressBar.clientWidth; //减去一个小圆点的宽度
          this.$refs.color.style.width = `${proportion*100*scale}%`;
          this.$refs.tab.style.left = `${proportion*100*scale}%`;

          this.musicEnd = this.$refs.audio.ended;
        },1000)
      },

      //进度条控制
      initProgress(){
        let oProgress = this.$refs.progress;
        let oTab = this.$refs.tab;
        let oColor = this.$refs.color;
        var _this = this;

        let interval = this.currentSong.interval;   //歌曲时长
        let progressBarWidth = this.$refs.progressBar.clientWidth-18;  //进度条可以移动的宽度(减去一个小圆点的宽度)
        let s2px = interval / progressBarWidth; //1px对应s2px秒

        oTab.addEventListener('touchstart', touchstart, false);

        function touchstart(e) {
          e = e || window.event;
          let startX = e.touches[0].clientX;
          let disX = startX - oTab.offsetLeft;

          document.addEventListener('touchmove', touchmove, false);
          document.addEventListener('touchend', touchend, false);

          function touchmove(e) {
            e = e || window.event;
            let moveX = e.touches[0].clientX - disX;
            if(moveX <= 0){
              moveX = 0;
            }
            if(moveX>=_this.$refs.progressBar.clientWidth-18){
              moveX = _this.$refs.progressBar.clientWidth-18;
            }

            oTab.style.left = moveX + 'px';
            oColor.style.width = moveX + 'px';

            _this.$refs.audio.currentTime = moveX*s2px;   //px => s 将移动的距离转换为时间
          }

          function touchend() {
            document.removeEventListener('touchmove', touchmove);
            document.removeEventListener('touchend', touchend);
            return false;
          }

          return false;
        }
      }
    },
    filters:{
      timeFormat(time){
        return timeFormat(time);
      }
    }
  }
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.full-player
  position:fixed
  top:0
  width:100%
  bottom:0
  background:#222
  color:#fff
  z-index:100
  .bg-img
    position:absolute
    top:0
    width:100%
    bottom:0
    background-size:cover
    background-position:center
    z-index:-1
    filter:blur(30px)
    opacity:0
  .top
    .down
      position:absolute
      width:40px
      height:40px
      padding:0 5px
      line-height:40px
      text-align:center
      font-size:40px
      color:$color-theme
      z-index:1
    .songname
      position:absolute
      top:0
      width:70%
      height 40px
      line-height:40px
      text-align:center
      margin-left:15%
      font-size:20px
      color:#e5e5e5
      no-wrap1()
    .singername
      position:absolute
      top:40px
      width:70%
      line-height:20px
      text-align:center
      margin-left:15%
      font-size:16px
      color:#aaa
      no-wrap1()
  .middle
    position:fixed
    width:100%
    top:100px
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
        border:25px solid rgba(0,0,0,.6)
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
        font-size:16px
        color:#ccc
  .bottom
    position:fixed
    width:100%
    bottom:30px
    .progress
      position:fixed
      bottom:110px
      width: 100%
      display:flex
      align-items:center
      text-align:center
      font-size:14px
      color:#bbb
      .played-time
        width:15%
      .progress-bar
        width:70%
        height: 2px
        background: #bbb
        position: relative
        .tab
          width: 18px
          height: 18px
          background: #f5f5f5
          border-radius: 18px
          position: absolute
          top: -8px
          left:0
        .color
          position: absolute;
          top:0;
          left: 0;
          height:100%;
          background: $color-theme;
      .interval
        width:15%
    .control-btn
      display:flex
      height:50px
      li
        flex:1
        height:50px
        line-height:50px
        text-align:center
        font-size:36px
        color:$color-theme
      .play
        font-size:50px
.mini-player
  position:fixed
  bottom:0
  width:100%
  display:flex
  z-index:105
  align-items:center
  background:#fff
  border-top:1px solid #eee
  .mini-cd-img
    width:20%
    height:60px
    display:flex
    justify-content:center
    align-items:center
    img 
      height:45px
      border-radius:45px
  .mini-song-info
    width:50%
    text-align:left
    font-size:16px
    line-height:22px
    color:#333
    padding-right:5px
    h1
      no-wrap1()
    h2
      font-size:14px
      color:#666
  .mini-play-control
    width:15%
    text-align:center
    color:$color-theme
    .mini-play
      font-size:35px
  .mini-play-list
    width:15%
    text-align:center
    color:$color-theme
    .list
      font-size:30px

.fullScreen-enter-active,.fullScreen-leave-active
  transition:.3s all ease
.fullScreen-enter,.fullScreen-leave-to
  transform:translateY(100%)

.mini-enter-active,.mini-leave-active
  transition:.3s all ease
.mini-enter,.mini-leave-to
  transform:translateY(100%)

</style>
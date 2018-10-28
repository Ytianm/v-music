<template>
  <div class="wrapper" :class="{bottomUp:miniPlayer}">
    <div class="header">
      <i class="fa fa-angle-left back" @click="onBack"></i>
      <h1 class="singer-title">{{title}}</h1>
    </div>
    <div class="singer-img" 
      :style="singerImgStyle" 
      ref="singerImg"
    >
      <div class="filter"></div>
      <div class="play" ref="play" v-show="songList.length">
        <i class="fa fa-random" aria-hidden="true"></i>
        <span>随机播放</span>
      </div>
    </div>
    <Scroll ref="scroll" class="scroll-wrapper"
      :listenScroll="listenScroll" 
      :probeType="probeType"
      :data="songList"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <SongList :songList="songList" @scroll="onScroll" @selectSong="handleSelectSong"></SongList>
      </div>
      <div class="loading">
        <Loading v-show="!songList.length>0"></Loading>
      </div>    
    </Scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
import {mapMutations} from 'vuex'

import {getSingerDetail} from 'api/singer'
import {createSong} from 'common/js/song'
import SongList from 'base/song-list/song-list'
import Scroll from 'base/scroll/scroll'
import {prefixStyle} from 'common/js/dom'
import Loading from 'base/loading/loading'

  export default {
    name:'MusicList',
    components:{
      Scroll,
      SongList,
      Loading
    },
    props:{
      songList:{
        type:Array,
        default:[]
      },
      singerImg:{
        type:String,
        default:''
      },
      title:{
        type:String,
        default:''
      }
    },
    created() {
      this.listenScroll = true; //scroll组件默认不监听滚动，需要手动设置成true
      this.probeType = 3;
    },
    mounted() {
      this.singerImgHeight = this.$refs.singerImg.clientHeight;
      this.$refs.scroll.$el.style.top = `${this.singerImgHeight}px`;  //滚动列表的top值等于图片的高度
    },
    computed:{
      ...mapGetters(['miniPlayer']),

      singerImgStyle(){
        return `background-image:url(${this.singerImg})`
      }
    },
    watch:{
      miniPlayer(){
        this.$refs.scroll.refresh();
      }
    },
    methods:{
      //返回
      onBack(){
        this.$router.back();
      },

      //监听滚动
      onScroll(pos){
        let scrollY = pos.y;
        let transform = prefixStyle('transform'); //浏览器前缀处理

        //上拉
        if(-scrollY>=(this.singerImgHeight-40)){ 
          this.$refs.singerImg.style.paddingTop = 0;
          this.$refs.singerImg.style.height = 40 + 'px';
          this.$refs.singerImg.style.zIndex = 4;
          this.$refs.play.style.display = 'none';
        }else{
          this.$refs.singerImg.style.paddingTop = '65%';
          this.$refs.singerImg.style.height = 0;
          this.$refs.singerImg.style.zIndex = 0;
          this.$refs.play.style.display = 'block';
        }

        //下拉
        if(scrollY>0){
          let scale = 1 + scrollY/this.singerImgHeight;//放大比例 = (图片原来的高度+scrollY)/图片原来的高度
          this.$refs.singerImg.style[transform] = 'scale('+scale+')';
        }else{
          this.$refs.singerImg.style[transform] = 'scale(1)';
        }
      },

      //映射actions到该组件
      ...mapActions(['selectSong']),
      ...mapMutations({
      }),

      //点击歌曲后，操作state
      handleSelectSong(index){
        this.selectSong({
          list:this.songList,
          index
        })
      }

    }

  }
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin'

  .wrapper
    position:fixed
    top:0
    left:0
    right:0
    bottom:0
    background:#f5f5f5
    z-index:99
    &.bottomUp
      bottom:60px
    .header
      .back
        position:absolute
        top:0
        left:0
        height:40px
        line-height:40px
        padding:0 15px
        z-index:7
        font-size:35px
        color:$color-theme
      .singer-title
        position:absolute
        top:0
        width:100%
        height:40px
        line-height:40px
        z-index:5
        text-align:center
        color:#f5f5f5
        font-size:18px
    .singer-img
      position: relative
      width:100%
      background-size:cover 
      padding-top:65%
      height:0
      transform-origin:top
      z-index:-1
      .filter
        position:absolute
        top:0
        left:0
        width:100%
        height:100%
        background:rgba(10,10,10,.6)
      .play
        position:absolute
        width:120px
        line-height:30px
        text-align:center
        bottom:20px
        left:50%
        margin-left:-60px
        color:$color-theme-l
        border:1px solid $color-theme-l
        border-radius:5px
    .scroll-wrapper
      position: absolute
      top: 0
      bottom: 0
      width: 100%
      .loading
        position:absolute
        top:50%
        width:100%
        
      

</style>
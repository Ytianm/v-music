<template>
<div class="recommend">
  <div class="loading-wrapper">
    <Loading v-show="!songList.length"></Loading>
  </div>
  <Scroll ref="scroll" class="recommend-con" :data="songList">
    <div>
      <div v-if="slider.length" class="slider-wrapper" ref="sliderWrapper">
        <Slider>
          <div v-for="(item,index) in slider" :key="index">
            <a :href="item.linkUrl">
              <img @load="loadImage" :src="item.picUrl" alt="" />
            </a>
          </div>
        </Slider>
      </div>
      <div class="song-list">
        <h2 class="list-title">热门歌单</h2>
        <ul class="list-wrapper">
          <li class="song-list-item" v-for="(item,index) in songList" :key="index">
            <div class="item-img">
              <img v-lazy="item.imgurl" />
            </div>
            <div class="item-text">
              <h2 class="item-name">{{item.creator.name}}</h2>
              <p class="item-dissname">{{item.dissname}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </Scroll>
  </div>
</template>

<script>
import Slider from "base/slider/slider";
import { getRecommend,getRecommendList } from "api/recommend";

import Scroll from 'base/scroll/scroll';
import Loading from 'base/loading/loading'

export default {
  name: "Recommend",
  components: {
    Slider,
    Scroll,
    Loading
  },
  data() {
    return {
      slider: [],
      songList:[],
    }
  },
  created() {
    this._getRecommend();
    this._getRecommendList();
  },
  methods: {
    //获取轮播图数据
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === 0) {
          this.slider = res.data.slider;
        }
      });
    },
    //获取推荐歌单数据
    _getRecommendList(){
      getRecommendList().then(res=>{
        if (res.code === 0) {
          this.songList = res.data.list;
        }
      })
    },
    //监听图片加载，用于给better-scroll计算滚动高度，因为scroll组件传的data参数是推荐歌单的，
    //如果slider的图片后于歌单的加载，需要重新计算滚动高度
    loadImage(){
      if(!this.imgLoaded){  //只执行一次，即一张图片加载成功后执行，后面的图片加载不再执行
        this.$refs.scroll.refresh();
        this.imgLoaded = true;
      }
    }
  }
};
</script>

<style scoped lang="stylus">
@import "~common/stylus/variable.styl"
@import "~common/stylus/mixin.styl"

  .recommend
    position: fixed
    bottom: 0
    top: 106px
    width:100%      
    .recommend-con
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .song-list
        width:100%
        .list-title
          line-height:25px
          margin:15px 0
          padding-left: 10px
          border-left: 4px solid $color-theme
          color: $color-theme
        .list-wrapper
          display: flex
          flex-wrap:wrap
          justify-content: space-between
          .song-list-item
            width:32.5%
            display:flex
            flex-direction:column
            padding:0 0 10px 0;   
            .item-img
              img 
                display: block
                width: 100%
            .item-text
              padding: 8px 8px 0
              line-height: 20px
              font-size: $font-size-medium
              .item-name
                color:$color-text
                no-wrap1()
              .item-dissname
                color: $color-text-d
                no-wrap2()
    .loading-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)       
</style>
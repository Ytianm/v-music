<template>
    <div class="song-list" ref="songList">
      <ul class="song-list-header">
        <li></li>
        <li>歌曲</li>
        <li>时长</li>
      </ul>
      <ul>
          <li v-for="(song,index) in songList" :key="song.songid">
            <ul class="song-list-item" @click="selectSong(index)">
              <li>{{index+1}}</li>
              <li>
                <p>{{song.songname}}</p>
                <p>{{song.albumname}}</p>
              </li>
              <li>{{song.interval|timeFormat}}</li>
            </ul>
          </li>  
      </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import {timeFormat} from 'common/js/dom'

  export default {
    name:'SongList',
    props:{
      songList:{
        type:Array,
        default:[]
      },   
    },
    data(){
      return {
        allLoaded:false
      }
    },
    filters:{
      //时间转换，毫秒=>xx:xx
      timeFormat(time){
        return timeFormat(time)
      }
    },
    methods:{
      //点击歌曲播放
      selectSong(index){
        this.$emit('selectSong',index); //基础组件不做逻辑处理，暴露给父组件
      }
    }
  }
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin'

  .song-list
    background:#f5f5f5
    .song-list-header
      display:flex
      width:100%
      padding:24px 0 12px
      color:#666
      li
      :nth-child(1)
        width:40px
      :nth-child(2)
        flex:1
      :nth-child(3)
        width:70px
        text-align:center
    .song-list-item
      display:flex
      width:100%    
      li
        margin:8px 0     
      li:nth-child(1)
        width:40px
        color:#888
        vertical-align:top
        text-align:center
      :nth-child(2)
        flex:1
        line-height:20px
        padding-right:10px
        no-wrap1()
        p:nth-child(2)
          color:#888
          font-size:14px
      :nth-child(3)
        width:70px
        font-size:14px
        text-align:center
        color:#888
        
</style>
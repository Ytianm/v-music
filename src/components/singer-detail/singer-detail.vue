<template>
  <MusicList :songList="songList" :singerImg="singerImg" :title="title"></MusicList>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer'
import {createSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'

  export default {
    name:'SingerDetail',
    components:{
      MusicList
    },
    data(){
      return {
        songList:[]
      }
    },
    created() {
      //请求歌手详情数据
      let singermid = this.singer.singermid;
      getSingerDetail(singermid,30).then(res=>{
        if(res.code === 0){
          this.songList = this._handleSongList(res.data.list)
        }
      })
    },
    mounted() {
      console.log(this.singer)
    },
    computed:{
      ...mapGetters([
        'singer'  //获取到store中的singer状态
      ]),    

      title(){
        return this.singer.name;
      },
      singerImg(){
        return this.singer.avater;
      }
    },
    methods:{
      //处理歌手的歌单列表数据
      _handleSongList(list){
        let res = [];
        list.forEach(song=>{
          let musicData = song.musicData;
          res.push(createSong(musicData));
        })
        return res;
      },

    }

  }
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin'

</style>
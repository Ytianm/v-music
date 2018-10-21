<template>
  <div>
    <List @selectSinger="toSingerDetail" :singerList="singerList"></List>
    <Loading v-show="!singerList.length" class="loading"></Loading>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {getSingerList} from 'api/singer'
import List from 'base/list/list'
import Loading from 'base/loading/loading'
import {mapMutations} from 'vuex'

  export default {
    name:'Singer',
    components:{
      List,
      Loading
    },
    data(){
      return {
        singerList:[],
      }
    },
    created() {
      this._getSingerList();
    },
    mounted() {
      // console.log(this.singers)
    },
    methods:{
      //获取歌手数据
      _getSingerList(){
        getSingerList().then(res=>{
          if(res.code === 0){
            this.singerList = this._handleSingerList(res.data.list);
            // console.log(this._handleSingerList(res.data.list))
          }
        })
      },

      //处理返回数据
      _handleSingerList(list){
        let singers = {
          hot:{         
            title:'热门',
            data:[]
          }
        };

        list.forEach((item,index)=>{
          //热门歌手数据(10条)
          if(index<10){
            singers['hot'].data.push({
              id:item.Fsinger_id,
              name:item.Fsinger_name,
              singermid:item.Fsinger_mid,
              avater:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
            })
          }

          //A-Z
          let Findex = item.Findex;
          if(!singers[Findex]){  //如果没有该字母的数据，则创建一个
            singers[Findex] = {
              title:Findex,
              data:[]
            }
          }
          singers[Findex].data.push({
              id:item.Fsinger_id,
              name:item.Fsinger_name,
              singermid:item.Fsinger_mid,
              avater:`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
            })
        })
        
        //歌手数据分类
        let hot = []; //热门数据
        let a2z = []; //A-Z
        let others = []; //#

        for(let key in singers){
          if(key === 'hot'){
            hot.push(singers[key]);
          }else if(key.match(/[a-zA-Z]/)){
            a2z.push(singers[key]);
          }else{
            others.push(singers[key]);
            singers[key].title = '#';
          }
        }
        //A-Z数据排序
        a2z.sort((a,b)=>{
          return a.title.charCodeAt(0) - b.title.charCodeAt(0);
        })

        return hot.concat(a2z,others);
      },

      //跳转到歌手详情
      toSingerDetail(singer){
        this.$router.push(`singer/${singer.singermid}`);
        this.setSinger(singer); //调用的是mapMutations映射过来的函数
      },

      //改变状态-vuex
      //从store中取出mutations，并映射到当前组件
      ...mapMutations({
        setSinger:'SET_SINGER'  //对应store中mutations的配置
      })
    }
  }
</script>

<style scoped lang="stylus">
.loading
  position:absolute
  top:50%
  width:100%
  height:100%

.slide-enter-active,.slide-leave-active
  transition:.3s all ease
.slide-enter,.slide-leave-to
  transform:translateX(100%)

</style>

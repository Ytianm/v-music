<template>
  <div class="list-wrapper">
    <Scroll class="list-con" ref="wrapper" 
      :listenScroll="listenScroll" 
      :probeType="probeType"
      @scroll="scroll"
    >
      <ul>
        <li class="list-item" v-for="(item,index) in singerList" :key="index" ref="listGroup">
          <h1 class="list-title">{{item.title}}</h1>
          <ul>
            <li class="singer" v-for="singer in item.data" :key="singer.id" @click="slectSinger(singer)">
              <div class="singer-avater">
                <img v-lazy="singer.avater">
              </div>
              <h1 class="singer-name">{{singer.name}}</h1>
            </li>
          </ul>
        </li>
      </ul>
    </Scroll>
    <div class="aside-nav">
      <ul>
        <li class="nav-item" v-for="(item,index) in asideNavList" :key="index"
         :data-index="index" @touchstart="onNavTouchStart" @touchmove.stop.prevent="onNavTouchMove"
         :class="{current:currentIndex === index}"
        >
          {{item}}
        </li>
      </ul>
    </div>
    <div class="fixed-title">
      <h1 >{{fixedTitle}}</h1>
    </div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import BScroll from 'better-scroll'

  export default {
    name:'List',
    created() {
      this.touch = {},
      this.heightGroup = [],
      this.listenScroll = true,
      this.probeType = 3  //设置成3时better-scroll才能实时监听滚动距离
    },
    data(){
      return {
        scrollY:0,
        currentIndex:0
      }
    },
    props:{
      singerList:{
        type:Array,
        default:[]
      }
    },
    components:{
      Scroll
    },
    mounted() {

    },
    watch:{
      //有歌手列表数据后再去获取高度
      singerList(){
        setTimeout(()=>{
          this._calHeight();
        },20)   //加20延时是因为数据加载和dom渲染会有一定的时间差
      }
    },

    computed:{
      //字母导航列表数据
      asideNavList(){
        return this.singerList.map(item=>{
          return item.title.substr(0,1);
        })
      },

      //fixed-title
      fixedTitle(){
        if(this.scrollY>0){
          return this.singerList[this.currentIndex]?this.singerList[this.currentIndex].title:'';
        }        
      }
    },
    methods:{
      //点击字母列表跳转到对应歌手
      onNavTouchStart(e){
        let letterIndex = e.target.getAttribute('data-index');
        this._scrollTo(letterIndex,500);

        //滑动
        let startY = e.touches[0].pageY;
        this.touch.startY = startY;   //开始滑动时的y
        this.touch.startIndex = parseInt(letterIndex);  //开始滑动的index
      },

      //字母列表滑动时歌手列表跟着滑动
      onNavTouchMove(e){
        let moveY = e.touches[0].pageY;
        this.touch.moveY = moveY;
        let disCount = (this.touch.moveY - this.touch.startY)/20 | 0;   //计算滑动了几个字母高度
        let moveIndex = this.touch.startIndex + disCount; //  当前滑动到的字母

        this._scrollTo(moveIndex);
      },

      //点击歌手跳转
      slectSinger(singer){
        this.$emit('selectSinger',singer);
      },

      //滚动到
      _scrollTo(index){
        if(!index && index!=0){
          return;
        }
        let letterDOM = this.$refs.listGroup[index]; //this.$refs返回的是个数组
        this.$refs.wrapper.scrollToElement(letterDOM,500);
        
      },

      //计算歌手列表每一组距离页面的offsetTop值
      _calHeight(){
        let listGroup = this.$refs.listGroup; //所有分类歌手数组
        for(let i = 0;i<listGroup.length;i++){
          this.heightGroup.push(listGroup[i].offsetTop);
        }
        //加上最后一个item的高度
        let lastItemHeight = listGroup[listGroup.length-1].clientHeight
        this.heightGroup.push(this.heightGroup[this.heightGroup.length-1]+lastItemHeight);
      },

      //接收Scroll组件派发的滚动监听事件
      scroll(pos){
        this.scrollY = -pos.y;
        let heightGroup = this.heightGroup;

        for(let i =0;i<heightGroup.length;i++){
          let height1 = heightGroup[i];
          let height2 = heightGroup[i+1];
          if(this.scrollY > height1 && this.scrollY < height2){
            this.currentIndex = i;
            // console.log(i)
            return;
          }     
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable'
.list-wrapper
  position:fixed
  top:106px
  bottom:0
  width:100%
  overflow:hidden
  .list-con
    height:100%
    .list-item
      display: flex
      flex-direction:column
      .list-title
        line-height:25px
        margin:15px 0
        padding-left: 10px
        border-left: 4px solid $color-theme
        color: $color-theme
      .singer
        display:flex
        margin:0 0 12px;
        background:$color-text-l
        padding:5px
        .singer-avater
          width:60px
          height:60px
          border-radius:60px
          overflow: hidden 
          margin:0 15px
          
          img
            width:100%
        .singer-name
          line-height:60px
          color:$color-text-ll
          font-size:$font-size-medium
  .aside-nav
    position:absolute
    top:50%
    transform:translateY(-50%)
    right:0
    width:20px
    padding:5px  
    z-index:99
    .nav-item
      line-height:20px
      text-align:center
      color:$color-text-ll
      font-size:$font-size-medium
      &.current
        color:$color-theme
  .fixed-title
    position:fixed
    top:106px
    width:100%
    background:#f5f5f5
    h1
      line-height:25px
      margin:15px 0
      padding-left: 10px
      border-left: 4px solid $color-theme
      color: $color-theme

</style>
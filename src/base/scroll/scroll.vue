<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

  export default {
    name:'Scroll',
    props:{
      probeType:{
        type:Number,
        default:1
      },
      click:{
        type:Boolean,
        default:true
      },
      listenScroll:{
        type:Boolean,
        default:false
      },
      data:{
        type:Array,
        default:null
      }
    },
    mounted() {
      setTimeout(()=>{
        this._initScroll();
      },20)
    },
    watch:{
      //数据变动刷新滚动
      data(){
        setTimeout(()=>{
          this.refresh();
        },20)
      }
    },
    methods:{
      _initScroll(){
        if(!this.$refs.wrapper){
          return;
        }
        this.scroll = new BScroll(this.$refs.wrapper,{
          probeType:this.probeType,
          click:this.click
        });

        //监听页面滚动
        if(this.listenScroll){
          let _this = this;
          this.scroll.on('scroll',pos=>{
            _this.$emit('scroll',pos);
          })  
        }
      },
      eable(){
        this.scroll && this.scroll.eable();
      },
      disable(){
        this.scroll && this.scroll.disable();
      },
      refresh(){
        this.scroll && this.scroll.refresh();
      },
      scrollToElement(){
        this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments);
      },
      
    }
  }
</script>

<style scoped>

</style>
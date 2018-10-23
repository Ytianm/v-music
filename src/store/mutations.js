//同步改变state

import * as types from './mutations-types'

const mutations = {
  [types.SET_SINGER](state,singer){ //singer是传进来的参数
    state.singer = singer;    //改变state
  },

  [types.SET_PLAYING_STATE](state,flag){
    state.playing = flag;
  },

  [types.SET_PLAYLIST](state,list){
    state.playList = list;
  },

  [types.SET_FULLSCREEN](state,flag){
    state.fullScreen = flag;
  },

  [types.SET_PLAYMODE](state,mode){
    state.playMode = mode;
  },

  [types.SET_CURRENTINDEX](state,index){
    state.currentIndex = index;
  }
}

export default mutations;
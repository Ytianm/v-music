//同步改变state

import * as types from './mutations-types'

const mutations = {
  [types.SET_SINGER](state,singer){ //singer是传进来的参数
    state.singer = singer;    //改变state
  },

  [types.SET_PLAY_STATE](state,flag){ //播放状态
    state.playing = flag;
  },

  [types.SET_PLAYLIST](state,list){ //当前播放列表
    state.playList = list;
  },

  [types.SET_SEQUENSE_LIST](state,list){  //顺序列表
    state.sequenseList = list;
  },

  [types.SET_FULLSCREEN](state,flag){ //播放器全屏
    state.fullScreen = flag;
  },

  [types.SET_MINIPLAYER](state,flag){ //播放器全屏
    state.miniPlayer = flag;
  },


  [types.SET_PLAYMODE](state,mode){ //播放模式
    state.playMode = mode;
  },

  [types.SET_CURRENTINDEX](state,index){  //当前播放歌曲的index
    state.currentIndex = index;
  },

  [types.SET_BEGIN](state,num){  //
    state.begin = num;
  }
}

export default mutations;
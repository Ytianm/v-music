//获取state

export const singer = state=>state.singer;   //返回状态里的singer

export const playing = state=>state.playing;

export const playList = state=>state.playList;

export const sequenseList = state=>state.sequenseList;

export const fullScreen = state=>state.fullScreen;

export const miniPlayer = state=>state.miniPlayer;

export const playMode = state=>state.playMode;

export const currentIndex = state=>state.currentIndex;

export const currentSong = (state)=>{
  return state.playList[state.currentIndex];
}

export const begin = state=>state.begin;


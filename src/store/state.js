//全局状态
import { playMode } from 'common/js/config'

const state = {
  singer: {},
  playing: false,
  playList:[],
  sequenseList:[],
  fullScreen: false,
  miniPlayer:false,
  playMode: playMode.sequense,
  currentIndex: -1,
  begin:0
}

export default state;
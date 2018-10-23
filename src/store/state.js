//全局状态
import { playMode } from 'common/js/config'

const state = {
  singer: {},
  playing: false,
  playList:[],
  fullScreen: false,
  playMode: playMode.sequense,
  currentIndex: -1
}

export default state;
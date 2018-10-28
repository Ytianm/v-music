//提交mutations
//异步操作,一次性改变多个state

import * as types from './mutations-types'

export const selectSong = function({commit,state},{list,index}){
  commit(types.SET_PLAYLIST,list);
  commit(types.SET_CURRENTINDEX,index);
  commit(types.SET_FULLSCREEN,true);
  commit(types.SET_PLAY_STATE,true);

}
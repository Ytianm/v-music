//同步改变state

import * as types from './mutations-types'

const mutations = {
  [types.SET_SINGER](state,singer){ //singer是传进来的参数
    state.singer = singer;    //改变state
  }
}

export default mutations;
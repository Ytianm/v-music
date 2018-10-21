import { commonParams } from './config'
import jsonp from 'common/js/jsonp'
import axios from 'axios'

//轮播数据
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  const data = Object.assign({}, commonParams, {
    uin: 0,
    platform: 'h5',
    needNewCode: 1,
    format: 'jsonp',
    callbackFn: 'jsonpCallback'
  })

  const options = {
    url,
    data
  }

  return jsonp(options);
}

//推荐歌单数据
export function getRecommendList() {
  const url = '/api/getDiscList'; 
  const data = Object.assign({}, commonParams, {
    picmid: 1,
    rnd:Math.random(),
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29
  })

  return axios.get(url,{ //请求本地服务器(node)，本地服务器再以qq服务器的身份请求qq服务器获取数据
    params:data
  }).then(res=>{
    return Promise.resolve(res.data)
  })
}
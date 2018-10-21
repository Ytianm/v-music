import jsonp from 'common/js/jsonp'
import axios from 'axios'
import { commonParams, options } from './config'

//歌手列表
export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 200,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    format: 'jsonp',
    callbackFn: 'jsonpCallback'
  })

  const options = {
    url,
    data
  }

  return jsonp(options);
}

// export function getSingerList(index) {
//   const url = '/api/getSingerList';
//   const jsonpG = 'jsonp' + Date.now()
//   const data = Object.assign({}, commonParams, {
//     loginUin: 0,
//     hostUin: 0,
//     format: 'jsonp',
//     platform: 'yqq',
//     needNewCode: 0,
//     // callback:jsonpG,
//     jsonpCallback:jsonpG,
//     data: {
//       "comm": {
//         "ct": 24,
//         "cv": 10000
//       },
//       "singerList": {
//         "module": "Music.SingerListServer",
//         "method": "get_singer_list",
//         "param": {
//           "area": -100,
//           "sex": -100,
//           "genre": -100,
//           "index": index,
//           "sin": 0,
//           "cur_page": 1
//         }
//       }
//     }
//   });

//   return axios.get(url, {
//     params: data
//   }).then(res => {
//     return Promise.resolve(res.data)
//   })
// }


//歌手详情
export function getSingerDetail(singermid,num) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid,
    order: 'listen',
    begin: 0,
    num,
    songstatus: 1,
    format: 'jsonp',
    callbackFn: 'jsonpCallback'
  })

  const options = {
    url,
    data
  }

  return jsonp(options);
}
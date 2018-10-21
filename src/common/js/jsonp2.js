//jsonp请求

import originalJSONP from 'jsonp' //第三方jsonp请求库

export default function jsonp(url, data, options) {
  url = url + (url.indexOf('?') < 0 ? '?' : '&') + urlParam(data);
  return new Promise((resolve, reject) => {
    originalJSONP(url, options, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    })
  })
}

//拼接url参数=> aa=bb&cc=dd
function urlParam(data) {
  let url = '';
  for (let i in data) {
    let value = (data[i] === 'undefined' ? '' : data[i]);
    url += `&${i}=${encodeURIComponent(value)}`;
  }
  return url ? url.substring(1) : '';
}
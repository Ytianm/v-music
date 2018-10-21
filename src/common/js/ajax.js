//ajax

export default function ajax(options) {
  options = options || {};
  options.type = options.type || 'get';
  options.data = options.data || {};
  options.dataType = options.dataType || 'text';

  options.url = options.url+(options.url.indexOf('?') < 0 ? '?' : '&') + urlParam(options.data);

  let xhr = new XMLHttpRequest();
  xhr.open('GET', options.url);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status > 200 && xhr.status < 300 || xhr.status == 304) {
        options.success && options.success(xhr.responseText);
      } else {
        options.error && options.error();
      }
    }
  }
}

//拼接url参数=> aa=bb&cc=dd
function urlParam(data) {
  // let url = '';
  // for (let i in data) {
  //   let value = (data[i] === 'undefined' ? '' : data[i]);
  //   url += `&${i}=${encodeURIComponent(value)}`
  // }
  // return url ? url.substring(1) : '';

  let arr = [];
  for (let name in data) {
    //encodeURIComponnet()将中文或其他字符转换成utf-8编码
    arr.push(`${encodeURIComponent(name)}=${encodeURIComponent(data[name])}`); //a=xx,b=xx
  }
  return arr.join('&'); //a=xx&b=xx
}
export default function jsonp(options) {
  return new Promise((resolve, reject) => {
    let callbackID = `jsonp_${Date.now()}_${Math.ceil(Math.random() * 100000)}`;
    let data = options.data || {},
      callbackFn = options.data.callbackFn || 'callBack',
      url = options.url,
      params = [],
      container = document.getElementsByTagName('head')[0],
      scriptNode = document.createElement('script');

    //处理参数
    data[callbackFn] = callbackID; //callBackFn:这是约定的回调函数名
    for (let key in data) {
      params.push(key + '=' + data[key]);
    }
    url += (/\?/.test(url)) ? '&' : '?';
    url += params.join('&');

    scriptNode.id = callbackID; //添加id，方便后面删除该节点
    scriptNode.src = url;
    scriptNode.type = 'text/javascript';
    container.appendChild(scriptNode);

    //注册全局回调(jsonp的回调函数必须是在全局作用域下)
    window[callbackID] = function (res) {
      //请求成功
      if (res) {
        resolve(res);
      }
      //请求失败
      else {
        reject(err);
      }

      //删除动态创建的script
      let script = document.getElementById(callbackID);
      container.removeChild(script);
    }
  })
}



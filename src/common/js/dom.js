export function hasClass(el, className) {
  let reg = new RegExp(`(^|\\s)${className}`);
  return reg.test(el.className);
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return;
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}

export function removeClass(el,className){
  if(!hasClass(el,className)){
    return;
  }
  let newClass = el.className.split(' ');
  for(let i =0;i<newClass.length;i++){
    if(newClass[i] == className){
      newClass.splice(i,1);
    }
  }
  el.className = newClass.join(' ');
}

/*js中的样式代码根据浏览器自动添加对应前缀*/
let eleStyle = document.createElement('div').style; //得到所有样式

let vendor = (() => {
  let transformName = {   //以transform为查找依据，这里也可以用其他任何一个需要加前缀的属性
    webkit: 'webkitTransform',
    moz: 'mozTransform',
    o: 'oTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformName) {
    if (eleStyle[transformName[key]] !== undefined) {
      return key;
    }
  }
  return false;
})()

export function prefixStyle(style) {

  if (vendor === false) {
    return false;
  }
  if (vendor === 'standard') {
    return style;
  }
  return vendor + style.substr(0, 1).toUpperCase() + style.substr(1);
}

/*时间转换：毫秒 => xx:xx:xx*/
export function timeFormat(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time - 60 * minutes;
  
  if (minutes.toString().length === 1) {
    minutes = '0' + minutes;
  }
  if (seconds.toString().length === 1) {
    seconds = '0' + seconds;
  }

  return `${minutes}:${seconds}`
}
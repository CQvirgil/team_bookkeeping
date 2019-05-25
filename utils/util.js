const formatTime = date => {
  var date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const time = ' ' + [hour, minute, second].map(formatNumber).join(':')
  return [year, month, day].map(formatNumber).join('-')
}

//把时间转成时间戳
const timeTampToStr = function timeTampToStr() {
  // 当前时间戳
  var timestamp = parseInt(new Date().getTime() / 1000);
  return timestamp
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
 */
const formatTime2 = function formatTime(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

//按状态排序
const bubble_sort = function bubble_sort(list) {
  var n = 0
  for (var i = 0; i < list.length - n; i++) {
    
    if (list[i].state === 0) {
      
      //console.log(list[i])
      for (var j = i; j < list.length - 1; j++) {
        var tepm = list[j]
        list[j] = list[j + 1]
        list[j + 1] = tepm
      }
      i = 0
      n++
    }
  }

  return list
}

//按时间戳排序
const bubble_sort_timestamp = function bubble_sort_timestamp(list) {
  for (var i = 0; i < list.length - 1; i++) {
    for (var j = 0; j < list.length - 1 - i; j++) {
      if (list[j].created_at < list[j + 1].created_at) {
        var temp = list[j]
        list[j] = list[j + 1]
        list[j + 1] = temp
      }
    }
  }
  return list
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatTime2: formatTime2,
  bubble_sort: bubble_sort,
  bubble_sort_timestamp: bubble_sort_timestamp
}
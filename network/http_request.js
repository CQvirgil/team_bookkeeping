const data_handler = require('../data/data_handler.js')
const app = getApp()
const Promise = require('../utils/es6-promise.js')

const server_url = 'https://www.lecaigogo.com/v1' //服务器地址
const request_type = {
  POST: 'POST',
  GET: 'GET'
}

var ActivityByIdPromise = null

//请求服务
const request_server = function(lastUrl, postData, method, handletype) {
  wx.request({
    url: server_url + lastUrl,
    data: postData,
    method: method,
    success: function(res) {
      if (res.statusCode == 200) {
        if (res.data.code == 0) {
          data_handler.handlInternetData(res, handletype)
        }
      }
    }
  })
}

const getPromise = function() {
  console.log('getPromise')
  var p = new Promise(function(resolve, reject) {
    //做一些异步操作
    setTimeout(function() {
      var num = Math.ceil(Math.random() * 10); //生成1-10的随机数
      if (num <= 5) {
        resolve(num);
      } else {
        reject('数字太大了');
      }
    }, 2000);
  });
  return p;
}

const wxLogIn = function(encryptedData, iv) {
  var lastUrl = '/auth/wxlogin'
  var postData = {
    "code": app.globalData.code,
    "encryptedData": encryptedData,
    "iv": iv
  }
  var method = request_type.POST
  //request_server(lastUrl, postData, method, data_handler.HANDLE_TYPE.LOGIN)

  var p = new Promise(function(resolve, reject) {
    wx.request({
      url: server_url + lastUrl,
      data: postData,
      method: method,
      success: function(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            data_handler.handlInternetData(res, data_handler.HANDLE_TYPE.LOGIN)
            resolve(data_handler.HANDLE_TYPE.LOGIN)
          }
        }
      }
    })
  });
  return p;
}

//获取活动ID的列表
const getActivityIdArray = function() {
  var lastUrl = '/activity/get_all'
  var postData = {
    "user_id": app.globalData.unionid
  }
  var method = request_type.POST
  //request_server(lasturl, postData, method, data_handler.HANDLE_TYPE.GET_ACTIVITY_ID_ARRAY)
  var p = new Promise(function(resolve, reject) {
    wx.request({
      url: server_url + lastUrl,
      data: postData,
      method: method,
      success: function(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            data_handler.handlInternetData(res, data_handler.HANDLE_TYPE.GET_ACTIVITY_ID_ARRAY)
            resolve(data_handler.HANDLE_TYPE.GET_ACTIVITY_ID_ARRAY)
          }
        }
      },
      fail() {
        reject('网络请求失败');
      }
    })
  });
  return p
}

//使用活动id获取某个活动
const getActivityById = function(act_id) {
  var lastUrl = '/activity/get'
  var postData = {
    "act_id": act_id,
    "user_id": app.globalData.unionid
  }
  var method = request_type.POST
  //request_server(lastUrl, postData, method, data_handler.HANDLE_TYPE.GET_ACTIVITY_BY_ID)
  ActivityByIdPromise = new Promise(function(resolve, reject) {
    wx.request({
      url: server_url + lastUrl,
      data: postData,
      method: method,
      success: function(res) {
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            data_handler.handlInternetData(res, data_handler.HANDLE_TYPE.GET_ACTIVITY_BY_ID)
            resolve(data_handler.HANDLE_TYPE.GET_ACTIVITY_BY_ID)
          }
        }
      }
    })
  })
  return ActivityByIdPromise
}

const getActivityByIdPromise = function(){
  return ActivityByIdPromise
}

module.exports = {
  getPromise: getPromise,
  request_server: request_server,
  getActivityById: getActivityById,
  getActivityIdArray: getActivityIdArray,
  wxLogIn: wxLogIn,
  getActivityByIdPromise: getActivityByIdPromise
}
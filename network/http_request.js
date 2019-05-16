const data_handler = require('../data/data_handler.js')
const app = getApp()

const server_url = 'https://www.lecaigogo.com/v1' //服务器地址
const request_type = {
  POST: 'POST',
  GET: 'GET'
}

//请求服务
const request_server = function(lastUrl, postData, method, handletype) {
  wx.request({
    url: server_url + lastUrl,
    data: postData,
    method: method,
    success: function(res){
      if(res.data.code == 0){
        data_handler.handlInternetData(res, handletype)
      }
    }
  })
}

const wxLogIn = function (encryptedData, iv){
  var lastUrl = '/auth/wxlogin'
  var postData = {
    "code": app.globalData.code,
    "encryptedData": encryptedData,
    "iv": iv
  }
  var method = request_type.POST
  request_server(lastUrl, postData, method, data_handler.HANDLE_TYPE.LOGIN)
}

//获取活动ID的列表
const getActivityIdArray = function(){
  var lasturl = '/activity/get_all'
  var postData = {
    "user_id": app.globalData.unionid
  }
  var method = request_type.POST
  request_server(lasturl, postData, method, data_handler.HANDLE_TYPE.GET_ACTIVITY_ID_ARRAY)
}

//使用活动id获取某个活动
const getActivityById = function(act_id){
  var lastUrl = '/activity/get'
  var postData = {
    "act_id": act_id,
    "user_id": app.globalData.unionid
  }
  var method = request_type.POST
  request_server(lastUrl, postData, method, data_handler.HANDLE_TYPE.GET_ACTIVITY_BY_ID)
}

module.exports = {
  request_server: request_server,
  getActivityById: getActivityById,
  getActivityIdArray: getActivityIdArray,
  wxLogIn: wxLogIn
}
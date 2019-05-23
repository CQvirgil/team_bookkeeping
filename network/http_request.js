const data_handler = require('../data/data_handler.js')
const app = getApp()
const Promise = require('../utils/es6-promise.js')

const server_url = 'https://www.lecaigogo.com/v1' //服务器地址
const request_type = {
  POST: 'POST',
  GET: 'GET'
}

var mPromise = {}

//请求服务
const request_server = function(lastUrl, postData, method, handletype) {
  //console.log('request_server')
  mPromise = new Promise(function(resolve, reject) {
    wx.request({
      url: server_url + lastUrl,
      data: postData,
      method: method,
      success: function(res) {
        console.log(res)
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            data_handler.handlInternetData(res, handletype)
            resolve(handletype);
          }
        } else {
          console.log(res)
          reject('请求失败');
        }
      }
    })
  })
  app.globalData.mPromise = mPromise
}

const getmPromise = function() {
  console.log(mPromise)
  return mPromise
}

const wxLogIn = function(encryptedData, iv) {
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
const getActivityIdArray = function() {
  var lastUrl = '/activity/get_all'
  var postData = {
    "user_id": app.globalData.userData.id
  }
  var method = request_type.POST
  request_server(lastUrl, postData, method, data_handler.HANDLE_TYPE.GET_ACTIVITY_ID_ARRAY)
}

//使用活动id获取某个活动
const getActivityById = function(act_id) {
  var lastUrl = '/activity/get'
  var postData = {
    "act_id": act_id,
    "user_id": app.globalData.userData.id
  }
  var method = request_type.POST
  request_server(lastUrl, postData, method, data_handler.HANDLE_TYPE.GET_ACTIVITY_BY_ID)
}

//创建活动
const createActivity = function(text) {
  var lastUrl = '/activity/create'
  var postData = {
    "act_name": text,
    "user_id": app.globalData.userData.id
  }
  var method = request_type.POST
  request_server(lastUrl, postData, method, data_handler.HANDLE_TYPE.CREATE_ACTIVITY)
}

//结束记账
const endTally = function(act_id) {
  var lastUrl = '/activity/state'
  var postData = {
    "act_id": act_id,
    "user_id": app.globalData.userData.id
  }
  var method = request_type.POST
  request_server(lastUrl, postData, method, data_handler.HANDLE_TYPE.END_TALLY)
}

//退出活动
const exitActivity = function(act_id) {
  var lastUrl = '/activity/exit'
  var postData = {
    "act_id": act_id,
    "user_id": app.globalData.userData.id
  }
  var method = request_type.POST
  request_server(lastUrl, postData, method, data_handler.HANDLE_TYPE.EXIT_ACTIVITY)
}

//获取账单详情
const getBillDetails = function(bill_id) {
  var lastUrl = '/bill/get'
  var postData = {
    "bill_id": bill_id,
    "user_id": app.globalData.userData.id
  }
  var method = request_type.POST
  request_server(lastUrl, postData, method, data_handler.HANDLE_TYPE.GET_BILLDETAilS)
}

//删除账单
const deleteBill = function(bill_id) {
  var lastUrl = '/bill/delete'
  var postData = {
    "bill_id": bill_id,
    "user_id": app.globalData.userData.id
  }
  var method = request_type.POST
  request_server(lastUrl, postData, method, data_handler.HANDLE_TYPE.DELET_BILL)
}

//创建账单
const cretateBill = function(act_id, bill_content, members, payer_id, total) {
  var lastUrl = '/bill/create'
  var postData = {
    "activity_id": act_id,
    "content": bill_content,
    "members": members,
    "payer_id": payer_id,
    "total": total,
    "user_id": app.globalData.userData.id
  }
  var method = request_type.POST
  request_server(lastUrl, postData, method, data_handler.HANDLE_TYPE.CREATE_BILL)
}

const updataBill = function (bill_id, content, members, payer_id, total) {
  var lastUrl = '/bill/update'
  var postData = {
    "bill_id": bill_id,
    "content": content,
    "members": members,
    "payer_id": payer_id,
    "total": total,
    "user_id": app.globalData.userData.id
  }
  var method = request_type.POST
  request_server(lastUrl, postData, method, data_handler.HANDLE_TYPE.CREATE_BILL)
}

module.exports = {
  getActivityById: getActivityById,
  getActivityIdArray: getActivityIdArray,
  wxLogIn: wxLogIn,
  createActivity: createActivity,
  endTally: endTally,
  exitActivity: exitActivity,
  getBillDetails: getBillDetails,
  deleteBill: deleteBill,
  cretateBill: cretateBill,
  updataBill: updataBill
}
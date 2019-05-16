const app = getApp()


const HANDLE_TYPE = {
  LOGIN: 1000,
  GET_ACTIVITY_ID_ARRAY: 1001,
  GET_ACTIVITY_BY_ID: 1002
}

const handlInternetData = function(res, type) {
  console.log(res)
  var data = res.data.data
  switch (type) {
    case HANDLE_TYPE.LOGIN:
      handleLogInData(data)
      break;
    case HANDLE_TYPE.GET_ACTIVITY_ID_ARRAY:
      handleActivityIdArray(data)
      break;
    case HANDLE_TYPE.GET_ACTIVITY_BY_ID:
      handleActivity(data)
      break;
  }
}

const handleLogInData = function(data) {
  const http_request = require('../network/http_request.js')
  app.globalData.userInfo = data
  app.globalData.unionid = data.unionid
  console.log('user_nickname:  ' + app.globalData.userInfo.nickname)
  http_request.getActivityIdArray();
}

//处理活动id列表
const handleActivityIdArray = function(data) {
  const http_request = require('../network/http_request.js')
  console.log(data)
  http_request.getActivityById(data.act_id[0])
}

//处理活动数据
const handleActivity = function(data) {
  app.globalData.activity[app.globalData.activity.length] = data
  console.log(app.globalData.activity)
}

module.exports = {
  HANDLE_TYPE: HANDLE_TYPE,
  handlInternetData: handlInternetData
}
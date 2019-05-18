const app = getApp()
const app_data = require('./data.js')
const util = require('../utils/util.js')


const HANDLE_TYPE = {
  LOGIN: 1000,
  GET_ACTIVITY_ID_ARRAY: 1001,
  GET_ACTIVITY_BY_ID: 1002,
  CREATE_ACTIVITY: 1003
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
    case HANDLE_TYPE.CREATE_ACTIVITY:
      handleCreateActivityData(data)
      break;
  }
}

const handleLogInData = function(data) {
  const http_request = require('../network/http_request.js')
  app.globalData.userInfo = data
  app.globalData.unionid = data.unionid
  app.globalData.userData.id = data.unionid
  //console.log('user_nickname:  ' + app.globalData.userInfo.nickname)
  http_request.getActivityIdArray();
}

//处理活动id列表
const handleActivityIdArray = function(data) {
  const http_request = require('../network/http_request.js')
  //console.log(data)
  for (var i in data.act_id) {
    http_request.getActivityById(data.act_id[i])
  }
}

//处理活动数据
const handleActivity = function(data) {
  app.globalData.activity[app.globalData.activity.length] = data
  var act = new app_data.Activity()
  act.name = data.name
  act.act_id = data.act_id
  act.act_total = data.act_total
  act.created_at = data.created_at
  act.members = data.members
  act.my_expend = data.my_expend
  act.my_total = data.my_total
  act.state = data.state
  act.over_at = util.formatTime2(data.over_at, 'Y-M-D')
  act.updated_at = data.updated_at
  act.all_bills = data.bills
  app.globalData.userData.add_activity(act)
  //console.log(app.globalData.activity)
}

//创建活动数据处理
const handleCreateActivityData = function (data){
  app.globalData.create_act_id = data.act_id
  console.log(data)
}

module.exports = {
  HANDLE_TYPE: HANDLE_TYPE,
  handlInternetData: handlInternetData
}
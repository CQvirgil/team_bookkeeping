const app = getApp()
const app_data = require('./data.js')
const util = require('../utils/util.js')


const HANDLE_TYPE = {
  LOGIN: 1000,
  GET_ACTIVITY_ID_ARRAY: 1001,
  GET_ACTIVITY_BY_ID: 1002,
  CREATE_ACTIVITY: 1003,
  END_TALLY: 1004,
  EXIT_ACTIVITY: 1005,
  GET_BILLDETAilS: 1006,
  DELET_BILL: 1007,
  CREATE_BILL: 1008,
  UPDATA_BILL: 1009
}

const handlInternetData = function(res, type) {
  //console.log(res)
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
    case HANDLE_TYPE.END_TALLY:
      handleEndTallyData(data)
      break;
    case HANDLE_TYPE.EXIT_ACTIVITY:
      handleExitActivityData(data)
      break;
    case HANDLE_TYPE.GET_BILLDETAilS:
      handleGetBillDetails(data)
      break;
    case HANDLE_TYPE.DELET_BILL:
      handleDeletBill(data)
      break;
    case HANDLE_TYPE.CREATE_BILL:
      handleCreateBillData(data)
      break;
    case HANDLE_TYPE.UPDATA_BILL:
      handleUpdataBillData(data)
      break
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
  if (!data.bills) {
    act.all_bills = []
  }
  if (!app.globalData.userData.all_activities) {
    app.globalData.userData.all_activities = []
  }
  app.globalData.userData.add_activity(act)
  //console.log(app.globalData.activity)
}

const createActivity = function(name, act_id, act_total, created_at, members,
  my_expend, updated_at, my_total, state, over_at, all_bills) {
  var act = new app_data.Activity()
  act.name = name
  act.act_id = act_id
  act.act_total = act_total
  act.created_at = created_at
  act.members = members
  act.my_expend = my_expend
  act.my_total = my_total
  act.state = state
  act.over_at = over_at
  act.updated_at = updated_at
  act.all_bills = all_bills
  return act
}

//创建活动数据处理
const handleCreateActivityData = function(data) {
  const http_request = require('../network/http_request.js')
  app.globalData.create_act_id = data.act_id
  console.log(data)
  var members = [{
    headimgurl: app.globalData.userInfo.headimgurl,
    nickname: app.globalData.userInfo.nickname,
    user_id: app.globalData.userInfo.unionid
  }]
  var act = createActivity(
    app.globalData.cActivityName,
    data.act_id,
    0,
    util.getTimeStamp(), 
    members,
    0,
    util.getTimeStamp(),
    0,
    1,
    0,
    [],
  )
  app.globalData.userData.add_activity(act)
  //http_request.getActivityById(data.act_id)
}

const handleEndTallyData = function(data) {
  console.log(data)
}

const handleExitActivityData = function(data) {
  console.log(data)
}

const handleGetBillDetails = function(data) {
  console.log(data)
  app.globalData.cBillDetails = data
}

const handleDeletBill = function(data) {
  console.log(data)
}

const handleCreateBillData = function(data) {
  console.log(data)
  app.globalData.cBill_id = data.bill_id
}

const handleUpdataBillData = function(data) {
  console.log(data)
}

module.exports = {
  HANDLE_TYPE: HANDLE_TYPE,
  handlInternetData: handlInternetData
}
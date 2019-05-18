
const FindActByID = function(act_id) {
  for (var i in ActivityArray) {
    if (ActivityArray[i].act_id == act_id) {
      return ActivityArray[i]
    }
  }
}

const setActivityArray = function(act_array) {
  ActivityArray = act_array
}

const getActivityArray = function() {
  return ActivityArray
}

var Activity = function () {
  this.act_id = ''        //活动id
  this.name = ''          //活动名称
  this.members = []      //参与成员
  this.act_total = 0    //所有支出
  this.my_total = 0     //我的总支出
  this.my_expend = 0    //我的消费
  this.state = 0     // 0: 已结束   1: 进行中
  this.created_at = 0  // 创建时间
  this.create_user_id = ''
  this.updated_at = 0  //更新时间
  this.all_bills = {}   //所以账单简略信息
  this.over_at = 0      //结束时间
  this.result = []  // 结束活动时成员之间相互转账情况
}

var UserData = function () {
  this.id = ''        // 用户的id，团队记账小程序目前使用的是unionID
  this.code = ''
  this.all_activities = []
}

UserData.prototype.add_activity = function (act) {
  this.all_activities.push(act)
}

UserData.prototype.findActivityById = function(act_id){
  for (var i in this.all_activities){
    if (this.all_activities[i].act_id == act_id){
      return this.all_activities[i]
    }
  }
}


module.exports = {
  setActivityArray: setActivityArray,
  getActivityArray: getActivityArray,
  UserData: UserData,
  Activity: Activity
}
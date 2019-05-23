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

var Activity = function() {
  this.act_id = '' //活动id
  this.name = '' //活动名称
  this.members = [] //参与成员
  this.act_total = 0 //所有支出
  this.my_total = 0 //我的总支出
  this.my_expend = 0 //我的消费
  this.state = 0 // 0: 已结束   1: 进行中
  this.created_at = 0 // 创建时间
  this.create_user_id = ''
  this.updated_at = 0 //更新时间
  this.all_bills = {} //所以账单简略信息
  this.over_at = 0 //结束时间
  this.result = [] // 结束活动时成员之间相互转账情况
}

var UserData = function() {
  this.id = '' // 用户的id，团队记账小程序目前使用的是unionID
  this.code = ''
  this.all_activities = []
}

UserData.prototype.add_activity = function(act) {
  this.all_activities.push(act)
}

UserData.prototype.findActivityById = function(act_id) {
  for (var i in this.all_activities) {
    if (this.all_activities[i].act_id == act_id) {
      return this.all_activities[i]
    }
  }
}

UserData.prototype.removeAct = function(act_index) {
  this.all_activities.splice(act_index, 1)
}

//按活动id删除活动
UserData.prototype.removeActById = function(act_id) {
  for (var i in this.all_activities) {
    if (this.all_activities[i].act_id == act_id) {
      this.all_activities.splice(i, 1)
    }
  }
}

//更新活动数据
UserData.prototype.updataAct = function(act_id, fields, data) {
  for (var i in this.all_activities) {
    if (this.all_activities[i].act_id == act_id) {
      switch (fields) {
        case 'act_total':
          this.all_activities[i].act_total = data
          break
        case 'my_total':
          this.all_activities[i].my_total = data
          break
        case 'my_expend':
          this.all_activities[i].my_expend = data
          break
        case 'over_at':
          this.all_activities[i].over_at = data
          break
      }
    }
  }
}

//按活动id查询某个活动
UserData.prototype.findBillById = function(act_id, bill_id) {
  for (var i in this.all_activities) {
    if (this.all_activities[i].act_id == act_id) {
      for (var j in this.all_activities[i].all_bills) {
        if (this.all_activities[i].all_bills[j].bill_id == bill_id) {
          return this.all_activities[i].all_bills[j]
        }
      }
    }
  }
}

//添加账单
UserData.prototype.addBill = function(act_id, bill) {
  for (var i in this.all_activities) {
    if (this.all_activities[i].act_id == act_id) {
      this.all_activities[i].all_bills.push(bill)
      this.all_activities[i].act_total += bill.bill_total
      this.all_activities[i].my_total += bill.my_total
      this.all_activities[i].my_expend += bill.my_total
    }
  }
}

//删除账单
UserData.prototype.removeBill = function(act_id, bill_id) {
  for (var i in this.all_activities) {
    if (this.all_activities[i].act_id == act_id) {
      for (var j in this.all_activities[i].all_bills) {
        if (this.all_activities[i].all_bills[j].bill_id == bill_id) {
          this.all_activities[i].act_total -= this.all_activities[i].all_bills[j].bill_total
          this.all_activities[i].my_total -= this.all_activities[i].all_bills[j].my_total
          this.all_activities[i].my_expend -= this.all_activities[i].all_bills[j].my_total
          this.all_activities[i].all_bills.splice(j, 1)
        }
      }
    }
  }
}

//修改账单
UserData.prototype.updataBill = function(act_id, bill_id, bill){
  for(var i in this.all_activities){
    if(this.all_activities[i].act_id == act_id){
      for(var j in this.all_activities[i].all_bills){
        if(this.all_activities[i].all_bills[j].bill_id == bill_id){
          this.all_activities[i].all_bills[j] = bill
        }
      }
    }
  }
}

module.exports = {
  setActivityArray: setActivityArray,
  getActivityArray: getActivityArray,
  UserData: UserData,
  Activity: Activity
}
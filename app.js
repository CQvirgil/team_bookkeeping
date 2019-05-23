//app.js
const app_data = require('./data/data.js')

App({

  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var self = this
    wx.showShareMenu({
      withShareTicket: true
    })

  },
  globalData: {
    url: 'https://www.lecaigogo.com/v1',
    userInfo: null,
    activity: [],
    activityID: [],
    create_act_id: '',
    code: '',
    openid: '',
    session_key: '',
    unionid: '',
    isShowChangActivityName: false,
    mPromise: null,
    cBillDetails: null,
    userData: new app_data.UserData(),
    activity_index: 0,
    bill_index: 0,
    cBill_id: 0
  }
})
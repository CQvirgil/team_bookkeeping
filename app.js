//app.js


App({

  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var self = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code
        this.globalData.code = code
        console.log('res.code: ' + this.globalData.code)
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              const http_request = require('./network/http_request.js')
              console.log('已授权登陆')
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                withCredentials: true,
                success(res) {
                  // 可以将 res 发送给后台解码出 unionId
                  //console.log(res)
                  self.globalData.userInfo = res.userInfo
                  var encryptedData = res.encryptedData
                  var iv = res.iv
                  http_request.wxLogIn(encryptedData, iv)
                },
                fail(res) {
                  console.log('获取用户数据失败')
                }
              })
            } else {
              wx.navigateTo({
                url: '../login/login',
              })
              console.log('未授权登陆')
            }
          }
        })
      }
    })

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
    isShowChangActivityName: false
  }
})
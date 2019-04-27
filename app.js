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
        // wx.request({
        //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' +
        //     'wx5d102152c8947ca7' +
        //     '&secret=' + 'aac6699011fd467af10bbb64161e3390' +
        //     '&js_code=' + code + '&grant_type=authorization_code',
        //   method: 'GET',
        //   success(res){
        //     self.globalData.openid = res.data.openid
        //     self.globalData.session_key = res.data.session_key
        //     self.globalData.unionid = res.data.unionid
        //     console.log("unionid: " + self.globalData.unionid)
        //   }
        // })
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
  }
})
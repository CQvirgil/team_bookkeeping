//app.js
App({

  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('res.code: ' + res.code)
        var code = res.code
        
        // wx.request({
        //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' +
        //     'wx5d102152c8947ca7' +
        //     '&secret=' + 'aac6699011fd467af10bbb64161e3390' +
        //     '&js_code=' + code + '&grant_type=authorization_code',
        //   method: 'GET',
        //   success(res){
        //     console.log(res)
        //   }
        // })
      }
    })

    wx.showShareMenu({
      withShareTicket: true
    })

  },
  globalData: {
    userInfo: null,
    activity: [],
    activityID: [],
    create_act_id: ''
  }
})
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hasActivity: true,
    list: [],
    Finish: '进行中'
  },
  onLoad(pageOptions){

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              console.log(res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
                console.log(res.userInfo)
                wx.request({
                  url: 'http://www.lecaigogo.com:4998/v1/activity/get_all',
                  data: { "user_id": app.globalData.userInfo.nickName },
                  method: POST,
                  success(res) {
                    console.log(res.data)

                  },
                  fail(err) {
                    console.log('网络请求失败：' + 'http://www.lecaigogo.com:4998/v1/activity/get_all')
                  }

                })

              }
            }
          })
        }
      }
    })

    console.log('onLoad')
  },
  onShow(){
  
    this.setData({
      list: app.globalData.activity,
    })

    if (app.globalData.activity.end_time != null) {
      this.setData({
        Finish: app.globalData.activity.end_time + '已结束'
      })
    }
    console.log(this.data.list.length)
    if (this.data.list.length > 0) {
      this.setData({
        hasActivity: false
      })
    }
  },
  gotoCreatActivity(event){
    console.log('gotoCreatActivity')
    wx.navigateTo({
      url: '../creat_activity/creat_activity',
    })
  },
  joinActivity: function(e){
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    })
  },
  gotoDetails: function(e){
    console.log(e.currentTarget.dataset.index)
    wx.navigateTo({
      url: '../details/details?index=' + e.currentTarget.dataset.index,
    })
  }
})

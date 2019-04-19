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
    console.log('onLoad')
  },
  onShow(){
    wx.getUserInfo({
      
    })

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

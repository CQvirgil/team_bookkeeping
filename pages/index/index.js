//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hasActivity: true,
    list: []
  },
  onLoad(pageOptions){
    console.log('onLoad')
    this.setData({
      list: [
        { name: '美丽海岛五日游', money: 180.78, headimgs: [1, 2, 3, 4, 5] },
        { name: '成都4日', money: 868.3, headimgs: [1, 2, 3, 4, 5] },
        { name: '云南6日游', money: 1423.33, headimgs: [1, 2, 3, 4, 5] },
        { name: '云南6日游', money: 1423.33, headimgs: [1, 2, 3, 4, 5] },
        { name: '云南6日游', money: 1423.33, headimgs: [1, 2, 3, 4, 5] },
        { name: '云南6日游', money: 1423.33, headimgs: [1, 2, 3, 4, 5] },
        { name: '云南6日游', money: 1423.33, headimgs: [1, 2, 3, 4, 5] },
      ],
      hasActivity: false
    })
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
    wx.navigateTo({
      url: '../details/details',
    })
  }
})

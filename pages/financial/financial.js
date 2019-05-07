// pages/financial/financial.js
//收支明细页面
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this
    wx.setNavigationBarTitle({
      title: '收支明细',
    })
    console.log('act_id'+options.act_id)
    wx.request({
      url: app.globalData.url + '/activity/detail',
      method: 'POST',
      data: {
        "act_id": options.act_id,
        "user_id": app.globalData.unionid
      },
      success(res) {
        console.log(res.data)
        var detail = res.data.data.details
        var list = []
        var list2 = []
        console.log(detail)
        for (var i = 0; i < detail.length; i++) {
          var members = detail[i].members
          console.log(members)
          for (var j = 0; j < members.length; j++) {
            list[list.length] = members[j]
            if (members[j].money >= 0) {
              list2[list2.length] = {
                left: detail[i],
                right: members[j],
                money: members[j].money
              }
            }else{
              list2[list2.length] = {
                left: detail[i],
                right: members[j],
                money: -members[j].money
              }
            }
          }
        }
        //console.log(list2)
        self.setData({
          list: list2
        })
        //console.log(list)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
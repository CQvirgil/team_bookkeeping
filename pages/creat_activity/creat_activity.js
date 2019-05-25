// pages/creat_activity/creat_activity.js
//创建活动页面
const app = getApp()
const page_state = require('../../utils/page_state.js')
const http_request = require('../../network/http_request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text_amount: 5,
    text_amount_style: 'text-amount',
    btn_creat_activity_style: 'btn-creat-activity',
    activity_name: '我的活动1',
    activity_id: ''
  },
  //文本输入框输入时触发
  gettext: function(e) {
    var text_length = e.detail.value.length
    if (text_length == 10) {
      this.setData({
        text_amount_style: 'text-amount-red',
        text_amount: text_length,
        activity_name: e.detail.value
      })
    } else if (text_length == 0) {
      this.setData({
        text_amount_style: 'text-amount-red',
        btn_creat_activity_style: 'btn-creat-activity-opacity',
        text_amount: text_length,
        activity_name: e.detail.value
      })
    } else {
      this.setData({
        text_amount_style: 'text-amount',
        btn_creat_activity_style: 'btn-creat-activity',
        text_amount: text_length,
        activity_name: e.detail.value
      })
    }
    console.log(this.data.activity_name)
  },
  //点击创建活动按钮时触发
  gotoInvite: function(e) {
    if (this.data.text_amount > 0) {
      var self = this
      var text = this.data.activity_name

      http_request.createActivity(text)
      app.globalData.mPromise.then(
        function(data) {
          console.log(data)
          wx.navigateTo({
            url: '../invite/invite?activity_name=' + text + '&page_state=' + page_state.FROM_CREATE_ACTIVITY,
          })
        }
      )

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: '创建活动',
    })
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
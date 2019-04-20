// pages/write_a_bill/write_a_bill.js
var util = require('../../utils/util.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    input_value: '',
    yuan: 'yuan',
    average: '全员平摊',
    concreteness: '具体分摊',
    date: '',
    text_date: '今天',
    end_date: '',
    isShowInput: true,
    person_name: '',
    person_headimg: '',
    money: 0,
  },


  HoverInput: function(e) {
    var people_acount = app.globalData.activity[app.globalData.activity.length - 1].people_acount + 1
    var average = e.detail.value / people_acount;
    if (e.detail.value.length <= 0) {
      this.setData({
        yuan: 'yuan',
        average: people_acount + '人平摊¥' + average + '/人',
      })
    } else {
      this.setData({
        yuan: '',
        average: people_acount + '人平摊¥' + average + '/人',
        money: e.detail.value
      })
    }
    console.log(this.data.money)
  },
  //日期选择器事件
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  //记一笔按钮响应
  write: function(e) {
    app.globalData.activity[app.globalData.activity.length - 1].bill[app.globalData.activity[app.globalData.activity.length - 1].bill.length] = {
      money: this.data.money,
      payer: this.data.person_name,
      bill_content: '一般',
      date: this.data.date
    }

    wx.navigateBack({
      delta: 4
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      date: util.formatTime(),
      end_date: util.formatTime(),
      person_name: app.globalData.userInfo.nickName,
      person_headimg: app.globalData.userInfo.avatarUrl
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
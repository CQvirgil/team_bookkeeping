// pages/details/details.js
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowTime: false,
    isShowDetail: true,
    Finish: '进行中'
  },

  gotoPeople: function (e) {
    wx.navigateTo({
      url: '../people/people',
    })
  },
  gotoFinancial: function(e){
    wx.navigateTo({
      url: '../financial/financial',
    })
  },
  EndTally:function(e){
    console.log(util.formatTime())
    this.setData({
      Finish: util.formatTime()+ '已结束'
    })
    wx.navigateTo({
      url: '../financial/financial',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的活动',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
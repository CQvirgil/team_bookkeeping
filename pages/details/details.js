// pages/details/details.js
var util = require('../../utils/util.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowTime: false,
    isShowDetail: true,
    Finish: '进行中',
    activity_name: '',
    people_acount: '',
    my_consume: '',
    all_acount: '',
    my_pay: '',
    bill: [],
    isEndTally:true,
    isShowLine: true,
    head_img: ''
  },
  gotoWrite_a_bill: function(e){
    wx.navigateTo({
      url: '../write_a_bill/write_a_bill',
    })

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
    app.globalData.activity.end_time = util.formatTime()
    app.globalData.activity.isunderway = false
    if (app.globalData.activity.end_time != null){
      this.setData({
        Finish: app.globalData.activity.end_time + '已结束',
        isShowLine: false
      })
    }else{
      this.setData({
        Finish: app.globalData.activity.end_time + '已结束',
        isEndTally: false,
        isShowDetail: true,
        isShowLine: false
      })
    }
   
    wx.navigateTo({
      url: '../financial/financial',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: app.globalData.activity[options.index].activity_name,
    })

    if (app.globalData.activity.end_time != null){
      this.setData({
        Finish: app.globalData.activity.end_time + '已结束',
      })
    }

    this.setData({
      activity_name: app.globalData.activity[options.index].activity_name,
      people_acount: app.globalData.activity[options.index].people_acount,
      my_consume: app.globalData.activity[options.index].my_consume,
      all_acount: app.globalData.activity[options.index].pay_acount,
      my_pay: app.globalData.activity[options.index].my_pay,
      bill: app.globalData.activity[options.index].bill,
      head_img: app.globalData.userInfo.avatarUrl,
      
    })

    if (this.data.people_acount == 1){
      this.setData({
        isShowDetail: false,
        isShowLine: false,
      })
    }
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
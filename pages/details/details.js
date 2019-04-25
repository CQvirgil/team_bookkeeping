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
    isEndTally: true,
    isShowLine: true,
    head_img: '',
    index: null,
    act_id: '',
  },
  //记一笔账按钮页面
  gotoWrite_a_bill: function(e) {
    wx.navigateTo({
      url: '../write_a_bill/write_a_bill?index=' + this.data.index + '&act_id=' + this.data.act_id
    })
  },
  gotoPeople: function(e) {
    wx.navigateTo({
      url: '../people/people',
    })
  },
  gotoFinancial: function(e) {
    wx.navigateTo({
      url: '../financial/financial',
    })
  },
  EndTally: function(e) {
    console.log(util.formatTime())
    app.globalData.activity.end_time = util.formatTime()
    app.globalData.activity.isunderway = false
    if (app.globalData.activity.end_time != null) {
      this.setData({
        Finish: app.globalData.activity.end_time + '已结束',
        isShowLine: false
      })
    } else {
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
  onLoad: function(options) {

    if (options.activity_name) {
      var self = this
      wx.request({
        url: 'http://www.lecaigogo.com:4998/v1/activity/get',
        method: 'POST',
        data: {
          "act_id": app.globalData.create_act_id,
          "user_id": app.globalData.unionid
        },
        success(res){
          self.setData({
            activity_name: res.data.data.name,
            people_acount: res.data.data.members.length,
            all_acount: res.data.data.act_total,
            my_pay: res.data.data.my_total,
            bill: res.data.data.bills,
            head_img: app.globalData.userInfo.avatarUrl,
            my_consume: res.data.data.my_expend,
          })
          console.log(res.data)
        }
      })
    }

    if (options.index){
      this.setData({
        index: options.index,
        act_id: options.act_id
      })
      console.log(options.act_id)
      console.log(this.data.index)
      var self = this
      var act_id = options.act_id
      wx.request({
        url: 'http://www.lecaigogo.com:4998/v1/activity/get',
        method: 'POST',
        data: {
          "act_id": act_id,
          "user_id": app.globalData.unionid
        },
        success(res) {
          self.setData({
            activity_name: res.data.data.name,
            people_acount: res.data.data.members.length,
            all_acount: res.data.data.act_total,
            my_pay: res.data.data.my_total,
            bill: res.data.data.bills,
            head_img: app.globalData.userInfo.avatarUrl,
            my_consume: res.data.data.my_expend,
          })
          console.log(res.data)
        }
      })
      console.log(act_id)
    }

    if (app.globalData.activity.end_time != null) {
      this.setData({
        Finish: app.globalData.activity.end_time + '已结束',
      })
    }

    // this.setData({
    //   activity_name: app.globalData.activity[options.index].activity_name,
    //   people_acount: app.globalData.activity[options.index].people_acount,
    //   my_consume: app.globalData.activity[options.index].my_consume,
    //   all_acount: app.globalData.activity[options.index].pay_acount,
    //   my_pay: app.globalData.activity[options.index].my_pay,
    //   bill: app.globalData.activity[options.index].bill,
    //   head_img: app.globalData.userInfo.avatarUrl,

    // })

    if (this.data.people_acount == 1) { 
      this.setData({
        isShowDetail: false,
        isShowLine: false,
      })
    }
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
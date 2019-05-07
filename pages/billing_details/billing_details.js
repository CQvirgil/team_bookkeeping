// pages/billing_details/billing_details.js
const app = getApp()
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bill_id: '',
    bill: null,
    act_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      bill_id: options.bill_id,
      act_id: options.act_id
    })
    console.log(options.bill_id)
    console.log('act_id=  ' + options.act_id)
    var self = this
    wx.request({
      url: app.globalData.url + '/bill/get',
      method: 'POST',
      data: {
        "bill_id": this.data.bill_id,
        "user_id": app.globalData.unionid
      },
      success(res) {
        console.log(res)
        var bill = res.data.data
        bill.created_at = util.formatTime2(bill.created_at, 'Y-M-D')
        self.setData({
          bill: bill
        })
      }
    })
  },
  DeletBill: function(e) {
    wx.request({
      url: app.globalData.url + '/bill/delete',
      method: 'POST',
      data: {
        "bill_id": this.data.bill_id,
        "user_id": app.globalData.unionid
      },
      success(res) {
        wx.showToast({
          title: '删除成功',
        })
        console.log(res.data)
      }
    })
  },
  ChangeBill: function(e) {
    wx.navigateTo({
      url: '/pages/write_a_bill/write_a_bill?bill_id=' + this.data.bill_id + '&act_id=' + this.data.act_id + '&state=' + 'change_bill',
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
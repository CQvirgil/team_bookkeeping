// pages/billing_details/billing_details.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bill_id: '',
    bill: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bill_id: options.bill_id
    })
    console.log(options.bill_id)
    var self = this
    wx.request({
      url: app.globalData.url+'/bill/get',
      method: 'POST',
      data: {
        "bill_id": this.data.bill_id,
        "user_id": app.globalData.unionid
      },
      success(res){
        console.log(res)
        self.setData({
          bill: res.data.data
        })
      }
    })
  },
  DeletBill: function(e){
    wx.request({
      url: app.globalData.url+'/bill/delete',
      method: 'POST',
      data: {
        "bill_id": this.data.bill_id,
        "user_id": ''
      },
      success(res){
        console.log(res.data)
      }
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
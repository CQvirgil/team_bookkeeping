// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  bindGetUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData.userInfo)

    var self = this
    var x = 0
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log('已授权登陆')
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            withCredentials: true,
            success(res) {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res)
              app.globalData.userInfo = res.userInfo
              var encryptedData = res.encryptedData
              var iv = res.iv


              wx.request({
                url: app.globalData.url + '/auth/wxlogin',
                method: 'POST',
                data: {
                  "code": app.globalData.code,
                  "encryptedData": encryptedData,
                  "iv": iv
                },
                success(res) {
                  app.globalData.unionid = res.data.data.unionid
                  console.log(app.globalData.unionid)
                },
                fail(res) {
                  console.log("请求失败")
                }
              })

            },
            fail(res) {
              console.log('获取用户数据失败')
            }
          })
        } else {
          wx.navigateTo({
            url: '../login/login',
          })
          console.log('未授权登陆')
        }
      }
    })
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
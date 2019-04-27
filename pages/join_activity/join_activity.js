// pages/join_activity/join_activity.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    created_at: '',
    act_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var act_id = options.act_id
    var self = this
    console.log(act_id)
    this.setData({
      act_id: options.act_id
    })

    if (options.act_id) {
      // 查看是否授权
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success(res) {
                console.log(res.userInfo)
                app.globalData.userInfo = res.userInfo
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

                        wx.request({
                          url: app.globalData.url + '/activity/get',
                          method: 'POST',
                          data: {
                            "act_id": act_id,
                            "user_id": app.globalData.unionid
                          },
                          success(res) {
                            self.setData({
                              list: res.data.data.members,
                              created_at: res.data.data.created_at
                            })
                          }
                        })
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
              }
            })
          } else {
            console.log('未授权')
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
    }

  },

  JoinActivity: function(act_id) {
    wx.request({
      url: app.globalData.url + '/activity/add',
      method: 'POST',
      data: {
        "act_id": this.data.act_id,
        "user_id": app.globalData.unionid,
      },
      success(res) {
        wx.showToast({
          title: '加入成功',
          icon: 'success',
          duration: 2000
        })
        console.log('成功加入')
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
// pages/join_activity/join_activity.js
const app = getApp()
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    created_at: '',
    act_id: '',
    activity: null,
    act_name: '',
    created_at: '',
    btn_text: '加入活动',
    btn_state: null,
    btn_disable: true,
    btn_state_style: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var act_id = options.act_id
    var act_id = 'b52eeab6-df04-4ef7-8082-4f993caa7ef9'
    var self = this
    console.log(act_id)
    this.setData({
      act_id: act_id
    })

    var self = this

    if (this.data.act_id) {
      // 查看是否授权
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            console.log('已授权')
            wx.getUserInfo({
              withCredentials: true,
              success(res) {
                // 可以将 res 发送给后台解码出 unionId
                console.log(res)
                app.globalData.userInfo = res.userInfo
                var encryptedData = res.encryptedData
                var iv = res.iv

                wx.login({
                  success(res) {
                    var code = res.code
                    console.log(res)
                    wx.request({
                      url: app.globalData.url + '/auth/wxlogin',
                      method: 'POST',
                      data: {
                        "code": code,
                        "encryptedData": encryptedData,
                        "iv": iv
                      },
                      success(res) {
                        if (res.data.code == 0) {
                          console.log(res.data)
                          app.globalData.unionid = res.data.data.unionid
                          wx.request({
                            url: app.globalData.url + '/activity/get',
                            method: 'POST',
                            data: {
                              "act_id": self.data.act_id,
                              "user_id": app.globalData.unionid
                            },
                            success(res) {
                              console.log(res)
                              if (res.data.code == 0) {
                                var created = res.data.data.created_at
                                var sub_created = new Date(created)
                                var y = sub_created.getFullYear();
                                var m = sub_created.getMonth() + 1;
                                var d = sub_created.getDate();
                                self.setData({
                                  activity: res.data.data,
                                  created_at: util.formatTime2(created, 'Y-M-D')
                                })
                                if (self.data.activity.members.length >= 20) {
                                  self.setBtnState('btn_unclickable','该活动已满20人')
                                }
                                //console.log(self.data.activity)
                              }
                            }
                          })
                        }
                      }
                    })
                  }
                })
              }
            })
          } else {
            console.log('未授权')
            wx.redirectTo({
              url: '/pages/login/login',
            })
          }
        }
      })
    }
  },
  setBtnState(state, text) {
    switch (state) {
      case 'btn_unclickable':
        this.setData({
          btn_text: text,
          btn_state_style: 'btn_unclickable'
        })
        break;
      case 'btn_clickable':
        this.setData({
          btn_text: text,
          btn_state_style: ''
        })
        break;
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
        if (res.data.code === 0) {
          wx.showToast({
            title: '加入成功',
            icon: 'success',
            duration: 2000
          })
          wx.redirectTo({
            url: '/pages/index/index',
          })
        } else if (res.data.code === 20202) {
          wx.showToast({
            title: '你已经在该活动中  正在跳转…',
            icon: 'none',
            duration: 2000
          })
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }
        console.log(res)
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
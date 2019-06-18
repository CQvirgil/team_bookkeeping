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
    btn_state_style: '',
    isJoin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var act_id = options.act_id
    //var act_id = 'b52eeab6-df04-4ef7-8082-4f993caa7ef9'
    var self = this
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
                app.globalData.userInfo = res.userInfo
                var encryptedData = res.encryptedData
                var iv = res.iv

                wx.login({
                  success(res) {
                    var code = res.code
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
                          app.globalData.unionid = res.data.data.unionid
                          wx.request({
                            url: app.globalData.url + '/activity/get',
                            method: 'POST',
                            data: {
                              "act_id": self.data.act_id,
                              "user_id": app.globalData.unionid
                            },
                            success(res) {
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
                                  self.setBtnState('btn_unclickable', '该活动已满20人')
                                }
                                if (self.data.activity.state == 0) {
                                  self.setBtnState('btn_unclickable', '活动已结束')
                                }
                                for (var i = 0; i < res.data.data.members.length; i++) {
                                  if (res.data.data.members[i].user_id == app.globalData.unionid){
                                    self.setBtnState('btn_unclickable', '加入活动')
                                  }
                                }
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
          btn_state_style: 'btn_unclickable',
          isJoin: true
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
    if (!this.data.isJoin) {
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
        }
      })
    } else {
      wx.showToast({
        title: '你已经在该活动中  正在跳转…',
        icon: 'none',
        duration: 2000
      })
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
  },
 
})
//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
const page_state = require('../../utils/page_state.js')
const http_request = require('../../network/http_request.js')
const app_data = require('../../data/data.js')

Page({
  data: {
    hasActivity: true,
    list: app.globalData.activity,
    Finish: '进行中',
    headimgs: [],
    isonLoad: false
  },
  onLoad(pageOptions) {
    var self = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code
        app.globalData.code = code
        app.globalData.userData.code = code
        console.log('res.code: ' + app.globalData.code)
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              console.log('已授权登陆')
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                withCredentials: true,
                success(res) {
                  // 可以将 res 发送给后台解码出 unionId
                  //console.log(res)
                  app.globalData.userInfo = res.userInfo
                  var encryptedData = res.encryptedData
                  var iv = res.iv
                  http_request.wxLogIn(encryptedData, iv)
                  app.globalData.mPromise.then(
                    function (data) {
                      console.log('resolved');
                      console.log(data);
                      app.globalData.mPromise.then(
                        function (data){
                          console.log('resolved2');
                          console.log(data);
                          app.globalData.mPromise.then(
                            function(data){
                              console.log('resolved3');
                              console.log(data);
                              app.globalData.userData.all_activities = util.
                              bubble_sort_timestamp(app.globalData.userData.all_activities)
                              app.globalData.userData.all_activities = util.
                              bubble_sort(app.globalData.userData.all_activities)
                              self.setData({
                                list: app.globalData.userData.all_activities,
                                isonLoad: true
                              })
                              console.log(app.globalData.userData)
                            }
                          )
                        }
                      )
                    },
                    function (reason, data) {
                      console.log('rejected');
                      console.log(reason);
                    }
                  )
                  //console.log(app.globalData.mPromise)
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
      }
    })
  },

  bindGetUserInfo(e) {
    if (e.detail.userInfo) {
      console.log(e.detail.userInfo)
    }
  },

  onReady() {
    console.log(app.globalData.userData.code)
  },
  onShow() {
    //console.log('onShow')
    if (this.data.isonLoad) {
      console.log(app.globalData.userData.all_activities)
      app.globalData.userData.all_activities = util.
        bubble_sort_timestamp(app.globalData.userData.all_activities)
      app.globalData.userData.all_activities = util.
        bubble_sort(app.globalData.userData.all_activities)
      this.setData({
        list: app.globalData.userData.all_activities
      })
    }
  },
  gotoCreatActivity(event) {
    console.log('gotoCreatActivity')
    wx.navigateTo({
      url: '../creat_activity/creat_activity',
    })
  },
  joinActivity: function(e) {
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    })
  },
  gotoDetails: function(e) {
    app.globalData.activity_index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../details/details?index=' + e.currentTarget.dataset.index + '&act_id=' + e.currentTarget.dataset.actid
       + '&page_state=' + page_state.FROM_INDEX,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var self = this
    //app.globalData.userData.all_activities = []
    http_request.getActivityIdArray()
    app.globalData.mPromise.then(
      function(data){
        console.log(data)
        wx.stopPullDownRefresh()
        self.setData({
          list: app.globalData.userData.all_activities
        })
      }
    )
  },
  bindscrolltoupper: function(e) {}
})
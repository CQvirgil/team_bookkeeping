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
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              console.log('已授权登陆')
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                withCredentials: true,
                success(res) {
                  // 可以将 res 发送给后台解码出 unionId
                  app.globalData.userInfo = res.userInfo
                  app.globalData.userData.userInfo = res.userInfo
                  var encryptedData = res.encryptedData
                  var iv = res.iv
                  http_request.wxLogIn(encryptedData, iv)
                  app.globalData.mPromise.then(
                    function(data) {
                     console.log('获取登陆信息')
                      app.globalData.mPromise.then(
                        function(data) {
                          console.log('获取活动列表')
                          app.globalData.mPromise.then(
                            function(data) {
                              console.log('加载列表数据')
                              self.setData({
                                isonLoad: true
                              })
                              self.setListData()
                            }
                          )
                        }
                      )
                    },
                    function(reason, data) {
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

  onReady() {
  },
  onShow() {
    if (this.data.isonLoad) {
      console.log('更新页面')
      this.setListData()
    }
  },
  gotoCreatActivity(event) {
    wx.navigateTo({
      url: '../creat_activity/creat_activity',
    })
  },
  joinActivity: function(e) {
    wx.scanCode({
      success(res) {
      }
    })
  },
  gotoDetails: function(e) {
    app.globalData.activity_index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../details/details?index=' + e.currentTarget.dataset.index + '&act_id=' + e.currentTarget.dataset.actid +
        '&page_state=' + page_state.FROM_INDEX,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var self = this
    app.globalData.userData.all_activities.splice(0, app.globalData.userData.all_activities.length)
    http_request.getActivityIdArray()
    app.globalData.mPromise.then(
      function(data) {
        app.globalData.mPromise.then(
          function(data) {
            self.setListData()
            wx.stopPullDownRefresh()
          }
        )
      }
    )
  },
  //设置列表
  setListData: function(){
    app.globalData.userData.all_activities = util.
      bubble_sort_timestamp(app.globalData.userData.all_activities)
    app.globalData.userData.all_activities = util.
      bubble_sort(app.globalData.userData.all_activities)
    this.setData({
      list: app.globalData.userData.all_activities
    })
  },
  bindscrolltoupper: function(e) {}
})
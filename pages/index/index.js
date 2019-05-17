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
                  http_request.wxLogIn(encryptedData, iv).then(
                    function (data) {
                      console.log('resolved');
                      console.log(data);
                    },
                    function (reason, data) {
                      console.log('rejected');
                      console.log(reason);
                    }
                  )
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
    console.log('onReady')
    var self = this
    setTimeout(function() {
      self.setData({
        list: app.globalData.activity
      })
    }, 2000)
    this.setData({
      list: app.globalData.activity
    })
  },
  onShow() {
    //console.log('onShow')
    if (this.data.isonLoad) {
      this.getallActivity()
    }
    console.log(app.globalData.activity)

    if (app.globalData.activity.end_time != null) {
      this.setData({
        Finish: app.globalData.activity.end_time + '已结束'
      })
    }
    console.log(this.data.list.length)
    if (this.data.list.length > 0) {
      this.setData({
        hasActivity: false
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
    console.log(e.currentTarget.dataset.index)
    console.log(e.currentTarget.dataset.actid)
    wx.navigateTo({
      url: '../details/details?index=' + e.currentTarget.dataset.index + '&act_id=' + e.currentTarget.dataset.actid + '&page_state=' + page_state.FROM_INDEX,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
    this.getallActivity()
  },
  getallActivity: function() {

    var self = this
    var x = 0
    //请求获取活动列表，返回活动id
    wx.request({
      url: app.globalData.url + '/activity/get_all',
      method: 'POST',
      data: {
        "user_id": app.globalData.unionid
      },
      success(res) {
        self.setData({
          list: []
        })
        app.globalData.activity = []
        //遍历获取到的活动id并查询活动详情

        app.globalData.activityID = res.data.data.act_id
        console.log(app.globalData.activityID)

        if (app.globalData.activityID != null) {
          for (var i = 0; i < app.globalData.activityID.length; i++) {

            wx.request({
              url: app.globalData.url + '/activity/get',
              method: 'POST',
              data: {
                "act_id": app.globalData.activityID[i],
                "user_id": app.globalData.unionid
              },
              success(res) {

                var activity = res.data.data;
                var activity_over_at = activity.over_at

                activity.over_at = util.formatTime2(activity_over_at, 'Y-M-D')
                app.globalData.activity[app.globalData.activity.length] = activity



                var heads = [app.globalData.userInfo.avatarUrl]
                for (var n = 0; n < res.data.data.members.length; n++) {
                  heads[n] = res.data.data.members[n].headimgurl
                  //console.log()
                }
                //console.log(x)
                if (x === app.globalData.activityID.length - 1) {
                  //按时间戳排序
                  app.globalData.activity = util.bubble_sort_timestamp(app.globalData.activity)
                  //按状态排序
                  app.globalData.activity = util.bubble_sort(app.globalData.activity)
                }
                self.setData({
                  list: app.globalData.activity,
                  headimgs: heads
                })
                x++
                //console.log(res.data.data)
                //console.log(app.globalData.activity[0].members[0].headimgurl)
                //console.log(app.globalData.userInfo.avatarUrl)
              }
            })
          }
        }

      },
      fail(res) {
        console.log('网络请求失败：' + app.globalData.url + '/activity/get_all')
      }
    })
    console.log('getallActivity')
  },
  bindscrolltoupper: function(e) {}
})
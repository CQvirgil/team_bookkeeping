//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hasActivity: true,
    list: [],
    Finish: '进行中',
    headimgs: []
  },
  onLoad(pageOptions) {
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
                url: app.globalData.url +'/auth/wxlogin',
                method: 'POST',
                data: {
                  "code": app.globalData.code,
                  "encryptedData": encryptedData,
                  "iv": iv
                },
                success(res) {
                  console.log(res)
                  app.globalData.unionid = res.data.data.unionid
                  //请求获取活动列表，返回活动id
                  wx.request({
                    url: app.globalData.url + '/activity/get_all',
                    method: 'POST',
                    data: {
                      "user_id": app.globalData.unionid
                    },
                    success(res) {
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
                              app.globalData.activity[app.globalData.activity.length] = res.data.data
                              var heads = [app.globalData.userInfo.avatarUrl]
                              for (var n = 0; n < res.data.data.members.length; n++) {
                                heads[n] = res.data.data.members[n].headimgurl
                                console.log()
                              }
                              self.setData({
                                list: app.globalData.activity,
                                headimgs: heads
                              })
                              x++
                              console.log(res)
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

  bindGetUserInfo(e) {
    if (e.detail.userInfo) {
      console.log(e.detail.userInfo)
    }
  },

  onReady() {

  },
  onShow() {

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
      url: '../details/details?index=' + e.currentTarget.dataset.index + '&act_id=' + e.currentTarget.dataset.actid,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      list: []
    })
    app.globalData.activity = []
    wx.stopPullDownRefresh()
    var self = this
    var x
    //请求获取活动列表，返回活动id
    wx.request({
      url: app.globalData.url +'/activity/get_all',
      method: 'POST',
      data: {
        "user_id": app.globalData.unionid
      },
      success(res) {
        //遍历获取到的活动id并查询活动详情
        app.globalData.activityID = res.data.data.act_id
        console.log(app.globalData.activityID)

        if (app.globalData.activityID != null) {
          for (var i = 0; i < app.globalData.activityID.length; i++) {

            wx.request({
              url: app.globalData.url +'/activity/get',
              method: 'POST',
              data: {
                "act_id": app.globalData.activityID[i],
                "user_id": app.globalData.unionid
              },
              success(res) {
                app.globalData.activity[app.globalData.activity.length] = res.data.data
                var heads = [app.globalData.userInfo.avatarUrl]
                for (var n = 0; n < res.data.data.members.length; n++) {
                  heads[n] = res.data.data.members[n].headimgurl
                  //console.log()
                }
                self.setData({
                  list: app.globalData.activity,
                  headimgs: heads
                })
                x++
                //console.log(res)
                //console.log(app.globalData.activity[0].members[0].headimgurl)
                //console.log(app.globalData.userInfo.avatarUrl)
              }
            })
          }
        }

      },
      fail(res) {
        console.log('网络请求失败：' + app.globalData.url +'/activity/get_all')
      }
    })
    console.log('onPullDownRefresh')
  },
  bindscrolltoupper: function(e) {
    // var self = this
    // var x
    // //请求获取活动列表，返回活动id
    // wx.request({
    //   url: 'http://www.lecaigogo.com:4998/v1/activity/get_all',
    //   method: 'POST',
    //   data: {
    //     "user_id": app.globalData.unionid
    //   },
    //   success(res) {
    //     //遍历获取到的活动id并查询活动详情
    //     //app.globalData.activityID = res.data.data.act_id
    //     console.log(app.globalData.activityID)

    //     if (app.globalData.activityID != null) {
    //       for (var i = 0; i < app.globalData.activityID.length; i++) {

    //         wx.request({
    //           url: 'http://www.lecaigogo.com:4998/v1/activity/get',
    //           method: 'POST',
    //           data: {
    //             "act_id": app.globalData.activityID[i],
    //             "user_id": app.globalData.unionid
    //           },
    //           success(res) {
    //             app.globalData.activity[app.globalData.activity.length] = res.data.data
    //             var heads = [app.globalData.userInfo.avatarUrl]
    //             for (var n = 0; n < res.data.data.members.length; n++) {
    //               heads[n] = res.data.data.members[n].headimgurl
    //               console.log()
    //             }
    //             self.setData({
    //               list: app.globalData.activity,
    //               headimgs: heads
    //             })
    //             x++
    //             console.log(res)
    //             //console.log(app.globalData.activity[0].members[0].headimgurl)
    //             //console.log(app.globalData.userInfo.avatarUrl)
    //           }
    //         })
    //       }
    //     }

    //   },
    //   fail(res) {
    //     console.log('网络请求失败：' + 'http://www.lecaigogo.com:4998/v1/activity/get_all')
    //   }
    // })
    // console.log('bindscrolltoupper')
  }
})
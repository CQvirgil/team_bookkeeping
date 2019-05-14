// pages/details/details.js
//活动详情页面
var util = require('../../utils/util.js')
var app = getApp()
var page_state = require('../../utils/page_state.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowTime: false,
    isQRDialogShow: false,
    isShowDetail: true,
    isShowDiaLog: false,
    Finish: '进行中',
    activity_name: '',
    people_acount: '',
    my_consume: '',
    all_acount: '',
    my_pay: '',
    bill: [],
    isEndTally: true,
    isShowLine: true,
    head_img: '',
    index: null,
    act_id: '',
    activity: null,
    isShwoWrite_a_bill: true,
    page_state: '',
    isLoad: false,
    dialog_animation: null,
    isShowChangActivityName: false,
    chang_activity_name_animation: null
  },
  bindActivityName: function(e) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#7f7f7f',
    })
    var c = this.data.isShowChangActivityName
    this.setData({
      isShowChangActivityName: true
    })
  },
  ListItemTap: function(e) {
    wx.navigateTo({
      url: '/pages/billing_details/billing_details?bill_id=' + e.currentTarget.dataset.bill_id + '&act_id=' + this.data.act_id,
    })
  },
  onFinishInput: function(e) {//点击输入弹窗的确定按钮时出发
    var self = this

    setTimeout(function () {
      var c = self.data.isShowChangActivityName
      self.setData({
        isShowChangActivityName: false
      })
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff',
      })
    }, 400)
  },
  //记一笔账按钮页面
  gotoWrite_a_bill: function(e) {
    if (this.data.activity.state) {
      wx.navigateTo({
        url: '../write_a_bill/write_a_bill?index=' + this.data.index + '&state=' + 'default' + '&act_id=' + this.data.activity.act_id
      })
    }
  },
  gotoPeople: function(e) {
    switch (this.data.page_state) {
      case page_state.FROM_CREATE_ACTIVITY:
        wx.navigateTo({
          url: '../people/people?act_id=' + app.globalData.create_act_id,
        })
        break;
      case page_state.FROM_INDEX:
        wx.navigateTo({
          url: '../people/people?act_id=' + this.data.act_id,
        })
        break;
    }

  },
  gotoFinancial: function(e) {
    wx.navigateTo({
      url: '../financial/financial?act_id=' + this.data.act_id,
    })
  },
  EndTally: function(e) {
    var self = this
    console.log(util.formatTime())
    app.globalData.activity.end_time = util.formatTime()
    app.globalData.activity.isunderway = false
    console.log(this.data.activity.state)
    var self = this
    if (this.data.activity.state) {
      wx.request({
        url: app.globalData.url + '/activity/state',
        method: 'POST',
        data: {
          "act_id": this.data.activity.act_id,
          "user_id": app.globalData.unionid
        },
        success(res) {
          console.log('结束成功')
          if (self.data.activity.members.length != 1) {
            wx.navigateTo({
              url: '../financial/financial',
            })
          }
        }
      })
    }
    if (this.data.activity.members.length > 1) {
      self.setData({
        Finish: util.formatTime() + '已结束',
        isEndTally: false,
        isShowDetail: true,
        isShowLine: false
      })
    } else {
      self.setData({
        Finish: util.formatTime() + '已结束',
        isEndTally: false,
        isShowDetail: false,
        isShowLine: false
      })
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '活动详情',
    })
    console.log(options.page_state)
    this.setData({
      page_state: options.page_state,
      isLoad: true
    })
    if (options.activity_name) { //从创建页面进入
      var self = this
      wx.request({
        url: app.globalData.url + '/activity/get',
        method: 'POST',
        data: {
          "act_id": app.globalData.create_act_id,
          "user_id": app.globalData.unionid
        },
        success(res) {
          self.setData({
            activity: res.data.data,
            activity_name: res.data.data.name,
            people_acount: res.data.data.members.length,
            all_acount: res.data.data.act_total,
            my_pay: res.data.data.my_expend,
            bill: res.data.data.bills,
            head_img: app.globalData.userInfo.avatarUrl,
            my_consume: res.data.data.my_total,
            activity: res.data.data
          })

          self.CheckIsEnd()
          self.setState()
          self.onReady()
          console.log(res.data)
        }
      })
    }

    if (options.index) { //从首页进入
      this.setData({
        index: options.index,
        act_id: options.act_id
      })
      console.log(options.act_id)
      console.log(this.data.index)
      var self = this
      var act_id = options.act_id
      wx.request({
        url: app.globalData.url + '/activity/get',
        method: 'POST',
        data: {
          "act_id": self.data.act_id,
          "user_id": app.globalData.unionid
        },
        success(res) {
          var activity = res.data.data
          var activity_over_at = util.formatTime2(activity.over_at, 'Y-M-D')
          activity.over_at = activity_over_at

          self.setData({
            activity_name: res.data.data.name,
            people_acount: res.data.data.members.length,
            all_acount: res.data.data.act_total,
            my_pay: res.data.data.my_expend,
            bill: res.data.data.bills,
            head_img: app.globalData.userInfo.avatarUrl,
            my_consume: res.data.data.my_total,
            activity: activity
          })
          console.log(self.data.activity)
          self.setState()
          self.CheckIsEnd()
          console.log(res.data)
        }
      })
    }

    if (this.data.people_acount == 1) {
      this.setData({
        isShowDetail: false,
        isShowLine: false,
      })
    }
  },
  QrCloseHandler: function(e) {
    this.setData({
      isQRDialogShow: false
    })
  },
  ShowQrHadler: function(e) {
    this.setData({
      isQRDialogShow: true
    })
  },
  closeDialog: function(e) {
    // this.setData({
    //   isShowDiaLog: false
    // })
  },
  SwitchDiaLog: function(e) {
    var self = this
    var animation = wx.createAnimation({
      duration: 1000,
      delay: 0,
      timingFunction: "ease"
    })

    animation.translate(0, 210).step()
    this.setData({
      isShowDiaLog: true,
      dialog_animation: animation.export()
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#7f7f7f',
    })
    setTimeout(function() {
      var animation2 = wx.createAnimation({
        duration: 400,
        delay: 0,
        timingFunction: "ease"
      })
      animation2.translate(0, 0).step()
      self.setData({
        dialog_animation: animation2.export()
      })
    }, 100)
  },
  DialogCancel: function(e) {
    var self = this
    var animation2 = wx.createAnimation({
      duration: 400,
      delay: 0,
      timingFunction: "ease"
    })
    animation2.translate(0, 210).step()
    self.setData({
      dialog_animation: animation2.export()
    })
    setTimeout(function() {
      self.setData({
        isShowDiaLog: false
      })
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff',
      })
    }, 400)
  },
  ExitAcitivity: function(e) {
    var self = this
    wx.showModal({
      title: '',
      content: '确定退出？',
      confirmText: '退出',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.url + '/activity/exit',
            method: 'POST',
            data: {
              "act_id": self.data.act_id,
              "user_id": app.globalData.unionid
            },
            success(res) {
              wx.showToast({
                title: '退出成功',
                icon: 'success',
                duration: 2000
              })
              self.setData({
                isShowDiaLog: false
              })
              setTimeout(function() {
                wx.navigateBack({
                  delta: 2
                })
              }, 2000)

            }
          })
        }
      }
    })
    console.log('ExitAcitivity')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  setState: function() {
    //判断已结束且成员大于一
    if (!this.data.activity.state && this.data.activity.members.length > 1) {
      this.setData({
        Finish: this.data.activity.over_at + '已结束',
        isEndTally: false,
        isShowDetail: true,
        isShowLine: false
      })
    }

    if (this.data.activity.members.length <= 1 && !this.data.activity.state) {
      this.setData({
        isEndTally: false,
        isShowDetail: false,
        isShowLine: false
      })
    } else if (this.data.activity.members.length <= 1 && this.data.activity.state) {
      this.setData({
        isEndTally: true,
        isShowDetail: false,
        isShowLine: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var state_from_index = page_state.FROM_INDEX
    var state_from_create_activity = page_state.FROM_CREATE_ACTIVITY
    var state = this.data.page_state
    var self = this
    if (this.data.isLoad) {
      switch (state) {
        case state_from_index:
          wx.request({
            url: app.globalData.url + '/activity/get',
            method: 'POST',
            data: {
              "act_id": self.data.act_id,
              "user_id": app.globalData.unionid
            },
            success(res) {
              var activity = res.data.data
              var activity_over_at = util.formatTime2(activity.over_at, 'Y-M-D')
              activity.over_at = activity_over_at

              self.setData({
                activity_name: res.data.data.name,
                people_acount: res.data.data.members.length,
                all_acount: res.data.data.act_total,
                my_pay: res.data.data.my_expend,
                bill: res.data.data.bills,
                head_img: app.globalData.userInfo.avatarUrl,
                my_consume: res.data.data.my_total,
                activity: activity
              })
              console.log(self.data.activity)
              self.setState()
              self.CheckIsEnd()
              console.log(res.data)
            }
          })
          break;
        case state_from_create_activity:
          wx.request({
            url: app.globalData.url + '/activity/get',
            method: 'POST',
            data: {
              "act_id": app.globalData.create_act_id,
              "user_id": app.globalData.unionid
            },
            success(res) {
              self.setData({
                activity: res.data.data,
                activity_name: res.data.data.name,
                people_acount: res.data.data.members.length,
                all_acount: res.data.data.act_total,
                my_pay: res.data.data.my_expend,
                bill: res.data.data.bills,
                head_img: app.globalData.userInfo.avatarUrl,
                my_consume: res.data.data.my_total,
                activity: res.data.data
              })

              self.CheckIsEnd()
              self.setState()
              self.onReady()
              console.log(res.data)
            }
          })
          break;
      }
    }
  },

  CheckIsEnd: function() {
    if (!this.data.activity.state) {
      this.setData({
        Finish: this.data.activity.over_at + '已结束',
      })
    }
    //console.log(this.data.activity.state)
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
    return {
      title: '加入' + this.data.activity_name + '活动',
      path: '/pages/join_activity/join_activity?act_id=' + this.data.activity.act_id,
      success: function(res) {
        console.log('分享成功')
      },

    }
  }
})
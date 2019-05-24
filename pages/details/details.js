// pages/details/details.js
//活动详情页面
var util = require('../../utils/util.js')
var app = getApp()
var page_state = require('../../utils/page_state.js')
var http_request = require('../../network/http_request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isQRDialogShow: false, //控制二维码组件的显示
    isShowDetail: true, //控制多人记账时显示的内容
    isShowDiaLog: false, //控制隐藏菜单的显示
    Finish: '进行中',
    isEndTally: true,
    isShowLine: true,
    index: null, //活动列表索引
    activity: null,
    isShwoWrite_a_bill: true,
    page_state: '',
    isLoad: false,
    dialog_animation: null,
    isShowChangActivityName: false,
    chang_activity_name_animation: null,
    act_id: null
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
  //点击账单列表响应
  ListItemTap: function(e) {
    app.globalData.bill_index = e.currentTarget.dataset.index
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/billing_details/billing_details?bill_id=' + e.currentTarget.dataset.bill_id +
        '&act_id=' + this.data.activity.act_id,
    })
  },
  onFinishInput: function(e) { //点击输入弹窗的确定按钮时出发
    var self = this

    setTimeout(function() {
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
        url: '../write_a_bill/write_a_bill?index=' + this.data.index +
          '&state=' + 'default' + '&act_id=' + this.data.activity.act_id
      })
    }
  },
  gotoPeople: function(e) {

    wx.navigateTo({
      url: '../people/people?act_id=' + this.data.activity.act_id,
    })

  },
  gotoFinancial: function(e) {
    wx.navigateTo({
      url: '../financial/financial?act_id=' + this.data.activity.act_id,
    })
  },
  EndTally: function(e) {
    var self = this
    console.log(util.formatTime())
    app.globalData.activity.end_time = util.formatTime()
    app.globalData.activity.isunderway = false
    console.log(this.data.activity.state)
    var self = this
    var length = this.data.activity.members.length
    if (this.data.activity.state) {
      http_request.endTally(this.data.activity.act_id)
      app.globalData.mPromise.then(
        function(d) {
          if (length > 1) {
            wx.navigateTo({
              url: '../financial/financial',
            })
          } else {
            wx.showToast({
              title: '已结束',
            })
            setTimeout(function() {
              wx.navigateBack({

              })
            }, 200)
          }
          console.log()
          app.globalData.userData.all_activities[self.data.index].state = 0
        }
      )

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
    console.log(app.globalData.activity_index)
    this.setData({
      page_state: options.page_state,
      index: options.index,
      isLoad: true,
    })

    this.setData({
      act_id: options.act_id,
    })
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
          http_request.exitActivity(self.data.activity.act_id)
          app.globalData.mPromise.then(
            function(data) {
              wx.showToast({
                title: '退出成功',
                icon: 'success',
                duration: 2000
              })
              app.globalData.userData.all_activities.splice(self.data.index, 1)
              self.setData({
                isShowDiaLog: false
              })
              setTimeout(function() {
                wx.navigateBack({
                  delta: 2
                })
              }, 2000)
            }
          )
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    var activity = app.globalData.userData.findActivityById(this.data.act_id)
    console.log(activity)
    this.setData({
      activity: activity
    })

    if (this.data.activity.members.length == 1) {
      this.setData({
        isShowDetail: false,
        isShowLine: false,
      })
    }
    if (!this.data.activity.state) {
      this.setData({
        Finish: this.data.activity.over_at + '已结束',
        isShowDetail: false,
        isShowLine: false,
      })
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
      title: '加入' + this.data.activity.name + '活动',
      path: '/pages/join_activity/join_activity?act_id=' + this.data.activity.act_id,
      success: function(res) {
        console.log('分享成功')
      },

    }
  }
})
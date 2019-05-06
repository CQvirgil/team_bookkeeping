// pages/details/details.js
//活动详情页面
var util = require('../../utils/util.js')
var app = getApp()

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
    activity: null
  },
  ListItemTap: function(e) {
    wx.navigateTo({
      url: '/pages/billing_details/billing_details?bill_id=' + e.currentTarget.dataset.bill_id,
    })
  },
  //记一笔账按钮页面
  gotoWrite_a_bill: function(e) {
    if (this.data.activity.state) {
      wx.navigateTo({
        url: '../write_a_bill/write_a_bill?index=' + this.data.index + '&act_id=' + this.data.activity.act_id
      })
    }
  },
  gotoPeople: function(e) {
    wx.navigateTo({
      url: '../people/people?act_id=' + this.data.act_id,
    })
  },
  gotoFinancial: function(e) {
    wx.navigateTo({
      url: '../financial/financial?actid=' + this.data.act_id,
    })
  },
  EndTally: function(e) {
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
    wx.navigateTo({
      url: '../financial/financial',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    if (options.activity_name) {
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
          self.onReady()
          console.log(res.data)
        }
      })
    }

    if (options.index) {
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
          "act_id": act_id,
          "user_id": app.globalData.unionid
        },
        success(res) {
          var activity = res.data.data
          var activity_over_at = util.formatTime2(activity.over_at,'Y-M-D')
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

    // this.setData({
    //   activity_name: app.globalData.activity[options.index].activity_name,
    //   people_acount: app.globalData.activity[options.index].people_acount,
    //   my_consume: app.globalData.activity[options.index].my_consume,
    //   all_acount: app.globalData.activity[options.index].pay_acount,
    //   my_pay: app.globalData.activity[options.index].my_pay,
    //   bill: app.globalData.activity[options.index].bill,
    //   head_img: app.globalData.userInfo.avatarUrl,

    // })

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
    this.setData({
      isShowDiaLog: true
    })
  },
  DialogCancel: function(e) {
    this.setData({
      isShowDiaLog: false
    })
  },
  ExitAcitivity: function(e) {
    console.log('ExitAcitivity')
    var self = this
    wx.request({
      url: app.globalData.url + '/activity/exit',
      method: 'POST',
      data: {
        "act_id": this.data.act_id,
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
    } else if (this.data.activity.members.length <= 1 && this.data.activity.state){
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
// pages/people/people.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_item_style: '',
    list: [],
    username_style: '',
    isAccept: false,
    wxfriend: '邀请微信好友',
    is_show_qr_invite: false,
    creater: {},
    act_name: '',
    act_id: ''
  },

  closeDialog: function(e) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    })
    this.setData({
      is_show_qr_invite: false
    })
  },
  show_qr_invite: function(e) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#7f7f7f',
    })
    this.setData({
      is_show_qr_invite: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this
    wx.setNavigationBarTitle({
      title: '活动成员',
    })
    console.log(options.act_id)
    this.setData({
      act_id: options.act_id
    })
    wx.request({
      url: app.globalData.url +'/activity/get',
      method: 'POST',
      data: {
        "act_id": options.act_id,
        "user_id": app.globalData.unionid
      },
      success(res) {
        var members = res.data.data.members
        var people = []
        for (var i = 1; i < members.length; i++) {
          people[i - 1] = members[i]
        }
        self.setData({
          list: people,
          creater: members[0],
          act_name: res.data.data.name
        })
        //console.log(res)
      }
    })

    //判断是否接受邀请，true为未接受，false为接受，未接受时修改列表item的透明度为0.7
    if (this.data.isAccept) {
      this.setData({
        list_item_style: 'lucid',
        username_style: 'lucid'
      })
    } else {
      this.setData({
        list_style: '',
      })
    }
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
    return {
      title: '加入'+ this.data.act_name +'活动',
      path: '/pages/join_activity/join_activity',
      success: function (res) {
        console.log('分享成功')
      },

    }
  }
})
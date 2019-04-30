// pages/invite/invite.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], //用户列表
    isWXFriendShow: false, //是否显示小的微信好友邀请按钮
    isShowWXFriendBig: false, //是否显示大的微信好友邀请按钮
    list_style: 'list3', //列表样式，传入css类名
    isAccept: false, //是否接受邀请
    list_item_style: '', //列表item样式
    QRcode_container_style: '', //二维码邀请按钮样式
    username_style: '', //列表item中username样式
    img_bg_style: '', //小的邀请微信好友样式 
    start_tally_style: 'bg-color-fdedbe', //开始记账按钮样式
    wxfriend: '邀请微信好友',
    wxfriend_style: '', //邀请微信好友样式
    activity_name: '',
    is_show_qr_invite: false,
    headimg_url: '',
    user_name: '',
    act_id: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '邀请成员',
    })
    console.log(options.acivity_id)
    this.setData({
      list: '',
      headimg_url: app.globalData.userInfo.avatarUrl,
      user_name: app.globalData.userInfo.nickName,
      act_id: app.globalData.create_act_id
    })
    this.setData({
      activity_name: options.activity_name
    })
    console.log("activity_name = " + options.activity_name);

    //当列表满员时修改小的邀请微信好友按钮样式
    if (this.data.list.length >= 20) {
      this.setData({
        username_style: 'lucid', //列表item中username样式
        img_bg_style: 'bg-color-bbbbbb', //小的邀请微信好友样式 
        start_tally_style: 'bg-color-f7c429', //开始记账按钮样式
        wxfriend: '活动已满20人',
        wxfriend_style: 'color-bbbbbb'
      })
    } else {
      this.setData({
        username_style: '', //列表item中username样式
        img_bg_style: '', //小的邀请微信好友样式 
        start_tally_style: 'bg-color-fdedbe', //开始记账按钮样式
        wxfriend: '邀请微信好友'
      })
    }

    //判断列表是否为空，非空显示小的微信邀请按钮，空时显示大的微信邀请按钮
    if (this.data.list.length > 0) {
      this.setData({
        isWXFriendShow: true,
        isShowWXFriendBig: false
      })
    } else
    if (this.data.list.length <= 0) {
      this.setData({
        isWXFriendShow: false,
        isShowWXFriendBig: true
      })
    }
    //列表为空时调整列表上边距
    if (!this.data.isWXFriendShow) {
      this.setData({
        list_style: 'list2'
      })
    } else {
      this.setData({
        list_style: '',
      })
    }
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

  outActivity: function(event) {
    wx.showModal({
      title: '',
      content: '确定退出活动吗？',
      confirmColor: '#eb4c4c',
      confirmText: '退出',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  deletePerson: function(e) {
    wx.showModal({
      title: '',
      content: '确定把该成员移出活动吗？',
      confirmColor: '#eb4c4c',
      confirmText: '移出',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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
  ShareToWX: function(e) {

  },
  gotoDetails: function(e) {
    var activity_name = this.data.activity_name
    wx.navigateTo({
      url: '../details/details?activity_name=' + activity_name,
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
   return{
     title: '加入huodon',
     path: '/pages/join_activity/join_activity?act_id=' + app.globalData.create_act_id,
     success(res){
       console.log('分享成功')
     }
   }

  }
})
// pages/invite/invite.js
//邀请好友
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    is_show_qr_invite: false, //控制二维码显示
    headimg_url: '', //用户头像
    user_name: '', //用户名
    page_state: '', //页面状态
    activity: null //活动
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '邀请成员',
    })
    var act = app.globalData.userData.findActivityById(app.globalData.create_act_id)
    if (act) {
      this.setData({
        activity: act
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
    wx.redirectTo({
      url: '../details/details?act_id=' + this.data.activity.act_id + '&page_state=' + this.data.page_state,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    if (this.data.activity.members) {
      this.setState()
    } else {

    }
  },
  setState: function() {
    //当列表满员时修改小的邀请微信好友按钮样式
    if (this.data.activity.members.length >= 20) {
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

    //判断列表是否为1，非空显示小的微信邀请按钮，空时显示大的微信邀请按钮
    if (this.data.activity.members.length > 1) {
      this.setData({
        isWXFriendShow: true,
        isShowWXFriendBig: false
      })
    } else
    if (this.data.activity.members.length <= 1) {
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
})
// pages/write_a_bill/write_a_bill.js
var util = require('../../utils/util.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: '平均分摊',
    isSpecificState: false,
    input_value: '',
    yuan: 'yuan',
    average: '全员平摊',
    concreteness: '具体分摊',
    date: '',
    text_date: '今天',
    end_date: '',
    isShowInput: true,
    isShowDialog1: false,
    person_name: '',
    person_headimg: '',
    money: 0,
    bill_content: '一般',
    radio_button_style: 'radio-button',
    dialog_input_length: 0,
    dialog_input_text: '',
    dialgo_animation: null,
    isShowPeopleDialog: false,
    money_acount: 0,

    radio_button_data: [{
        id: 1,
        value: '一般',
        checked: false,
        radio_button_style: 'radio-button-check'
      },
      {
        id: 2,
        value: '餐饮',
        checked: false,
        radio_button_style: 'radio-button'
      },
      {
        id: 3,
        value: '住宿',
        checked: false,
        radio_button_style: 'radio-button'
      },
      {
        id: 4,
        value: '交通',
        checked: false,
        radio_button_style: 'radio-button'
      },
      {
        id: 5,
        value: '门票',
        checked: false,
        radio_button_style: 'radio-button'
      },
      {
        id: 6,
        value: '购物',
        checked: false,
        radio_button_style: 'radio-button'
      }
    ]
  },

  BindPeopleListInput: function(e) {
    var money = this.data.money_acount
    var value = e.detail.value
    value *= 1
    money += value
    this.setData({
      money_acount: money
    })
    console.log(e.detail.value)
  },
  HoverInput: function(e) {
    var people_acount = app.globalData.activity[app.globalData.activity.length - 1].people_acount + 1
    var average = e.detail.value / people_acount;
    if (e.detail.value.length <= 0) {
      this.setData({
        yuan: 'yuan',
        average: people_acount + '人平摊¥' + average + '/人',
      })
    } else {
      this.setData({
        yuan: '',
        average: people_acount + '人平摊¥' + average + '/人',
        money: e.detail.value
      })
    }
    console.log(this.data.money)
  },
  //日期选择器事件
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  //记一笔按钮响应
  write: function(e) {
    app.globalData.activity[app.globalData.activity.length - 1].bill[app.globalData.activity[app.globalData.activity.length - 1].bill.length] = {
      money: this.data.money,
      payer: this.data.person_name,
      bill_content: '一般',
      date: this.data.date
    }

    wx.navigateBack({
      delta: 4
    })
  },
  //单选按钮点击事件
  radio_check: function(e) {
    console.log(e.currentTarget.dataset.id)
    var data = this.data.radio_button_data
    var text = ''
    //遍历按钮数据
    for (var i = 0; i < this.data.radio_button_data.length; i++) {
      //判断传回的id是否等于当前遍历的id
      if (e.currentTarget.dataset.id == this.data.radio_button_data[i].id) {
        //设置当前遍历的数据为已点击状态
        data[i].checked = true
        text = data[i].value
      } else {
        data[i].checked = false
      }
      //判断是否为点击状态
      if (data[i].checked) {
        data[i].radio_button_style = 'radio-button-check'
      } else {
        data[i].radio_button_style = 'radio-button'
      }
      this.setData({
        radio_button_data: data,
        bill_content: text
      })
    }
  },

  dialog_input: function(e) {
    var text = e.detail.value
    this.setData({
      dialog_input_length: text.length,
      dialog_input_text: text
    })
  },

  clicktBillContent: function(e) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#7f7f7f',
    })
    var animation = wx.createAnimation({
      delay: 10000,
      duration: 40000,
      timingFunction: 'ease',
    })
    animation.translateY(0).step()
    this.setData({
      isShowInput: false,
      isShowDialog1: true,
      dialgo_animation: animation.export(),
    })
  },

  clickDialogQueding: function(e) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    })
    if (this.data.dialog_input_text.length != 0) {
      var text = this.data.dialog_input_text
      this.setData({
        bill_content: text
      })
    }
    console.log(this.data.dialog_input_text.length)
    this.setData({
      isShowInput: true,
      isShowDialog1: false
    })
  },

  clickPeopleItem: function(e) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    })
    this.setData({
      isShowInput: true,
      isShowPeopleDialog: false
    })
  },
  clickPayer: function(e) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#7f7f7f',
    })
    this.setData({
      isShowInput: false,
      isShowPeopleDialog: true
    })
  },
  changeState: function(e) {
    if (!this.data.isSpecificState) {
      this.setData({
        state: '具体分摊',
        isSpecificState: true
      })
    } else {
      this.setData({
        state: '平均分摊',
        isSpecificState: false
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.setData({
    //   date: util.formatTime(),
    //   end_date: util.formatTime(),
    //   person_name: app.globalData.userInfo.nickName,
    //   person_headimg: app.globalData.userInfo.avatarUrl
    // })
    this.setData({
      date: util.formatTime()
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

  }
})
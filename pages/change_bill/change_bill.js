// pages/write_a_bill/write_a_bill.js
var util = require('../../utils/util.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChecked: true,
    state: '平均分摊',
    isSpecificState: false, //是否为平均分摊
    input_value: '',
    yuan: 'yuan',
    average: '全员平摊',
    concreteness: '具体分摊',
    date: '',
    text_date: '今天',
    end_date: '',
    isShowInput: true, //控制input组件
    isShowDialog1: false, //控制隐藏菜单
    money: 0, //平均状态下的总数
    average_money: 0, //平均状态下的平均值
    bill_content: '一般',
    radio_button_style: 'radio-button',
    dialog_input_length: 0,
    dialog_input_text: '',
    isSelectAll: true,
    dialgo_animation: null, //弹窗动画
    isShowPeopleDialog: false, //控制成员列表的弹窗
    money_acount: 0,
    members: [], //成员列表
    payer: null, //付款人信息
    people_list_postion: 0, //参与成员的下标
    people_list_item: [], //成员金额和信息
    isShowdialogCheckbox: false, //控制参与成员弹窗
    isShowerr_hint: false,
    radio_button_data: [{ //账单内容弹窗数据
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

  // BindPeopleListInput: function(e) {
  //   var money = this.data.money_acount
  //   var value = e.detail.value
  //   value *= 1
  //   money += value
  //   this.setData({
  //     money_acount: money
  //   })
  //   console.log(e.detail.value)
  // },
  StartInput: function (e) {
    this.setData({
      input_value: ''
    })
  },
  InputOver: function (e) {
    if (e.detail.value != '') {
      var input = e.detail.value
      input = '¥' + input
      this.setData({
        input_value: input
      })
    }

    if (!this.data.isSpecificState) {
      var item = []
      var average = e.detail.value / this.data.members.length
      for (var i = 0; i < this.data.members.length; i++) {
        item[i] = {
          "Money": average,
          "user_id": this.data.members[i].user_id
        }
      }
      this.setData({
        people_list_item: item,
        average_money: average
      })
      console.log(this.data.people_list_item)
    }
  },
  HoverInput: function (e) {
    var input_value = parseFloat(e.detail.value)
    if (input_value > 999.99) {
      this.setData({
        isShowerr_hint: true,
        input_value: '999.99'
      })
    } else {
      this.setData({
        isShowerr_hint: false,
      })
    }
    //console.log(this.data.money)
  },
  //日期选择器事件
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
    if (e.detail.value === util.formatTime) {
      this.setData({
        text_date: '今天'
      })
    } else {
      this.setData({
        text_date: ''
      })
    }
  },
  //记一笔按钮响应
  write: function (e) {

  },
  //单选按钮点击事件
  radio_check: function (e) {
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

  dialog_input: function (e) {
    var text = e.detail.value
    this.setData({
      dialog_input_length: text.length,
      dialog_input_text: text
    })
  },

  clicktBillContent: function (e) {
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

  clickDialogQueding: function (e) {
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

  clickPeopleItem: function (e) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    })
    var index = e.currentTarget.dataset.index
    console.log(index)
    this.setData({
      isShowInput: true,
      isShowPeopleDialog: false,
      payer: this.data.members[index]
    })
  },
  clickPayer: function (e) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#7f7f7f',
    })
    this.setData({
      isShowInput: false,
      isShowPeopleDialog: true
    })
  },
  //切换具体分摊和平均分摊状态
  changeState: function (e) {
    if (!this.data.isSpecificState) {
      var item = []
      for (var i = 0; i < this.data.members.length; i++) {
        item[i] = {
          "Money": 0,
          "user_id": this.data.members[i].user_id
        }
        this.setData({
          people_list_item: item
        })
      }
      console.log(this.data.people_list_item)
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
  //点击参与成员列表
  BindPeopleListTap: function (e) {
    this.setData({
      people_list_postion: e.currentTarget.dataset.index
    })
    console.log("BindPeopleListTap: " + e.currentTarget.dataset.index)
  },
  //具体分摊成员列表的input组件失去焦点时触发事件
  Bindblur: function (e) {
    var input = parseFloat(e.detail.value)

    var item = this.data.people_list_item
    item[this.data.people_list_postion].Money = input
    this.setData({
      people_list_item: item
    })
    console.log(item[this.data.people_list_postion])


    var money = 0
    for (var i = 0; i < this.data.people_list_item.length; i++) {
      money += this.data.people_list_item[i].Money
    }
    console.log(money)
    if (e.detail.value == '') {
      money = 0
    }

    this.setData({
      money_acount: money
    })

  },
  CloseCheckBoxDialog: function (e) {
    if (this.data.people_list_item.length > 0) {
      this.setData({
        isShowdialogCheckbox: false,
        isShowInput: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.bill_id)
    wx.request({
      url: app.globalData.url + '/v1/bill/get',
    })
  },

  setPayersListDefault: function () {
    console.log('setPayersListDefault')
    var item = []
    for (var i = 0; i < this.data.members.length; i++) {
      item[i] = {
        "Money": 0,
        "user_id": this.data.members[i].user_id
      }
      this.setData({
        people_list_item: item
      })
    }
  },
  ShowCheckboxDialog: function (e) {
    this.setData({
      isShowdialogCheckbox: true,
      isShowInput: false
    })
  },
  //多选按钮状态变化监听
  checkboxChange: function (e) {
    console.log('checkboxChange')
    var members = []
    var money = this.data.money / e.detail.value.length
    for (var i = 0; i < e.detail.value.length; i++) {
      var user_id = e.detail.value[i]
      members[i] = {
        "Money": money,
        "user_id": user_id
      }
    }

    this.setData({
      people_list_item: members,
      average_money: money
    })
    console.log(members)
  },
  selectAll: function (e) {
    if (this.data.isChecked) {
      this.setData({
        isChecked: false,
        isSelectAll: false,
        people_list_item: [],
        average_money: 0
      })
      console.log(this.data.people_list_item)
    } else {
      var item = []
      var average = e.detail.value / this.data.members.length
      for (var i = 0; i < this.data.members.length; i++) {
        item[i] = {
          "Money": average,
          "user_id": this.data.members[i].user_id
        }
      }

      this.setData({
        isSelectAll: true,
        isChecked: true,
        people_list_item: item,

      })
      console.log(this.data.people_list_item)
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.startPullDownRefresh()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
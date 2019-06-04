// pages/write_a_bill/write_a_bill.js
var util = require('../../utils/util.js')
var app = getApp()
var http_request = require('../../network/http_request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: null,
    isChecked: true,
    state: '平均分摊',
    isSpecificState: false, //是否为平均分摊
    input_value: '',
    average: '全员平摊',
    date: '',
    text_date: '今天',
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
    isShowPeopleDialog: false, //控制成员列表弹窗的显示
    money_acount: 0,
    members: [], //成员列表
    payer: null, //付款人信息
    payerID: '',
    people_list_postion: 0, //参与成员的下标
    people_list_item: [], //成员金额和信息
    act_id: '',
    isShowdialogCheckbox: false, //控制参与成员弹窗的显示
    isShowerr_hint: false,
    pages_state: '',
    btn: '记一笔',
    bill_id: '',
    btn_write_state_disable: '',
    dialog_payer_animation: null,
    dialog_members_animation: null,
    isShowDialog: false,
    my_total: 0,
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

  StartInput: function(e) {
    var input_value = this.data.input_value
    if (this.data.input_value != null) {
      this.setData({
        input_value: input_value.substr(0)
      })
    }
  },
  InputOver: function(e) {
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
        average_money: average,
        money: e.detail.value
      })
      console.log(this.data.people_list_item)
    }
  },
  HoverInput: function(e) {
    var input = parseFloat(e.detail.value)
    if (input > 9999.99) {
      this.setData({
        isShowerr_hint: true,
        btn_write_state_disable: 'btn-disable'
      })
    } else if (!input && !this.data.isSpecificState) {
      this.setData({
        isShowerr_hint: false,
        btn_write_state_disable: 'btn-disable'
      })
    } else {
      this.setData({
        isShowerr_hint: false,
        btn_write_state_disable: 'btn-able'
      })
    }
  },
  //日期选择器事件
  bindDateChange: function(e) {
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
  write: function(e) {
    var self = this
    if (!this.data.isShowerr_hint && this.data.money != 0 || this.data.money_acount != 0) {
      switch (this.data.pages_state) {
        case 'default':
          //console.log(self.data.people_list_item)
          //具体分摊状态
          if (this.data.isSpecificState) {
            http_request.cretateBill(self.data.act_id,
              self.data.bill_content,
              self.data.people_list_item, self.data.payer.user_id, self.data.money_acount)
            app.globalData.mPromise.then(
              function(data) {
                var bill = {
                  bill_id: app.globalData.cBill_id,
                  bill_total: self.data.money_acount,
                  content: self.data.bill_content,
                  count: self.data.people_list_item.length,
                  my_total: self.data.my_total
                }
                app.globalData.userData.addBill(self.data.act_id, bill)
                app.globalData.userData.updateAddExpend(self.data.act_id, self.data.my_total)
                wx.showToast({
                  title: '记账成功',
                })
                setTimeout(function() {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 2000)

              }
            )
          } else {
            var money = parseFloat(self.data.money)
            console.log(self.data.people_list_item)
            http_request.cretateBill(self.data.act_id,
              self.data.bill_content,
              self.data.people_list_item, self.data.payer.user_id, money)
            app.globalData.mPromise.then(
              function(data) {
                var money = parseFloat(self.data.money)
                var bill = {
                  bill_id: app.globalData.cBill_id,
                  bill_total: money,
                  content: self.data.bill_content,
                  count: self.data.people_list_item.length,
                  my_total: self.data.average_money
                }
                app.globalData.userData.addBill(self.data.act_id, bill)
                app.globalData.userData.updateAddExpend(self.data.act_id, self.data.average_money)
                wx.navigateBack({
                  delta: 1
                })
              }
            )
          }
          break;
        case 'change_bill':
          var money = parseFloat(self.data.money)
          if (!this.data.isSpecificState) {
            http_request.updataBill(self.data.act_id, self.data.bill_id, self.data.bill_content,
              self.data.people_list_item, self.data.payer.user_id, money)
            console.log(money)
            app.globalData.mPromise.then(
              function(data) {
                var money = parseFloat(self.data.money)
                var bill = {
                  bill_id: self.data.bill_id,
                  bill_total: money,
                  content: self.data.bill_content,
                  count: self.data.people_list_item.length,
                  my_total: self.data.average_money
                }
                app.globalData.userData.updataBill(self.data.act_id, self.data.bill_id, bill)
                
                wx.showToast({
                  title: '修改成功',
                })
                setTimeout(function() {
                  wx.navigateBack({
                    delta: 2
                  })
                }, 1500)
              }
            )
          } else {
            http_request.updataBill(self.data.act_id, self.data.bill_id, self.data.bill_content,
              self.data.people_list_item, self.data.payer.user_id, self.data.money_acount)
            app.globalData.mPromise.then(
              function(data) {
                var bill = {
                  bill_id: self.data.bill_id,
                  bill_total: self.data.money_acount,
                  content: self.data.bill_content,
                  count: self.data.people_list_item.length,
                  my_total: self.data.my_total
                }
                app.globalData.userData.updataBill(self.data.act_id, self.data.bill_id, bill)
                
                wx.showToast({
                  title: '修改成功',
                })
                setTimeout(function() {
                  wx.navigateBack({
                    delta: 2
                  })
                }, 1500)
              }
            )
          }

          break;
      }
    }


  },
  //单选按钮点击事件
  radio_check: function(e) {
    //console.log(e.currentTarget.dataset.id)
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
    var self = this
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#7f7f7f',
    })
    this.setData({
      isShowInput: false,
      isShowDialog1: true,
      dialog_input_text: '',
      isShowDialog: false
    })
    var animation = wx.createAnimation({
      delay: 0,
      duration: 0,
      timingFunction: 'ease',
    })

    animation.translateY(800).step()
    this.setData({
      dialgo_animation: animation.export(),
    })
    setTimeout(function() {
      var animation = self.createDiaLogAinmation()
      animation.translateY(0).step()
      self.setData({
        dialgo_animation: animation.export(),
      })
    }, 100)


  },

  clickDialogQueding: function(e) {
    var self = this
    if (this.data.dialog_input_text.length != 0) {
      var text = this.data.dialog_input_text
      this.setData({
        bill_content: text
      })
    }

    var animation = this.createDiaLogAinmation()
    animation.translateY(800).step()
    this.setData({
      dialgo_animation: animation.export(),
    })
    setTimeout(function() {
      //console.log(self.data.dialog_input_text.length)
      self.setData({
        isShowInput: true,
        isShowDialog1: false,
        isShowDialog: true
      })
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff',
      })
    }, 500)

  },

  clickPeopleItem: function(e) {
    var self = this

    var index = e.currentTarget.dataset.index
    console.log(index)

    var animation = this.createDiaLogAinmation()

    animation.translate(0, 800).step()
    this.setData({
      dialog_payer_animation: animation.export(),

    })

    setTimeout(function() {
      self.setData({
        isShowInput: true,
        isShowPeopleDialog: false,
        payer: self.data.members[index],
        isShowDialog: true
      })
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff',
      })
    }, 500)
  },
  //付款人条目点击事件
  clickPayer: function(e) {
    var self = this
    var animation = this.createDiaLogAinmation()

    animation.translate(0, 1000).step()

    this.setData({
      dialog_payer_animation: animation.export(),
      isShowDialog: false
    })

    setTimeout(function() {
      var animation = self.createDiaLogAinmation()
      animation.translate(0, 0).step()

      self.setData({
        dialog_payer_animation: animation.export()
      })
    }, 100)

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
  changeState: function(e) {
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
        isSpecificState: true,
        input_value: '',
        isShowDialog: true
      })
    } else {
      this.setData({
        state: '平均分摊',
        isSpecificState: false,
      })
    }

  },
  //点击参与成员列表
  BindPeopleListTap: function(e) {
    this.setData({
      people_list_postion: e.currentTarget.dataset.index
    })
    //console.log("BindPeopleListTap: " + e.currentTarget.dataset.index)
  },
  BindSpecificListInput: function(e) {
    var input = parseFloat(e.detail.value)
    if (input > 9999.99) {
      this.setData({
        isShowerr_hint: true,
        btn_write_state_disable: 'btn-disable'
      })
    } else if (this.data.money_acount && this.data.isSpecificState) {
      this.setData({
        isShowerr_hint: false,
        btn_write_state_disable: 'btn-disable'
      })
    } else {
      this.setData({
        isShowerr_hint: false,
        btn_write_state_disable: ''
      })
    }
  },
  //具体分摊成员列表的input组件失去焦点时触发事件
  Bindblur: function(e) {

    if (!this.data.isShowerr_hint) {
      var input = parseFloat(e.detail.value)
      if(!input){
        input = 0
      }
      var item = this.data.people_list_item
      item[this.data.people_list_postion].Money = input
      this.setData({
        people_list_item: item
      })

      if (item[this.data.people_list_postion].user_id == app.globalData.userData.id){
        this.setData({
          my_total: input
        })
      }

      var money = 0
      for (var i = 0; i < this.data.people_list_item.length; i++) {
        money += this.data.people_list_item[i].Money
        console.log(money)
      }
      console.log(this.data.people_list_item)

      this.setData({
        money_acount: money
      })
    }


  },
  CloseCheckBoxDialog: function(e) {
    var self = this
    if (this.data.people_list_item.length > 0) {
      var animation = this.createDiaLogAinmation()

      animation.translate(0, 800).step()

      this.setData({
        dialog_members_animation: animation.export()
      })


      setTimeout(function() {
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#ffffff',
        })
        self.setData({
          isShowdialogCheckbox: false,
          isShowInput: true
        })
      }, 500)

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this
    var act_id = options.act_id
    var bill_id = options.bill_id
    var pages_state = options.state
    if (act_id) {
      console.log(act_id)
      this.setData({
        act_id: act_id
      })
      var activity = app.globalData.userData.findActivityById(act_id)
      console.log(activity)
      this.setData({
        members: activity.members,
        payer: activity.members[0],
      })
      self.setPayersListDefault()
      console.log(activity.members[0])
    }


    if (bill_id && pages_state === 'change_bill') {
      console.log('bill_id=  ' + bill_id)
      this.setChaneBillStaet(bill_id)
    }

    this.setData({
      date: util.formatTime(),
      pages_state: pages_state
    })
    console.log('state: ' + this.data.pages_state)
  },

  setChaneBillStaet: function(bill_id) {
    var bill = app.globalData.cBillDetails
    this.setData({
      btn: '确认修改',
      bill_id: bill_id,
      bill: app.globalData.cBillDetails
    })
    this.setData({
      bill_content: bill.content,
      input_value: '¥' + bill.bill_total,
      date: util.formatTime2(bill.created_at, 'Y-M-D'),
      text_date: '',
      payerID: bill.payer_id,
      people_list_item: bill.members,
      money: bill.bill_total
    })
    this.setPayer(bill)
  },

  setPayer: function(bill) {
    var self = this
    if (bill.payerID != '') {
      wx.request({
        url: app.globalData.url + '/user/info',
        method: 'POST',
        data: {
          "user_id": this.data.bill.payer_id
        },
        success(res) {
          console.log(res.data.data)
          var payer_nickname = res.data.data.nickname
          var payer_headimgurl = res.data.data.head_img
          var payer = {
            nickname: payer_nickname,
            headimgurl: payer_headimgurl,
            user_id: self.data.payerID
          }
          self.setData({
            payer: payer
          })
        }
      })
    }
  },
  setPayersListDefault: function() {
    console.log(this.data.members)
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
  ShowCheckboxDialog: function(e) {
    this.setData({
      isShowdialogCheckbox: true,
      isShowInput: false,
    })

    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#7f7f7f',
    })

    var frianim = wx.createAnimation({
      duration: 0,
      delay: 0,
      timingFunction: "ease"
    })
    frianim.translate(0,800).step()

    this.setData({
      dialog_members_animation: frianim.export()
    })

    var animation = this.createDiaLogAinmation()

    var height = wx.getSystemInfoSync().windowHeight
    var h = height / 100
    animation.translate(0, 0).step()

    this.setData({
      dialog_members_animation: animation.export()
    })
  },
  //多选按钮状态变化监听
  checkboxChange: function(e) {
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
  selectAll: function(e) {
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
  createDiaLogAinmation: function(){
    var animation = wx.createAnimation({
      duration: 500,
      delay: 0,
      timingFunction: "ease"
    })
    return animation
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
    // this.setData({
    //   btn_write_state_disable: 'btn-disable'
    // })
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
    wx.startPullDownRefresh()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
// components/dialog/bill_content/bill_content.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
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
    ],
    length: 0,
    text_class: '',
    radio_value: '一般',
    ocAnimation: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
          radio_value: text
        })
      }
      this.triggerEvent('onBillContentChange', text)
    },
    onInPut: function(e) {
      var length = e.detail.cursor
      var value = e.detail.value
      this.setData({
        length: length
      })
      this.setInPutLengthMax(length)

      if (length > 0) {
        this.triggerEvent('onBillContentChange', value)
      } else {
        this.triggerEvent('onBillContentChange', this.data.radio_value)
      }
    },
    setInPutLengthMax: function(length) {
      if (length == 10) {
        this.setData({
          text_class: 'text-red'
        })
      } else {
        this.setData({
          text_class: ''
        })
      }
    },
    onBtnClick: function(e){
      var self = this
      this.setTranslateAnimation(false)
      setTimeout(function(){
        self.triggerEvent('Close')
      },400)
    },
    setTranslateAnimation: function (isOpen) {
      var animation = wx.createAnimation({
        duration: 400,
        delay: 0,
        timingFunction: "ease"
      })
      var window_width = wx.getSystemInfoSync().windowWidth
      var window_height = wx.getSystemInfoSync().windowHeight
      //屏幕高度的百分之一 
      var hundredth = window_height / 100
      if (isOpen) {
        animation.translate(0, -(hundredth * 98)).step()
      } else {
        animation.translate(0, (hundredth * 98)).step()
      }

      this.setData({
        ocAnimation: animation.export()
      })
    }
  },
  lifetimes: {
    attached() {
      this.setTranslateAnimation(true)
    },
  }
})
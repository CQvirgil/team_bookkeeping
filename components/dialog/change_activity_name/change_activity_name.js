// components/dialog/change_activity_name/change_activity_name.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    text_count: 0,
    text_style: 'text-state-default',
    animation: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    BindInput: function(e) {
      //console.log(e.detail.value)
      var text = e.detail.value
      this.setData({
        text_count: text.length
      })
      if (text.length >= 10) {
        this.setData({
          text_style: 'text-state-fall'
        })
      } else {
        this.setData({
          text_style: 'text-state-default'
        })
      }
    },
    finishInput: function(e) {
      this.setTranslateAnimation(false)
      this.triggerEvent('FinishInput')
    },
    setTranslateAnimation: function(isOpent) {
      var animation = wx.createAnimation({
        duration: 400,
        delay: 0,
        timingFunction: "ease"
      })
      var window_width = wx.getSystemInfoSync().windowWidth
      var window_height = wx.getSystemInfoSync().windowHeight
      //屏幕高度的百分之一 
      var hundredth = window_height / 100
      if (isOpent) {
        animation.translate(0, -(hundredth * 98)).step()
      } else {
        animation.translate(0, (hundredth * 98)).step()
      }

      this.setData({
        animation: animation.export()
      })
    }
  },
  lifetimes: {
    attached() {
      this.setTranslateAnimation(true)
    },
  }
})
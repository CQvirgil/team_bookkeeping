// components/dialog/menu/menu.js
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
    dialog_animation: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ShowQrHadler: function(e) {
      this.triggerEvent('ShowQrHadler')
    },
    ExitAcitivity: function(e) {
      this.triggerEvent('ExitAcitivity')
    },
    DialogCancel: function(e) {
      this.setTranslateAnimation(false)
      this.triggerEvent('DialogCancel')
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
        animation.translate(0, -(hundredth * 32)).step()
      } else {
        animation.translate(0, (hundredth * 32)).step()
      }

      this.setData({
        dialog_animation: animation.export()
      })
    }
  },
  lifetimes: {
    attached() {
      var self = this
      setTimeout(function(){
        self.setTranslateAnimation(true)
      },10)
      
    },
  }
})
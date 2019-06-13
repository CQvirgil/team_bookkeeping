// components/dialog/members_list/members_list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    members: [],
    animation: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //设置动画
    setTranslateAnimation: function (isOpent) {
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
    },
    onButtonClick: function(e){
      var self = this
      this.setTranslateAnimation(false)
      setTimeout(function(){
        self.triggerEvent('onClose')
      },500)
    },
    onMembersItemClick: function(e){
      var select = e.currentTarget.dataset.select
      var self = this
      this.triggerEvent("onMemberSelect", select)
      this.setTranslateAnimation(false)
      setTimeout(function(){
        self.triggerEvent('onClose')
      },500)
    }
  },
  lifetimes: {
    attached: function(){
      this.setData({
        members: this.data.list
      })
    },
    ready: function () {
      //设置弹出动画
      this.setTranslateAnimation(true)
    },
  }
})

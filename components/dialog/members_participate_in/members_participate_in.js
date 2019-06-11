// components/dialog/members_participate_in/members_participate_in.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: Array, //传入的列表数据
    average_money: String, //平均数
    money_count: String //总数
  },

  /**
   * 组件的初始数据
   */
  data: {
    isCheckAll: true, //是否勾选全选按钮
    isCheckAllMember: true, //是否选择所有
    checkLength: 0, //被选择的成员总数
    animation: null, //打开关闭的动画
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //全选checkbook监听
    onCheckAllClick: function(e) {
      var is = this.data.isCheckAllMember
      if (this.data.checkLength == this.data.list.length) {
        this.setCheckAllMember(!is)
        
      } else {
        this.setCheckAllMember(true)
        this.setCheckLength(this.data.list.length)
      }
      console.log(this.data.isCheckAllMember)
      this.triggerEvent('CheckALL', this.data.isCheckAllMember)
    },
    //成员checkbox选择监听
    onCheckAllMembersChange: function(e) {
      //console.log(e.detail.value)
      this.onCheckAllMembers(e.detail.value.length)
      this.triggerEvent('CheckBoxChange', e.detail.value)
    },

    onCheckAllMembers: function(checkLength) {
      this.setCheckLength(checkLength)
      if (checkLength == this.data.list.length) {
        this.setCheckAll(true)
        this.setCheckAllMember(true)
      } else {
        this.setCheckAll(false)
      }
    },
    //设置选择成员数
    setCheckLength: function(length) {

      this.setData({
        checkLength: length
      })
    },
    //设置全选按钮
    setCheckAll: function(isCheckAll) {
      this.setData({
        isCheckAll: isCheckAll
      })
    },
    //设置所以成员的checkbox
    setCheckAllMember(isCheckAllMember) {
      this.setData({
        isCheckAllMember: isCheckAllMember
      })
    },
    //设置动画
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
    },
    //确定按钮点击监听
    onButtonClick: function(e) {
      var self = this
      //设置关闭动画
      this.setTranslateAnimation(false)
      setTimeout(function() {
        self.triggerEvent('ButtonClick')
      }, 500)

    },
  },
  lifetimes: {
    attached: function() {
      this.setData({
        checkLength: this.data.list.length
      })
      //设置弹出动画
      this.setTranslateAnimation(true)
      console.log(this.data.checkLength)
    },
  }

})
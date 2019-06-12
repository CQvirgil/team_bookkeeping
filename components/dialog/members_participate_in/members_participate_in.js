// components/dialog/members_participate_in/members_participate_in.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: Array, //传入的列表数据
    average_money: String, //平均数
    money_count: String, //总数
    save_data: Object//保存的数据
  },

  /**
   * 组件的初始数据
   */
  data: {
    isCheckAll: true, //是否勾选全选按钮
    isCheckAllMember: true, //是否选择所有
    checkLength: 0, //被选择的成员总数
    animation: null, //打开关闭的动画
    members: []
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
        if (this.data.isCheckAllMember){
          this.setAllMemberMoneyVisible(true)
        }else{
          this.setAllMemberMoneyVisible(false)
          this.setCheckLength(0)
        }
      } else {
        this.setCheckAllMember(true)
        this.setCheckLength(this.data.list.length)
        this.setAllMemberMoneyVisible(true)
      }
      this.triggerEvent('CheckALL', this.data.isCheckAllMember)
      this.updateCheckBoxValueMoney()
    },

    //成员checkbox选择监听
    onCheckAllMembersChange: function(e) {
      this.onCheckAllMembers(e.detail.value.length)
      this.triggerEvent('CheckBoxChange', e.detail.value)
      this.updateCheckBoxValueMoney()
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
    //设置全选checkbox是否选中
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
      if (this.data.checkLength > 0) {
        var saveData = {
          'members': this.data.members,
          'isCheckAll': this.data.isCheckAll,
          'checkLength': this.data.checkLength
        }
        this.triggerEvent('SaveData', saveData)
        var self = this
        //设置关闭动画
        this.setTranslateAnimation(false)
        setTimeout(function() {
          self.triggerEvent('ButtonClick')
        }, 500)
      }
    },
    onMembersItemClick: function(e) {
      var index = e.currentTarget.dataset.index
      var isVisible = this.data.members[index].is_check
      this.setCheckBoxMoneyVisible(index, !isVisible)
    },
    //设置checkbox数据为默认
    setCheckBoxValueDefault: function() {
      var dmembers = this.data.members
      for (var i in this.data.list) {
        var item = this.data.list[i]
        var member = {
          "user_id": item.user_id,
          "headimgurl": item.headimgurl,
          "nickname": item.nickname,
          "money": this.data.average_money,
          "is_check": true
        }
        dmembers.push(member)
      }
      this.setData({
        members: dmembers
      })
    },


    /**
     * 更新checkbox数据
     * index members 的索引
     * value_name  需要更新的数据（money 或 is_check）
     * value 更新的值
     */
    updateCheckBoxValue: function(index, value_name, value) {
      var item = this.data.members
      switch (value_name) {
        case 'money':
          item[index].money = value
          break;
        case 'is_check':
          item[index].is_check = value
          break
      }
      this.setData({
        members: item
      })
    },
    //设置成员列表中的money是否可见
    setAllMemberMoneyVisible: function(is_visible) {
      for (var i in this.data.members) {
        this.setCheckBoxMoneyVisible(i, is_visible)
      }
    },
    //
    /**
     * 设置成员列表中某项的money是否可见
     * index members下标
     * isVisible 是否可见
     */
    setCheckBoxMoneyVisible: function(index, isVisible) {
      this.updateCheckBoxValue(index, "is_check", isVisible)
    },
    updateCheckBoxValueMoney: function() {
      var item = this.data.members
      for (var i in this.data.members) {
        this.updateCheckBoxValue(i, 'money', this.data.average_money)
      }
    },
    setCheckBoxValue: function(data){
      this.setData({
        members: data
      })
    },
    setCheckLength: function(length){
      this.setData({
        "checkLength": length
      })
    }
  },
  lifetimes: {
    attached: function() {
      if (this.data.save_data) {
        this.setCheckBoxValue(this.data.save_data.members)
        this.setCheckAll(this.data.save_data.isCheckAll)
        this.setCheckLength(this.data.save_data.checkLength)
      } else {
        this.setCheckBoxValueDefault()
        this.setCheckLength(this.data.members.length)
      }

     
    },
    ready: function(){
      //设置弹出动画
      this.setTranslateAnimation(true)
    },
    detached: function(){
      
    }
  }

})
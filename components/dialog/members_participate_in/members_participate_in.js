// components/dialog/members_participate_in/members_participate_in.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: Array,
    average_money: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    isCheckAll: true,
    isCheckAllMember: true,
    checkLength: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCheckAllClick: function(e){
      var is = this.data.isCheckAllMember
      if(this.data.checkLength == this.data.list.length){
        this.setCheckAllMember(!is)
      }else{
        this.setCheckAllMember(true)
        this.setCheckLength(this.data.list.length)
      }
      
    },
    onCheckAllMembersChange: function(e){
      console.log(e.detail.value)
      this.onCheckAllMembers(e.detail.value.length)
    },
    onCheckAllMembers: function(checkLength){
      this.setCheckLength(checkLength)
      if(checkLength == this.data.list.length){
        this.setCheckAll(true)
        this.setCheckAllMember(true)
      }else{
        this.setCheckAll(false)
      }
    },
    setCheckLength: function(length){
      
      this.setData({
        checkLength: length
      })
    },
    setCheckAll: function (isCheckAll){
      this.setData({
        isCheckAll: isCheckAll
      })
    },
    setCheckAllMember(isCheckAllMember){
      this.setData({
        isCheckAllMember: isCheckAllMember
      })
    }
  },
  lifetimes: {
    attached: function () { 
      this.setData({
        checkLength: this.data.list.length
      })
    },
  }

})

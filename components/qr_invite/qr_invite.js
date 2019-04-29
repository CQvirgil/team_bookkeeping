// components/qr_invite/qr_invite.js
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
    title:'我的活动1'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      console.log('lifetimes')
      wx.request({
        url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx5d102152c8947ca7&secret=aac6699011fd467af10bbb64161e3390',
        method: 'GET',
        success(res){
          console.log(res)
          wx.request({
            url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + res.data.access_token,
            method: 'GET',
            success(res){
              console.log(res)
            }
          })
        }
      })
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})

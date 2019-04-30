// components/qr_invite/qr_invite.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    act_id: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: '',
    access_token: '',
    qr_url: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    attached() {
      var self = this
      // 在组件实例进入页面节点树时执行
      console.log(this.data.act_id)
      wx.request({
        url: app.globalData.url + '/wx/get_qr',
        method: 'POST',
        data: {
          "act_id": this.data.act_id
        },
        success(res) {
          if (res.data.data.path == '') {
            console.log('获取失败请先生成二维码')
            wx.request({
              url: app.globalData.url + '/auth/access_token',
              method: 'GET',
              success(res) {
                console.log(res)
                self.setData({
                  access_token: res.data.data.access_token
                })
                //console.log(self.data.access_token)
                wx.request({
                  url: app.globalData.url + '/wx/get_unlimited',
                  method: 'POST',
                  data: {
                    "access_token": self.data.access_token,
                    "act_id": self.data.act_id,
                
                    "scene": 'self.data.act_id'
                  },
                  success(res) {
                    console.log('https://www.lecaigogo.com/file/' + res.data.data.path)
                    self.setData({
                      qr_url: 'https://www.lecaigogo.com/file/' + res.data.data.path
                    })
                  }
                })
              }
            })

          } else {
            console.log('获取成功')
            console.log('https://www.lecaigogo.com/file/' + res.data.data.path)
            self.setData({
              qr_url: 'https://www.lecaigogo.com/file/' + res.data.data.path
            })
          }
        }
      })
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
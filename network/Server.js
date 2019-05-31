export default class Server {
  websocketurl = 'wx://39.108.65.44:5000/websocket' 
  constructor(){

  }

  connectServer(){
     wx.connectSocket({
       url: 'ws://demos.kaazing.com/echo' ,
       header: { 'content-type': 'application/json'},
       method: 'post',
       protocols: [],
       success: function(res) {
         console.log('连接成功')
       },
       fail: function(res) {
         console.log('连接失败')
         console.log(res)
       },
       complete: function(res) {
         console.log('连接结束')
       },
     })
   }

  closeServer(str_reason){
     wx.closeSocket({
       code: 1000,
       reason: str_reason,
       success: function(res) {
         console.log('关闭成功')
       },
       fail: function(res) {
         console.log('关闭失败')
       },
       complete: function(res) {
         console.log('关闭结束')
       },
     })
   }

  serverOpen(fun_callback){
    wx.onSocketOpen(fun_callback)
  }

  serverMessage(fun_callback){
    wx.onSocketMessage(fun_callback)
  }

  serverError(fun_callback){
    wx.onSocketError(fun_callback)
  }
  
  serverClose(fun_callback){
    wx.onSocketClose(fun_callback)
  }

  
}
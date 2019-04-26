module.exports = {
}

const app = getApp()

const getActivity = function(act_id){
  wx.request({
    url: 'http://www.lecaigogo.com:4998/v1/activity/get',
    method: 'POST',
    data: {
      "act_id": act_id,
      "user_id": app.globalData.unionid
    },
    success(res){
      
    }
  })
}
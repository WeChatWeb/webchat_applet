//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '饭店随心选',
    mottoselect: '点击此处，随机出一家饭店供您选择',
    userInfo: {}
  },
   bindHotelTap: function() {
    wx.navigateTo({
      url: '../result/result'
    })
  },

 bindJumpNavigation: function() {
    wx.navigateTo({
      url: '../journeypath/journeypath'
    })
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
//获取应用实例
var app = getApp()
Page({
  data: {
    resultdesc: '恭喜您，成功为您匹配到了:',
    result: '',
    hotels: ['大排档','包旺锅贴','鲁肉饭','鑫杰小厨','多乐之日','大喜鲍'],
    userInfo: {}
  },

  changeData: function(){
//随机选择一家饭店展示出来
    var length = this.data.hotels.length;
    var i = Math.floor(length * Math.random())
    console.log('i:'+i)
    this.setData({
        result:this.data.hotels[i]
      })
    console.log(data.result)
  },

   //更换一个
  bindChangeTap: function() {
    this.changeData();
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
    this.changeData()
  }
})
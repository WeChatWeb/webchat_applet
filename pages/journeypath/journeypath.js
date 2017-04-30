// journeyPath.js
var app = getApp(),
  util = require('../../utils/util.js');

Page({
  data: {
    text: "这是一个页面",
    locationInfo: {
      latitude: 23.099994,
      longitude: 113.324520,
      departureName: '',
      destinationName: '',
      destinationLatitude: 0,
      destinationLongitude: 0
    },
    markers: [{
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: "/image/departureIcon.png",
    },
    {
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: "/image/destinationIcon.png",
    }],
    polyline: []
    // polyline: [{
    //   points: [{
    //     longitude: 121.473701,
    //     latitude: 31.230416
    //   }, {
    //     longitude: 121.47645,
    //     latitude: 31.23171
    //   }],
    //   color: "#FF0000DD",
    //   width: 2,
    // }],
  },

  showNavagation: function () {
    var userInfo = app.getUserInfoSync();
    //更新数据
    if (!userInfo) {
      wx.navigateTo({
        url: '../index/index'
      });
      return;
    }
    this.setData({
      userInfo: userInfo
    })
    var locationInfo = this.data.locationInfo;
    var isShowDeparture = locationInfo.latitude && locationInfo.longitude;
    var isShowDestination = locationInfo.destinationLatitude && locationInfo.destinationLongitude;

    var markers = this.data.markers;
    if (isShowDeparture) {
      markers[0] = {
        latitude: locationInfo.latitude,
        longitude: locationInfo.longitude,
        title: locationInfo.departureName,
        iconPath: "/image/departureIcon.png"
      }
    }
    if (isShowDestination) {
      markers[1] = {
        latitude: locationInfo.destinationLatitude,
        longitude: locationInfo.destinationLongitude,
        iconPath: "/image/destinationIcon.png",
        title: locationInfo.destinationName
      }
    }

    this.setData({
      markers: markers
    })

    if (!isShowDeparture || !isShowDestination) {
      return
    }
    var polylineArray = util.calculationRoute(locationInfo.latitude, locationInfo.longitude, locationInfo.destinationLatitude, locationInfo.destinationLongitude);
    // var polyline = this.data.polyline;
    // polyline[0] = {};
    // polyline[0].points = polylineArray;
    // polyline[0].color = "#FF0000DD";
    // polyline[0].width = 2;
    // polyline[0].dottedLine = true;
    // 计算导航线
    this.setData({
      polyline: [{
        points: polylineArray,
        color: "#FF0000DD",
        width: 2,
      }]
    })
  },

  onLoadIfHaveParams: function (options) {
    this.setData({
      locationInfo: {
        departureName: options.departure,
        destinationName: options.destination,
        latitude: options.latitude,
        longitude: options.longitude,
        destinationLatitude: options.destinationLatitude,
        destinationLongitude: options.destinationLongitude
      }
    })
    this.showNavagation();
  },
  onLoadIfHaveNoParams: function (options) {
    options.location = {};
    //定位到当前位置
    var thisQuote = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        thisQuote.setData({
          locationInfo: {
            departureName: '请选择',
            latitude: res.latitude,
            longitude: res.longitude
          }
        })
        thisQuote.showNavagation();
      }
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // console.log('journeyPath.js onLoad:' + JSON.stringify(options));

    if (options.haveOption) {
      this.onLoadIfHaveParams(options)
    } else {
      this.onLoadIfHaveNoParams(options);
    }
  },

  selectDeparture: function () {
    var thisQuote = this;
    wx.chooseLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var locationInfo = thisQuote.data.locationInfo;
        locationInfo.latitude = res.latitude;
        locationInfo.longitude = res.longitude;
        locationInfo.departureName = res.name;
        thisQuote.setData({
          locationInfo: locationInfo
        })
        thisQuote.showNavagation();
      }
    })
  },
  selectDestination: function () {
    var thisQuote = this;
    wx.chooseLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var locationInfo = thisQuote.data.locationInfo;
        locationInfo.destinationLatitude = res.latitude;
        locationInfo.destinationLongitude = res.longitude;
        locationInfo.destinationName = res.name;
        thisQuote.setData({
          locationInfo: locationInfo
        })
        thisQuote.showNavagation();
      }
    })
  },
})
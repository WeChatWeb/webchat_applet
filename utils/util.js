function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function validateEmail(email) {
  return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email)
}

function validatePassword(password) {
  return password && password.length >= 8;
}

function validatePhone(phone) {
  return phone && /^1\d{10}$/.test(phone)
}

function calculationRoute(departureLat, departureLong, destinationLat, destinationLong) {
  var polyline = [];
  // polyline.push({
  //   longitude: departureLong,
  //   latitude: departureLat
  // });
  //  polyline.push({
  //   longitude: destinationLong,
  //   latitude: destinationLat
  // });
  var diffLat = destinationLat - departureLat;
  var diffLong = destinationLong - departureLong;

  var diffItem = diffLat / 100 + diffLong / 100;

  //比较大，则代表地图尺寸紧凑，则定死100个
  var itemLat = diffLat / 100;
  var itemLong = diffLong / 100;
  var itemCount = 100;
  if (diffItem > 0.002) {
    var longBigger = diffLong > diffLat;
    itemCount = longBigger ? diffLong / 0.001 : diffLat / 0.001;
    itemLat = diffLat / itemCount;
    itemLong = diffLong / itemCount;
  }
  for (var i = 0; i < itemCount; i++) {
    polyline.push({
      latitude: departureLat + itemLat * i,
      longitude: departureLong + itemLong * i
    });
  }
  return polyline
}

module.exports = {
  formatTime: formatTime,
  guid: guid,
  validateEmail: validateEmail,
  validatePassword: validatePassword,
  validatePhone: validatePhone,
  calculationRoute: calculationRoute
}
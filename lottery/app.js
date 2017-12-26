const loginModel = require('./login.js');
App({
  onLaunch: function() { 
    // Do something initial when  launch.
    var that = this;
    if (!that.globalData.userInfo) {
      loginModel.login(function (res, userInfo) {
        that.globalData.userInfo = userInfo;
        wx.setStorageSync("userInfo", userInfo);
        console.log("userInfo.token:", userInfo.token);
      }, function (res) {
        console.log("fail:", res);
      });
    } else {
      console.log("app.js", that.globalData.userInfo);
    }
  },
  onHide: function() {
      // Do something when hide.
  },
  globalData: {userInfo: null},
  appId: 'wx40e84ae5e0e3c442',
  secret: '9415c2dda017891a830e71aa44cc0c77',
  couponList: [{ id: 1, money: 12 }, { id: 2, money: 45 }, { id: 3, money: 12 }],
  addListener: function (callback) {
    this.callback = callback;
  },
  setChangedData: function (data) {
    if (this.callback != null) {
      this.callback(data);
    }
  },
  getUserInfo: function () {
    return this.globalData.userInfo ? this.globalData.userInfo :
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        console.log("getStorage:", res);
      },
    })
  }
})
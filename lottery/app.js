App({
  onLaunch: function() { 
  },
  onHide: function() {
      // Do something when hide.
  },
  globalData: {userInfo: null, test: 'test'},
  appId: 'wx40e84ae5e0e3c442',
  secret: '9415c2dda017891a830e71aa44cc0c77',
  couponList: [],
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
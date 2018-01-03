
App({
  onLaunch: function() { 
  },
  onHide: function() {
      // Do something when hide.
  },
  globalData: {
    userInfo: null
  },
  appId: 'wx40e84ae5e0e3c442',
  secret: '9415c2dda017891a830e71aa44cc0c77',
  couponList: [],
  failIcon: "/static/close.png",
  isRegister: false,
  defaultPic: '/static/default_pic.jpg',
  updateRegister: function(data) {
    this.isRegister = data;
  },
  addListener: function (callback) {
    this.callback = callback;
  },
  setChangedData: function (data) {
    if (this.callback != null) {
      this.callback(data);
    }
  }
})

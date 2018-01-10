const util = require('./utils/util.js');
App({
  onLaunch: function() { 
  },
  onHide: function() {
      // Do something when hide.
  },
  globalData: {
    userInfo: null,
  },
  totalPrice: '',
  unUsedPrice: '',
  usedPrice: '',
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
      this.callback = null
    } else {
      console.log(123);
    }
  },
  getAccount: function () {
    var that = this;
    util.AJAX({
      url: "/coupon/coupon-collect",
      data: {},
      method: "GET",
      success: function (res) {
        if (res.statusCode === 200) {
          if (res.data.data) {
            that.totalPrice = res.data.data.totalPrice;
            that.unUsedPrice = res.data.data.unUsedPrice;
            that.usedPrice = res.data.data.usedPrice;
          }
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
})

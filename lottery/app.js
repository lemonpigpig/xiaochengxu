App({
  onLaunch: function() { 
    // Do something initial when launch.
    var that = this;
    wx.login({
      success: function(res) {
        that.globalData.code = res.code;
        wx.getUserInfo({
          success: function(res) {
            console.log("getUserInfo", res);
          },
          fail: function(res) {
            wx.showModal({
              title: '提示',
              content: '必须授权登录后才能操作，是否重新授权登录？',
              cancelText: "否",
              confirmText: "是",
              success: function(res) {
                if (res.confirm) {
                  wx.openSetting({
                    success: function(res) {
                      if (res.authSetting["scope.userinfo"]) {
                        //如果用户重新同意了授权登录
                        wx.getUserInfo({
                          success: function(res) {
                            var rawData = encodeURIComponent(res.rawData);

                          }
                        })
                      }
                    }
                  })
                }
              }
            })
          }
        })
      }
    })
  },
  onHide: function() {
      // Do something when hide.
  },
  globalData: {code: ''},
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
  }
})
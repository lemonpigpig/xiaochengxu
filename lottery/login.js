
const util = require('./utils/util.js');
module.exports = {
  login: function(successcb, failcb, page) {
    wx.login({
      success: function (res) {
        var code = res.code;
        wx.getUserInfo({
          success: function (res) {
            var rawdata = JSON.parse(res.rawData);
            var userInfo = { nickName: rawdata.nickName };
            util.AJAX({
              url: "/customer/login",
              method: "POST",
              data: {
                code: code,
                encryptedData: res.encryptedData,
                iv: res.iv,
                rawData: "",
                signature: res.signature
              },
              success: function (res) {
                userInfo.token = res.data.data;
                util.setToken(res.data.data);
                successcb(res, userInfo);
              },
              fail: function (res) {
                failcb(res);
              }
            });
          },
          fail: function (res) {
            wx.showModal({
              title: '提示',
              content: '必须授权登录后才能操作，是否重新授权登录？',
              cancelText: "否",
              confirmText: "是",
              success: function (res) {
                if (res.confirm) {
                  wx.openSetting({
                    success: function (res) {
                      if (res.authSetting["scope.userInfo"]) {
                        //如果用户重新同意了授权登录
                        wx.getUserInfo({
                          success: function (res) {
                            var rawdata = JSON.parse(res.rawData);
                            var userInfo = { nickName: rawdata.nickName };
                            util.AJAX({
                              url: "/customer/login",
                              method: "POST",
                              data: {
                                code: code,
                                encryptedData: res.encryptedData,
                                iv: res.iv,
                                rawData: "",
                                signature: res.signature
                              },
                              success: function (res) {
                                successcb(res, userInfo);
                              },
                              fail: function (res) {
                                failcb(res);
                              }
                            });
                            wx.setStorage({
                              key: "userInfo",
                              data: userInfo,
                              success(res) {
                                console.log(res);
                              }
                            })
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
  }
}

// pages/login/login.js
const util = require('../../utils/util.js');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */

  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.login(function (res, userInfo) {
      wx.switchTab({
        url: "/pages/index/index",
      })
    }, function (res) {
      console.log("fail:", res);
    });
  },
  login: function (successcb, failcb, page) {
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
                util.setToken(res.data.data.token);
                app.globalData.userInfo = userInfo;
                app.isRegister = res.data.data.isRegister;
                successcb(res);
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
                                util.setToken(res.data.data);
                                app.globalData.userInfo = userInfo;
                                successcb(res);
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
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
const util = require('../../utils/util.js');
var app = getApp();

Page({
    data: {
        // loading
        hidden: false,
        code: ''
    },
    bindKeyInput: function (e) {
      this.setData({
        code: e.detail.value
      });
    },
    scanCode: function() {
      var that = this;
      wx.scanCode({
        success: function(res) {
          var code = res.result;
          console.log("scancode:", code);
          wx.switchTab({
            url: "../index/index",
            success: function() {
              that.setData({ code: code });
              that.recieve();
            }
          });
        },
        fail: function(res) {
          console.log('fail', res);
        }
      });
    },
    recieve: function() {
      // app.setChangedData('page2-data');}
      if (!this.data.code || this.data.code.length === 0) {
        wx.showModal({
          title: '提示',
          content: '请输入有效的券号！',
        });
        return;
      }
      var  that = this;
      util.AJAX({
        url: "/coupon/pick-coupon",
        data: {
          lotteryCode: this.data.code
        },
        success: function (res) {
          app.setChangedData();
          wx.showToast({
            title: '领取成功',
          });
        },
        fail: function (res) {
          wx.showToast({
            title: '领取失败',
          })
          console.log(res);
        }
      });
    },
    /** 
     * 页面初始化
     * options 为页面跳转所带来的参数
     */
    onLoad: function (options) {
        var that = this;
        wx.setNavigationBarTitle({
          title: "领取优惠券",
          success: function (res) {
          }
        })
    },
    onReady: function () {
      
    }
})
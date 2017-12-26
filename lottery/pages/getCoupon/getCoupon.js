const util = require('../../utils/util.js');
var app = getApp();

Page({
    data: {
        // loading
        hidden: false
    },
    scanCode: function() {
      var that = this;
      wx.scanCode({
        success: function(res) {
          var code = res.result;
          // this.recieve(code);
          wx.switchTab({
            url: "../index/index",
            success: function() {
              this.recieve(code);
            }
          });
          // console.log('success', code);
        },
        fail: function(res) {
          console.log('fail', res);
        }
      });
    },
    recieve: function(code) {
      // app.setChangedData('page2-data');
      var  that = this;
      util.AJAX({
        url: "/coupon/pick-coupon",
        data: {
          lotteryCode: code
        },
        success: function (res) {
          app.setChangedData({ couponList: { id: 99999, money: 999 }});
        },
        fail: function (res) {
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
            console.log(123);
          }
        })
    },
    onReady: function () {
      
    }
})
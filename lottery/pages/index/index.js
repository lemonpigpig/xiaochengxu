const util = require('../../utils/util.js');
var app = getApp();
Page({
    data: {
        // loading
        hidden: false,
        couponList: app.couponList,
        userInfo: null
    },
    scan: function () {
      var that = this;
      util.scanCode(function(res) {
        wx.redirectTo({
          url: "/pages/merchant/merchant?id=" + res.result,
        })
      })
    },
    couponModel: function(data) {
      var model = [];
      if (data && data.length > 0) {
        for (var i=0;i<data.length;i++) {
          model.push({
            id: data[i].id ? data[i].id : '',
            money: data[i].price ? data[i].price : '',
            count: data[i].count ? data[i].count : ''
          });
        }
      }
      return model;
    },
    getCouponList: function() {
      var that = this;
      if (util.getToken()) {
        util.AJAX({
          url: "/coupon/unused-coupon",
          header: { "Content-Type": "application/json", "token": that.data.userInfo.token },
          success: function (res) {
            that.setData({ couponList: that.couponModel(res.data.data) });
            app.globalData.couponList = that.couponModel(res.data.data);
          },
          fail: function (res) {
            console.log(res)
          }
        });
      }
    },
    /** 
     * 页面初始化
     * options 为页面跳转所带来的参数
     */
    onLoad: function (options) {
        var that = this;
        that.setData({ userInfo: app.globalData.userInfo });
        that.getCouponList();
        app.addListener(function () {
          that.getCouponList();
        })
        /**
         * 显示 loading
         */
        that.setData({
            hidden: true
        });
    },
    onReady: function () {
        // 页面渲染完成
        var that = this;
        // 数据加载完成后 延迟隐藏loading
        setTimeout(function () {
          that.setData({
            hidden: false
          });
        }, 500);
    }
})
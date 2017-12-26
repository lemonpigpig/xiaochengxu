const util = require('../../utils/util.js');
var app = getApp();
Page({
    data: {
        // loading
        hidden: false,
        couponList: app.couponList,
        userInfo: null,
        test: app.globalData.test
    },
    couponModel: function(data) {
      if (data && data.length > 0) {
        return {
            id: data.id ? data.id : '',
            money: data.price ? data.price : ''
        }
      }
      return [{ id: 1, money: 123 }];
    },
    /** 
     * 页面初始化
     * options 为页面跳转所带来的参数
     */
    onLoad: function (options) {
        var that = this;
        that.setData({ userInfo: app.globalData.userInfo });
        if (util.getToken()) {
          util.AJAX({
            url: "/coupon/unused-coupon",
            header: { "Content-Type": "application/json", "token": that.data.userInfo.token },
            success: function (res) {
              that.setData({ couponList: that.couponModel(res.data)});
              app.globalData.couponList = that.couponModel(res.data);
              console.log(res);
            },
            fail: function (res) {
              console.log(res)
            }
          });
        }
        app.addListener(function (data) {
          if (data.couponList instanceof Array) {
            var couponList = [...data.couponList, ...that.data.couponList]
          } else {
            var couponList = [data.couponList, ...that.data.couponList];
          }
          that.setData({
            couponList: couponList
          });
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
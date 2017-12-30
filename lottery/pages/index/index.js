const util = require('../../utils/util.js');
var app = getApp();
Page({
    data: {
        // loading
        hidden: false,
        couponList: app.couponList,
        userInfo: null,
        fixed: false,
        markers: [{
          iconPath: "/resources/others.png",
          id: 0,
          latitude: 23.099994,
          longitude: 113.324520,
          width: 50,
          height: 50
        }],
        polyline: [{
          points: [{
            longitude: 113.3245211,
            latitude: 23.10229
          }, {
            longitude: 113.324520,
            latitude: 23.21229
          }],
          color: "#FF0000DD",
          width: 2,
          dottedLine: true
        }],
        controls: [{
          id: 1,
          iconPath: '/resources/location.png',
          position: {
            left: 0,
            top: 300 - 50,
            width: 50,
            height: 50
          },
          clickable: true
        }]
    },
    select: function(e) {
      console.log(e);
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
      if (data.length === 0) this.setData({ fixed: true });
      if (data && data.length > 0) {
        for (var i=0;i<data.length;i++) {
          model.push({
            id: data[i].id ? data[i].id : '',
            money: data[i].price ? data[i].price : '',
            count: data[i].count ? data[i].count : '',
            description: data[i].description ? data[i].description: '',
            name: data[i].name ? data[i].name : ''

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
            console.log("couponList:", res.data.data);
            that.setData({ couponList: that.couponModel(res.data.data) });
            app.globalData.couponList = that.couponModel(res.data.data);
            that.setData({
              hidden: false
            });
          },
          fail: function (res) {
            console.log(res);
            that.setData({
              hidden: false
            });
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
        that.setData({
          hidden: true
        });
        that.getCouponList();
        app.addListener(function () {
          that.getCouponList();
        })
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
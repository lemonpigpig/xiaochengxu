const util = require('../../utils/util.js');
var app = getApp();
Page({
    data: {
        // loading
        hidden: false,
        couponList: app.couponList,
        userInfo: null,
        fixed: false,
        showLogo: false,
        phone: null,
        code: null,
        showTip: false,
        timeout: 60,
        disabled: false,
        codeText: '获取验证码',
        showTipCode: false,
    },
    inputPhone: function(e) {
      this.setData({ phone: e.detail.value });
    },
    inputCode: function(e) {
      this.setData({ code: e.detail.value });
    },
    checkPhone: function() {
      var regex = /^[1-9]\d{10}$/;
      console.log('this.data.phone:', this.data.phone);
      return regex.test(this.data.phone);
    },
    focusPhone: function() {
      this.setData({ showTip: false });
    },
    focusCode: function () {
      this.setData({ showTipCode: false });
    },
    setCodeTimeout: function() {
      var that = this;
      this.setData({ disabled: true });
      this.setData({ codeText: this.data.timeout + 's' });
      var interval = setInterval(function() {
        if (that.data.timeout === 0) {
          clearInterval(interval);
          that.setData({ disabled: false });
          that.setData({ codeText: '获取验证码' });
          that.setData({ timeout: 60 });
        } else {
          that.setData({ timeout: that.data.timeout - 1 });
          that.setData({ codeText: that.data.timeout + 's' });
        }
      }, 1000)
    },
    sendCode: function(e) {
      var that = this;
      if (this.checkPhone()) {
        this.setCodeTimeout();
        util.AJAX({
          url: "/customer/send-code",
          data: { mobile: that.data.phone },
          method: "POST",
          success: function(res) {
            if (res.statusCode === 200) {
              wx.showToast({
                title: '发送成功',
              })
            }
          },
          fail:function(res) {
            console.log(res);
          }
        })
      } else {
        this.setData({ showTip: true });
      }
    },
    submit: function() {
      if (!this.data.phone) {
        this.setData({ showTip: true });
      }
      if (!this.data.code) {
        this.setData({ showTipCode: true });
      } else {
        var that = this;
        util.AJAX({
          url: '/customer/bind-mobile',
          data: { mobile: that.data.phone, code: that.data.code },
          method: "POST",
          success: function(res) {
            console.log(res);
            if (res.statusCode === 200) {
              if (res.data.data) {
                wx.showToast({
                  title: '绑定成功',
                  success: function() {
                    that.setData({ showLogo: false });
                  }
                })
              } else {
                wx.showToast({
                  title: res.data.msg
                })
              }
            } else {
              wx.showToast({
                title: '绑定失败',
                image: app.failIcon
              })
            }
          },
          fail: function(res) {
            console.log(res);
            wx.showToast({
              title: res.data.msg,
              image: app.failIcon
            })
          },
        });
      }  
    },
    close: function() {
      this.setData({ showLogo: false });
      this.setData({ code: '' });
      this.setData({ phone: '' });
    },
    scanCode: function () {
      var that = this;
      if (app.isRegister) {
        wx.scanCode({
          scanType: ['qrCode', 'barCode', 'datamatrix', 'pdf417'],
          success: function (res) {
            var code = res.result;
            console.log("scancode:", code);
            that.setData({ code: code });
            that.recieve();
          },
          fail: function (res) {
            console.log('fail', res);
          }
        });
      } else {
        that.setData({ showLogo: true });
      }  
    },
    recieve: function () {
      if (!this.data.code || this.data.code.length === 0) {
        wx.showModal({
          title: '提示',
          content: '请输入有效的券号！',
        });

        return;
      }
      var that = this;
      util.AJAX({
        url: "/coupon/pick-coupon",
        data: {
          lotteryCode: this.data.code
        },
        success: function (res) {
          console.log(res.data.data);
          if (res.data.data) {
            app.setChangedData();
            wx.showToast({
              title: '领取成功',
              success: function () {
                wx.switchTab({
                  url: "../index/index"
                });
              }
            });
          } else {
            wx.showToast({
              title: '领取失败',
              image: app.failIcon
            });
          }

        },
        fail: function (res) {
          wx.showToast({
            title: '领取失败',
            image: app.failIcon
          })
          console.log(res);
        }
      });
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
            name: data[i].name ? data[i].name : '',
            location: data[i].location ? data[i].location : ''
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
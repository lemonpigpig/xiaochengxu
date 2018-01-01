
const util = require('../../utils/util.js');
const app = getApp();
Page({
  /**mer
   * 页面的初始数据
   */
  data: {
    detail: null,
    couponList: [],
    id: null,
    priceList: [ 
      { price: 5, active: false }, 
      { price: 10, active: false }, 
      { price: 20, active: false}, 
      { price: 30, active: false }
    ]
  },
  upper: function(res) {
    console.log(res);
  },
  selectByPrice: function(e) {
    var that = this;
    var obj = e.currentTarget.dataset.price;
    var index = this.data.priceList.findIndex(function(item, index, arr)     {
      return item.price == obj.price;
    });
    this.data.priceList.forEach(function (item, indexp, arr) {
      var key = "priceList[" + indexp + "].active";
      if (index !== indexp) {
        arr[indexp].active = false;
        that.setData({
          [key]: false
        });
      } else {
        that.setData({
          [key]: true
        });
      }
    });
    console.log("this.data.priceLis:", this.data.priceList);
  },
  back: function() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  select: function (e) {
    var obj = e.currentTarget.dataset.coupon;
    var index = this.data.couponList.findIndex(function (item, index, arr) {
      return item.id == obj.id;
    });
    var key = "couponList[" + index + "].active";
    if (!obj.active) {
      this.setData({
        [key]: true
      });
    } else {
      this.setData({
        [key]: false
      });
    }
  },
  getSeleted: function () {
    return this.data.couponList.filter(function(item, index, arr) {
      return item.active;
    }).map(function(item, key, arr) {
      return item.id + '';
    })
  },
  consumer: function() {
    var list = this.getSeleted();
    if (list.length === 0) {
      wx.showToast({
        title: '请选择优惠券',
      });
    } else {
      util.AJAX({
        url: "/coupon/consume-coupon",
        method: "POST",
        data: { couponNoList: list, merchantId: this.data.id },
        success: function (res) {
          console.log(res)
          if (res.statusCode === 200) {
            if (res.data.data) {
              wx.showToast({
                title: '使用成功',
                success: function() {
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                }
              });
            }
          }
          // app.setChangedData();

        },
        fail: function (res) {
          console.log(res)
          wx.showToast({
            title: res.data.msg,
          })
        }
      })
    }
   
  },
  merchantModel: function (res) {
    return {
      name: res.merchantName ? res.merchantName : '',
      address: res.merchantAddress ? res.merchantAddress : '',
      phone: res.contactMobile ? res.contactMobile : '',
      contact: res.contactName ? res.contactName : ''
    };
  },
  couponModel: function (data) {
    var model = [];
    if (data && data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        model.push({
          id: data[i].id ? data[i].id : '',
          money: data[i].price ? data[i].price : '',
          count: data[i].count ? data[i].count : '',
          description: data[i].description ? data[i].description : '',
          name: data[i].name ? data[i].name : '',
          flag: 1,
          active: false,
          location: data[i].location ? data[i].location : ''
        });
      }
    }
    return model;
  },
  getDetail: function (id) {
    var that = this;
    util.AJAX({
      url: "/merchant/merchant-info",
      method: "GET",
      data: { sysId: id },
      success: function (res) {
        if (res.statusCode === 200) {
          that.setData({ detail: that.merchantModel(res.data.data.merchantInfo) });
          that.setData({ couponList: that.couponModel(res.data.data.couponInfo) });
        } 
      },
      fail: function (res) {
        console.log(res);
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id);
    this.setData({ id: options.id });
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
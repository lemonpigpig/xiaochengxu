const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: null,
    couponList: []
  },
  merchantModel: function (res) {
    console.log(res);
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
          name: data[i].name ? data[i].name : ''

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
        that.setData({ detail: that.merchantModel(res.data.data.merchantInfo) });
        that.setData({ couponList: that.couponModel(res.data.data.couponInfo) });
      },
      fail: function () {

      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id);
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
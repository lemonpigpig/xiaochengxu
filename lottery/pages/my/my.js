
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    nickName: '',
    totalPrice: '',
    unUsedPrice: '',
    usedPrice: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
  },
  init: function() {
    var that = this;
    this.setData({ avatarUrl: app.globalData.userInfo.avatarUrl, nickName: app.globalData.userInfo.nickName });
    this.initData();
    app.addListener(function () {
      that.initData();
    });
  },
  initData:function() {
    var that = this;
    util.AJAX({
      url: "/coupon/coupon-collect",
      data: {},
      method: "GET",
      success: function (res) {
        if (res.statusCode === 200) {
          if (res.data.data) {
            that.setData({ 
              totalPrice: res.data.data.totalPrice,
              unUsedPrice: res.data.data.unUsedPrice,
              usedPrice: res.data.data.usedPrice,
            });
          } 
        }
      },
      fail: function (res) {
        console.log(res);
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
    this.initData();
    wx.stopPullDownRefresh();
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
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    addr: '',
    canPick: false,
    canUse: false
  },
  initData: function(code) {
    var that = this;
    util.AJAX({
      url: "/merchant/merchant-info-detail",
      data: { sysId: code },
      success: function(res) {
        that.setData({
          name: res.data.data.contactMobile,
          addr: res.data.data.merchantAddress,
          canPick: res.data.data.canPick,
          canUse: res.data.data.canUse,
        });
      },
      fail: function(res) {

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData(options.code);
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
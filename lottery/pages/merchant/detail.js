const util = require('../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    addr: '',
    canPick: false,
    canUse: false,
    code: ''
  },
  consumer: function() {
    var code = this.data.code;
    if (code) {
      util.AJAX({
        url: "/merchant/merchant-info",
        method: "GET",
        data: { sysId: code },
        success: function (res) {
          if (res.statusCode === 200) {
            if (res.data.data) {
              wx.navigateTo({
                url: "/pages/merchant/merchant?id=" + code
              });
            } else {
              wx.showToast({
                title: '商户不存在',
                image: "/static/close.png"
              });
            }
          } else {
            wx.showToast({
              title: '商户不存在',
              image: "/static/close.png"
            });
          }
        },
        fail: function () {
          wx.showToast({
            title: '券无效',
            image: "/static/close.png"
          });
        }
      });
    }
  },
  initData: function(code) {
    var that = this;
    util.AJAX({
      url: "/merchant/merchant-info-detail",
      data: { sysId: code },
      success: function(res) {
        that.setData({
          name: res.data.data.merchantName ? res.data.data.merchantName : '',
          addr: res.data.data.merchantAddress ? res.data.data.merchantAddress : '',
          canPick: res.data.data.canPick ? res.data.data.canPick : '',
          canUse: res.data.data.canUse ? res.data.data.canUse : '',
          code: res.data.data.sysId ? res.data.data.sysId : '',
          commonwealGoods: res.data.data.commonwealGoods ? res.data.data.commonwealGoods : ''
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
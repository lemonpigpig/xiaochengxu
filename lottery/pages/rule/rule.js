// pages/rule/rule.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    showGet: false,
    showUse: false,
    money: ''
  },

  back: function() {
    if (this.data.showGet) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(12344);
    var that = this;
    if (options.type == 1) {
      wx.getStorage({
        key: 'couponinfo',
        success: function(res) {
          that.setData({ money: res.data.money });  
        },
      })
      this.setData({ title: '领取规则' });
      this.setData({ showGet: true });
      this.setData({ showUse: false });
    } else if(options.type ==
     2) {
      this.setData({ showUse: true });
      this.setData({ showGet: false });
      this.setData({ title: '抵用规则' })
    }
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
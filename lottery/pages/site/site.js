
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pageIndex: 0,
    pageSize: 10,
    isLoading: false,
    isEnd: false,
    defaultPic: "/static/default.jpg",//app.defaultPic,
    longitude: '',
    latitude: '', 
  },
  jump: function(e) {
    var code = e.currentTarget.dataset.item.code;
    wx.navigateTo({
      url: '/pages/merchant/detail?code=' + code,
    });
  },
  searchScrollLower: function(res) {
    if (!this.data.isLoading && !this.data.isEnd) {
      this.setData({ pageIndex: this.data.pageIndex + 1});
      this.getList();
      this.setData({ isLoading: true });
    }
  },
  getDefault: function() {
    var list = [];
    for (var i=1;i<20;i++) {
      list.push({
        id: i,
        name: i
      });
    }
    this.setData({ list: list });
  },
  siteModel: function(data) {
    var model = [];
    if(data && data.length>0) {
      for (var i = 0; i < data.length; i++) {
        var dis = '';
        if (data[i].distance) {
          var temp = parseFloat(data[i].distance)/1000;
          if (temp < 1) {
            dis = data[i].distance.toFixed(1) + 'm';
          } else {
            dis = temp.toFixed(2) + 'km';
          }
        } else {
          dis = 0;
        }
        model.push({
          distanceC: dis,
          pic: data[i].facadePic ? data[i].facadePic : this.data.defaultPic,
          merchantAddress: data[i].merchantAddress ? data[i].merchantAddress :'',
          merchantName: data[i].merchantName ? data[i].merchantName : '',
          canPick: data[i].canPick ? data[i].canPick : '',
          canUse: data[i].canUse ? data[i].canUse : '',
          code: data[i].sysId ? data[i].sysId : ''
        });
      }
    }
    return model;
  },
  getList: function() {
    var that = this;
    util.AJAX({
      url: "/merchant/nearby",
      data: {
        pageIndex: that.data.pageIndex,
        pageSize: 10,
        lng: that.data.longitude,
        lat: that.data.latitude, 
        distance: 50000
      },
      method: "POST",
      success: function (res) {
        if (!res.data.data || res.data.data.length === 0) {
          that.setData({ isEnd: true });
        } else {
          that.setData(
            { list: [...that.data.list, ...that.siteModel(res.data.data)] });
        }
        that.setData({ isLoading: false });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  initData: function() {
    var that = this;
    wx.getLocation({
      success: function (res) {
        that.setData({ longitude: res.longitude});
        that.setData({ latitude: res.latitude });
        that.getList()
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
    // this.getDefault();
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

const util = require('../../utils/util.js');
var app = getApp();

Page({
    data: {
        /**
         * 页面配置
         */
        winWidth: 0,
        winHeight: 0,
        // loading
        hidden: false
    },
    scanCode: function() {
      var that = this;
      wx.scanCode({
        success: function(res) {
          var code = res.result;
          wx.switchTab({
            url: "../index/index",
            success: function() {
            }
          });
          // console.log('success', code);
        },
        fail: function(res) {
          console.log('fail', res);
        }
      });
    },
    recieve: function() {
      // app.setChangedData('page2-data');
      util.AJAX({
        url: "/coupon/pick-coupon",
        data: {
          lotteryCode: 12345
        },
        success: function (res) {
          console.log(res);
        },
        fail: function (res) {
          console.log(res);
        }
      });
    },
    /** 
     * 页面初始化
     * options 为页面跳转所带来的参数
     */
    onLoad: function (options) {

        var that = this;
        wx.setNavigationBarTitle({
          title: "领取优惠券",
          success: function (res) {
            console.log(123);
          }
        })
        /**
         * 获取系统信息
         */
        wx.getSystemInfo({

            success: function (res) {
                that.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }

        });


        /**
         * 显示 loading
         */
        that.setData({
            hidden: true
        });

        // // 请求精选数据
        // util.AJAX("news/latest", function (res) {

        //     var arr = res.data;
        //     var format = util.getFormatDate(arr.date);

        //     // 格式化日期方便加载指定日期数据
        //     // 格式化日期获取星期几方便显示
        //     arr["dateDay"] = format.dateDay;
        //     // 获取当前现有数据进行保存
        //     var list = that.data.datalist;

        //     // 重新写入数据
        //     that.setData({
        //         datalist: list.concat(arr),
        //         topStories: arr.top_stories,
        //         dataListDateCurrent: arr.date,    // 当前日期
        //         dataListDateCount: 1
        //     });
        // });

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
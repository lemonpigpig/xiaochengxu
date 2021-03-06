

// 加载配置文件
const config = require( '../config.js' );

function scanCode(success, fail) {
  wx.scanCode({
    success: function(res) {
      success(res);
    },
    fail: function(res) {
      fail ? fail(res) : '';
    }
  })
}
function formatTime( date ) {

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
}

// 格式化时间戳
function getTime( timestamp ) {
    var time = arguments[ 0 ] || 0;
    var t, y, m, d, h, i, s;
    t = time ? new Date( time * 1000 ) : new Date();
    y = t.getFullYear();    // 年
    m = t.getMonth() + 1;   // 月
    d = t.getDate();        // 日

    h = t.getHours();       // 时
    i = t.getMinutes();     // 分
    s = t.getSeconds();     // 秒

    return [ y, m, d ].map( formatNumber ).join('-') + ' ' + [ h, i, s ].map( formatNumber ).join(':');
    
}

module.exports = {
    scanCode: scanCode,
    formatTime: formatTime,
    getTime : getTime,
    token: '',
    setToken: function(data) {
      this.token = data;
    },
    getToken: function() {
      return this.token;
    },
    AJAX : function(obj){
      var { url, success, fail, method = "get", header = {}, data = {}} = obj;
      header.token = this.token;
        wx.request({
          url: config.API_HOST + url,
            method : method,
            data: data,
            header: header ? header : {"Content-Type":"application/json"},
            success: function( res ) {
              success( res );
            },
            fail: function(res) {
              fail(res);
            }
        });
    },

    /**
     * 获取格式化日期
     * 20161002
     */
    getFormatDate : function( str ) {
            
        // 拆分日期为年 月 日
        var YEAR = str.substring( 0, 4 ),
            MONTH = str.substring( 4, 6 ),
            DATE = str.slice( -2 );

        // 拼接为 2016/10/02 可用于请求日期格式
        var dateDay = YEAR + "/" + MONTH + "/" + DATE;

        // 获取星期几
        var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            day = new Date( dateDay ).getDay();

        // 获取前一天日期 根据今天日期获取前一天的日期
        // var dateBefore = new Date( new Date( dateDay ) - 1000 * 60 * 60 * 24 ).toLocaleDateString();
        // var dateBefore = dateBefore.split('/');
        // if( dateBefore[1] < 10 ) {
        //     dateBefore[1] = '0' + dateBefore[1];
        // }
        // if( dateBefore[2] < 10 ) {
        //     dateBefore[2] = '0' + dateBefore[2];
        // }
        // dateBefore = dateBefore.join('');

        return {
            "dateDay" : MONTH + "月" + DATE + "日 " + week[ day ]
        }

    },
    generateUrl : function(obj, baseurl) {
      var keys = Object.keys(obj);
      var queryurl = "?" + keys[0] + "=" + obj[keys[0]];
      for(var i=1; i<keys.length; i++) {
        queryurl += "&" + keys[i] + "=" + obj[keys[i]];
      }
      return baseurl + queryurl;
    }
}

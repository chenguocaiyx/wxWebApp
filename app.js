//app.js
const Bmob = require('utils/bmob.js');
Bmob.initialize("e2f769637ae93ea874978df003e8933c", "683d499e799567fd67684d3b9edded17");
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    globalData:{
        logged: false,
        userInfo: null,
        objectId: "",
        openId: null,
    },
    onLaunch: function () {
        // qcloud.setLoginUrl(config.service.loginUrl)
      // 登录
      wx.login({
        success: res => {
          var APPID = 'wxe780f29d50b78824'
          var SECRET = '055045a08a2ba13d5d3b82b53425ce42'
          var JSCODE = res.code
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + APPID + '&secret=' + SECRET + '&js_code=' + JSCODE + '&grant_type=authorization_code',
              // data:{
              //   code: res.code
              // }
              success: res => {
                // console.log(res.data.openid)
                this.globalData.openId = res.data.openid
                console.log(this.globalData.openId)
              }
            })
            console.log(res)
          } else {
            console.log("获取用户登录态失败！" + res.errMsg)
          }

        }
      })
      // 获取用户信息
      wx.getSetting({
        success: res => {

          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })
    }
    // globalData: {
    //   userInfo: null
    // }
})
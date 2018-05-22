//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index');
var config = require('../../config');
var util = require('../../utils/util.js');
var Bmob = require('../../utils/bmob.js');
var app = getApp();

Page({
    data: {
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: '',
        openId: '',
        createUser: false,
        objectId: "",
        imgUrl: 'http://bmob-cdn-14633.b0.upaiyun.com/2018/04/29/8ea6ebe640a1987880f8ce39e8a5fef9.jpg',
        user:{}
    },

    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true,
                logged: true,
                openId: app.globalData.openId
            })
            app.globalData.logged = this.data.logged;
            if (this.data.logged) {
                this.addUser()
                this.gxUserInfo();
            }
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                console.log(res)
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true,
                    logged: true,
                    openId: app.globalData.openId
                })
                app.globalData.logged = this.data.logged;
                if (this.data.logged) {
                    this.addUser()
                    this.gxUserInfo();
                }
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true,
                        logged: true,
                        openId: app.globalData.openId
                    })
                    app.globalData.logged = this.data.logged;
                    if (this.data.logged) {
                        this.addUser()
                        this.gxUserInfo();
                    }
                }
            })
        }
        // this.gxUserInfo()
    },
    onShow: function(){
        this.gxUserInfo()
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true,
            logged: true,
            openId: app.globalData.openId
        })
        app.globalData.logged = this.data.logged;
        if (this.data.logged) {
            this.addUser()
            this.gxUserInfo();
        }
    },

    // // 用户登录示例
    // login: function () {
    //     if (this.data.logged) return

    //     util.showBusy('正在登录')
    //     var that = this

    //     // 调用登录接口
    //     qcloud.login({
    //         success(result) {

    //             if (result) {
    //                 util.showSuccess('登录成功')
    //                 // console.log(result)
    //                 that.setData({
    //                     userInfo: result,
    //                     logged: true,
    //                     openId: result.data.data.openId
    //                 })
    //                 //全局变量赋值
    //                 app.globalData.logged = that.data.logged;
    //                 app.globalData.userInfo = result;
    //                 if(that.data.logged){
    //                     that.addUser()
    //                 }
    //                 // console.log(that.data.userInfo.openId)
    //             } else {
    //                 // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
    //                 qcloud.request({
    //                     url: config.service.requestUrl,
    //                     login: true,
    //                     success(result) {

    //                         console.log(result)
    //                         util.showSuccess('登录成功')
    //                         that.setData({
    //                             userInfo: result.data.data,
    //                             logged: true,
    //                             openId: result.data.data.openId
    //                         })
    //                         app.globalData.logged = that.data.logged;
    //                         app.globalData.userInfo = result.data.data;
    //                         console.log(app.globalData.logged)
    //                         console.log(app.globalData.userInfo.openId)
    //                         if(that.data.logged){
    //                             that.addUser()
    //                         }
    //                         // console.log(that.data.openId)
    //                     },

    //                     fail(error) {
    //                         util.showModel('请求失败', error)
    //                         console.log('request fail', error)
    //                     }
    //                 })
    //             }
    //         },

    //         fail(error) {
    //             util.showModel('登录失败', error)
    //             console.log('登录失败', error)
    //         }
    //     })
    // },

    //添加用户信息
    addUser: function () {
        var that = this;
        //判断数据库有没有该用户的信息
        var user = Bmob.Object.extend("user");
        var use = new Bmob.Query(user);
        use.equalTo("openId", that.data.openId);
        // 查询所有数据
        use.find({
            success: function (results) {
                console.log("共查询到 " + results.length + " 条记录");
                console.log(that.data.createUser)
                if (results.length == 0) {
                    that.setData({
                        createUser: true
                    })
                }
                console.log(that.data.createUser)
                if (that.data.createUser) {
                    that.createUser()
                }
                // 循环处理查询到的数据
                // for (var i = 0; i < results.length; i++) {
                //     var object = results[i];
                //     console.log(object.id + ' - ' + object.get('openId'));
                // }
            },
            error: function (error) {
                console.log("查询失败: " + error.code + " " + error.message);
            }
        });

        //添加新用户数据
    },
    createUser: function () {
        console.log("添加用户")
        var that = this
        //创建类和实例
        var user = Bmob.Object.extend("user");
        var use = new user();
        use.set("openId", that.data.openId);
        use.set("fans", 0);
        use.set("care", 0);
        use.set("avatarUrl", that.data.userInfo.avatarUrl);
        use.set("userName", that.data.userInfo.nickName);
        //添加数据，第一个入口参数是null
        use.save(null, {
            success: function (result) {
                // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
                console.log("添加用户成功, objectId:" + result.id);
                that.setData({
                    objectId: result.id
                })
            },
            error: function (result, error) {
                // 添加失败
                console.log('添加用户失败');
            }
        });
        //创建用户信息表 
        // var userInfo = Bmob.Object.extend(that.data.objectId);
        // var info = new userInfo();
        // info.set("fans","test");
        // info.set("care", "test");
        // info.set("postImg", "test");
        // info.set("collection","test");
        // //添加数据，第一个入口参数是null
        // info.save(null, {
        //     success: function (results) {
        //         // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
        //         console.log("创建用户信息表成功, objectId:" + results.id);
        //     },
        //     error: function (resulst, error) {
        //         // 添加失败
        //         console.log('创建用户信息表失败');
        //     }
        // });
    },


    // odEEN0Z4c0bw4ZYCxedZg40iky1Q
    admin: function (event) {
        wx.navigateTo({
            url: '/page/admin/admin',
        })
    },
    //个人主页展示
    oneUser: function (event) {
        wx.navigateTo({
            url: '/page/oneUser/oneUser?openId=' + this.data.openId +'&indexId=0&page=0',
        })


    },
    //更新用户数据
    gxUserInfo:function(){
        var that = this
        var user = Bmob.Object.extend("user");
        var use = new Bmob.Query(user);
        use.equalTo("openId", this.data.openId);
        // 查询所有数据
        use.find({
            success: function (results) {
                console.log("共查询到 " + results.length + " 条记录");
                console.log(results)
                that.setData({
                    user: results[0].attributes
                })

                var user = Bmob.Object.extend("user");
                var use = new Bmob.Query(user);

                use.get(results[0].id, {
                    success: function (result) {
                        // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
                        result.set('userName', that.data.userInfo.nickName);
                        result.set('avatarUrl', that.data.userInfo.avatarUrl);
                        result.save();

                        // The object was retrieved successfully.
                    },
                    error: function (object, error) {

                    }
                });

            },
            error: function (error) {
                console.log("查询失败: " + error.code + " " + error.message);
            }
        });
    },
    //我的收藏
    collView: function(){
        wx.navigateTo({
            url: '/page/oneUser/oneUser?page=1',
        })
    },
    //我的投稿
    postView: function () {
        wx.navigateTo({
            url: '/page/oneUser/oneUser?page=3',
        })
    },
    //关注
    likes: function(){
      console.log("关注")
      wx.navigateTo({
          url: '/page/oneUser/oneUser?value=likes',
      })
    },
    //粉丝
    fans: function(){
      console.log("粉丝")
      wx.navigateTo({
          url: '/page/oneUser/oneUser?value=fans',
      })
    }


})
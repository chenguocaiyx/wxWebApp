var Bmob = require('../../utils/bmob.js');
var app = getApp()
Page({
    data: {
        userInfo: {},
        images: [],
        openId: "",
        indexId: 0,
        user: {},
        like: false,
        showText: "",
        careId: "",
        fansId: "",
        fansObjectId: "",
        careObjectId: "",
        careNum: 0,
        fansNum: 0,
        num: 0,
        userMsg: []
    },


    onLoad: function (options) {
        var that = this
        //用户信息
        if (options.value == 'likes') {
            that.setData({
                openId: app.globalData.openId,
            })
            that.getUserInfo()
            that.likes();

        }
        if (options.value == 'fans') {
            that.setData({
                openId: app.globalData.openId,
            })
            that.getUserInfo()
            that.fans();
        }
        if (options.page == 2 || options.page == 0) {
            console.log(options.openId)
            console.log(options.indexId)
            var openId = options.openId;
            var that = this
            that.setData({
                openId: openId,
                indexId: options.indexId,
                showText: "作品展示"
            })
            that.getUserInfo()
            that.selectImg("postImgUrl");
        }
      
        //我的收藏
        if (options.page == 1) {
            that.setData({
                openId: app.globalData.openId,
                showText: "我的收藏"
            })
            that.getUserInfo()
            that.selectImg("collectionImgUrl");
        }
        //我的投稿
        if (options.page == 3) {
            that.setData({
                openId: app.globalData.openId,
                showText: "我的投稿"
            })
            that.getUserInfo()
            that.selectImg("postImgUrl");
        }

        that.likeUser();
       
        that.change()

    },

    getUserInfo: function () {
        var that = this
        that.setData({
            userInfo: {}
        })
        //获取用户信息
        var user = Bmob.Object.extend("user");
        var use = new Bmob.Query(user);
        use.equalTo("openId", that.data.openId);
        // 查询所有数据
        use.find({
            success: function (results) {

                console.log("共查询到 " + results.length + " 条记录");
                console.log(results)
                that.setData({
                    userInfo: results[0].attributes
                })
            },
            error: function (error) {
                console.log("查询失败: " + error.code + " " + error.message);
            }
        });
    },

    back: function (event) {
        var that = this
        if (that.data.indexId == 1) {
            wx.navigateBack({

            })
        }
        if (that.data.indexId == 0) {
            wx.switchTab({
                url: '/page/mine/mine',
            })
        }

    },
    //获取用户投稿,收藏的图片信息
    selectImg: function (whatImg) {
        var that = this
        that.setData({
            images: []
        })
        var user = Bmob.Object.extend("userInfo");
        var use = new Bmob.Query(user);
        use.equalTo("openId", that.data.openId);
        use.descending("createdAt");
        // 查询所有数据
        use.find({
            success: function (results) {


                console.log("共查询到图片 " + results.length + " 条记录");
                console.log(results)
                // 循环处理查询到的数据
                let image = [];
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    // console.log(object.id + ' - ' + object.get('title'));
                    if (object.get(whatImg) > "") {
                        image.push(results[i]);
                    }

                }

                that.setData({
                    images: image
                })
            },
            error: function (error) {
                console.log("查询失败: " + error.code + " " + error.message);
            }
        });
    },

    // //获取用户信息
    //     getUserInfo: function () {
    //         var that = this
    //         var user = Bmob.Object.extend("user");
    //         var use = new Bmob.Query(user);
    //         use.equalTo("openId", this.data.openId);
    //         // 查询所有数据
    //         use.find({
    //             success: function (results) {
    //                 console.log("共查询到 " + results.length + " 条记录");
    //                 console.log(results)
    //                 that.setData({
    //                     user: results[0].attributes
    //                 })
    //             },
    //             error: function (error) {
    //                 console.log("查询失败: " + error.code + " " + error.message);
    //             }
    //         });
    //     },

    getImg: function (evevt) {
        console.log(this.data.activeIndex)
        //   var objectId = event.currentTarget.dataset.objectId;
        console.log(evevt.currentTarget.dataset.objectId)
        var source = evevt.currentTarget.dataset.source;
        wx.navigateTo({
            // url: '/page/detial/detail?objectId=' + evevt.currentTarget.dataset.objectId + '&activeIndex=' + this.data.activeIndex,
            url: '/page/detial/detail?objectId=' + evevt.currentTarget.dataset.objectId + '&imgUrl=' + evevt.currentTarget.dataset.imgUrl + '&indexId=3&source=' + source,
        })
    },

    //关注
    // likeOne: function (event) {
    //   var that = this 
    //    if(!that.data.like){
    //      that.setData({
    //        like: true
    //      })
    //      console.log("关注")
    //    }else{
    //       that.setData({
    //           like: true
    //       })
    //       console.log("取消关注")
    //    }

    // },

    //关注
    likeOne: function () {
        var that = this
        // console.log(that.data.like)
        if (!that.data.like) {

            this.setData({
                num: 1
            })
            var user = Bmob.Object.extend("userInfo");
            var use = new user();
            // 添加数据，第一个入口参数是Json数据
            use.save({
                care: that.data.openId,
                openId: app.globalData.openId
            }, {
                    success: function (result) {
                        console.log("关注成功")
                        console.log(result.id)
                        that.addFans()
                        that.likeUser()
                        that.getFansAndLikeNum()
                        that.change();

                        // 添加成功
                    },
                    error: function (result, error) {
                        console.log("关注失败")
                        // 添加失败
                    }

                });

        } else {
            that.setData({
                like: false,
                num: -1
            })
            //取消关注
            var user = new Bmob.Query('userInfo');
            user.get(that.data.careId, {
                success: function (object) {
                    // The object was retrieved successfully.
                    object.destroy({
                        success: function (deleteObject) {
                            console.log(that.data.like)
                            that.getFansAndLikeNum()
                            that.change();
                            console.log('取消关注');
                        },
                        error: function (object, error) {
                            console.log('取消关注失败');
                        }
                    });
                },
                error: function (object, error) {
                    console.log("query object fail");
                }
            });

            //粉丝取消关注
            var user = new Bmob.Query('userInfo');
            user.get(that.data.fansId, {
                success: function (object) {
                    // The object was retrieved successfully.
                    object.destroy({
                        success: function (deleteObject) {
                            console.log(that.data.like)

                            console.log('粉丝取消关注');
                        },
                        error: function (object, error) {
                            console.log('粉丝取消关注失败');
                        }
                    });
                },
                error: function (object, error) {
                    console.log("query object fail");
                }
            });
        }


    },
    //查询user是否被关注
    likeUser: function () {
        var that = this
        //关注状态
        var user = Bmob.Object.extend("userInfo");
        var use = new Bmob.Query(user);
        use.equalTo("openId", app.globalData.openId);
        // 查询所有数据
        use.find({
            success: function (results) {
                console.log(results)
                console.log("共查询到 " + results.length + " 条记录");
                // 循环处理查询到的数据
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    console.log(object.id + ' - ' + object.get('care'))
                    if (object.get('care') == that.data.openId) {
                        that.setData({
                            like: true,
                            careId: results[i].id
                        })
                        console.log(that.data.careId)
                        console.log(that.data.like)
                    }
                }
            },
            error: function (error) {
                console.log("查询失败: " + error.code + " " + error.message);
            }
        });

        //被关注状态
        var user = Bmob.Object.extend("userInfo");
        var use = new Bmob.Query(user);
        use.equalTo("openId", that.data.openId);
        // 查询所有数据
        use.find({
            success: function (results) {
                console.log(results)
                console.log("共查询到 " + results.length + " 条记录");
                // 循环处理查询到的数据
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    // console.log(object.id + ' - ' + object.get('care'))
                    if (object.get('fans') == app.globalData.openId) {
                        that.setData({
                            like: true,
                            fansId: results[i].id
                        })
                        console.log(that.data.fansId)
                        console.log(that.data.like)
                    }
                }
            },
            error: function (error) {
                console.log("查询失败: " + error.code + " " + error.message);
            }
        });
    },

    //增加粉丝
    addFans: function () {
        var that = this
        var user = Bmob.Object.extend("userInfo");
        var use = new user();
        // 添加数据，第一个入口参数是Json数据
        use.save({
            fans: app.globalData.openId,
            openId: that.data.openId
        }, {
                success: function (result) {
                    console.log("增加粉丝")

                    // 添加成功
                },
                error: function (result, error) {
                    console.log("增加粉丝失败")
                    // 添加失败
                }

            });
    },

    //改变相应的关注和粉丝数量
    change: function () {
        var that = this
        
        //查找相关用户
        var fans = Bmob.Object.extend("user");
        var fans = new Bmob.Query(fans);
        // 查询所有数据
        fans.find({
            success: function (results) {
                console.log("共查询到 " + results.length + " 条记录");
                // 循环处理查询到的数据
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    // console.log(object.id);
                    if (object.get('openId') == that.data.openId) {
                        that.setData({
                            careObjectId: object.id,
                            // fansNum: results[i].attributes.fans
                        })
                        console.log(that.data.fansNum)
                        console.log(that.data.careObjectId)

                    }
                    if (object.get('openId') == app.globalData.openId) {
                        that.setData({
                            fansObjectId: object.id,
                            // careNum: results[i].attributes.care
                        })
                        console.log(that.data.careNum)
                        console.log(that.data.fansObjectId)

                    }
                }
                that.fansAndcare();
            },
            error: function (error) {
                console.log("查询失败: " + error.code + " " + error.message);
            }
        });

    },

    fansAndcare: function () {
        var that = this;
        console.log("修改" + that.data.fansObjectId)
        console.log(that.data.careObjectId)
        console.log(that.data.fansNum)
        console.log(that.data.careNum)

        //修改粉丝数量
        var fans = Bmob.Object.extend("user");
        var fa = new Bmob.Query(fans);

        // 这个 id 是要修改条目的 objectId
        fa.get(that.data.careObjectId, {
            success: function (result) {
                // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
                result.set('fans', that.data.fansNum);
                result.save();
                that.getUserInfo()
                console.log("粉丝变动")

            },
            error: function (object, error) {

            }
        });
        //修改关注数量
        var care = Bmob.Object.extend("user");
        var ca = new Bmob.Query(care);

        // 这个 id 是要修改条目的 objectId
        ca.get(that.data.fansObjectId, {
            success: function (result) {
                // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
                result.set('care', that.data.careNum);
                result.save();
                that.getUserInfo()
                console.log("关注变动")

            },
            error: function (object, error) {

            }
        });

    },

    //关注
    likes: function () {
        var that = this
        console.log("关注")
        this.setData({
            showText: '关注'
        })
        that.getFanAndCare('care')
    },
    //粉丝
    fans: function () {
        var that = this
        console.log("粉丝")
        this.setData({
            showText: '粉丝'
        })
        that.getFanAndCare('fans')

    },
    //获取粉丝和关注的用户信息
    getFanAndCare: function (ss) {
        var that = this
        let userMsg = []
        that.setData({
            userMsg: []
        })
        var temp = Bmob.Object.extend("userInfo");
        var tep = new Bmob.Query(temp);
        tep.equalTo("openId", that.data.openId);
        // 查询所有数据
        tep.find({
            success: function (results) {

                console.log("共查询到 " + results.length + " 条记录");
                // 循环处理查询到的数据
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    if (object.get(ss) > "") {
                        console.log(object.id + ' - ' + object.get(ss));
                        var users = Bmob.Object.extend('user');
                        var use = new Bmob.Query(users);
                        use.equalTo("openId", object.get(ss));
                        // 查询所有数据
                        use.find({
                            success: function (results) {
                                console.log(results)
                                userMsg.push(results[0].attributes)
                                that.setData({
                                    userMsg: userMsg
                                })
                                console.log(that.data.userMsg)
                                console.log(userMsg)
                            },

                            error: function (error) {
                                console.log("查询失败: " + error.code + " " + error.message);
                            }
                        });
                    }

                }




            },
            error: function (error) {
                console.log("查询失败: " + error.code + " " + error.message);
            }
        });
    },
    getUser: function(event){
        var that = this
        var openId = event.currentTarget.dataset.openid
        console.log(openId)
     
            that.setData({
                openId: openId,
                showText: "作品展示"
            })
            that.getUserInfo()
            that.selectImg("postImgUrl");
 
        // wx.navigateTo({
        //     url: '/page/oneUser/oneUser?page=3&openId='+ openId,
        // })
    },
    //统计粉丝和关注数量

    getFansAndLikeNum: function(){
        var that = this 
        var temp = Bmob.Object.extend("userInfo");
        var tep = new Bmob.Query(temp);
        tep.equalTo("openId", that.data.openId );
        // 查询所有数据
        tep.find({
            success: function (results) {
                console.log("共查询到 " + results.length + " 条记录");
                // 循环处理查询到的数据
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    // console.log(object.id + ' - ' + object.get('openId'));
                    if(object.get('fans') > ""){
                        that.setData({
                            fansNum : that.data.fansNum+1
                        })
                    }
                }
                console.log("粉丝数量:"+that.data.fansNum)
            },
            error: function (error) {
                console.log("查询失败: " + error.code + " " + error.message);
            }
        });
        var mine = Bmob.Object.extend("userInfo");
        var me = new Bmob.Query(mine);
        me.equalTo("openId", that.data.openId);
        // 查询所有数据
        me.find({
            success: function (results) {
                console.log("共查询到 " + results.length + " 条记录");
                // 循环处理查询到的数据
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    // console.log(object.id + ' - ' + object.get('openId'));
                    if (object.get('care') > "") {
                        that.setData({
                            careNum: that.data.careNum + 1
                        })
                    }
                }
                console.log("关注数量:" + that.data.careNum)
            },
            error: function (error) {
                console.log("查询失败: " + error.code + " " + error.message);
            }
        });
    }

})
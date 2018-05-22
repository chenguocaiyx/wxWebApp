var Bmob = require('../../utils/bmob.js');
var util = require('../../utils/util.js');
var app = getApp();

Page({

    data:{
        array: [ '风景', '美女', '动漫', '爱情','卡通', '可爱',  '明星', '车模', '汽车','品牌','体育', '节日', '影视','建筑', '动物','植物','星座', '美食','创意','其他'
    ],
        image:[],
        indexid:0,
        imgUrl:"",
        flag: false,
        classify:"",
        images: {}
    },
//query.descending(列名称);降序
    selectImg: function(bzDB){
        var that = this
        that.setData({
            image:[]
        })
        var temp = Bmob.Object.extend(bzDB);
        var tep = new Bmob.Query(temp);
        tep.descending("createdAt");
        // 查询所有数据
        tep.find({
            success: function (results) {
                console.log("共查询到 " + results.length + " 条记录");
                console.log(results)
                that.setData({
                    image: results
                })

            },
            error: function (error) {
                console.log("查询失败: " + error.code + " " + error.message);
            }
        });

    },

    onLoad: function(options){
        var that = this
        that.setData({
            indexid:options.id
        })
        if (options.id == 0) {
            that.selectImg("jingxuanbz")
            // var jingxuanbz = Bmob.Object.extend("jingxuanbz");
            // var jx = new Bmob.Query(jingxuanbz);
            // // 查询所有数据
            // jx.find({
            //     success: function (results) {
            //         console.log("共查询到 " + results.length + " 条记录");
            //         console.log(results)
            //         that.setData({
            //             image: results
            //         })

            //     },
            //     error: function (error) {
            //         console.log("查询失败: " + error.code + " " + error.message);
            //     }
            // });

        }
        if (options.id == 1) {
            that.selectImg("tuijianbz")
            // var tuijian = Bmob.Object.extend("tuijianbz");
            // var tj = new Bmob.Query(tuijian);
            // // 查询所有数据
            // tj.find({
            //     success: function (results) {
            //         console.log("共查询到 " + results.length + " 条记录");
            //         console.log(results)
            //         that.setData({
            //             image: results
            //         })

            //     },
            //     error: function (error) {
            //         console.log("查询失败: " + error.code + " " + error.message);
            //     }
            // });

        }
        if (options.id == 2) {
            that.selectImg("remenbz")
            // var remenbz = Bmob.Object.extend("remenbz");
            // var rm = new Bmob.Query(remenbz);
            // // 查询所有数据
            // rm.find({
            //     success: function (results) {
            //         console.log("共查询到 " + results.length + " 条记录");
            //         console.log(results)
            //         that.setData({
            //             image: results
            //         })

            //     },
            //     error: function (error) {
            //         console.log("查询失败: " + error.code + " " + error.message);
            //     }
            // });

        }
        if(options.id==3){
            that.selectImg("tougao")
            // var tougao = Bmob.Object.extend("tougao");
            // var tg = new Bmob.Query(tougao);
            // // 查询所有数据
            // tg.find({
            //     success: function (results) {
            //         console.log("共查询到 " + results.length + " 条记录");
            //         console.log(results)
            //         that.setData({
            //             image:results
            //         })
                   
            //     },
            //     error: function (error) {
            //         console.log("查询失败: " + error.code + " " + error.message);
            //     }
            // });
        
        }
       
    },

    //添加分类壁纸
    addClassify: function(){
        var that = this
        // 选择图片
        wx.chooseImage({
            
            count: 1,
            sizeType: ['original'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                    that.setData({
                        imgUrl: res.tempFilePaths
                    })

            }


        })
    },
    //选择分类
    bindPickerChange: function (e) {
        var value = e.detail.value;
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value,
            flag: true,
            classify: this.data.array[e.detail.value]
        })
        console.log(this.data.array[value])

    },
//上传图片
    putImg: function(){
        var that = this
        util.showBusy('正在上传')
            var tempFilePaths = that.data.imgUrl;
                if (tempFilePaths.length > 0) {
                    var name = '1.jpg';//上传的图片的别名，建议可以用日期命名
                    var file = new Bmob.File(name, tempFilePaths);
                    file.save().then(function (res) {
                        util.showSuccess('上传图片成功')
                        console.log(res);
                        that.setData({
                            imgUrl: res.url()
                        })

                    //把图片添加到all表中
                        var all = Bmob.Object.extend("all");
                        var all = new all();
                        // 添加数据，第一个入口参数是Json数据
                        all.save({
                            imgUrl: res.url(),
                            classify: that.data.classify,
                            source: "00000"
                        }, {
                                success: function (result) {
                                    console.log("添加成功")
                                    // 添加成功
                                },
                                error: function (result, error) {
                                    // 添加失败
                                }
                            });

                    }, function (error) {
                        console.log(error);
                    })
                }
    },


    // 投稿管理
    submit: function(e){
        var that = this;
        console.log(e.currentTarget.dataset.imgUrl)
        var imgUrl = e.currentTarget.dataset.imgUrl;
        var source = e.currentTarget.dataset.source;
        var classify = e.currentTarget.dataset.classify;
        var tuijian = Bmob.Object.extend("tuijianbz");
        var tj = new tuijian();
        // 添加数据，第一个入口参数是Json数据
        tj.save({
           imgUrl: imgUrl,
           source: source,
           classify: classify
        }, {
                success: function (result) {
                    console.log("发布成功")
                    // 添加成功
                },
                error: function (result, error) {
                    // 添加失败
                }
            });

        //把图片添加到用户信息表中
        var user = Bmob.Object.extend("userInfo");
        var use = new user();
        console.log(app.globalData.userInfo.openId)
        // 添加数据，第一个入口参数是Json数据
        use.save({
            postImgUrl: imgUrl,
            classify:classify,
            openId: source
        }, {
                success: function (result) {
                    console.log(result)
                    console.log("添加成功")
                    // 添加成功
                },
                error: function (result, error) {
                    // 添加失败
                }
            });

        //把图片添加到all表中
        var all = Bmob.Object.extend("all");
        var a = new all();
        console.log(app.globalData.userInfo.openId)
        // 添加数据，第一个入口参数是Json数据
        a.save({
            imgUrl: imgUrl,
            classify: classify,
            source: source
        }, {
                success: function (result) {
                    console.log(result)
                    console.log("添加成功")
                    // 添加成功
                },
                error: function (result, error) {
                    // 添加失败
                }
            });



        var objectId = e.currentTarget.dataset.objectId
        console.log(objectId)
        var tougao = new Bmob.Query('tougao');
        tougao.equalTo("objectId", objectId);
        tougao.find().then(function (todos) {
          return Bmob.Object.destroyAll(todos);
        }).then(function (todos) {
          console.log(todos);
          console.log("删除成功")
          that.selectImg("tougao");
          // 删除成功
        }, function (error) {
          // 异常处理
        });
        
    },

    // 精选壁纸管理
    //添加精选壁纸
    addImg: function () {
        wx.navigateTo({
            url: '/page/add/add?indexId=1',
        })
        // console.log(this.data.index)
        // var that = this
        // // 选择图片
        // wx.chooseImage({
        //     count: 1,
        //     sizeType: ['original'],
        //     sourceType: ['album', 'camera'],
        //     success: function (res) {
        //         util.showBusy('正在上传')
        //         var tempFilePaths = res.tempFilePaths;
        //         if (tempFilePaths.length > 0) {
        //             var name = '1.jpg';//上传的图片的别名，建议可以用日期命名
        //             var file = new Bmob.File(name, tempFilePaths);
        //             file.save().then(function (res) {
        //                 util.showSuccess('上传图片成功')
        //                 console.log(res);
        //                 that.setData({
        //                     imgUrl: res.url()
        //                 })

        //                 var jingxuan = Bmob.Object.extend("jingxuanbz");
        //                 var jx = new jingxuan();
        //                 // 添加数据，第一个入口参数是Json数据
        //                 jx.save({
        //                     imgUrl: res.url(),
        //                     source: "00000"
        //                 }, {
        //                         success: function (result) {
        //                             that.selectImg("jingxuanbz")
        //                             console.log("添加成功")
        //                             // 添加成功
        //                         },
        //                         error: function (result, error) {
        //                             // 添加失败
        //                         }
        //                     });

        //             }, function (error) {
        //                 console.log(error);
        //             })
        //         }

        //     }

        
        // })
    },
    // 添加热门壁纸addRmImg
    addRmImg: function () {
        wx.navigateTo({
            url: '/page/add/add?indexId=3',
        })
    //   console.log(this.data.index)
    //   var that = this
    //   // 选择图片
    //   wx.chooseImage({
    //     count: 1,
    //     sizeType: ['original'],
    //     sourceType: ['album', 'camera'],
    //     success: function (res) {
    //       util.showBusy('正在上传')
    //       var tempFilePaths = res.tempFilePaths;
    //       if (tempFilePaths.length > 0) {
    //         var name = '1.jpg';//上传的图片的别名，建议可以用日期命名
    //         var file = new Bmob.File(name, tempFilePaths);
    //         file.save().then(function (res) {
    //           util.showSuccess('上传图片成功')
    //           console.log(res);
    //           that.setData({
    //             imgUrl: res.url()
                
    //           })

    //           var remenbz = Bmob.Object.extend("remenbz");
    //           var rm = new remenbz();
    //           // 添加数据，第一个入口参数是Json数据
    //           rm.save({
    //             imgUrl: res.url(),
    //             source: "00000"
    //           }, {
    //               success: function (result) {
    //                   that.selectImg("remenbz")
    //                 console.log("添加成功")
    //                 // 添加成功
    //               },
    //               error: function (result, error) {
    //                 // 添加失败
    //               }
    //             });

    //         }, function (error) {
    //           console.log(error);
    //         })
    //       }

    //     }


    //   })
    },
    //删除精选壁纸
    rmJxImg: function(e){
        var that = this
        var objectId = e.currentTarget.dataset.objectId
        console.log(objectId)
        var jingxuan = new Bmob.Query('jingxuanbz');
        jingxuan.equalTo("objectId", objectId);
        jingxuan.find().then(function (todos) {
            return Bmob.Object.destroyAll(todos);
        }).then(function (todos) {
            console.log(todos);
            console.log("删除成功")
            that.selectImg("jingxuanbz")
            // 删除成功
        }, function (error) {
            // 异常处理
        });
    },
    
    //删除热门壁纸
    rmRmImg: function (e) {
        var that = this 
      var objectId = e.currentTarget.dataset.objectId
      console.log(objectId)
      var remenbz = new Bmob.Query('remenbz');
      remenbz.equalTo("objectId", objectId);
      remenbz.find().then(function (todos) {
        return Bmob.Object.destroyAll(todos);
      }).then(function (todos) {
        console.log(todos);
        console.log("删除成功")
        that.selectImg("remenbz")
        // 删除成功
      }, function (error) {
        // 异常处理
      });
    },
    //删除推荐壁纸
    rmTjImg: function (e) {
        var that = this
      var objectId = e.currentTarget.dataset.objectId
      console.log(objectId)
      var tuijian = new Bmob.Query('tuijianbz');
      tuijian.equalTo("objectId", objectId);
      tuijian.find().then(function (todos) {
        return Bmob.Object.destroyAll(todos);
      }).then(function (todos) {
        console.log(todos);
        console.log("删除成功")
        that.selectImg("tuijianbz")
        // 删除成功
      }, function (error) {
        // 异常处理
      });
    },

    back: function (event) {
        wx.navigateBack({
            
        })
    }

})
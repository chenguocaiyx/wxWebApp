
var Bmob = require('../../utils/bmob.js');
var app = getApp();
Page({

    data: {
        image:{},
        images:[],
        imgUrl:"",
        indexId: 0,
        source: "",
        userInfo: {},
        like: false,
        objectId: "",
        collId:""

    },


    onLoad: function (options) {
        console.log(options.objectId)
        var imgUrl = options.imgUrl;
        // console.log(options.imgUrl)
        
        this.setData({
            objectId: options.objectId,
            imgUrl: imgUrl,
            images: imgUrl,
            indexId: options.indexId,
            source: options.source
        })
        // console.log(options.source)

        var that = this
        // if (options.activeIndex==0){
        //     var detail = Bmob.Object.extend("jingxuanbz");
        //     var dt = new Bmob.Query(detail);
        //     dt.get(options.objectId, {
        //         success: function (result) {
        //             // console.log(result[0])
        //             // The object was retrieved successfully.
        //             that.setData({
        //                 image: result,
        //                 images: result.attributes.imgUrl

        //             })
        //         },
        //         error: function (result, error) {
        //             console.log("查询失败");
        //         }
        //     });
        // }
        // if (options.activeIndex == 1) {
        //     var tuijianbz = Bmob.Object.extend("tuijianbz");
        //     var tu = new Bmob.Query(tuijianbz);
        //     tu.get(options.objectId, {
        //         success: function (result) {
        //             // The object was retrieved successfully.
        //             that.setData({
        //                 image: result,

        //             })
        //         },
        //         error: function (result, error) {
        //             console.log("查询失败");
        //         }
        //     });
        // }
        //调取获取用户昵称和头像的方法
        that.getUserInfo(options.source)
        //获取收藏状态
        that.likeImg()
    },
    previewImage: function(e){
        var that = this
        wx.previewImage({
            current: that.data.imgUrl,
            urls: [that.data.images],
        })
    },
    //返回
    backHome: function(event){
        console.log("返回")
        if (this.data.indexId==1){
            wx.switchTab({
                url: '/page/home/home',
            })
        }
        if(this.data.indexId==2){
            wx.switchTab({
                url: '/page/classify/classify',
            })
        }if(this.data.indexId==3){
            wx.navigateBack({
                
            })
        }
       
    },
    // 获取壁纸发布者的头像，昵称
    getUserInfo: function(source){
        var that = this
        var user = Bmob.Object.extend("user");
        var use = new Bmob.Query(user);
        use.equalTo("openId", source);
        // 查询所有数据
        use.find({
            success: function (results) {
                console.log(results)
                that.setData({
                    userInfo: results[0].attributes
                })
                console.log(results)
                console.log(that.data.userInfo)
                console.log("共查询到 " + results.length + " 条记录");
                // 循环处理查询到的数据
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    console.log(object.id + ' - ' + object.get('openId'));
                }
            },
            error: function (error) {
                console.log("查询失败: " + error.code + " " + error.message);
            }
        });
    },
    // back: function (event) {
    //     wx.switchTab({
    //         url: '/page/home/home',
    //     })
    // },
    //个人主页展示
    oneUser: function (event) {
        wx.navigateTo({
            url: '/page/oneUser/oneUser?openId=' + this.data.source+'&indexId=1&page=2',
        })
    },

    //下载图片
    download: function(){
        var that = this
        console.log(that.data.imgUrl)
        wx.downloadFile({
            url: that.data.imgUrl , //仅为示例，并非真实的资源
            success: function (res) {
                
                wx.saveFile({
                    tempFilePath: res.tempFilePath,
                    success:function(res){
                        var path = res.savedFilePath
                        console.log("下载成功")
                        console.log(path)
                    }
                    
                })
                
                // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                if (res.statusCode === 200) {
                    
                }
            }
        })

    },
    //收藏壁纸
    collImg: function(){
        var that = this
        // console.log(that.data.like)
        if(!that.data.like){
            
            // this.setData({
            //     like: true
            // })
            var user = Bmob.Object.extend("userInfo");
            var use = new user();
            // 添加数据，第一个入口参数是Json数据
            use.save({
                collectionImgUrl: that.data.imgUrl,
                openId: app.globalData.openId,
                source: that.data.objectId,
                postOpenId: that.data.source
            }, {
                    success: function (result) {
                        console.log("收藏成功")
                        console.log(result.id)
                        that.likeImg()
                        
                        // 添加成功
                    },
                    error: function (result, error) {
                        console.log("收藏失败")
                        // 添加失败
                    }
                    
                });
            
        }else{
            that.setData({
                like: false
            })
            var user = new Bmob.Query('userInfo');
            user.get(that.data.collId, {
                success: function (object) {
                    // The object was retrieved successfully.
                    object.destroy({
                        success: function (deleteObject) {
                            console.log(that.data.like)
                            console.log('取消收藏');
                        },
                        error: function (object, error) {
                            console.log('取消收藏失败');
                        }
                    });
                },
                error: function (object, error) {
                    console.log("query object fail");
                }
            });
          
        }
        
     
    },
    //查询图片是否被收藏
    likeImg: function(){
        var that = this
        var user = Bmob.Object.extend("userInfo");
        var use = new Bmob.Query(user);
        use.equalTo("openId",app.globalData.openId);
        // 查询所有数据
        use.find({
            success: function (results) {
                console.log(results)
                console.log("共查询到 " + results.length + " 条记录");
                // 循环处理查询到的数据
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    console.log(object.id + ' - ' + object.get('source'));
                    if(object.get('source') == that.data.objectId){
                        that.setData({
                            like: true,
                            collId: results[i].id
                        })
                        console.log(that.data.objectId)
                        console.log(that.data.collId)
                        console.log(that.data.like)
                    }
                }
            },
            error: function (error) {
                console.log("查询失败: " + error.code + " " + error.message);
            }
        });
    }
})
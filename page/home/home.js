var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var Bmob = require('../../utils/bmob.js');
var app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
let col1H = 0;
let col2H = 0;

Page({
    data: {
        tabs: ["精选", "推荐", "热门"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        scrollH: 0,
        imgWidth: 0,
        loadingCount: 0,
        images: [],
        Arr1: [],
        Arr2: []
 
        // images: [],
        // Arr11: [],
        // Arr12: [],
        // images2: [],
        // Arr21: [],
        // Arr22: []

    },
    onLoad: function () {
        var that = this;
        // that.loadImages("jingxuanbz");
        
    },
   onShow: function(){
       if (this.data.activeIndex == 0) {
           this.loadImages("jingxuanbz")
       }
       if (this.data.activeIndex == 1) {
           this.loadImages("tuijianbz")
       }
       if (this.data.activeIndex == 2) {
           this.loadImages("remenbz")
       }
   },

    loadImages: function (bzDB) {

        var that = this;
        that.setData({
            images: [],
            Arr1: [],
            Arr2: [],
        })
        // if (that.data.activeIndex == 0) {
            var temp = Bmob.Object.extend(bzDB);
            var tep = new Bmob.Query(temp);
            tep.descending("createdAt");
            // 查询所有数据
            tep.find({
                success: function (results) {
                    console.log("查询成功")

                    let { Arr1, Arr2 } = that.data
                    let images = [];
                    // let aa1=[],aa2=[];
                    // 循环处理查询到的数据
                    for (let i = 0; i < results.length; i++) {
                        if ((i+1) % 2 != 0)
                            Arr1.push(results[i]);
                        else
                            Arr2.push(results[i]);
                        images.push(results[i].attributes.imgUrl);

                    }
                    that.setData({
                        images: images,
                        Arr1,//这里在进行数据赋值
                        Arr2//这里在进行数据赋值
                    });

                },
                error: function (error) {
                    alert("查询失败: " + error.code + " " + error.message);
                }
            });
        // }
        // if (that.data.activeIndex == 1) {
            // var tuijianbz = Bmob.Object.extend("tuijianbz");
            // var tu = new Bmob.Query(tuijianbz);
            // // 查询所有数据
            // tu.find({
            //     success: function (results) {
            //         console.log("推荐")

            //         let { Arr11, Arr12 } = that.data
            //         let images1 = [];
            //         // let aa1=[],aa2=[];
            //         // 循环处理查询到的数据
            //         for (let i = results.length - 1; i >= 0; i--) {
            //             if ((i + 1) % 2 == 0)
            //                 Arr11.push(results[i]);
            //             else
            //                 Arr12.push(results[i]);
            //             images1.push(results[i].attributes.imgUrl);
            //         }

            //         that.setData({
            //             images1: images1,
            //             Arr11,//这里在进行数据赋值
            //             Arr12//这里在进行数据赋值
            //         });

                // },
            //     error: function (error) {
            //         alert("查询失败: " + error.code + " " + error.message);
            //     }
            // });
        // }
        // if (that.data.activeIndex == 2) {
            // var remenbz = Bmob.Object.extend("remenbz");
            // var rm = new Bmob.Query(remenbz);
            // // 查询所有数据
            // rm.find({
            //     success: function (results) {
            //         console.log("热门")

            //         let { Arr21, Arr22 } = that.data
            //         let images2 = [];
            //         // let aa1=[],aa2=[];
            //         // 循环处理查询到的数据
            //         for (let i = results.length - 1; i >= 0; i--) {
            //             if (i % 2 == 0)
            //                 Arr21.push(results[i]);
            //             else
            //                 Arr22.push(results[i]);
            //             images2.push(results[i].attributes.imgUrl);
            //         }

            //         that.setData({
            //             images2: images2,
            //             Arr21,//这里在进行数据赋值
            //             Arr22//这里在进行数据赋值
            //         });

            //     },
            //     error: function (error) {
            //         alert("查询失败: " + error.code + " " + error.message);
            //     }
            // });
        // }
    },

    lower: function (e) {
        console.log(e);
        console.log("上拉");
        var that = this;
        if (that.data.activeIndex == 0) {
            var jingxuanbz = Bmob.Object.extend("jingxuanbz");
            var jx = new Bmob.Query(jingxuanbz);
            // 查询所有数据
            jx.find({
                success: function (results) {
                    console.log(results)

                    let { Arr01, Arr02 } = that.data
                    //   let images0 = [];
                    // let aa1=[],aa2=[];
                    // 循环处理查询到的数据
                    for (let i = results.length - 1; i >= 0; i--) {
                        if (i % 2 == 0)
                            Arr01.push(results[i]);
                        else
                            Arr02.push(results[i]);

                    }
                    that.setData({
                        images0: results,
                        Arr01,//这里在进行数据赋值
                        Arr02//这里在进行数据赋值
                    });

                },
                error: function (error) {
                    alert("查询失败: " + error.code + " " + error.message);
                }
            });
        }
        if (that.data.activeIndex == 1) {
            var tuijianbz = Bmob.Object.extend("tuijianbz");
            var tu = new Bmob.Query(tuijianbz);
            // 查询所有数据
            tu.find({
                success: function (results) {
                    console.log(results)

                    let { Arr11, Arr12 } = that.data
                    let images1 = [];
                    // let aa1=[],aa2=[];
                    // 循环处理查询到的数据
                    for (let i = results.length - 1; i >= 0; i--) {
                        if (i % 2 == 0)
                            Arr11.push(results[i]);
                        else
                            Arr12.push(results[i]);
                    }

                    that.setData({
                        images1: images1,
                        Arr11,//这里在进行数据赋值
                        Arr12//这里在进行数据赋值
                    });

                },
                error: function (error) {
                    alert("查询失败: " + error.code + " " + error.message);
                }
            });
        }
        if (that.data.activeIndex == 2) {
            var remenbz = Bmob.Object.extend("remenbz");
            var rm = new Bmob.Query(remenbz);
            // 查询所有数据
            rm.find({
                success: function (results) {
                    console.log(results)

                    let { Arr21, Arr22 } = that.data
                    let images2 = [];
                    // let aa1=[],aa2=[];
                    // 循环处理查询到的数据
                    for (let i = results.length - 1; i >= 0; i--) {
                        if (i % 2 == 0)
                            Arr21.push(results[i]);
                        else
                            Arr22.push(results[i]);
                    }

                    that.setData({
                        images2: images2,
                        Arr21,//这里在进行数据赋值
                        Arr22//这里在进行数据赋值
                    });

                },
                error: function (error) {
                    alert("查询失败: " + error.code + " " + error.message);
                }
            });
        }
    },

    tabClick: function (e) {

        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
        if(this.data.activeIndex == 0){
            this.loadImages("jingxuanbz")
        }
        if(this.data.activeIndex == 1){
            this.loadImages("tuijianbz")
        }
        if(this.data.activeIndex == 2){
            this.loadImages("remenbz")
        }
    },
//图片详情
    getImg: function (evevt) {
        console.log(this.data.activeIndex)
        //   var objectId = event.currentTarget.dataset.objectId;
        console.log(evevt.currentTarget.dataset.objectId)
        var source = evevt.currentTarget.dataset.source;
        wx.navigateTo({
            // url: '/page/detial/detail?objectId=' + evevt.currentTarget.dataset.objectId + '&activeIndex=' + this.data.activeIndex,
            url: '/page/detial/detail?objectId=' + evevt.currentTarget.dataset.objectId + '&imgUrl=' + evevt.currentTarget.dataset.imgUrl+'&indexId=1&source='+source,
        })
        // wx.previewImage({
        //     current: this.data.images0.imgUrl,
        //   urls: [this.data.images0.imgUrl]
        // })
    },
    // 预览图片
    previewImage: function (e) {
        console.log(this.data.activeIndex)
        console.log(e.currentTarget.dataset.imgUrl)
        console.log(this.data.images0)
        // if (this.data.activeIndex == 0) {
            wx.previewImage({
                current: e.currentTarget.dataset.imgUrl, // 当前显示图片的http链接
                urls: this.data.images // 需要预览的图片http链接列表
            })
        // }
        // if (this.data.activeIndex == 1) {
        //     wx.previewImage({
        //         current: e.currentTarget.dataset.imgUrl, // 当前显示图片的http链接
        //         urls: this.data.images1 // 需要预览的图片http链接列表
        //     })
        // }
        // if (this.data.activeIndex == 2) {
        //     wx.previewImage({
        //         current: e.currentTarget.dataset.imgUrl, // 当前显示图片的http链接
        //         urls: this.data.images2 // 需要预览的图片http链接列表
        //     })
        // }

    }



})
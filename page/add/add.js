var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var Bmob = require('../../utils/bmob.js');
var app  =  getApp();
Page({
    data:{
        imgUrl:"",
        array: ['风景', '美女', '动漫', '爱情', '卡通', '可爱', '明星', '车模', '汽车', '品牌', '体育', '节日', '影视', '建筑', '动物', '植物', '星座', '美食', '创意', '其他'
        ],
        indexId:0,
        classify:"",
        text:"选择投稿的图片"
    },
  onLoad: function(options){
      var that = this
    console.log(options.indexId)
    if(options.indexId == 1){
        that.setData({
            text: "添加精选壁纸"
        })
    }
    if (options.indexId == 3) {
        that.setData({
            text: "添加热门壁纸"
        })
    }
    
    that.setData({
        indexId: options.indexId
    })
    console.log(that.data.indexId)
  },
    //添加投稿图片
    addClassify: function () {
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
    putImg: function () {
      var that = this
      util.showBusy('正在上传')
      var tempFilePaths = that.data.imgUrl;
      if (tempFilePaths.length > 0) {
        var name = tempFilePaths;//上传的图片的别名，建议可以用日期命名
        var file = new Bmob.File(name, tempFilePaths);
        file.save().then(function (res) {
          util.showSuccess('上传图片成功')
          console.log(res);
          that.setData({
            imgUrl: res.url()
          })

          
            //把图片添加到用户信息表中
        //   var user = Bmob.Object.extend("userInfo");
        //   var use = new user();
        //   console.log(app.globalData.userInfo.openId)
        //   // 添加数据，第一个入口参数是Json数据
        //   use.save({
        //       postImgUrl: res.url(),
        //       classify: that.data.classify,
        //       openId: app.globalData.userInfo.openId
        //   }, {
        //           success: function (result) {
        //               console.log(result)
        //               console.log("添加成功")
        //               // 添加成功
        //           },
        //           error: function (result, error) {
        //               // 添加失败
        //           }
        //       });
            if(that.data.indexId == 0){
                that.putUpImg("tougao",app.globalData.userInfo.openId)
            }
            if(that.data.indexId == 1){
                that.putUpImg("jingxuanbz","00000");
                that.putAll();
                that.putUserInfo();
            }
            if(that.data.indexId == 3){
                that.putUpImg("remenbz","00000");
                that.putAll();
                that.putUserInfo();
            }

        }, function (error) {
          console.log(error);
        })
      }
    },
//把图片信息添加到对应的表中
putUpImg: function(bzDB,source){
    var that =this
    //把图片添加到投稿表中
    var temp = Bmob.Object.extend(bzDB);
    var tep = new temp();
    console.log(app.globalData.userInfo.openId)
    // 添加数据，第一个入口参数是Json数据
    tep.save({
        imgUrl: that.data.imgUrl,
        classify: that.data.classify,
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

},

//把图片添加到all表中
putAll: function(){
    var that = this
    //把图片添加到all表中
    var all = Bmob.Object.extend("all");
    var all = new all();
    // 添加数据，第一个入口参数是Json数据
    all.save({
        imgUrl: that.data.imgUrl,
        classify: that.data.classify,
        source: "00000"
    }, {
            success: function (result) {
                console.log("添加到All成功")
                // 添加成功
            },
            error: function (result, error) {
                // 添加失败
            }
        });
},
//将图片信息添加到userInfo个人信息表中
putUserInfo: function(){
    var that = this
    //把图片添加到all表中
    var user = Bmob.Object.extend("userInfo");
    var use = new user();
    // 添加数据，第一个入口参数是Json数据
    use.save({
        postImgUrl: that.data.imgUrl,
        classify: that.data.classify,
        openId: "00000"
    }, {
            success: function (result) {
                console.log("添加到userInfo成功")
                // 添加成功
            },
            error: function (result, error) {
                // 添加失败
            }
        });
},

  // 上传图片接口
  // doUpload: function () {
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
  //           var name = '1.jpg';//上传的图片的别名，建议可以用日期命名
  //           var file = new Bmob.File(name, tempFilePaths);
  //           file.save().then(function (res) {
  //               util.showSuccess('上传图片成功')
  //               console.log(res);
  //               that.setData({
  //             imgUrl: res.url()
  //           })

  //               var tougao = Bmob.Object.extend("tougao");
  //               var tu = new tougao();
  //               // 添加数据，第一个入口参数是Json数据
  //               tu.save({
  //                   imgUrl: res.url()
  //               }, {
  //                       success: function (result) {
  //                           // 添加成功
  //                       },
  //                       error: function (result, error) {
  //                           // 添加失败
  //                       }
  //                   });

  //           }, function (error) {
  //               console.log(error);
  //           })
  //       }

  //     }
    
       
  //   })
  // },

  // 预览图片
  previewImg: function () {
    wx.previewImage({
      current: this.data.imgUrl,
      urls: [this.data.imgUrl]
    })
  },
  
    back:function(event){
        var that = this
        if(that.data.indexId == 1){
            wx.navigateBack({
                
            })
        }
        if (that.data.indexId == 3) {
            wx.navigateBack({

            })
        }
        if(that.data.indexId == 0){
            wx.switchTab({
                url: '/page/post/post',
            })
        }
        
    }
})

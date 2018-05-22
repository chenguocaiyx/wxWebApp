// pages/others/lefttab/lefttab.js
var Bmob = require('../../utils/bmob.js');
Page({
  data: {
    activeIndex: 0,
    content: '风景',
    tabs: [
      {
        id: 1,
        tabName: '风景'
      }, {
        id: 2,
        tabName: '美女'
      }, {
        id: 3,
        tabName: '动漫'
      }, {
        id: 4,
        tabName: '爱情'
      }, {
        id: 5,
        tabName: '卡通'
      }, {
        id: 6,
        tabName: '可爱'
      }, {
        id: 7,
        tabName: '明星'
      }, {
        id: 8,
        tabName: '车模'
      }, {
        id: 9,
        tabName: '汽车'
      }, {
        id: 10,
        tabName: '品牌'
      }, {
        id: 11,
        tabName: '体育'
      }, {
        id: 12,
        tabName: '节日'
      }, {
        id: 13,
        tabName: '影视'
      }, {
        id: 14,
        tabName: '建筑'
      }, {
        id: 15,
        tabName: '动物'
      }, {
        id: 16,
        tabName: '植物'
      }, {
        id: 17,
        tabName: '星座'
      }, {
        id: 18,
        tabName: '美食'
      }, {
        id: 19,
        tabName: '创意'
      }, {
        id: 20,
        tabName: '其他'
      }
    ],
    images:[]
 
    // contentList: [
    //   { text: '菜单:' },
    //   { text: '菜单:' },
    //   { text: '菜单:' },
    //   { text: '菜单:' },
    //   { text: '菜单:' },
    //   { text: '菜单:' },
    //   { text: '菜单:' },
    //   { text: '菜单:' },
    //   { text: '菜单:' },
    //   { text: '菜单:' },
    //   { text: '菜单:' },
    //   { text: '菜单:' },
    //   { text: '菜单:' },
    //   { text: '菜单:' },
    //   { text: '菜单:' },
    //   { text: '菜单:' }
    // ]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var vm = this;
    wx.getSystemInfo({
      success: (res) => {
        vm.setData({
          deviceWidth: res.windowWidth,
          deviceHeight: res.windowHeight
        });
      }
    });
    vm.findImg('all', "风景");
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  changeTab: function (e) {
    var that = this;
   
    var activeIndex = e.currentTarget.dataset.index;
    var name = e.currentTarget.dataset.name;
    this.setData({
      activeIndex: e.currentTarget.dataset.index,
      content: e.currentTarget.dataset.name
    })
    console.log(activeIndex+"  "+name)
    
    //分类

    if (activeIndex == 0) {
        that.findImg('all', "风景");
    }

    if (activeIndex == 1) {
        that.findImg('all', "风景");
    }

    if (activeIndex == 1) {
        that.findImg('all', "美女");
    }

    if (activeIndex == 2) {
        that.findImg('all', "动漫");
    }

    if (activeIndex == 3) {
        that.findImg('all', "爱情");
    }

    if (activeIndex == 4) {
        that.findImg('all', "卡通");
    }

    if (activeIndex == 5) {
        that.findImg('all', "可爱");
    }

    if (activeIndex == 6) {
        that.findImg('all', "明星");
    }

    if (activeIndex == 7) {
        that.findImg('all', "车模");
    }

    if (activeIndex == 8) {
        that.findImg('all', "汽车");
    }

    if (activeIndex == 9) {
        that.findImg('all', "品牌");
    }

    if (activeIndex == 10) {
        that.findImg('all', "体育");
    }

    if (activeIndex == 11) {
        that.findImg('all', "节日");
    }

    if (activeIndex == 12) {
        that.findImg('all', "影视");
    }

    if (activeIndex == 13) {
        that.findImg('all', "建筑");
    }

    if (activeIndex == 14) {
        that.findImg('all', "动物");
    }

    if (activeIndex == 15) {
        that.findImg('all', "植物");
    }

    if (activeIndex == 16) {
        that.findImg('all', "星座");
    }

    if (activeIndex == 17) {
        that.findImg('all', "美食");
    }

    if (activeIndex == 18) {
        that.findImg('all', "创意");
    }

    if (activeIndex == 19) {
        that.findImg('all', "其他");
    }

  },

//分类查找
  findImg: function(tableName,classify){
    var that = this;
    that.setData({
      images: []
    })
      var that = this 
      var chuangyi = Bmob.Object.extend(tableName);
      var cy = new Bmob.Query(chuangyi);
      cy.equalTo("classify", classify);
      cy.descending("createdAt");
      // 查询所有数据
      cy.find({
          success: function (results) {
              console.log(results)
            //   that.setData({
            //       images: results
            //   })
              console.log("共查询到 " + results.length + " 条记录");
              // 循环处理查询到的数据
            //   let { Arr1, Arr2 } = that.data
            //   let images = [];
              // let aa1=[],aa2=[];
              // 循环处理查询到的数据
            //   for (let i = 0; i < results.length; i++) {
            //       if (i % 2 == 0)
            //           Arr1.push(results[i]);
            //       else
            //           Arr2.push(results[i]);
            //       images.push(results[i].attributes.imgUrl);

            //   }
              that.setData({
                  images: results,
                //   Arr1,//这里在进行数据赋值
                //   Arr2//这里在进行数据赋值
              });
              // for (var i = 0; i < results.length; i++) {
              //     var object = results[i];
              //     console.log(object.id + ' - ' + object.get('classify'));
              // }
          },
          error: function (error) {
              console.log("查询失败: " + error.code + " " + error.message);
          }
      });
  },
  getMore: function () {
    // this.setData({
    //   contentList: this.data.contentList.concat([
    //     { text: '菜单:' },
    //     { text: '菜单:' },
    //     { text: '菜单:' },
    //     { text: '菜单:' },
    //     { text: '菜单:' }
    //   ])
    // });
  },
  getImg: function (evevt) {
      console.log(this.data.activeIndex)
      //   var objectId = event.currentTarget.dataset.objectId;
      console.log(evevt.currentTarget.dataset.objectId)
      var source = evevt.currentTarget.dataset.source;
      wx.navigateTo({
          url: '/page/detial/detail?objectId=' + evevt.currentTarget.dataset.objectId + '&imgUrl=' + evevt.currentTarget.dataset.imgUrl + '&indexId=2&source=' + source,
      })
  }

})
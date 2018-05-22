var app = getApp();
Page({

    data:{
        flag: true
          },

    post:function(event){
        console.log(app.globalData.logged)
        if (!app.globalData.logged){
            this.setData({
                flag: false
            })
    
        }
        if (app.globalData.logged){
            wx.navigateTo({
                url: '/page/add/add?indexId=0',
            })
        }
       
    },
    
})
// app.globalData.logged